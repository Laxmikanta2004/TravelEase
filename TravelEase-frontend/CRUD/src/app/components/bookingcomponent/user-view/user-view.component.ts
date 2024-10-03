import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../../services/booking.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css'
})
export class UserViewComponent implements OnInit {

  bookings: any[] = [];

  constructor(private bookingService: BookingService, private authService: AuthService) {}

  ngOnInit(): void {
    this.getUserBookings();
  }

  getUserBookings(): void {
    const userId = this.authService.getUserId();
    this.bookingService.getBooking(userId).subscribe({
      next: (res) => {
        this.bookings = res;
      },
      error: (err) => {
        console.error('Error fetching user bookings', err);
      }
    });
  }

}