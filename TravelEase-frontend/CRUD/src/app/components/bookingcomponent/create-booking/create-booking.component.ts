import { Component, OnInit } from '@angular/core';
import { Booking } from '../../../common/booking.model';
import { BookingService } from '../../../services/booking.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service'; // Ensure you have an AuthService to get the user ID
import { Package } from '../../../common/package.model';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.css']
})
export class CreateBookingComponent implements OnInit {
  booking: Booking = {
    _id: '',
    userId: '',
    packageId: {} as Package,
    bookingDate: new Date(),
    no_of_adults: 0,
    no_of_child: 0,
    no_of_people: 0,
    status: 'Pending'
  };

  submitted = false;

  constructor(
    private bookingService: BookingService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService 
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.booking.packageId = params['packageId'];
    });

  
    this.booking.userId = this.authService.getUserId(); 
  }

  updateTotalPeople(): void {
    this.booking.no_of_people = this.booking.no_of_adults + this.booking.no_of_child;
  }

  createBooking(): void {
    this.booking.bookingDate = new Date(); 

    const data = {
      userId: this.booking.userId,
      packageId: this.booking.packageId,
      no_of_adults: this.booking.no_of_adults,
      no_of_child: this.booking.no_of_child,
      no_of_people: this.booking.no_of_people,
      bookingDate: this.booking.bookingDate,
      status: this.booking.status
    };

    // Ensure token is valid before making the request
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found, unable to make a booking request');
      return;
    }

    this.bookingService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
        this.router.navigate(['/']);
      },
      error: (e) => {
        console.error('Error during booking creation', e);
      }
    });
  }

  newBooking(): void {
    this.submitted = false;
    this.booking = {
      _id: '',
      userId: this.authService.getUserId(),
      packageId: {} as Package,
      bookingDate: new Date(),
      no_of_adults: 0,
      no_of_child: 0,
      no_of_people: 0,
      status: 'Pending'
    };
  }
}
