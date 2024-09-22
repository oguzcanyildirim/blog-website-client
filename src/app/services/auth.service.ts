import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'blog_auth_token';

  constructor(private http: HttpClient, private router: Router) { }

  /**
   * Logs in a user with email and password.
   *
   * @param {string} email The user's email
   * @param {string} password The user's password
   * @returns {Observable<any>} An Observable emitting the login response
   */
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/auth/login`, { email, password }).pipe(
      tap((response: any) => {
        localStorage.setItem(this.tokenKey, response.token);
      })
    );
  }

  /**
   * Registers a new user.
   *
   * @param {string} email The user's email
   * @param {string} password The user's password
   * @param {string} username The user's username
   * @returns {Observable<any>} An Observable emitting the registration response
   */
  register(email: string, password: string, username: string): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/auth/register`, { email, password, username }).pipe(
      tap((response: any) => {
        localStorage.setItem(this.tokenKey, response.token);
      })
    );
  }

  /**
   * Logs out the current user and redirects to home.
   */
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/']);
  }

  /**
   * Retrieves the stored auth token.
   *
   * @returns {string | null} The token or null if not found
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Checks if a user is currently logged in.
   *
   * @returns {boolean} True if a token exists
   */
  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  /**
   * Checks if the current user has admin role.
   *
   * @returns {boolean} True if the user is an admin
   */
  isAdmin(): boolean {
    try {
      const token = this.getToken();
      if (!token) return false;
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role === 'admin';
    } catch {
      return false;
    }
  }

  /**
   * Decodes the token and returns user info.
   *
   * @returns {object | null} The user object or null
   */
  getUser(): { id: number; email: string; username: string; role: string } | null {
    try {
      const token = this.getToken();
      if (!token) return null;
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload;
    } catch {
      return null;
    }
  }
}
