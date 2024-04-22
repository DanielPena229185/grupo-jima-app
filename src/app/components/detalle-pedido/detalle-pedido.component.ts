import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastNotificationComponent } from '../toast-notification/toast-notification.component';
import { InformacionPedidoComponent } from '../informacion-pedido/informacion-pedido.component';
import { HttpClientModule } from '@angular/common/http';
import { DetallePedidoService } from './detalle-pedido.service';
import { PaqueteDTO, ParametrosBusquedaDTO, PedidoDTO } from './detalle-pedido.types';
import { ToastNotificationService } from '../toast-notification/toast-notification.service';
import { TipoNotificacion } from '../toast-notification/toast-notification.types';
import { SpinnerComponent } from '../spinner/spinner.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from '../dialogo-confirmacion/dialogo-confirmacion.component';
import { DialogRespuesta } from '../dialogo-confirmacion/dialogo-confirmacion.types';

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
  parametrosBusqueda: ParametrosBusquedaDTO;
  pedido: PedidoDTO;
  paquetes: PaqueteDTO[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly location: Location,
    private readonly detallePedidoService: DetallePedidoService,
    private readonly notificationService: ToastNotificationService,
    private readonly dialog: MatDialog,
    private readonly router: Router,
  ) { }

  ngOnInit() {
    let pedidoId = String(this.route.snapshot.paramMap.get('pedidoId'));
    this.iniciarParametrosBusqueda();
    this.obtenerOrdenByCodigoRastreo(this.parametrosBusqueda, pedidoId);
  }

  iniciarParametrosBusqueda() {
    this.parametrosBusqueda = {
      campos: 'id,codigoRastreo,estado,detalles,total,tienda,repartidor,tortilleria,paquetes',
      relaciones: 'tienda,repartidor,tortilleria,paquetes,paquetes.producto,paquetes.producto.gramaje'
    }
  }

  async obtenerOrdenByCodigoRastreo(parametrosBusqueda: ParametrosBusquedaDTO = this.parametrosBusqueda, pedidoId: string) {
    this.detallePedidoService.obtenerPedidoByPedidoId(parametrosBusqueda, pedidoId).subscribe({
      next: (pedido: PedidoDTO) => {
        if(pedido.estado !== 'pendiente'){
          this.router.navigate(['/pedidos']);
          this.notificationService.addNotificacion({
            mensaje: `El detalle de este pedido ya no se puede visualizar`,
            tiempo: 5000,
            tipo: TipoNotificacion.PRECAUSION
          });
        }
        this.pedido = pedido;
        Array.prototype.push.apply(this.paquetes, pedido.paquetes);
        this.mostrarSpinner = false;
      },
      error: (error) => {
        this.notificationService.addNotificacion({
          mensaje: `Algo salió mal al cargar los paquetes del pedido, intente nuevamente`,
          tiempo: 5000,
          tipo: TipoNotificacion.ERROR
        })
        this.mostrarSpinner = false;
        this.router.navigate(['/pedidos']);
      }
    })
  }

  volverPagina(): void {
    this.location.back();
  }

  private finalizar(pedidoId: string, pedido = this.pedido) {
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
          mensaje: 'Algo salió mal al finalizar el pedido, intente nuevamente',
          tiempo: 5000,
          tipo: TipoNotificacion.ERROR
        })
      }
    })
  }

  private cancelar(pedidoId: string, pedido = this.pedido) {
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
          mensaje: 'Algo salió mal al cancelar el pedido, intente nuevamente',
          tiempo: 5000,
          tipo: TipoNotificacion.ERROR
        })
      }
    })
  }

  finalizarPedido(pedidoId: string): void {
    const dialogRef = this.dialog.open(DialogoConfirmacionComponent, {
      data: {
        titulo: 'Finalizar Pedido',
        contenido: '¿Seguro que desea finalizar el pedido?'
      }
    });
    dialogRef.afterClosed().subscribe((resultado) => {
      const respuesta: DialogRespuesta = resultado.data.dialogRespuesta;
      if(respuesta === DialogRespuesta.CONFIRMAR){
        this.finalizar(pedidoId);
      }
    })
  }

  cancelarPedido(pedidoId: string): void {
    const dialogRef = this.dialog.open(DialogoConfirmacionComponent, {
      data: {
        titulo: 'Cancelar Pedido',
        contenido: '¿Seguro que desea cancelar el pedido?'
      }
    });
    dialogRef.afterClosed().subscribe((resultado) => {
      const respuesta: DialogRespuesta = resultado.data.dialogRespuesta;
      if(respuesta === DialogRespuesta.CONFIRMAR){
        this.cancelar(pedidoId);
      }
    })
  }
}
