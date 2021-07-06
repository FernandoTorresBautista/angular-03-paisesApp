import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { Observable, of } from 'rxjs';
//import { catchError } from 'rxjs/operators';
import { Country } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private apiUrl:string="https://restcountries.eu/rest/v2"; 

  constructor( private http:HttpClient) { }

  buscarPais(term:string):Observable<Country[]> {
    const url = `${this.apiUrl}/name/${term}`;
    return this.http.get<Country[]>( url );
      // .pipe(
      //   catchError( err => of(['from error catch rxjs']) )
      // );
  }
  
  buscarCapital(term:string):Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${term}`;
    return this.http.get<Country[]>( url );
  }
  
  getPaisPorAlpha(id:string):Observable<Country> {
    const url = `${this.apiUrl}/alpha/${id}`;
    return this.http.get<Country>( url );
  }

}
