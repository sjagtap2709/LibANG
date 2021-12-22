import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  public event!: Event;
  public userid!: number;
  public password!: string;
  static loginuserid:number;
  public apicontent!: Observable<any>
  constructor(private router: Router, private httpClientobj: HttpClient) {
    
  }
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
  public loginadmin(): void {
   
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title: 'Signed in successfully'
    })
    if (this.userid == 9999 && this.password == "12345") {
      //alert("Admin LogIn")
      Swal.fire(
        'Logged in successfully',
        '',
        'success'
      )
      
      this.router.navigate(['/Admin']);
    }
    else {
      //alert("Invalid Credential")
      Swal.fire(
        'Log in Failed',
        '',
        'error'
      )
    }
  }
  public loginuser(): void {
    this.apicontent = this.httpClientobj.get('https://localhost:44346/api/custapi/' + this.userid);
    this.apicontent.subscribe(content => {
      if (this.password == content.CustomerPassword) {
        alert("User LogIn")
        LoginPageComponent.loginuserid=this.userid
        this.router.navigate(['/User']);
      }
      else {
        alert("Invalid Credential")
      }
    });

  }
  adduser():void{
    this.router.navigate(['/CustomerRegistration']);
  }
  ngOnInit(): void {
    
  }

}
