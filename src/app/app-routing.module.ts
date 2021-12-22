import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';
import { DeleteCustomerComponent } from './delete-customer/delete-customer.component';
import { ViewRecordsComponent } from './view-records/view-records.component';
import { AddDetailsComponent } from './add-details/add-details.component';
import { UserPageComponent } from './user-page/user-page.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { HistoryComponent } from './history/history.component';
import { IssueBookComponent } from './issue-book/issue-book.component';
import { CustomerRegistrationComponent } from './customer-registration/customer-registration.component';

const routes: Routes = [
  { path: 'Admin', component: AdminPageComponent },
  { path: 'LogIn', component: LoginPageComponent },
  { path: 'AddCustomer', component: AddCustomerComponent },
  { path: 'DeleteCustomer', component: DeleteCustomerComponent },
  { path: 'UpdateCustomer', component: UpdateCustomerComponent },
  { path: 'ViewRecord', component: ViewRecordsComponent },
  { path: 'AddDetails', component: AddDetailsComponent },
  { path: 'User', component: UserPageComponent },
  { path: 'EditProfile', component: EditProfileComponent },
  { path: 'History', component: HistoryComponent },
  { path: 'BookIssue', component: IssueBookComponent },
  { path: 'CustomerRegistration', component: CustomerRegistrationComponent },


 
    // { path: 'AddDetails', component: AddDetailsComponent, outlet: 'AddDetails'},
    // { path: 'ViewRecord', component: ViewRecordsComponent, outlet: 'ViewRecord'},
    // {path: 'UpdateCustomer', component: UpdateCustomerComponent, outlet: 'UpdateCustomer'},
    // {path: 'DeleteCustomer', component: DeleteCustomerComponent, outlet: 'DeleteCustomer'},
    // {path: 'AddCustomer', component: AddCustomerComponent, outlet: 'admin'},
  //   {
  //     path: 'Admin',  // you can keep it empty if you do not want /home
  //     component: AdminPageComponent,
  //     children: [
  //       {path: 'AddCustomer', component: AddCustomerComponent, outlet: 'admin'}
  //     ]
  // }
  
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
