import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class RegistroService {

    private apiUrl = environment.apiUrl + '/cliente/registro';

    constructor(private http: HttpClient) { }

    registerMultipart(formData: FormData): Observable<any> {
        return this.http.post(`${this.apiUrl}/multipart`, formData);
      
    }
    
    registerJson(usuarioData: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/json`, usuarioData);

    }
}
  