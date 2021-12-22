import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from '../customer';
import { LoginPageComponent } from '../login-page/login-page.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  public CustObj:Customer;
  public apicontent!:Observable<any>
  constructor(private router:Router, private httpClientobj:HttpClient) {
    this.CustObj=new Customer();
    
    this.apicontent = this.httpClientobj.get('https://localhost:44346/api/custapi/' + LoginPageComponent.loginuserid) ;
    this.apicontent.subscribe(content => {
      this.CustObj = content
    });
   }
   
   public UpdateData():void{
    this.httpClientobj.put("https://localhost:44346/api/custapi/", this.CustObj).pipe().subscribe();
    alert("Updated Successfully");

    

   }
   public logout():void{
    this.router.navigate(['/LogIn']);
  }
  
  ngOnInit(): void {
  }

}
