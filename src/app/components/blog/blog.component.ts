import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/entities/post';
import { PostService } from 'src/app/services/post.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

    articles: Post[] = [];
    totalPosts = 0;
    currentPage = 1;
    pageSize = 5;

    constructor(private postService: PostService) { }

    ngOnInit(): void {
        this.loadArticles();
    }

    loadArticles(page: number = 1): void {
      this.postService.getPostsPaginated(page, this.pageSize).subscribe(
        (result) => {
          this.articles = result.posts;
          this.totalPosts = result.total;
          this.currentPage = page;
          this.mapArticlesToSlugs();
        },
        (error: any) => {
          console.error('Error fetching blog posts:', error);
        }
      );
    }

    onPageChange(event: PageEvent): void {
      this.loadArticles(event.pageIndex + 1);
    }

    mapArticlesToSlugs(): void {
      this.articles.forEach((article: Post) => {
        article.slug = this.slugify(article.title);
      });
    }

    slugify(str: string): string {
        return this.postService.slugify(str);
    }
}
