import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { MessageService } from 'src/app/message.service';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';


@Component({
  selector: 'app-customer-homepage',
  templateUrl: './customer-homepage.component.html',
  styleUrls: ['./customer-homepage.component.css']
})
export class CustomerHomepageComponent implements OnInit {
  customers: Customer[];

  constructor(private customerService:CustomerService, 
    private messageService: MessageService) { }

  ngOnInit() {
    this.getCustomers();
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.customerService.addCustomer({ name } as Customer)
      .subscribe(customer => {
        this.customers.push(customer);
      });
  }

  getCustomers():void{
    this.customerService.getCustomers()
    .subscribe(customers=>this.customers=customers);
  }

   delete(customer: Customer): void {
    this.customers = this.customers.filter(h => h !== customer);
    this.customerService.deleteCustomer(customer).subscribe();
  }

}
