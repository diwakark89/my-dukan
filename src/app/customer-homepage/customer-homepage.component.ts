import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { Customer } from '../customer';
import {CustomerService} from '../customer.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-customer-homepage',
  templateUrl: './customer-homepage.component.html',
  styleUrls: ['./customer-homepage.component.css']
})
export class CustomerHomepageComponent implements OnInit {
 
  customers: Customer[];

  constructor(private customerService:CustomerService, private messageService: MessageService) { }

  ngOnInit() {
    this.getCustomers();
  }

  getCustomers():void{
    this.customerService.getCustomers()
    .subscribe(customers=>this.customers=customers);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.customerService.addCustomer({ name } as Customer)
      .subscribe(customer => {
        this.customers.push(customer);
      });
  }

  delete(customer: Customer): void {
    this.customers = this.customers.filter(h => h !== customer);
    this.customerService.deleteCustomer(customer).subscribe();
  }

}
