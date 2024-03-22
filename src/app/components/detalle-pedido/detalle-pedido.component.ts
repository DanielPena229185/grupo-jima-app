import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastNotificationComponent } from '../toast-notification/toast-notification.component';
import { InformacionPedidoComponent } from '../informacion-pedido/informacion-pedido.component';
import { HttpClientModule } from '@angular/common/http';
import { DetallePedidoService } from './detalle-pedido.service';
import { PaqueteDTO, PedidoDTO } from './detalle-pedido.types';
import { ToastNotificationService } from '../toast-notification/toast-notification.service';
import { TiempoNotificacion, TipoNotificacion } from '../toast-notification/toast-notification.types';

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
    private readonly notificationService: ToastNotificationService
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

  finalizarPedido(pedidoId: string, pedido = this.pedido) {
    this.detallePedidoService.finalizarPedido(pedidoId, pedido).subscribe({
      next: (pedido: PedidoDTO) => {
        this.notificationService.addNotificacion({
          message: 'Se finalizó el pedido con éxito',
          tiempo: TiempoNotificacion.LARGO,
          tipo: TipoNotificacion.ERROR
        })
        this.volverPagina();
      },
      error: (error) => {
        this.notificationService.addNotificacion({
          message: 'Algo salió mal, intente más tarde',
          tiempo: TiempoNotificacion.CORTO,
          tipo: TipoNotificacion.ERROR
        })
      }
    })
  }

  cancelarPedido(pedidoId: string, pedido = this.pedido) {
    this.detallePedidoService.cancelarPedido(pedidoId, pedido).subscribe({
      next: (pedido: PedidoDTO) => {
        console.log('Se canceló el pedido');
        this.volverPagina();
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
}
