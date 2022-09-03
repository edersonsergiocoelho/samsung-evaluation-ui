import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Currency } from '../vo/Currency';
import { GlobalVariableService } from 'src/app/global/global-variable';
import { MessageService } from 'src/app/message.service';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private apiUrl = this.globalVariableService.apiURL + 'currency';
  
  constructor(private httpClient: HttpClient,
              private messageService: MessageService,
              private globalVariableService : GlobalVariableService) { 

  }
  
  findAllCurrency(): Observable<Currency[]> {

    let httpHeaders = new HttpHeaders({
      'Accept' : 'application/json',
      'Access-Control-Allow-Origin' : '*'
    });

    return this.httpClient.get<Currency[]>(this.apiUrl,
      {     
        headers: httpHeaders
      }
      )
      .pipe(
        catchError(this.handleError<Currency[]>('findAllCurrency', []))
      );
  }

   /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
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

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}