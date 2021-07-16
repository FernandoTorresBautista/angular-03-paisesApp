import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { Observable, of } from 'rxjs';
//import { catchError } from 'rxjs/operators';
import { Country } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private apiUrl:string="https://restcountries.eu/rest/v2"; 
  //private fields:string="fields=name;capital:alpa2code;flag;population";

  get httpParams(){
    return new HttpParams().set("fields", "name;capital;alpha2Code;flag;population");
  }

  constructor( private http:HttpClient) { }

  buscarPais(term:string):Observable<Country[]> {
    const url = `${this.apiUrl}/name/${term}`;
    return this.http.get<Country[]>( url, {params:this.httpParams} );
      // .pipe(
      //   catchError( err => of(['from error catch rxjs']) )
      // );
  }
  
  buscarCapital(term:string):Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${term}`;
    return this.http.get<Country[]>( url, {params:this.httpParams} );
  }
  
  getPaisPorAlpha(id:string):Observable<Country> {
    const url = `${this.apiUrl}/alpha/${id}`;
    return this.http.get<Country>( url );
  }

  buscarRegion(id:string):Observable<Country[]> {
    const url = `${this.apiUrl}/region/${id}`;
    //const httpParams = new HttpParams().set("fields", "name;capital:alpa2code;flag;population");
    //return this.http.get<Country[]>( url, {params:httpParams} );
    return this.http.get<Country[]>( url, {params:this.httpParams} );
  }

}
