import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistrarTiendaDTO, RepartidorDTO, SearchParamsDTO, TiendaDTO } from './agregar-tienda.types';
import { enviroment } from '../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AgregarTiendaService {

  constructor(
    private readonly http: HttpClient
  ) { }

  getRepartidores(searchParams : SearchParamsDTO) : Observable<RepartidorDTO[]>{
    return this.http.get<RepartidorDTO[]>(`${enviroment.apiUrl}/repartidor`, {params: <any>searchParams});
  }

  registrarTienda(registrarTienda: RegistrarTiendaDTO) : Observable<TiendaDTO>{
    return this.http.post<TiendaDTO>(`${enviroment.apiUrl}/tienda`, registrarTienda);
  }
}
