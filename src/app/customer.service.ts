import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Customer } from './customer';
import { CUSTOMERS } from './mock-customer';
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {


  private customersUrl = 'api/customers';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** PUT: update the hero on the server */
  updateCustomer(customer: Customer): Observable<any> {
    return this.http.put(this.customersUrl, customer, this.httpOptions).pipe(
      tap(_ => this.log(`updated customer id=${customer.id}`)),
      catchError(this.handleError<any>('updateCustomer'))
    );
  }

  /** POST: add a new hero to the server */
  addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.customersUrl, customer, this.httpOptions).pipe(
      tap((newCustomer: Customer) => this.log(`added customer w/ id=${newCustomer.id}`)),
      catchError(this.handleError<Customer>('addCustomer'))
    );
  }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.customersUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Customer[]>('getCustomers', []))
      );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getCustomerNo404<Data>(id: number): Observable<Customer> {
    const url = `${this.customersUrl}/?id=${id}`;
    return this.http.get<Customer[]>(url)
      .pipe(
        map(Customers => Customers[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} customer id=${id}`);
        }),
        catchError(this.handleError<Customer>(`getCustomer id=${id}`))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getCustomer(id: number): Observable<Customer> {
    const url = `${this.customersUrl}/${id}`;
    return this.http.get<Customer>(url).pipe(
      tap(_ => this.log(`fetched Customer id=${id}`)),
      catchError(this.handleError<Customer>(`getCustomer id=${id}`))
    );
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  /** DELETE: delete the hero from the server */
deleteHero(customer: Customer | number): Observable<Customer> {
  const id = typeof customer === 'number' ? customer : customer.id;
  const url = `${this.customersUrl}/${id}`;

  return this.http.delete<Customer>(url, this.httpOptions).pipe(
    tap(_ => this.log(`deleted customer id=${id}`)),
    catchError(this.handleError<Customer>('deleteCustomer'))
  );
}

/* GET customers whose name contains search term */
searchCustomers(term: string): Observable<Customer[]> {
  if (!term.trim()) {
    // if not search term, return empty customer array.
    return of([]);
  }
  return this.http.get<Customer[]>(`${this.customersUrl}/?name=${term}`).pipe(
    tap(x => x.length ?
       this.log(`found customers matching "${term}"`) :
       this.log(`no customers matching "${term}"`)),
    catchError(this.handleError<Customer[]>('searchcustomers', []))
  );
}

}
