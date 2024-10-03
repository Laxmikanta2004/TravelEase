import { Component } from '@angular/core';
import { user } from '../../../common/user.model';
import { userService } from '../../../services/user.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.css'
})
export class ManageUsersComponent {
  users:user[] = [];
  selectedUser: user | null = null;

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



  editUser(user: user) {
    this.selectedUser = { ...user }; // Create a copy for editing
  }

  updateUser() {
    if (this.selectedUser) {
      this.userservice.update(this.selectedUser.id, this.selectedUser).subscribe({
        next: () => {
          this.listuser(); // Refresh the list
          this.selectedUser = null; // Clear the selected user
        },
        error: err => {
          console.error('Error updating user', err);
        }
      });
    }
  }

  cancelEdit() {
    this.selectedUser = null;
  }

  deleteUser(id: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userservice.delete(id).subscribe({
        next: () => {
          this.listuser(); // Refresh the list
        },
        error: err => {
          console.error('Error deleting user', err);
        }
      });
    }
  }

}
