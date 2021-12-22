import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer';

@Component({
  selector: 'app-delete-customer',
  templateUrl: './delete-customer.component.html',
  styleUrls: ['./delete-customer.component.css']
})
export class DeleteCustomerComponent implements OnInit {
  public custId:number |undefined;
  constructor(private httpobj:HttpClient) { }

  public DeleteCustomer(){
    this.httpobj.delete("https://localhost:44346/api/custapi/" + this.custId).pipe().subscribe();
     alert("Deleted Succesfully");
     this.custId=undefined;
  }

  ngOnInit(): void {
  }

}
