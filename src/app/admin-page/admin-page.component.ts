import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Book } from '../book';
import { Customer } from '../customer';
import { Transaction } from '../transaction';
@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  public bookObj: Book;
  public booksub!: string;
  public bookArr: Book[];
  public transObj1arr: Transaction[];
  public transObj: Transaction
  public transObj1: Transaction
  public apicontent: Observable<any>
  public customerObj: Customer;
  public customerObj1: Customer;
 public tid!: number;
 
  constructor(private router: Router,private httpClientobj: HttpClient) {
    this.transObj = new Transaction();
    this.transObj1 = new Transaction();
    this.bookObj = new Book();
    this.customerObj = new Customer();
    this.customerObj1 = new Customer();
    this.bookArr = []
    this.transObj1arr = []

    this.apicontent = this.httpClientobj.get('https://localhost:44346/api/BookAPI');
    this.apicontent.subscribe(content => {
      content.forEach((content: Book) => {
        if (content.NoofCopies>0) {
          this.bookArr.push(content);
        }
      });
    });
  }
  public FetchCustomer(): void {
    if (this.transObj.CustomerID != null) {
      this.apicontent = this.httpClientobj.get('https://localhost:44346/api/CustAPI/' + this.transObj.CustomerID);
      this.apicontent.subscribe(content => {
        this.customerObj = content;
      });
    }
    else {
      this.customerObj = new Customer();
    }
  }
  public FetchCustomer1(): void {
    if (this.customerObj1.CustomerId != null) {
      this.apicontent = this.httpClientobj.get('https://localhost:44346/api/CustAPI/' + this.customerObj1.CustomerId);
      this.apicontent.subscribe(content => {
        this.customerObj1 = content;
      });
    }
    else {
      this.customerObj1 = new Customer();
    }
    this.transObj1arr = []
    this.apicontent = this.httpClientobj.get('https://localhost:44346/api/TransAPI/' + this.customerObj1.CustomerId);
    this.apicontent.subscribe(content => {
      content.forEach((content: Transaction) => {
        this.transObj1arr.push(content);
      });
    });
  }
  public Transaction(): void {
    this.transObj1= new Transaction();
    this.booksub ==""
    this.transObj1arr.forEach(element => {
      if (element.TransactionID == this.tid) {
        this.transObj1.BookIssueDate = element.BookIssueDate;
        this.transObj1.TransactionID = element.TransactionID;
        this.transObj1.CustomerID = element.CustomerID;
        this.transObj1.BookId = element.BookId;
      }
    });
    this.apicontent = this.httpClientobj.get('https://localhost:44346/api/BookAPI/' + this.transObj1.BookId);
    this.apicontent.subscribe(content => {
      this.booksub = content.BookName;
    });
  }
  public SubmitBook(): void {

    this.transObj1.BookSubmitDate = new Date();
    this.httpClientobj.put<Transaction>("https://localhost:44346/api/TransAPI/", this.transObj1).pipe().subscribe();
    alert("Book SUbmitted successfully");
    this.transObj1 = new Transaction();
    this.customerObj1 = new Customer();
    this.booksub = "";
  }
  public IssueBook(): void {
    this.transObj.BookIssueDate = new Date();
    this.transObj.TransactionStatus = "Issued";
    this.httpClientobj.post<Transaction>("https://localhost:44346/api/TransAPI/", this.transObj).pipe().subscribe();
    alert("Data added successfully");
    this.transObj = new Transaction();
    this.customerObj = new Customer();
  }
  public logout():void{
    this.router.navigate(['/LogIn']);
  }
  ngOnInit(): void {
  }

}
