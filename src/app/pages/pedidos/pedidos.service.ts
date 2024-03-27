import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PedidoDTO, parametrosBusquedaDTO } from './pedidos.types';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(
    private readonly http: HttpClient
  ) { }

  obtenerPedidosPendientes(parametrosBusqueda: parametrosBusquedaDTO): Observable<PedidoDTO[]> {
    return this.http.get<PedidoDTO[]>(`${enviroment.apiUrl}/pedido/${enviroment.tortilleriaId}/pendiente`, { params: <any>parametrosBusqueda })
      .pipe(
        map((pedidos: PedidoDTO[]) => {
          return pedidos.map(pedido => {
            pedido.fechaHoraCreacion = this.formatoFecha(pedido.fechaHoraCreacion);
            return pedido;
          });
        })
      );
  }

  formatoFecha(fechaISO: string): string {
    const fecha = new Date(fechaISO);
    const dia = fecha.getDate().toString();
    const mes = (fecha.getMonth() + 1).toString();
    const año = fecha.getFullYear().toString();
    return `${dia}/${mes}/${año}`;
  }

}
