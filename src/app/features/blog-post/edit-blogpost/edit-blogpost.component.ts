import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../models/blog-post.model';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';

@Component({
  selector: 'app-edit-blogpost',
  standalone: true,
  imports: [FormsModule, CommonModule, MarkdownModule],
  templateUrl: './edit-blogpost.component.html',
  styleUrl: './edit-blogpost.component.css'
})

export class EditBlogpostComponent implements OnInit, OnDestroy {
  id: string | null = null;
  model?: BlogPost;
  categories$?: Observable<Category[]>;
  selectedCategories?: string[];

  routerSubscription?: Subscription;

  constructor(private route: ActivatedRoute,
    private blogPostService: BlogPostService,
    private categoryService: CategoryService) {

  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();
    this.categoryService.getAllCategories();
    this.routerSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        if (this.id) {
          this.blogPostService.getBlogPostById(this.id).subscribe({
            next: (response) => {
              this.model = response;
              this.selectedCategories = response.categories.map(x => x.id);
            }
          });
        }
      }
    });
  }

  onFormSubmit(): void {

  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }

}
