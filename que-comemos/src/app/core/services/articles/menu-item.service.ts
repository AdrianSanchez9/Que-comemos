import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuItemResponse } from './menuItemResponse';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuItemService {

  URL = 'http://localhost:8080/comida/';

  constructor(private http : HttpClient) {}

  getMenuItems(): Observable<MenuItemResponse[]>{
    return this.http.get<MenuItemResponse[]>(this.URL).pipe(
      map(response => 
        response.map(item => ({
            id: item.id,
            nombre: item.nombre,
            tipo: item.tipo,
        }))
      )
    )
  }

}
