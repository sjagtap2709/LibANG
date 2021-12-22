import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Author } from '../author';
import { Book } from '../book';
import { Customer } from '../customer';
import { Publisher } from '../publisher';
import { Transaction } from '../transaction';

@Component({
  selector: 'app-view-records',
  templateUrl: './view-records.component.html',
  styleUrls: ['./view-records.component.css']
})
export class ViewRecordsComponent implements OnInit {

  public publishers!: Publisher[];
  public authors: Author[];
  public customers: Customer[];
  public transactions: Transaction[];
  public books: Book[];
  public apicontent!: Observable<any>;
  public cs: boolean;
  public bs: boolean;
  public a: boolean;
  public ps: boolean;
  public ts: boolean;
  public uts: boolean;
  public apistatus: boolean;
  public id!: number;
  constructor(private router: Router, private httpClientobj: HttpClient) {
    this.cs = false
    this.bs = false
    this.a = false
    this.ps = false;
    this.ts = false;
    this.uts = false;
    this.apistatus = false;
    this.publishers = [];
    this.authors = [];
    this.customers = [];
    this.books = [];
    this.transactions = [];


  }
  public Search(): void {
    this.customers = [];
    this.transactions = [];
    var url: string = "https://localhost:44346/api/CustAPI/" + this.id;
    this.apicontent = this.httpClientobj.get(url);
    this.apicontent.subscribe(content => {
      this.customers.push(content);
    });
    this.apicontent = this.httpClientobj.get('https://localhost:44346/api/UserAPI/' + this.id);
    this.apicontent.subscribe(content => {
      content.forEach((item: Transaction) => {
          this.transactions.push(item);
      });
    });

    this.ts = false
    this.uts = true
    this.cs = true;
    this.bs = false
    this.a = false
    this.ps = false;

  }
  public ViewCust(): void {
    this.customers = [];
    this.apicontent = this.httpClientobj.get('https://localhost:44346/api/CustAPI');
    this.apicontent.subscribe(content => {
      content.forEach((content: Customer) => {
        this.customers.push(content);
      });
    })
    this.ts = false;
    this.cs = true;
    this.bs = false;
    this.a = false;
    this.ps = false;
    this.uts = false;

  }
  public ViewBook(): void {
    this.books = [];
    this.apicontent = this.httpClientobj.get('https://localhost:44346/api/BookAPI');
    this.apicontent.subscribe(content => {
      content.forEach((content: Book) => {
        this.books.push(content);
      });
    })
    this.ts = false;
    this.cs = false;
    this.bs = true;
    this.a = false;
    this.uts = false;
    this.ps = false;
  }
  public ViewAuth(): void {
    this.authors = [];
    this.apicontent = this.httpClientobj.get('https://localhost:44346/api/AuthAPI');
    this.apicontent.subscribe(content => {
      content.forEach((content: Author) => {
        this.authors.push(content);
      });
    })
    this.ts = false;
    this.a = true;
    this.uts = false;
    this.cs = false;
    this.bs = false;
    this.ps = false;
  }
  public ViewPub(): void {
    this.publishers = [];
    this.apicontent = this.httpClientobj.get('https://localhost:44346/api/PubAPI');
    this.apicontent.subscribe(content => {
      content.forEach((content: Publisher) => {
        this.publishers.push(content);
      });
    })
    this.ps = true;
    this.cs = false;
    this.ts = false;
    this.uts = false;
    this.bs = false;
    this.a = false;
  }
  public ViewTrans(): void {
    this.apistatus=true;
    this.transactions = [];
    this.apicontent = this.httpClientobj.get('https://localhost:44346/api/TransAPI');
    this.apicontent.subscribe(content => {
      content.forEach((content: Transaction) => {
        this.transactions.push(content);
      });
    })
  
    // this.apistatus=false;
    this.ts = true;
    this.ps = false;
    this.uts = false;
    this.cs = false;
    this.bs = false;
    this.a = false;
  }
  public logout(): void {
    this.router.navigate(['/LogIn']);
  }
  ngOnInit(): void {
  }
}
