import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComidaServiceService {

  URL = 'http://localhost:8080/comida/';


  constructor(private http : HttpClient) { }


  createComida (credentials:any){
    console.log (credentials)
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
