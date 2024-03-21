import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastNotificationComponent } from '../toast-notification/toast-notification.component';
import { InformacionPedidoComponent } from '../informacion-pedido/informacion-pedido.component';
import { HttpClientModule } from '@angular/common/http';
import { DetallePedidoService } from './detalle-pedido.service';
import { PaqueteDTO, PedidoDTO } from './detalle-pedido.types';

@Component({
  selector: 'app-detalle-pedido',
  standalone: true,
  imports: [CommonModule, ToastNotificationComponent, InformacionPedidoComponent, HttpClientModule],
  templateUrl: './detalle-pedido.component.html',
  styleUrl: './detalle-pedido.component.css',
  providers: [DetallePedidoService],
})
export class DetallePedidoComponent implements OnInit {

  pedidoId: string;
  pedido: PedidoDTO;
  paquetes: PaqueteDTO[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly location: Location,
    private readonly detallePedidoService: DetallePedidoService,
  ) { }

  ngOnInit() {
    this.pedidoId = String(this.route.snapshot.paramMap.get('pedidoId'));
    this.obtenerOrdenByCodigoRastreo(this.pedidoId);
  }

  async obtenerOrdenByCodigoRastreo(pedidoId: string) {
    this.detallePedidoService.obtenerPedidoByPedidoId(pedidoId).subscribe({
      next: (pedido: PedidoDTO) => {
        this.pedido = pedido;
        Array.prototype.push.apply(this.paquetes, pedido.paquetes);
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  volverPagina(): void {
    this.location.back();
  }

  finalizarPedido() {
  }
}
