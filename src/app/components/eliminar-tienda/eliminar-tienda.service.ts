import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../../../enviroments/enviroment';
import { TiendaDTO } from './eliminar-tienda.types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EliminarTiendaService {

  constructor(private readonly http: HttpClient) { }

  getTiendas(): Observable<TiendaDTO[]> {
    return this.http.get<TiendaDTO[]>(`${enviroment.apiUrl}/tienda`);
  }

  eliminarTienda(tiendaId: string): Observable<TiendaDTO>{
    return this.http.delete<TiendaDTO>(`${enviroment.apiUrl}/tienda/${tiendaId}`);
  }
}
