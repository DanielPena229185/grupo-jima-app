import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TiendaDTO } from './actualizar-tienda.types';
import { Observable } from 'rxjs';
import { enviroment } from '../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ActualizarTiendaService {

  constructor(private readonly http: HttpClient) { }

  getTiendas(): Observable<TiendaDTO[]> {
    return this.http.get<TiendaDTO[]>(`${enviroment.apiUrl}/tienda`);
  }

  actualizarTienda(tienda: TiendaDTO): Observable<TiendaDTO> {
    return this.http.patch<TiendaDTO>(`${enviroment.apiUrl}/tienda/${tienda.id}`, tienda);
  }
}
