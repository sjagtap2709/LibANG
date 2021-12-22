import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from '../customer';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {
  public CustObj:Customer;
  public apicontent!:Observable<any>
  constructor(private router:Router, private httpClientobj:HttpClient) {
    this.CustObj=new Customer();
   }
   public FetchData():void{
   
    this.apicontent = this.httpClientobj.get('https://localhost:44346/api/custapi/' + this.CustObj.CustomerId);
    this.apicontent.subscribe(content => {
      this.CustObj.CustomerId = content.CustomerId;
      this.CustObj.CustomerName = content.CustomerName;
      this.CustObj.CustomerEmail = content.CustomerEmail;
      this.CustObj.CustomerAddress = content.CustomerAddress;
      this.CustObj.CustomerGender = content.CustomerGender;
      this.CustObj.CustomerPassword = content.CustomerPassword;
      this.CustObj.CustomerContact = content.CustomerContact;
      this.CustObj.CustomerDOB = content.CustomerDOB;
    });
   }
   public UpdateData():void{
    this.httpClientobj.put("https://localhost:44346/api/custapi/", this.CustObj).pipe().subscribe();
    alert("Updated Successfully");

    this.CustObj=new Customer();

   }
   public logout():void{
    this.router.navigate(['/LogIn']);
  }
  ngOnInit(): void {
  }

}
