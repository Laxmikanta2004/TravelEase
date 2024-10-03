
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { user } from '../common/user.model';

@Injectable({
  providedIn: 'root'
})
export class userService {
  private baseUrl = 'http://localhost:3000/registration';
  private baseUrl1 = 'http://localhost:3000/registration/add';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth-token');  // Retrieve the token from localStorage
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getUserList(): Observable<user[]> {
    const headers = this.getHeaders();
    return this.http.get<user[]>(this.baseUrl, { headers });
  }

  create(data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(this.baseUrl1, data, { headers });
  }

  update(id: any, data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${this.baseUrl}/${id}`, data, { headers });
  }

  delete(id: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.baseUrl}/${id}`, { headers });
  }
}
