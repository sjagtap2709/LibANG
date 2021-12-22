import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from '../customer';
import { LoginPageComponent } from '../login-page/login-page.component';
import { Transaction } from '../transaction';
@Component({
  selector: 'app-issue-book',
  templateUrl: './issue-book.component.html',
  styleUrls: ['./issue-book.component.css']
})
export class IssueBookComponent implements OnInit {
  public CustObj: Customer;
  public books: Transaction[];
  public apicontent: Observable<any>
  public transObj: Transaction;
  constructor(private router: Router, private httpClientobj: HttpClient) {
    this.CustObj=new Customer();
    this.transObj=new Transaction();
    this.books = [];
    this.apicontent = this.httpClientobj.get('https://localhost:44346/api/custapi/' + LoginPageComponent.loginuserid);
    this.apicontent.subscribe(content => {
      this.CustObj = content
    });
    this.apicontent = this.httpClientobj.get('https://localhost:44346/api/UserAPI/');
    this.apicontent.subscribe(content => {
      content.forEach((item: Transaction) => {
          this.books.push(item);
      });
    });
  }

  public IssueBook(id :number):void{
    this.transObj.BookIssueDate = new Date();
    this.transObj.TransactionStatus = "Issued";
    this.transObj.BookId = id;
    this.transObj.CustomerID =LoginPageComponent.loginuserid ;
    this.httpClientobj.post<Transaction>("https://localhost:44346/api/TransAPI/", this.transObj).pipe().subscribe();
    alert("Book Issued successfully");
    this.transObj = new Transaction();
    
  }
  

  public logout(): void {
    this.router.navigate(['/LogIn']); 
  }
  ngOnInit(): void {
  }

}
