import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../common/category.model';
import { map } from 'rxjs';





@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'http://localhost:3000/category';
  private baseUrl1 = 'http://localhost:3000/category/add';

  private token = localStorage.getItem('token');


  constructor(private http: HttpClient) { }


  create(category: Category): Observable<any> {
    const token = localStorage.getItem('auth-token'); // Retrieve the token from localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(`${this.baseUrl}/add`, category, { headers });
  }

getCategoryList(): Observable<Category[]> { 
    return this.http.get<Category[]>(this.baseUrl);
  }


get(id: string): Observable<any> {
  return this.http.get(`${this.baseUrl}/category/${id}`);
}


update(id: any, data: any): Observable<any> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`
  });

  return this.http.put(`${this.baseUrl}/${id}`, data, { headers });
}

delete(id: any): Observable<any> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`
  });

  return this.http.delete(`${this.baseUrl}/${id}`, { headers });
}

}

interface GetResponse {
  _embedded: {
    categories: Category[];
  }
}