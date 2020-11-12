import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomerHomepageComponent } from './customer-homepage/customer-homepage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: CustomerDetailComponent },
  { path: 'customers', component: CustomerHomepageComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }