import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EliminarTiendaService } from './eliminar-tienda.service';
import { TiendaDTO } from './eliminar-tienda.types';
import { MatDialog } from '@angular/material/dialog';
import { DialogRespuesta } from '../dialogo-confirmacion/dialogo-confirmacion.types';
import { DialogoConfirmacionComponent } from '../dialogo-confirmacion/dialogo-confirmacion.component';
import { ToastNotificationService } from '../toast-notification/toast-notification.service';
import { TipoNotificacion } from '../toast-notification/toast-notification.types';

@Component({
  selector: 'app-eliminar-tienda',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './eliminar-tienda.component.html',
  styleUrl: './eliminar-tienda.component.css',
  providers: [EliminarTiendaService],
})
export class EliminarTiendaComponent implements OnInit {
  tiendas: TiendaDTO[] = [];
  constructor(
    private readonly eliminarTiendaService: EliminarTiendaService,
    private readonly dialog: MatDialog,
    private readonly notificationService: ToastNotificationService
  ) {}

  ngOnInit() {
    this.getTiendas();
  }

  getTiendas() {
    this.eliminarTiendaService.getTiendas().subscribe((tiendas) => {
      this.tiendas = tiendas;
    });
  }

  eliminarTienda(tienda: string) {
    this.eliminarTiendaService.eliminarTienda(tienda).subscribe({
      next: (tienda) => {
        this.notificationService.addNotificacion({
          mensaje: 'Tienda eliminada correctamente',
          tipo: TipoNotificacion.COMPLETADO,
          tiempo: 5000,
        });
        this.getTiendas();
      },
      error: (error) => {
        this.notificationService.addNotificacion({
          mensaje: error.error.message,
          tipo: TipoNotificacion.ERROR,
          tiempo: 5000,
        });
      }, 
    });
  }

  eliminarTiendaConfirmar(tienda: TiendaDTO) {
    const dialogRef = this.dialog.open(DialogoConfirmacionComponent, {
      data: {
        titulo: 'Eliminar tienda',
        contenido: '¿Seguro que desea eliminar la tienda?',
      },
    });
    dialogRef.afterClosed().subscribe((resultado) => {
      const respuesta: DialogRespuesta = resultado.data.dialogRespuesta;
      if (respuesta === DialogRespuesta.CONFIRMAR) {
        this.eliminarTienda(tienda.id);
      }
    });
  }
}
