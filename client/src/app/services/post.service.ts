import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  // Fetch a single post by slug
  public getPost(slug: string): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/post?name=${slug}`).pipe(
      catchError((error) => {
        console.error('Error fetching post:', error);
        return throwError('Failed to fetch post. Please try again later.');
      })
    );
  }

  // Fetch recent posts
  public getRecentPosts(): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/recentPosts`).pipe(
      catchError((error) => {
        console.error('Error fetching recent posts:', error);
        return throwError('Failed to fetch recent posts. Please try again later.');
      })
    );
  }

  // Fetch all posts' metadata
  public getAllPosts(): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/postsMetadata`).pipe(
      catchError((error) => {
        console.error('Error fetching all posts:', error);
        return throwError('Failed to fetch all posts. Please try again later.');
      })
    );
  }

  // Fetch posts by tag
  public getPostsByTag(tag: string): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/postsByTag?tag=${tag}`).pipe(
      catchError((error) => {
        console.error('Error fetching posts by tag:', error);
        return throwError('Failed to fetch posts by tag. Please try again later.');
      })
    );
  }

  // Create a slug from a string
  public slugify(str: string): string {
    const regex = new RegExp(/\W+/, 'gm');
    const slug = str.replace(regex, ' ').toLowerCase().split(' ').join('-');
    return slug;
  }
}
