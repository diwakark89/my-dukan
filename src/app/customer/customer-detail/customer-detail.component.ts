import { from } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import {  Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';

import {Customer} from '../customer';
import {CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

   customer: Customer;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
    private location: Location) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    // this.customer$ = this.customerService.getCustomer(id);
    this.getCustomer(id);
  }

  getCustomer(id :number):void{
   
    
    this.customerService.getCustomer(id)
    .subscribe(customer=>this.customer=customer);

    // this.hero$ = this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) =>
    //     this.customerService.getCustomer(params.get('id')))
    // );

  }

  gotoCustomers(): void {
    const customerId = this.customer ? this.customer.id : null;
    // Pass along the hero id if available
    // so that the HeroList component can select that hero.
    // Include a junk 'foo' property for fun.
    this.router.navigate(['/customers', { id: customerId, foo: 'foo' }]);
  }
  
  save(): void {
    this.customerService.updateCustomer(this.customer)
      .subscribe(() => this.gotoCustomers());
  }
 
}
