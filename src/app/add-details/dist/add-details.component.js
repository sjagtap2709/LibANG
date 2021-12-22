"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AddDetailsComponent = void 0;
var core_1 = require("@angular/core");
var author_1 = require("../author");
var book_1 = require("../book");
var publisher_1 = require("../publisher");
var AddDetailsComponent = /** @class */ (function () {
    function AddDetailsComponent(router, httpClientobj) {
        var _this = this;
        this.router = router;
        this.httpClientobj = httpClientobj;
        this.bookObj = new book_1.Book();
        this.authObj = new author_1.Author();
        this.pubObj = new publisher_1.Publisher();
        this.publishers = [];
        this.authors = [];
        this.apicontent = this.httpClientobj.get('https://localhost:44346/api/PubAPI');
        this.apicontent.subscribe(function (content) {
            content.forEach(function (content) {
                _this.publishers.push(content);
            });
        });
        this.apicontent = this.httpClientobj.get('https://localhost:44346/api/AuthAPI');
        this.apicontent.subscribe(function (content) {
            content.forEach(function (content) {
                _this.authors.push(content);
            });
        });
    }
    AddDetailsComponent.prototype.AddBook = function () {
        if (this.bookObj.BookName != undefined && this.bookObj.BookAuthorId != undefined && this.bookObj.BookPublisherId != undefined && this.bookObj.BookCatagory != undefined && this.bookObj.NoofCopies != undefined && this.bookObj.BookPrice != undefined) {
            this.httpClientobj.post("https://localhost:44346/api/BookAPI/", this.bookObj).pipe().subscribe();
            alert("Data added successfully");
            this.bookObj = new book_1.Book();
        }
        else {
            alert("Please Fill All Fields");
        }
    };
    AddDetailsComponent.prototype.FetchBooks = function () {
        var _this = this;
        if (this.bkid != null) {
            this.apicontent = this.httpClientobj.get("https://localhost:44346/api/BookAPI/" + this.bkid);
            this.apicontent.subscribe(function (content) {
                _this.bookObj.BookId = content.BookId;
                _this.bookObj.BookName = content.BookName;
                _this.bookObj.BookPublisherId = content.BookPublisherId;
                _this.bookObj.BookAuthorId = content.BookAuthorId;
                _this.bookObj.NoofCopies = content.NoofCopies;
                _this.bookObj.BookCatagory = content.BookCatagory;
                _this.bookObj.BookPrice = content.BookPrice;
            });
        }
        else {
            this.bookObj = new book_1.Book();
        }
    };
    AddDetailsComponent.prototype.UpdateBook = function () {
        this.httpClientobj.put("https://localhost:44346/api/BookAPI/", this.bookObj).pipe().subscribe();
        alert("Updated Successfully");
        this.bookObj = new book_1.Book();
        this.bkid = undefined;
    };
    AddDetailsComponent.prototype.DeleteBook = function () {
        this.httpClientobj["delete"]("https://localhost:44346/api/BookAPI/" + this.bkid).pipe().subscribe();
        alert("Deleted Succesfully");
        this.bkid = undefined;
    };
    AddDetailsComponent.prototype.AddPublisher = function () {
        if (this.pubObj.PublisherName != undefined && this.pubObj.PublisherId != undefined && this.pubObj.ContactInfo != undefined && this.pubObj.NoofBooksPublished != undefined && this.pubObj.City != undefined) {
            this.httpClientobj.post("https://localhost:44346/api/PubAPI/", this.pubObj).pipe().subscribe();
            alert("Data added successfully");
            this.pubObj = new publisher_1.Publisher();
        }
        else {
            alert("Please Fill All Fields");
        }
    };
    AddDetailsComponent.prototype.FetchPublishers = function () {
        var _this = this;
        if (this.pubObj.PublisherId != null) {
            this.apicontent = this.httpClientobj.get("https://localhost:44346/api/PubAPI/" + this.pubObj.PublisherId);
            this.apicontent.subscribe(function (content) {
                _this.pubObj = content;
            });
        }
        else {
            this.pubObj = new publisher_1.Publisher();
        }
    };
    AddDetailsComponent.prototype.UpdatePublisher = function () {
        this.httpClientobj.put("https://localhost:44346/api/PubAPI/", this.pubObj).pipe().subscribe();
        alert("Updated Successfully");
        this.pubObj = new publisher_1.Publisher();
    };
    AddDetailsComponent.prototype.DeletePublisher = function () {
        this.httpClientobj["delete"]("https://localhost:44346/api/PubAPI/" + this.pubObj.PublisherId).pipe().subscribe();
        alert("Deleted Succesfully");
        this.pubObj = new publisher_1.Publisher();
    };
    AddDetailsComponent.prototype.AddAuthor = function () {
        if (this.authObj.AuthorId != undefined && this.authObj.AuthorName != undefined && this.authObj.AuthorCity != undefined && this.authObj.AuthorContact != undefined && this.authObj.AuthorMailId != undefined && this.authObj.NoofBooksWritten != undefined) {
            this.httpClientobj.post("https://localhost:44346/api/AuthAPI/", this.authObj).pipe().subscribe();
            alert("Data added successfully");
            this.authObj = new author_1.Author();
        }
        else {
            alert("Please Fill All Fields");
        }
    };
    AddDetailsComponent.prototype.FetchAuthors = function () {
        var _this = this;
        if (this.authObj.AuthorId != null) {
            this.apicontent = this.httpClientobj.get("https://localhost:44346/api/AuthAPI/" + this.authObj.AuthorId);
            this.apicontent.subscribe(function (content) {
                _this.authObj = content;
            });
        }
        else {
            this.authObj = new author_1.Author();
        }
    };
    AddDetailsComponent.prototype.UpdateAuthor = function () {
        this.httpClientobj.put("https://localhost:44346/api/AuthAPI/", this.authObj).pipe().subscribe();
        alert("Updated Successfully");
        this.authObj = new author_1.Author();
    };
    AddDetailsComponent.prototype.DeleteAuthor = function () {
        this.httpClientobj["delete"]("https://localhost:44346/api/AuthAPI/" + this.authObj.AuthorId).pipe().subscribe();
        alert("Deleted Succesfully");
        this.authObj = new author_1.Author();
    };
    AddDetailsComponent.prototype.logout = function () {
        this.router.navigate(['/LogIn']);
    };
    AddDetailsComponent.prototype.ngOnInit = function () {
    };
    AddDetailsComponent = __decorate([
        core_1.Component({
            selector: 'app-add-details',
            templateUrl: './add-details.component.html',
            styleUrls: ['./add-details.component.css']
        })
    ], AddDetailsComponent);
    return AddDetailsComponent;
}());
exports.AddDetailsComponent = AddDetailsComponent;
