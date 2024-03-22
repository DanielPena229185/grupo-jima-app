import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastNotificationComponent } from '../toast-notification/toast-notification.component';
import { InformacionPedidoComponent } from '../informacion-pedido/informacion-pedido.component';
import { HttpClientModule } from '@angular/common/http';
import { DetallePedidoService } from './detalle-pedido.service';
import { PaqueteDTO, PedidoDTO } from './detalle-pedido.types';
import { ToastNotificationService } from '../toast-notification/toast-notification.service';
import { TipoNotificacion } from '../toast-notification/toast-notification.types';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-detalle-pedido',
  standalone: true,
  imports: [
    CommonModule, 
    ToastNotificationComponent, 
    InformacionPedidoComponent, 
    HttpClientModule, 
    SpinnerComponent
  ],
  templateUrl: './detalle-pedido.component.html',
  styleUrl: './detalle-pedido.component.css',
  providers: [DetallePedidoService],
})
export class DetallePedidoComponent implements OnInit {

  mostrarSpinner: boolean = true;
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
        this.mostrarSpinner = false;
      },
      error: (error) => {
        this.notificationService.addNotificacion({
          mensaje: `Algo salió mal al cargar los paquetes del pedido, intente más tarde`,
          tiempo: 5000,
          tipo: TipoNotificacion.ERROR
        })
        this.mostrarSpinner = false;
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
          mensaje: 'Se finalizó el pedido con éxito',
          tiempo: 5000,
          tipo: TipoNotificacion.COMPLETADO
        })
        this.volverPagina();
      },
      error: (error) => {
        this.notificationService.addNotificacion({
          mensaje: 'Algo salió mal al finalizar el pedido, intente más tarde',
          tiempo: 5000,
          tipo: TipoNotificacion.ERROR
        })
      }
    })
  }

  cancelarPedido(pedidoId: string, pedido = this.pedido) {
    this.detallePedidoService.cancelarPedido(pedidoId, pedido).subscribe({
      next: (pedido: PedidoDTO) => {
        this.notificationService.addNotificacion({
          mensaje: 'Se canceló el pedido con éxito',
          tiempo: 5000,
          tipo: TipoNotificacion.COMPLETADO
        })
        this.volverPagina();
      },
      error: (error) => {
        this.notificationService.addNotificacion({
          mensaje: 'Algo salió mal al cancelar el pedido, intente más tarde',
          tiempo: 5000,
          tipo: TipoNotificacion.ERROR
        })
      }
    })
  }
}
