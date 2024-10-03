import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };

  emailError: string = '';
  passwordError: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  loginUser() {
    this.authService.login(this.loginData).subscribe(
      response => {
        // Store the auth token
        localStorage.setItem('auth-token', response.token);
        
        // Decode the token to extract the user ID
        const decodedToken: any = jwtDecode(response.token);
        console.log('Decoded Token:', decodedToken);
        const userId = decodedToken.userId;
        console.log('User ID:', userId);
  
        // Store the user ID in localStorage
        if (userId) {
          localStorage.setItem('userId', userId);
          console.log('Stored in localstorage ',userId)
        }
        
        window.alert('Login successful!');

        // Navigate based on role
        const role = this.authService.getRole();
        if (role === 'admin') {
          this.router.navigate(['/admin']);
        } else if (role === 'user') {
          this.router.navigate(['/user']);
        }
      },
      error => {
        this.handleError(error);
      }
    );
  }


  private handleError(error: any) {
    this.emailError = '';
    this.passwordError = '';

    if (error.error && error.error.message) {
      if (error.error.message === 'Invalid email address') {
        this.emailError = 'Invalid email address';
      } else if (error.error.message === 'Incorrect password') {
        this.passwordError = 'Incorrect password';
      } else {
        this.emailError = 'Invalid email or password';
      }
    } else {
      console.error('Login failed', error);
    }
  }

}
