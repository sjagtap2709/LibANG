import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Author } from '../author';
import { Book } from '../book';
import { Publisher } from '../publisher';

@Component({
  selector: 'app-add-details',
  templateUrl: './add-details.component.html',
  styleUrls: ['./add-details.component.css']
})
export class AddDetailsComponent implements OnInit {

  public bookObj!: Book;
  public authObj!: Author;
  public pubObj!: Publisher;
  public authname!: string;
  public pubname!: string;
  public publishers!: Publisher[];
  public authors!: Author[];
  public bkid: number | undefined;
  public apicontent: Observable<any>;


  constructor(private router: Router, private httpClientobj: HttpClient) {
    this.bookObj = new Book();
    this.authObj = new Author();
    this.pubObj = new Publisher();
    this.publishers = [];
    this.authors = [];

    this.apicontent = this.httpClientobj.get('https://localhost:44346/api/PubAPI');
    this.apicontent.subscribe(content => {
      content.forEach((content: Publisher) => {
        this.publishers.push(content);
      });
    })

    this.apicontent = this.httpClientobj.get('https://localhost:44346/api/AuthAPI');
    this.apicontent.subscribe(content => {
      content.forEach((content: Author) => {
        this.authors.push(content);
      });
    })
  }
  public AddBook(): void {
    if (this.bookObj.BookName != undefined && this.bookObj.BookAuthorId != undefined && this.bookObj.BookPublisherId != undefined && this.bookObj.BookCatagory != undefined && this.bookObj.NoofCopies != undefined && this.bookObj.BookPrice != undefined) {
      this.httpClientobj.post<Book>("https://localhost:44346/api/BookAPI/", this.bookObj).pipe().subscribe();
      alert("Data added successfully");
      this.bookObj = new Book();
    }
    else {
      alert("Please Fill All Fields")
    }
  }
  public FetchBooks(): void {
    if (this.bkid != null) {
      this.apicontent = this.httpClientobj.get("https://localhost:44346/api/BookAPI/" + this.bkid);
      this.apicontent.subscribe(content => {
        this.bookObj = content;
      });
    }
    else {
      this.bookObj = new Book();
    }
  }
  public UpdateBook(): void {
    this.httpClientobj.put("https://localhost:44346/api/BookAPI/", this.bookObj).pipe().subscribe();
    alert("Updated Successfully");
    this.bookObj = new Book();
    this.bkid = undefined;
  }
  public DeleteBook(): void {
    this.httpClientobj.delete("https://localhost:44346/api/BookAPI/" + this.bkid).pipe().subscribe();
    alert("Deleted Succesfully");
    this.bkid = undefined;
  }
  public AddPublisher(): void {
    if (this.pubObj.PublisherName != undefined && this.pubObj.PublisherId != undefined && this.pubObj.ContactInfo != undefined && this.pubObj.NoofBooksPublished != undefined && this.pubObj.City != undefined) {
      this.httpClientobj.post<Publisher>("https://localhost:44346/api/PubAPI/", this.pubObj).pipe().subscribe();
      alert("Data added successfully");
      this.pubObj = new Publisher();
    }
    else {
      alert("Please Fill All Fields")
    }
  }
  public FetchPublishers(): void {
    if (this.pubObj.PublisherId != null) {
      this.apicontent = this.httpClientobj.get("https://localhost:44346/api/PubAPI/" + this.pubObj.PublisherId);
      this.apicontent.subscribe(content => {
        this.pubObj.PublisherId = content.PublisherId;
        this.pubObj.PublisherName = content.PublisherName;
        this.pubObj.NoofBooksPublished = content.NoofBooksPublished;
        this.pubObj.ContactInfo = content.ContactInfo;
        this.pubObj.City = content.City;
      });
    }
    else {
      this.pubObj = new Publisher();
    }
  }
  public UpdatePublisher(): void {
    this.httpClientobj.put("https://localhost:44346/api/PubAPI/", this.pubObj).pipe().subscribe();
    alert("Updated Successfully");
    this.pubObj = new Publisher();
  }
  public DeletePublisher(): void {
    this.httpClientobj.delete("https://localhost:44346/api/PubAPI/" + this.pubObj.PublisherId).pipe().subscribe();
    alert("Deleted Succesfully");
    this.pubObj = new Publisher();
  }
  public AddAuthor(): void {
    if (this.authObj.AuthorId != undefined && this.authObj.AuthorName != undefined && this.authObj.AuthorCity != undefined && this.authObj.AuthorContact != undefined && this.authObj.AuthorMailId != undefined && this.authObj.NoofBooksWritten != undefined) {
      this.httpClientobj.post<Author>("https://localhost:44346/api/AuthAPI/", this.authObj).pipe().subscribe();
      alert("Data added successfully");
      this.authObj = new Author();
    }
    else {
      alert("Please Fill All Fields")
    }
  }
  public FetchAuthors(): void {
    if (this.authObj.AuthorId != null) {
      this.apicontent = this.httpClientobj.get("https://localhost:44346/api/AuthAPI/" + this.authObj.AuthorId);
      this.apicontent.subscribe(content => {
        this.authObj.AuthorId = content.AuthorId;
        this.authObj.AuthorName = content.AuthorName;
        this.authObj.AuthorMailId = content.AuthorMailId;
        this.authObj.AuthorContact = content.AuthorContact;
        this.authObj.NoofBooksWritten = content.NoofBooksWritten;
        this.authObj.AuthorCity = content.AuthorCity;
      });
    }
    else {
      this.authObj = new Author();
    }
  }
  public UpdateAuthor(): void {
    this.httpClientobj.put("https://localhost:44346/api/AuthAPI/", this.authObj).pipe().subscribe();
    alert("Updated Successfully");
    this.authObj = new Author();
  }
  public DeleteAuthor(): void {
    this.httpClientobj.delete("https://localhost:44346/api/AuthAPI/" + this.authObj.AuthorId).pipe().subscribe();
    alert("Deleted Succesfully");
    this.authObj = new Author();
  }
  public logout(): void {
    this.router.navigate(['/LogIn']);
  }
  ngOnInit(): void {

  }
}
