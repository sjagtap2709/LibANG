import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from '../customer';
import { Transaction } from '../transaction';
import { LoginPageComponent } from '../login-page/login-page.component';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  public CustObj: Customer;
  public ba!: boolean;
  public bn!: boolean;
  public transactions: Transaction[];
  public transObj: Transaction;
  public apicontent: Observable<any>;
  constructor(private router: Router, private httpClientobj: HttpClient) {
    this.transObj=new Transaction;
    this.CustObj = new Customer();
    this.bn = true;
    this.transactions = [];
    this.apicontent = this.httpClientobj.get('https://localhost:44346/api/custapi/' + LoginPageComponent.loginuserid);
    this.apicontent.subscribe(content => {
      this.CustObj = content
    });
    this.apicontent = this.httpClientobj.get('https://localhost:44346/api/UserAPI/' + LoginPageComponent.loginuserid);
    this.apicontent.subscribe(content => {
      content.forEach((item: Transaction) => {
        if (item.TransactionStatus== "Issued") {    
          this.transactions.push(item);
        }
      });
      if (this.transactions.length > 0) {
      
          this.ba = true;
          this.bn = false;
        }
        else {
         
          this.ba = false;
          this.bn = true;
        }
    })
   
  }
  SubmitBook(id: number): void {
   
   this.transactions.forEach(element => {
     if(element.TransactionID==id){
       this.transObj=element
     }
   });
   this.transObj.BookSubmitDate = new Date();
    this.httpClientobj.put<Transaction>("https://localhost:44346/api/TransAPI/", this.transObj).pipe().subscribe();
    alert("Book Submitted successfully");
    this.transObj = new Transaction();
    this.reloadCurrentRoute();
  }
  public logout(): void {
    this.router.navigate(['/LogIn']);
  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
        console.log(currentUrl);
    });
  }
  ngOnInit(): void {

  }


}
