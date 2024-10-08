import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogPostService } from '../services/blog-post.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';

@Component({
  selector: 'app-blogpost-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './blogpost-list.component.html',
  styleUrl: './blogpost-list.component.css'
})
export class BlogpostListComponent implements OnInit {

  blogPosts$?: Observable<BlogPost[]>;
  totalCount?: number;
  list: number[] = [];
  pageNumber = 1;
  pageSize = 5;

  constructor(private blogPostService: BlogPostService) {

  }
  ngOnInit(): void {
    this.blogPostService.getBlogPostCount()
      .subscribe({
        next: (value) => {
          this.totalCount = value;
          this.list = new Array(Math.ceil(value / this.pageSize))

          this.blogPosts$ = this.blogPostService.getAllBlogPosts(
            undefined,
            undefined,
            undefined,
            this.pageNumber,
            this.pageSize
          );
        }
      })
  }

  onSearch(query: string) {
    this.blogPosts$ = this.blogPostService.getAllBlogPosts(query);
  }

  sort(sortBy: string, sortDirection: string) {
    this.blogPosts$ = this.blogPostService.getAllBlogPosts(undefined, sortBy, sortDirection);
  }

  getPage(pageNumber: number) {
    this.pageNumber = pageNumber;

    this.blogPosts$ = this.blogPostService.getAllBlogPosts(
      undefined,
      undefined,
      undefined,
      this.pageNumber,
      this.pageSize
    );
  }

  getPrevPage() {
    if (this.pageNumber - 1 < 1) {
      return;
    }

    this.pageNumber -= 1;
    this.blogPosts$ = this.blogPostService.getAllBlogPosts(
      undefined,
      undefined,
      undefined,
      this.pageNumber,
      this.pageSize
    );
  }

  getNextPage() {
    if (this.pageNumber + 1 > this.list.length) {
      return;
    }

    this.pageNumber += 1;
    this.blogPosts$ = this.blogPostService.getAllBlogPosts(
      undefined,
      undefined,
      undefined,
      this.pageNumber,
      this.pageSize
    );
  }

}
