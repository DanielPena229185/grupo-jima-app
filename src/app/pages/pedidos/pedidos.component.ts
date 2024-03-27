import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidosPendientesItemComponent } from '../../components/pedidos-pendientes-item/pedidos-pendientes-item.component';
import { Router } from '@angular/router';
import { PedidosService } from './pedidos.service';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from '../../app.component';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { ToastNotificationService } from '../../components/toast-notification/toast-notification.service';
import { TipoNotificacion } from '../../components/toast-notification/toast-notification.types';
import { PedidoDTO, parametrosBusquedaDTO } from './pedidos.types';
import { Subject, debounceTime } from 'rxjs';

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

  private entradaBusqueda = new Subject<string>;
  mostrarSpinner: boolean = true;
  parametrosBusqueda: parametrosBusquedaDTO;
  pedidos: PedidoDTO[] = [];

  constructor(
    private readonly router: Router,
    private readonly pedidoService: PedidosService,
    private readonly notificationService: ToastNotificationService
  ) { }

  ngOnInit(): void {
    this.iniciarParametrosBusqueda();
    this.obtenerOrdenesPendientes(this.parametrosBusqueda);
    this.configurarBuscadorConRetraso();
  }

  configurarBuscadorConRetraso() {
    this.entradaBusqueda.pipe(debounceTime(500)).subscribe((buscar) => {
      this.realizarBusqueda(buscar);
    });
  }

  realizarBusqueda(buscar: string) {
    this.parametrosBusqueda = {
      ...this.parametrosBusqueda,
      codigoRastreo: buscar,
      nombreTienda: buscar
    }
    this.obtenerOrdenesPendientes(this.parametrosBusqueda, true);
  }


  onKey(value: any) {
    this.entradaBusqueda.next(value.target.value);
  }

  obtenerOrdenesPendientes(parametrosBusqueda: parametrosBusquedaDTO, limpiarlistaPedidos: boolean = false) {
    this.pedidoService.obtenerPedidosPendientes(parametrosBusqueda).subscribe({
      next: (response: PedidoDTO[]) => {
        if(limpiarlistaPedidos){
          this.pedidos = response;
        }else {
          Array.prototype.push.apply(this.pedidos, response);
        }
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
      pagina: 0,
      cantidad: 10,
      campos: 'id,codigoRastreo,fechaHoraCreacion,tienda',
      relaciones: 'tienda',
      ordenamiento: 'fechaHoraCreación',
      codigoRastreo: '',
      detalles: '',
      nombreTienda: ''
    }
  }
}
