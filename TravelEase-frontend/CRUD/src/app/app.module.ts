import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateComponent } from './components/packagecomponents/create/create.component';
//import { UpdateComponent } from './components/packagecomponents/update/update.component';
import { DeleteComponent } from './components/packagecomponents/delete/delete.component';
import { ListComponent } from './components/packagecomponents/list/list.component';
import { CreateCategoryComponent } from './components/categorycomponents/create-category/create-category.component';
import { CategoryListComponent } from './components/categorycomponents/category-list/category-list.component';
import { CreateRegistrationComponent } from './components/registrationcomponent/create-registration/create-registration.component';
import { RegistrationListComponent } from './components/registrationcomponent/registration-list/registration-list.component';
import { LoginComponent } from './components/registrationcomponent/login/login.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AdminComponent } from './components/admin/admin.component';
import { ManagePackagesComponent } from './components/admincomponents/manage-packages/manage-packages.component';
import { ManageCategoryComponent } from './components/admincomponents/manage-category/manage-category.component';
import { ManageUsersComponent } from './components/admincomponents/manage-users/manage-users.component';
import { CreateBookingComponent } from './components/bookingcomponent/create-booking/create-booking.component';
import { UserViewComponent } from './components/bookingcomponent/user-view/user-view.component';
import { ManageBookingsComponent } from './components/admincomponents/manage-bookings/manage-bookings.component';


import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/token.interceptor'

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    DeleteComponent,
    ListComponent,
    CreateCategoryComponent,
    CategoryListComponent,
    CreateRegistrationComponent,
    RegistrationListComponent,
    LoginComponent,
    AdminComponent,
    ManagePackagesComponent,
    ManageCategoryComponent,
    ManageUsersComponent,
    CreateBookingComponent,
    UserViewComponent,
    ManageBookingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
