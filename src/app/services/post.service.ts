import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Post } from '../entities/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  /**
   * Fetches a single post by its slug.
   *
   * @param {string} slug The slug of the post to fetch
   * @returns {Observable<any>} An Observable emitting the fetched post data
   */
  public getPost(slug: string): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/posts/by-slug/${slug}`).pipe(
      map((post: any) => this.parseTags(post)),
      catchError((error) => {
        console.error('Error fetching post:', error);
        return throwError('Failed to fetch post. Please try again later.');
      })
    );
  }

  /**
   * Fetches recent posts.
   *
   * @returns {Observable<any>} An Observable emitting an array of recent posts
   */
  public getRecentPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.apiBaseUrl}/posts`).pipe(
      map((posts: any) => posts.map((p: any) => this.parseTags(p))),
      catchError((error) => {
        console.error('Error fetching recent posts:', error);
        return throwError('Failed to fetch recent posts. Please try again later.');
      })
    );
  }

  /**
   * Fetches metadata for all posts.
   *
   * @returns {Observable<any>} An Observable emitting metadata for all posts
   */
  public getAllPosts(): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/posts`).pipe(
      map((posts: any) => posts.map((p: any) => this.parseTags(p))),
      catchError((error) => {
        console.error('Error fetching all posts:', error);
        return throwError('Failed to fetch all posts. Please try again later.');
      })
    );
  }

  /**
   * Fetches posts by a specific tag.
   *
   * @param {string} tag The tag to filter posts by
   * @returns {Observable<any>} An Observable emitting an array of posts with the specified tag
   */
  public getPostsByTag(tag: string): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/posts?tag=${tag}`).pipe(
      map((posts: any) => posts.map((p: any) => this.parseTags(p))),
      catchError((error) => {
        console.error('Error fetching posts by tag:', error);
        return throwError('Failed to fetch posts by tag. Please try again later.');
      })
    );
  }

  private parseTags(post: any): any {
    if (typeof post.tags === 'string') {
      post.tags = post.tags ? post.tags.split(',') : [];
    }
    return post;
  }

  /**
   * Creates a URL-friendly slug from a string.
   *
   * @param {string} str The input string to slugify
   * @returns {string} The slugified string
   */
  public slugify(str: string): string {
    const regex = new RegExp(/\W+/, 'gm');
    const slug = str.replace(regex, ' ').toLowerCase().split(' ').join('-');
    return slug;
  }
}
