"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginPageComponent = void 0;
var core_1 = require("@angular/core");
var sweetalert2_1 = require("sweetalert2");
var LoginPageComponent = /** @class */ (function () {
    function LoginPageComponent(router, httpClientobj) {
        this.router = router;
        this.httpClientobj = httpClientobj;
    }
    LoginPageComponent_1 = LoginPageComponent;
    // public validate(){
    //    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    //   if (form.checkValidity() === false) {
    //     this.event.stopPropagation();
    //   }
    //   form.classList.add('was-validated');
    //   if (this.userid == 9999 && this.password == "12345") {
    //     alert("Admin LogIn")
    //     this.router.navigate(['/Admin']);
    //   }
    //   else {
    //     alert("Invalid Credential")
    //   }
    //   alert("hi")
    // }
    LoginPageComponent.prototype.loginadmin = function () {
        var Toast = sweetalert2_1["default"].mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: function (toast) {
                toast.addEventListener('mouseenter', sweetalert2_1["default"].stopTimer);
                toast.addEventListener('mouseleave', sweetalert2_1["default"].resumeTimer);
            }
        });
        Toast.fire({
            icon: 'success',
            title: 'Signed in successfully'
        });
        if (this.userid == 9999 && this.password == "12345") {
            //alert("Admin LogIn")
            sweetalert2_1["default"].fire('Logged in successfully', '', 'success');
            this.router.navigate(['/Admin']);
        }
        else {
            //alert("Invalid Credential")
            sweetalert2_1["default"].fire('Log in Failed', '', 'error');
        }
    };
    LoginPageComponent.prototype.loginuser = function () {
        var _this = this;
        this.apicontent = this.httpClientobj.get('https://localhost:44346/api/custapi/' + this.userid);
        this.apicontent.subscribe(function (content) {
            if (_this.password == content.CustomerPassword) {
                alert("User LogIn");
                LoginPageComponent_1.loginuserid = _this.userid;
                _this.router.navigate(['/User']);
            }
            else {
                alert("Invalid Credential");
            }
        });
    };
    LoginPageComponent.prototype.adduser = function () {
        this.router.navigate(['/CustomerRegistration']);
    };
    LoginPageComponent.prototype.ngOnInit = function () {
    };
    var LoginPageComponent_1;
    LoginPageComponent = LoginPageComponent_1 = __decorate([
        core_1.Component({
            selector: 'app-login-page',
            templateUrl: './login-page.component.html',
            styleUrls: ['./login-page.component.css']
        })
    ], LoginPageComponent);
    return LoginPageComponent;
}());
exports.LoginPageComponent = LoginPageComponent;
