import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerSearchComponent } from './customer/customer-search/customer-search.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CustomerModule } from './customer/customer.module';
import { CrisisCenterComponent } from './crisis-center/crisis-center/crisis-center.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    CustomerModule,
    AppRoutingModule
  ],
  
  declarations: [
    AppComponent,
    MessagesComponent,
    DashboardComponent,
    CustomerSearchComponent,
    CrisisCenterComponent,
    PageNotFoundComponent
  ],
 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
