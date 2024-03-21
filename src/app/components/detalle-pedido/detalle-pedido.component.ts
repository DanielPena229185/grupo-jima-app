import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PedidoDTO } from './detalle-pedido.types';
import { ToastNotificationComponent } from '../toast-notification/toast-notification.component';

@Component({
  selector: 'app-detalle-pedido',
  standalone: true,
  imports: [CommonModule, ToastNotificationComponent],
  templateUrl: './detalle-pedido.component.html',
  styleUrl: './detalle-pedido.component.css'
})
export class DetallePedidoComponent implements OnInit {

  codigoRastreo: string;
  pedido: PedidoDTO;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.codigoRastreo = String(this.route.snapshot.paramMap.get('codigoRastreo'));
    this.pedido = this.obtenerOrdenByCodigoRastreo(this.codigoRastreo);
  }

  obtenerOrdenByCodigoRastreo(codigoRastreo: string): PedidoDTO {
    return {
      id: '1',
      codigoRastreo: codigoRastreo,
      tienda: {
        id: '1',
        nombre: 'Abarrotes Emir',
        telefono: '(644) 195 1272'
      },
      repartidor: {
        id: '1',
        nombre: 'Patito El repartidor'
      },
      paquetes: [
        // { id: '1', gramaje: { id: '1', gramaje: 500 }, cantidad: 3 },
        // { id: '1', gramaje: { id: '1', gramaje: 500 }, cantidad: 3 },
        // { id: '1', gramaje: { id: '1', gramaje: 500 }, cantidad: 3 },
        // { id: '1', gramaje: { id: '1', gramaje: 500 }, cantidad: 3 },
      ]
    }
  }

  volverPagina(): void {
    this.location.back();
  }

  finalizarPedido() {
  }
}
