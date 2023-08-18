import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/entities/post';
import { PostService } from 'src/app/services/post.service';

@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

    articles: Post[] = [];

    constructor(private postService: PostService) { }

    ngOnInit(): void {
        this.loadArticles();
    }

    loadArticles(): void {
      this.postService.getAllPosts().subscribe((response: Post[]) => {
          this.articles = response;
          this.mapArticlesToSlugs();
        },
        (error: any) => {
          console.error('Error fetching blog posts:', error);
          // Handle error or show user-friendly message
        }
      );
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
