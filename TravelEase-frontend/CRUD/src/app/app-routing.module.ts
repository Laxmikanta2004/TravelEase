import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/packagecomponents/list/list.component';
import { CreateComponent } from './components/packagecomponents/create/create.component';
import { CreateCategoryComponent } from './components/categorycomponents/create-category/create-category.component';
import { CategoryListComponent } from './components/categorycomponents/category-list/category-list.component';
import { LoginComponent } from './components/registrationcomponent/login/login.component';
import { CreateRegistrationComponent } from './components/registrationcomponent/create-registration/create-registration.component';
import { AdminComponent } from './components/admin/admin.component';
import { ManagePackagesComponent } from './components/admincomponents/manage-packages/manage-packages.component';
import { ManageUsersComponent } from './components/admincomponents/manage-users/manage-users.component';
import { ManageCategoryComponent } from './components/admincomponents/manage-category/manage-category.component';
import { AuthGuard, AdminGuard } from './guards/auth.guards';
import { UserViewComponent } from './components/bookingcomponent/user-view/user-view.component';
import { CreateBookingComponent } from './components/bookingcomponent/create-booking/create-booking.component';
import { ManageBookingsComponent } from './components/admincomponents/manage-bookings/manage-bookings.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: CreateRegistrationComponent },
  {path:'',component:ListComponent},
  
  // User Routes
  { path: 'user', component: ListComponent, canActivate: [AuthGuard], children: [
      { path: 'packages', component: ListComponent }, 
    ]},
    { path: 'user/bookings', component: UserViewComponent },
    { path: 'user/book-package', component: CreateBookingComponent, canActivate: [AuthGuard] },


    
  // Admin Routes
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard, AdminGuard], children: [
      { path: 'add-package', component: CreateComponent },
      { path: 'manage-packages', component: ManagePackagesComponent },
      { path: 'add-category', component: CreateCategoryComponent },
      { path: 'manage-categories', component: ManageCategoryComponent },
      { path: 'manage-users', component: ManageUsersComponent },
      { path: 'manage-bookings', component: ManageBookingsComponent}
    ]},
  
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
