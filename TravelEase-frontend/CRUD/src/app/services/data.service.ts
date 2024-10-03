import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Package } from '../common/package.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = 'http://localhost:3000/package';
  private baseUrl1 = 'http://localhost:3000/package/add';
  private baseUrl3 = 'http://localhost:3000/package';

  private token = localStorage.getItem('token');

  constructor(private http: HttpClient) { }

getPackageList(): Observable<Package[]> { 
    return this.http.get<Package[]>(this.baseUrl);
  }

get(id:any ): Observable<Package> {
  return this.http.get<Package>(`${this.baseUrl}/${id}`);
}

create(data: any): Observable<any> {
  return this.http.post(this.baseUrl1, data);
}

update(id: any, data: any): Observable<any> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`
  });

  return this.http.put(`${this.baseUrl3}/${id}`, data, { headers });
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
    packages: Package[];
  }
}