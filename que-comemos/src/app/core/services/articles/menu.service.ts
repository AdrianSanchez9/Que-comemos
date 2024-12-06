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
    return this.http.post<any>(this.URL, credentials).pipe(
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
