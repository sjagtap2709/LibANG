"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AdminPageComponent = void 0;
var core_1 = require("@angular/core");
var book_1 = require("../book");
var customer_1 = require("../customer");
var transaction_1 = require("../transaction");
var AdminPageComponent = /** @class */ (function () {
    function AdminPageComponent(router, httpClientobj) {
        var _this = this;
        this.router = router;
        this.httpClientobj = httpClientobj;
        this.transObj = new transaction_1.Transaction();
        this.transObj1 = new transaction_1.Transaction();
        this.bookObj = new book_1.Book();
        this.customerObj = new customer_1.Customer();
        this.customerObj1 = new customer_1.Customer();
        this.bookArr = [];
        this.transObj1arr = [];
        this.apicontent = this.httpClientobj.get('https://localhost:44346/api/BookAPI');
        this.apicontent.subscribe(function (content) {
            content.forEach(function (content) {
                _this.bookArr.push(content);
            });
        });
    }
    AdminPageComponent.prototype.FetchCustomer = function () {
        var _this = this;
        if (this.transObj.CustomerID != null) {
            this.apicontent = this.httpClientobj.get('https://localhost:44346/api/CustAPI/' + this.transObj.CustomerID);
            this.apicontent.subscribe(function (content) {
                _this.customerObj = content;
            });
        }
        else {
            this.customerObj = new customer_1.Customer();
        }
    };
    AdminPageComponent.prototype.FetchCustomer1 = function () {
        var _this = this;
        if (this.customerObj1.CustomerId != null) {
            this.apicontent = this.httpClientobj.get('https://localhost:44346/api/CustAPI/' + this.customerObj1.CustomerId);
            this.apicontent.subscribe(function (content) {
                _this.customerObj1 = content;
            });
        }
        else {
            this.customerObj1 = new customer_1.Customer();
        }
        this.transObj1arr = [];
        this.apicontent = this.httpClientobj.get('https://localhost:44346/api/TransAPI/' + this.customerObj1.CustomerId);
        this.apicontent.subscribe(function (content) {
            content.forEach(function (content) {
                _this.transObj1arr.push(content);
            });
        });
    };
    AdminPageComponent.prototype.Transaction = function () {
        var _this = this;
        this.transObj1 = new transaction_1.Transaction();
        this.booksub == "";
        this.transObj1arr.forEach(function (element) {
            if (element.TransactionID == _this.tid) {
                _this.transObj1.BookIssueDate = element.BookIssueDate;
                _this.transObj1.TransactionID = element.TransactionID;
                _this.transObj1.CustomerID = element.CustomerID;
                _this.transObj1.BookId = element.BookId;
            }
        });
        this.apicontent = this.httpClientobj.get('https://localhost:44346/api/BookAPI/' + this.transObj1.BookId);
        this.apicontent.subscribe(function (content) {
            _this.booksub = content.BookName;
        });
    };
    AdminPageComponent.prototype.SubmitBook = function () {
        this.transObj1.BookSubmitDate = new Date();
        this.httpClientobj.put("https://localhost:44346/api/TransAPI/", this.transObj1).pipe().subscribe();
        alert("Book SUbmitted successfully");
        this.transObj1 = new transaction_1.Transaction();
        this.customerObj1 = new customer_1.Customer();
        this.booksub = "";
    };
    AdminPageComponent.prototype.IssueBook = function () {
        this.transObj.BookIssueDate = new Date();
        this.transObj.TransactionStatus = "Issued";
        this.httpClientobj.post("https://localhost:44346/api/TransAPI/", this.transObj).pipe().subscribe();
        alert("Data added successfully");
        this.transObj = new transaction_1.Transaction();
        this.customerObj = new customer_1.Customer();
    };
    AdminPageComponent.prototype.logout = function () {
        this.router.navigate(['/LogIn']);
    };
    AdminPageComponent.prototype.ngOnInit = function () {
    };
    AdminPageComponent = __decorate([
        core_1.Component({
            selector: 'app-admin-page',
            templateUrl: './admin-page.component.html',
            styleUrls: ['./admin-page.component.css']
        })
    ], AdminPageComponent);
    return AdminPageComponent;
}());
exports.AdminPageComponent = AdminPageComponent;
