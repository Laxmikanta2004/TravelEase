import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request and add the Authorization header
    const token = this.authService.getAccessToken();
    let clonedReq = req;

    if (token) {
      clonedReq = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    return next.handle(clonedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && error.error.error === 'jwt expired') {
          // Token expired, attempt to refresh the token
          return this.authService.refreshToken().pipe(
            switchMap(() => {
              // Retry the original request with the new token
              const newToken = this.authService.getAccessToken();
              const newRequest = req.clone({
                setHeaders: { Authorization: `Bearer ${newToken}` }
              });
              return next.handle(newRequest);
            })
          );
        } else {
          return throwError(error);
        }
      })
    );
  }
}
