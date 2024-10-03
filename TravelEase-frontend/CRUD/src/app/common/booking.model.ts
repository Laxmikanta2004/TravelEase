import { Package } from "./package.model";
import { user } from "./user.model";

export interface Booking {
    _id?: string;
    userId: user | any;
    packageId: Package; 
    bookingDate?: Date;
    status?: 'Pending' | 'Confirmed' | 'Cancelled';
    no_of_adults: number; 
    no_of_child: number; 
    no_of_people: number;
  }
  