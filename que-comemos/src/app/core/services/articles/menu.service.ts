import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError,catchError } from 'rxjs';
import { MenuRequest } from './menuRequest';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  URL = 'http://localhost:8080/menu/';

  constructor(private http : HttpClient) { }

  createMenu (credentials:any){
    console.log (credentials)
    return this.http.post<any>(this.URL, credentials).pipe(
      catchError(this.handleError)
    );
  }

  updateMenu (id : number ,credentials:any){
    const UrlUpdate = `${this.URL}${id}`;
    console.log (credentials)
    return this.http.put<any>(UrlUpdate, credentials).pipe(
      catchError(this.handleError)
    );
  }

  getMenuById (id:number){
    const UrlGetMenu = `${this.URL}${id}`;
    return this.http.get<any>(UrlGetMenu).pipe(
      catchError(this.handleError)
    );
  }


  private handleError (error: HttpErrorResponse) {
    if (error.status==0){
      console.error("Se produjo un error " , error.error);
    }
    else {
       console.log ("Se retorno codigo" , error.status , error.error)
    }
    return throwError( () => new Error("Error"));
  }

}
