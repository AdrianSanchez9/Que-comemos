import { Injectable } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, throwError, tap, map } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  URL = 'http://localhost:8080/login';

  currentUserLoginOn : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData : BehaviorSubject<String> = new BehaviorSubject<String>("");


  constructor(private http : HttpClient) { 
    this.currentUserLoginOn = new BehaviorSubject<boolean>(sessionStorage.getItem("tokenUser") != null);
    this.currentUserData = new BehaviorSubject<String>(sessionStorage.getItem("tokenUser") || "");
  }

  login (credentials:LoginRequest):Observable<any> {
    return this.http.post<any>(this.URL, credentials).pipe(
      tap((userData) => {
        sessionStorage.setItem("tokenUser", userData.token);
        this.currentUserLoginOn.next(true);
        this.currentUserData.next(userData.token);
      }),
      map((userData) => userData.token),
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error("Se produjo un error:", error.error);
    } else {
      console.error("Se retornó código", error.status, "con mensaje:", error.error.message || error.error);
    }
  
    const errorMessage = error.error?.message || "Ocurrió un error inesperado";
    return throwError(() => new Error(errorMessage));
  }

  logout ():void {
    sessionStorage.removeItem("tokenUser");
    this.currentUserLoginOn.next(false);
  }


  get userData (): Observable<any>{ 
      return this.currentUserData.asObservable();
  }

  get userLogin (): Observable<any>{
    return this.currentUserLoginOn.asObservable();
  }

  get userToken () :String {
    return this.currentUserData.value;
  }
}
