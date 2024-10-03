import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../common/booking.model'; 

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private apiUrl = 'http://localhost:3000/bookings';
  private apiUrl1 = 'http://localhost:3000/bookings/add';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); 
    if (!token) {
      console.error('Authorization token missing');
      return new HttpHeaders();
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }


  create(bookingData: any): Observable<any> {
    return this.http.post(this.apiUrl1, bookingData, { headers: this.getHeaders() });
  }



  getBooking(userId: string): Observable<Booking[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Booking[]>(`${this.apiUrl}/user/${userId}`, { headers });
  }


  getAllBookings(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  updateBooking(id: string, booking: Booking): Observable<any> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.put<any>(`${this.apiUrl}/${id}`, booking, { headers });
  }

  deleteBooking(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }
}
