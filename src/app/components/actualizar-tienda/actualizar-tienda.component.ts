import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActualizarTiendaService } from './actualizar-tienda.service';
import { TiendaDTO } from './actualizar-tienda.types';
import { FormsModule } from '@angular/forms';
import { ToastNotificationComponent } from '../toast-notification/toast-notification.component';
import { TipoNotificacion } from '../toast-notification/toast-notification.types';
import { ToastNotificationService } from '../toast-notification/toast-notification.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-actualizar-tienda',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, RouterModule],
  templateUrl: './actualizar-tienda.component.html',
  styleUrl: './actualizar-tienda.component.css',
  providers: [ActualizarTiendaService],
})
export class ActualizarTiendaComponent implements OnInit {

  tiendas: TiendaDTO[] = [];
  tiendaSeleccionada: TiendaDTO = {
    id: '',
    nombre: '',
    direccion: '',
    telefono: '',
  
  };
  constructor(
    private readonly actualizarTiendaService: ActualizarTiendaService,
    private readonly notificationService: ToastNotificationService
  ) {}

  ngOnInit() {
    this.getTiendas();
  }

  getTiendas() {
    this.actualizarTiendaService.getTiendas().subscribe((tiendas) => {
      this.tiendas = tiendas;
    });
  }

  seleccionarTienda(tienda: TiendaDTO) {
    this.tiendaSeleccionada = {
      id: tienda.id,
      nombre: tienda.nombre,
      direccion: tienda.direccion,
      telefono: tienda.telefono,
    };
  }

  actualizarTienda() {
    const actualizarTiendaDTO = {
      nombre: this.tiendaSeleccionada.nombre,
      direccion: this.tiendaSeleccionada.direccion,
      telefono: this.tiendaSeleccionada.telefono,
    };
    this.actualizarTiendaService
      .actualizarTienda(this.tiendaSeleccionada)
      .subscribe({
        next: (tienda) => {
          this.getTiendas();
          this.notificationService.addNotificacion({
            mensaje: 'Tienda actualizada',
            tipo: TipoNotificacion.COMPLETADO,
            tiempo: 5000,
          });
          this.limpiarCampos();
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  limpiarCampos() {
    this.tiendaSeleccionada = {
      id: '',
      nombre: '',
      direccion: '',
      telefono: '',
    };
  }
}
