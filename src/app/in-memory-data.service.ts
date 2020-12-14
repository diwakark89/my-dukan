import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Customer } from './customer/customer';
import { CustomerData } from './customer/customer-data';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    // const customers = [
    //   { id: 11, name: 'Dr Nice' },
    //   { id: 12, name: 'Narco' },
    //   { id: 13, name: 'Bombasto' },
    //   { id: 14, name: 'Celeritas' },
    //   { id: 15, name: 'Magneta' },
    //   { id: 16, name: 'RubberMan' },
    //   { id: 17, name: 'Dynama' },
    //   { id: 18, name: 'Dr IQ' },
    //   { id: 19, name: 'Magma' },
    //   { id: 20, name: 'Tornado' }
    // ];
    // return {customers};

    const customers: CustomerData[] =
      [
        {
          id: 1,
          name: 'Earl of Lemongrab',
          age: 25,
          DueAmount: 10000,
          occupation: 'Earl, Heir to the Candy Kingdom Throne'

        },
        {
          id: 2,
          name: 'Bonnibel Bubblegum',
          age: 19,
          DueAmount: 30000,
          occupation: 'Returned Ruler of the Candy Kingdom'
        },
        {
          id: 3,
          name: 'Phoebe',
          age: 16,
          DueAmount: 250000,
          occupation: 'Ruler of the Fire Kingdom'
        },
        {
          id: 4,
          name: 'Lumpy Space Princess',
          age: 18,
          DueAmount: 15000,
          occupation: 'Babysitter'
        },
      ]
    return { customers };
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(customers: CustomerData[]): number {
    return customers.length > 0 ? Math.max(...customers.map(customer => customer.id)) + 1 : 11;
  }
}