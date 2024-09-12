import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddBlogPost } from '../models/add-blog-post.model';
import { CommonModule } from '@angular/common';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { CategoryService } from '../../category/services/category.service';
import { Observable } from 'rxjs';
import { Category } from '../../category/models/category.model';

@Component({
  selector: 'app-add-blogpost',
  standalone: true,
  imports: [FormsModule, CommonModule, MarkdownModule],
  templateUrl: './add-blogpost.component.html',
  styleUrl: './add-blogpost.component.css'
})
export class AddBlogpostComponent implements OnInit {
  model: AddBlogPost;

  categories$?: Observable<Category[]>;

  constructor(private blogPostService: BlogPostService,
    private router: Router, private categoryService: CategoryService) {
    this.model = {
      title: '',
      shortDescription: '',
      urlHandle: '',
      content: '',
      featuredImageUrl: '',
      author: '',
      isVisible: true,
      publishedDate: new Date(),
      categories: []
    }
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();
  }

  onFormSubmit(): void {
    this.blogPostService.createBlogPost(this.model)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/blogposts')
        }
      });
  }

}
