import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from '../customer';
import { LoginPageComponent } from '../login-page/login-page.component';
import { Transaction } from '../transaction';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  public CustObj: Customer;
  public transactions: Transaction[];
  public apicontent: Observable<any>
  constructor(private router: Router, private httpClientobj: HttpClient) {
    this.CustObj=new Customer();
    this.transactions = [];
    this.apicontent = this.httpClientobj.get('https://localhost:44346/api/custapi/' + LoginPageComponent.loginuserid);
    this.apicontent.subscribe(content => {
      this.CustObj = content
    });
    this.apicontent = this.httpClientobj.get('https://localhost:44346/api/UserAPI/' + LoginPageComponent.loginuserid);
    this.apicontent.subscribe(content => {
      content.forEach((item: Transaction) => {
          this.transactions.push(item);
      });
    });
  }

  public logout(): void {
    this.router.navigate(['/LogIn']);

  }
  ngOnInit(): void {
  }

}
