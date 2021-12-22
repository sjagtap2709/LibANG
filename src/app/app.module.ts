import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';
import { DeleteCustomerComponent } from './delete-customer/delete-customer.component';
import { AddDetailsComponent } from './add-details/add-details.component';
import { ViewRecordsComponent } from './view-records/view-records.component';
import { UserPageComponent } from './user-page/user-page.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { IssueBookComponent } from './issue-book/issue-book.component';
import { HistoryComponent } from './history/history.component';
import { CustomerRegistrationComponent } from './customer-registration/customer-registration.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AdminPageComponent,
    AddCustomerComponent,
    UpdateCustomerComponent,
    DeleteCustomerComponent,
    AddDetailsComponent,
    ViewRecordsComponent,
    UserPageComponent,
    EditProfileComponent,
    IssueBookComponent,
    HistoryComponent,
    CustomerRegistrationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
