import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from '../customer';

@Component({
  selector: 'app-customer-registration',
  templateUrl: './customer-registration.component.html',
  styleUrls: ['./customer-registration.component.css']
})
export class CustomerRegistrationComponent implements OnInit {
  public CustObj: Customer
  public pwd!: string
  public pass!: string
  public gdr!: string
  public errormsg!: string
  public custid!: number;
  public apicontent!: Observable<any>
  public passcheckstatus:boolean
  constructor(private router: Router, private httpClientobj: HttpClient) {
    this.passcheckstatus=false;
    this.CustObj = new Customer();

  }
  public checkPassword(): void {
    if (!(this.pwd == this.pass)) {
      this.errormsg = "**Both Passwords dont match"
      this.passcheckstatus=false;
    }
    else {
      this.passcheckstatus=true;
      this.errormsg = ""
    }
  }
  public AddData(): void {
    if (this.passcheckstatus) {
      
      this.CustObj.CustomerId = undefined;
      this.httpClientobj.post<Customer>("https://localhost:44346/api/custapi/", this.CustObj).pipe().subscribe();
      alert("Data added successfully");
      this.CustObj = new Customer();
      this.apicontent = this.httpClientobj.get('https://localhost:44346/api/custapi');
      this.apicontent.subscribe(content => {
        
        this.custid = content[content.length - 1].CustomerId;
        alert("Your customerId is : " + this.custid)
      })
      this.pwd = "";
      this.router.navigate(['/LogIn']);
    }
    else{
      alert("Both Passwords dont match");
      this.pwd = "";
      this.pass="";
    }
  }
  public back():void{
    this.router.navigate(['/LogIn']);
  }

  ngOnInit(): void {
  }

}
