import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from '../customer';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  public CustObj: Customer
  public pwd!: string
  public pass!: string
  public gdr!: string
  public errormsg!: string
  public custid!: number;
  public apicontent!: Observable<any>
  public passcheckstatus:boolean
  public fieldsCheck:boolean
  constructor(private router: Router, private httpClientobj: HttpClient) {
    this.passcheckstatus=false;
    this.fieldsCheck=false;
    this.CustObj = new Customer();

  }
  public checkPassword(): void {
    if (!(this.pwd == this.pass)) {
      this.errormsg = "Both Passwords dont match"
      this.passcheckstatus=false;
    }
    else {
      this.passcheckstatus=true;
      this.errormsg = ""
    }
  }
  public AddData(): void {
    this.fieldsCheck=this.CustObj.CustomerAddress!=undefined&&this.CustObj.CustomerContact!=undefined&&this.CustObj.CustomerDOB!=undefined&&this.CustObj.CustomerEmail!=undefined&&this.CustObj.CustomerGender!=undefined&&this.CustObj.CustomerName!=undefined&&this.CustObj.CustomerPassword!=undefined;   
    if (this.passcheckstatus&&this.fieldsCheck) {
    this.CustObj.CustomerId = undefined;
    this.httpClientobj.post<Customer>("https://localhost:44346/api/custapi/", this.CustObj).pipe().subscribe();
    alert("Data added successfully");
    this.CustObj = new Customer();
    this.apicontent = this.httpClientobj.get('https://localhost:44346/api/custapi');
    this.apicontent.subscribe(content => {
      this.custid = content[content.length - 1].CustomerId;
      alert("your cust id" + this.custid)
    })
    this.pwd = "";}
    else if(!this.fieldsCheck){
      alert("All fields are required")
    }
    else{
      alert("Both Passwords dont match");
      this.pwd = "";
      this.pass="";
    }
  }
  public logout(): void {
    this.router.navigate(['/LogIn']);
  }
  ngOnInit(): void {

  }
}


