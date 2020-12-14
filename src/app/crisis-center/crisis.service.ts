import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Crisis } from './crisis';
import { CRISES } from './mock-crisis';
import { MessageService } from '../message.service';


@Injectable({
  providedIn: 'root'
})
export class CrisisService {


  private crisisesUrl = 'api/crisises';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** PUT: update the hero on the server */
  updateCrisis(crisis: Crisis): Observable<any> {
    return this.http.put(this.crisisesUrl, crisis, this.httpOptions).pipe(
      tap(_ => this.log(`updated crisis id=${crisis.id}`)),
      catchError(this.handleError<any>('updateCrisis'))
    );
  }

  /** POST: add a new hero to the server */
  addCrisis(crisis: Crisis): Observable<Crisis> {
    return this.http.post<Crisis>(this.crisisesUrl, crisis, this.httpOptions).pipe(
      tap((newCrisis: Crisis) => this.log(`added crisis w/ id=${newCrisis.id}`)),
      catchError(this.handleError<Crisis>('addCrisis'))
    );
  }

  getCrisises(): Observable<Crisis[]> {
    return this.http.get<Crisis[]>(this.crisisesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Crisis[]>('getCrisises', []))
      );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getCrisisNo404<Data>(id: number): Observable<Crisis> {
    const url = `${this.crisisesUrl}/?id=${id}`;
    return this.http.get<Crisis[]>(url)
      .pipe(
        map(Crisises => Crisises[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} crisis id=${id}`);
        }),
        catchError(this.handleError<Crisis>(`getCrisis id=${id}`))
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

  getCrisis(id: number): Observable<Crisis> {
    const url = `${this.crisisesUrl}/${id}`;
    return this.http.get<Crisis>(url).pipe(
      tap(_ => this.log(`fetched Crisis id=${id}`)),
      catchError(this.handleError<Crisis>(`getCrisis id=${id}`))
    );
  }

  private log(message: string) {
    this.messageService.add(`CrisisService: ${message}`);
  }

  /** DELETE: delete the hero from the server */
deleteCrisis(crisis: Crisis | number): Observable<Crisis> {
  const id = typeof crisis === 'number' ? crisis : crisis.id;
  const url = `${this.crisisesUrl}/${id}`;

  return this.http.delete<Crisis>(url, this.httpOptions).pipe(
    tap(_ => this.log(`deleted crisis id=${id}`)),
    catchError(this.handleError<Crisis>('deleteCrisis'))
  );
}

/* GET crisises whose name contains search term */
searchCrisises(term: string): Observable<Crisis[]> {
  if (!term.trim()) {
    // if not search term, return empty crisis array.
    return of([]);
  }
  return this.http.get<Crisis[]>(`${this.crisisesUrl}/?name=${term}`).pipe(
    tap(x => x.length ?
       this.log(`found crisises matching "${term}"`) :
       this.log(`no crisises matching "${term}"`)),
    catchError(this.handleError<Crisis[]>('searchcrisises', []))
  );
}

}
