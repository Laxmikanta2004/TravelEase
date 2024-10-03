import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'auth-token';
  private refreshTokenKey = 'refresh-token'; // Add a key for the refresh token
  private userApi = 'http://localhost:3000/registration';
  private tokenSubject = new BehaviorSubject<string | null>(null);

  private jwtHelper = new JwtHelperService();

  constructor(
    private http: HttpClient, 
    private router: Router, 
  ) { }

  getUserId(): string {
    return localStorage.getItem('userId') || ''; 
  }

  login(credentials: { email: string, password: string }) {
    return this.http.post<{ token: string, refreshToken: string }>(`${this.userApi}/login`, credentials)
      .pipe(
        tap((response) => {
          localStorage.setItem(this.tokenKey, response.token);
          localStorage.setItem(this.refreshTokenKey, response.refreshToken);
          this.tokenSubject.next(response.token);
        })
      );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    this.tokenSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }

  getRole(): string {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      try {
        const decodedToken = this.jwtHelper.decodeToken(token);
        return decodedToken && typeof decodedToken.isAdmin !== 'undefined' 
          ? decodedToken.isAdmin ? 'admin' : 'user' 
          : '';
      } catch (error) {
        console.error('Error decoding token', error);
        return ''; 
      }
    }
    return '';
  }

  // Add this method to refresh the token
  refreshToken() {
    const refreshToken = localStorage.getItem(this.refreshTokenKey);
    if (refreshToken) {
      return this.http.post<{ token: string }>(`${this.userApi}/refresh-token`, { refreshToken })
        .pipe(
          tap(response => {
            localStorage.setItem(this.tokenKey, response.token);
            this.tokenSubject.next(response.token);
          }),
          catchError(error => {
            this.logout();
            return throwError(error);
          })
        );
    }
    return throwError('No refresh token found');
  }

  getAccessToken() {
    return localStorage.getItem(this.tokenKey);
  }
}
