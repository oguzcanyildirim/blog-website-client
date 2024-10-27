import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  /**
   * Fetches all comments for a given post.
   *
   * @param {number} postId The ID of the post
   * @returns {Observable<any[]>} An Observable emitting an array of comments
   */
  public getComments(postId: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiBaseUrl}/posts/${postId}/comments`).pipe(
      catchError((error) => {
        console.error('Error fetching comments:', error);
        return throwError('Failed to fetch comments. Please try again later.');
      })
    );
  }

  /**
   * Adds a new comment to a post.
   *
   * @param {number} postId The ID of the post
   * @param {string} content The comment content
   * @returns {Observable<any>} An Observable emitting the created comment
   */
  public addComment(postId: number, content: string): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/posts/${postId}/comments`, { content }).pipe(
      catchError((error) => {
        console.error('Error adding comment:', error);
        return throwError('Failed to add comment. Please try again later.');
      })
    );
  }

  /**
   * Deletes a comment from a post.
   *
   * @param {number} postId The ID of the post
   * @param {number} commentId The ID of the comment to delete
   * @returns {Observable<any>} An Observable emitting the delete response
   */
  public deleteComment(postId: number, commentId: number): Observable<any> {
    return this.http.delete(`${environment.apiBaseUrl}/posts/${postId}/comments/${commentId}`).pipe(
      catchError((error) => {
        console.error('Error deleting comment:', error);
        return throwError('Failed to delete comment. Please try again later.');
      })
    );
  }
}
