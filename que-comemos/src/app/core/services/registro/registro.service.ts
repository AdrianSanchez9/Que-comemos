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

    register(formData: FormData): Observable<any> {
        return this.http.post<any>(this.apiUrl, formData);
    }
}
  