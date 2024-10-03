import { Component } from '@angular/core';
import { user } from '../../../common/user.model';
import { userService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.css']
})
export class CreateRegistrationComponent {
  userItem: user = {
    id: '',
    name: '',
    email: '',
    password: '',
    confirm_password: ''
  };
  submitted = false;
  passwordError: string = '';
  emailError: string = '';
  successMessage: string | null = null;
  touched = false;  // Add this flag

  constructor(private userservice: userService, private router: Router) { }

  createUser(form: any): void {
    this.touched = true;  // Set touched flag to true when attempting to submit
    this.passwordError = ''; // Clear previous error messages
    this.emailError = '';
    this.successMessage = null;  // Clear previous success messages

    if (this.userItem.password !== this.userItem.confirm_password) {
      this.passwordError = 'Passwords do not match!';
      return;
    }

    if (form.invalid) {
      return;
    }

    this.userservice.create(this.userItem)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
          this.successMessage = 'You have successfully registered!';
          form.reset();
          this.userItem = {
            id: '',
            name: '',
            email: '',
            password: '',
            confirm_password: ''
          };
          this.touched = false;  // Reset touched flag after successful registration
        },
        error: (e) => console.error(e)
      });
  }
}
