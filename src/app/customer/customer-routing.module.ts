import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomerHomepageComponent } from './customer-homepage/customer-homepage.component';


const customerRoutes: Routes = [
  { path: 'customers', component: CustomerHomepageComponent },
  { path: 'customer/:id', component: CustomerDetailComponent }
]

@NgModule({
  imports: [RouterModule.forChild(customerRoutes)],
  exports: [RouterModule]
})


export class CustomerRoutingModule { }
