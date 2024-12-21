import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Post } from 'src/app/entities/post';
import { PostService } from 'src/app/services/post.service';
import { PageEvent } from '@angular/material/paginator';
import { of, Subscription } from 'rxjs';

@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit, OnDestroy {

    articles: Post[] = [];
    totalPosts = 0;
    currentPage = 1;
    pageSize = 5;

    searchTerm = '';
    isSearching = false;
    private searchSubject = new Subject<string>();
    private searchSubscription!: Subscription;

    constructor(private postService: PostService) { }

    ngOnInit(): void {
        this.loadArticles();

        this.searchSubscription = this.searchSubject.pipe(
          debounceTime(300),
          distinctUntilChanged(),
          switchMap((term) => {
            if (!term.trim()) {
              this.isSearching = false;
              this.loadArticles();
              return of([]);
            }
            return this.postService.searchPosts(term);
          })
        ).subscribe((results) => {
          if (this.searchTerm.trim()) {
            this.articles = results;
            this.isSearching = true;
            this.mapArticlesToSlugs();
          }
        });
    }

    onSearchInput(term: string): void {
      this.searchSubject.next(term);
    }

    clearSearch(): void {
      this.searchTerm = '';
      this.isSearching = false;
      this.searchSubject.next('');
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

    ngOnDestroy(): void {
      this.searchSubject.complete();
      if (this.searchSubscription) {
        this.searchSubscription.unsubscribe();
      }
    }
}
