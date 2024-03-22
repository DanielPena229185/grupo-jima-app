import { Component, OnInit } from '@angular/core';
import { ParametrosBusquedaDTO, PedidoDTO as PedidoDTO } from './pedidos.types';
import { CommonModule } from '@angular/common';
import { PedidosPendientesItemComponent } from '../../components/pedidos-pendientes-item/pedidos-pendientes-item.component';
import { Router } from '@angular/router';
import { PedidosService } from './pedidos.service';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from '../../app.component';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { ToastNotificationService } from '../../components/toast-notification/toast-notification.service';
import { TipoNotificacion } from '../../components/toast-notification/toast-notification.types';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [
    CommonModule, 
    PedidosPendientesItemComponent, 
    HttpClientModule, 
    AppComponent,
    SpinnerComponent
  ],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css',
  providers: [PedidosService]
})
export class PedidosComponent implements OnInit {

  mostrarSpinner: boolean = true;
  parametrosBusqueda: ParametrosBusquedaDTO;
  pedidos: PedidoDTO[] = [];

  constructor(
    private readonly router: Router,
    private readonly pedidoService: PedidosService,
    private readonly notificationService: ToastNotificationService
  ) { }

  ngOnInit(): void {
    this.iniciarParametrosBusqueda();
    this.obtenerOrdenesPendientes(this.parametrosBusqueda);
  }

  obtenerOrdenesPendientes(parametrosBusqueda: ParametrosBusquedaDTO) {
    this.pedidoService.obtenerPedidosPendientes(parametrosBusqueda).subscribe({
      next: (response: PedidoDTO[]) => {
        Array.prototype.push.apply(this.pedidos, response);
        
        this.mostrarSpinner = false;
      },
      error: (error) => {
        this.notificationService.addNotificacion({
          mensaje: 'Algo salió mal al querer cargar los pedidos, intente nuevamente',
          tiempo: 5000,
          tipo: TipoNotificacion.ERROR
        })
        this.mostrarSpinner = false;
      }
    })
  }

  goToDetallePedido(pedido: PedidoDTO) {
    this.router.navigate([`/detalle-pedido/${pedido.id}`]);
  }

  iniciarParametrosBusqueda() {
    this.parametrosBusqueda = {
      cantidad: 10,
      pagina: 0,
    }
  }
}
