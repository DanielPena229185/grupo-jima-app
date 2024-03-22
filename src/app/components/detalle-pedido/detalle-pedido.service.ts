import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PedidoDTO } from './detalle-pedido.types';
import { enviroment } from '../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class DetallePedidoService {

  constructor(
    private readonly http: HttpClient
  ) { }


  obtenerPedidoByPedidoId(pedidoId: string): Observable<PedidoDTO>{
    return this.http.get<PedidoDTO>(`${enviroment.apiUrl}/pedido/${pedidoId}`);
  }

  cancelarPedido(pedidoId: string, pedido: PedidoDTO): Observable<PedidoDTO>{
    return this.http.patch<PedidoDTO>(`${enviroment.apiUrl}/pedido/${pedidoId}/cancelar`, pedido);
  }

  finalizarPedido(pedidoId: string, pedido: PedidoDTO): Observable<PedidoDTO>{
    return this.http.patch<PedidoDTO>(`${enviroment.apiUrl}/pedido/${pedidoId}/finalizar`, pedido);
  }
}
