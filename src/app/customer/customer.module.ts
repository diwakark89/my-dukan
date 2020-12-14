import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { FormsModule } from '@angular/forms';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomerSearchComponent } from './customer-search/customer-search.component';
import { CustomerHomepageComponent } from './customer-homepage/customer-homepage.component';
import { CustomerRecordComponent } from './customer-record/customer-record.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';

@NgModule({
  declarations: [
    CustomerHomepageComponent,
    CustomerDetailComponent,
    CustomerSearchComponent,
    CustomerRecordComponent,
    CustomerAddComponent

  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule
  ]
})
export class CustomerModule { }
