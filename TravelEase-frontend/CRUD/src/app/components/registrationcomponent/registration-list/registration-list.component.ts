import { Component } from '@angular/core';
import { user } from '../../../common/user.model';
import { userService } from '../../../services/user.service';

@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrl: './registration-list.component.css'
})
export class RegistrationListComponent {
  users:user[] = [];

  constructor(private userservice:userService){}

  ngOnInit(){
    this.listuser();
  }

  listuser(){
    this.userservice.getUserList().subscribe(
      data => {
        this.users = data;
      }
    )
  }
}
