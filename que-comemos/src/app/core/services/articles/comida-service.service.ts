import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComidaServiceService {

  URL = 'http://localhost:8080/comida/';

  apiURL = environment.apiUrl + '/comida/';

  constructor(private http : HttpClient) { }


  createComida (credentials:any){
    console.log (credentials)
    return this.http.post<any>(this.URL, credentials).pipe(
      catchError(this.handleError)
    );
  }

  getComidas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL).pipe(
      catchError(this.handleError)
    );
  }

  getComidasById(id : number) {
    return this.http.get<any>(`${this.apiURL}detail/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  updateComida (id:number , credentials : any){ 
    return this.http.put<any>(`${this.apiURL}${id}`, credentials).pipe(
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
