import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomerHomepageComponent } from './customer-homepage/customer-homepage.component';


const customerRoutes: Routes = [
  { path: 'customers', component: CustomerHomepageComponent, data: { animation: 'customers' } },
  { path: 'customer/:id', component: CustomerDetailComponent,data: { animation: 'customer' }  }
]

@NgModule({
  imports: [RouterModule.forChild(customerRoutes)],
  exports: [RouterModule]
})


export class CustomerRoutingModule { }
