"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UpdateCustomerComponent = void 0;
var core_1 = require("@angular/core");
var customer_1 = require("../customer");
var UpdateCustomerComponent = /** @class */ (function () {
    function UpdateCustomerComponent(router, httpClientobj) {
        this.router = router;
        this.httpClientobj = httpClientobj;
        this.CustObj = new customer_1.Customer();
    }
    UpdateCustomerComponent.prototype.FetchData = function () {
        var _this = this;
        this.apicontent = this.httpClientobj.get('https://localhost:44346/api/custapi/' + this.CustObj.CustomerId);
        this.apicontent.subscribe(function (content) {
            _this.CustObj.CustomerId = content.CustomerId;
            _this.CustObj.CustomerName = content.CustomerName;
            _this.CustObj.CustomerEmail = content.CustomerEmail;
            _this.CustObj.CustomerAddress = content.CustomerAddress;
            _this.CustObj.CustomerGender = content.CustomerGender;
            _this.CustObj.CustomerPassword = content.CustomerPassword;
            _this.CustObj.CustomerContact = content.CustomerContact;
            _this.CustObj.CustomerDOB = content.CustomerDOB;
        });
    };
    UpdateCustomerComponent.prototype.UpdateData = function () {
        this.httpClientobj.put("https://localhost:44346/api/custapi/", this.CustObj).pipe().subscribe();
        alert("Updated Successfully");
        this.CustObj = new customer_1.Customer();
    };
    UpdateCustomerComponent.prototype.logout = function () {
        this.router.navigate(['/LogIn']);
    };
    UpdateCustomerComponent.prototype.ngOnInit = function () {
    };
    UpdateCustomerComponent = __decorate([
        core_1.Component({
            selector: 'app-update-customer',
            templateUrl: './update-customer.component.html',
            styleUrls: ['./update-customer.component.css']
        })
    ], UpdateCustomerComponent);
    return UpdateCustomerComponent;
}());
exports.UpdateCustomerComponent = UpdateCustomerComponent;
