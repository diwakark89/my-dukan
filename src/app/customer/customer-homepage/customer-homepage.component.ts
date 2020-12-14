import { Component, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators'
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';


@Component({
  selector: 'app-customer-homepage',
  templateUrl: './customer-homepage.component.html',
  styleUrls: ['./customer-homepage.component.css']
})
export class CustomerHomepageComponent implements OnInit {
  customers: Customer[];

  customers$: Observable<Customer[]>;
  selectedId: number;

  constructor(
    private customerService:CustomerService, 
    private route:ActivatedRoute) { }


    
  ngOnInit() {
    this.customers$ = this.route.paramMap.pipe(
      switchMap(params => {
        // (+) before `params.get()` turns the string into a number
        this.selectedId = +params.get('id');
        return this.customerService.getCustomers();
      })
    );
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