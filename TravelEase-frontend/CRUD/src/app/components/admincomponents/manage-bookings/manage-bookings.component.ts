import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../../services/booking.service';

@Component({
  selector: 'app-manage-bookings',
  templateUrl: './manage-bookings.component.html',
  styleUrls: ['./manage-bookings.component.css']
})
export class ManageBookingsComponent implements OnInit {
  bookings: any[] = [];
  selectedBooking: any;
  updateMode: boolean = false;

  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.bookingService.getAllBookings().subscribe(
      (data) => {
        this.bookings = data;
      },
      (error) => {
        console.error('Error fetching bookings', error);
      }
    );
  }

  // Set the booking to be updated
  onUpdate(booking: any): void {
    this.selectedBooking = { ...booking };
    this.updateMode = true;
  }

  // Cancel update
  cancelUpdate(): void {
    this.selectedBooking = null;
    this.updateMode = false;
  }

  // Save updated booking
  saveUpdate(): void {
    if (this.selectedBooking) {
      this.bookingService.updateBooking(this.selectedBooking._id, this.selectedBooking).subscribe(
        () => {
          this.loadBookings();
          this.cancelUpdate();
        },
        (error) => {
          console.error('Error updating booking', error);
        }
      );
    }
  }

  // Delete booking
  deleteBooking(id: string): void {
    if (confirm(`Are you sure you want to delete this booking with ID: ${id}?`)) {
      this.bookingService.deleteBooking(id).subscribe(
        () => {
          this.loadBookings();
        },
        (error) => {
          console.error('Error deleting booking', error);
        }
      );
    }
  }
}
