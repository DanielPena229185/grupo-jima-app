import { Component } from '@angular/core';
import { PedidoDTO as PedidoDTO } from './pedidos.types';
import { CommonModule } from '@angular/common';
import { PedidosPendientesItemComponent } from '../../components/pedidos-pendientes-item/pedidos-pendientes-item.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule, PedidosPendientesItemComponent],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent {

  pedidos: PedidoDTO[] = [
    { id: '1', codigoRastreo: 'ABC123', fecha: '11/10/2002', tienda: { id: '1', nombre: 'Abarrotes Emir' } },
    { id: '2', codigoRastreo: 'ABC456', fecha: '12/10/2002', tienda: { id: '2', nombre: 'Abarrotes Peña' } },
    { id: '3', codigoRastreo: 'ABC789', fecha: '13/10/2002', tienda: { id: '3', nombre: 'Abarrotes Marcos' } },
    { id: '4', codigoRastreo: 'ABC111', fecha: '14/10/2002', tienda: { id: '4', nombre: 'Abarrotes Luis' } },
    { id: '5', codigoRastreo: 'ABC112', fecha: '15/10/2002', tienda: { id: '4', nombre: 'Abarrotes Luis' } },
    { id: '6', codigoRastreo: 'ABC113', fecha: '16/10/2002', tienda: { id: '4', nombre: 'Abarrotes Luis' } },
    { id: '7', codigoRastreo: 'ABC114', fecha: '17/10/2002', tienda: { id: '4', nombre: 'Abarrotes Luis' } },
    { id: '8', codigoRastreo: 'ABC115', fecha: '18/10/2002', tienda: { id: '4', nombre: 'Abarrotes Luis' } },
    { id: '9', codigoRastreo: 'ABC116', fecha: '19/10/2002', tienda: { id: '4', nombre: 'Abarrotes Luis' } },
    { id: '10', codigoRastreo: 'ABC117', fecha: '20/10/2002', tienda: { id: '4', nombre: 'Abarrotes Luis' } },
  ]

  constructor(private readonly router: Router) { }

  goToDetallePedido(pedido: PedidoDTO) {
    this.router.navigate([`/detalle-pedido/${pedido.codigoRastreo}`]);
  }
}
