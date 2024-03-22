import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificacionToast, TipoNotificacion } from './toast-notification.types';
import { ToastNotificationService } from './toast-notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toast-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast-notification.component.html',
  styleUrl: './toast-notification.component.css'
})
export class ToastNotificationComponent implements OnInit {

  notificaciones: Toast[] = [];
  private subscription: Subscription;

  constructor(private readonly toastService: ToastNotificationService) {

  }

  ngOnInit(): void {
    this.suscribirseNotificaciones();
  }

  private suscribirseNotificaciones() {
    this.subscription = this.toastService.notificacionCambio.subscribe({
      next: (notificacion: NotificacionToast) => {
        const toast: Toast = {
          mensaje: notificacion.mensaje,
          background: notificacion.tipo,
          textContrast: this.getContrastColor(notificacion.tipo)
          
        }
        this.notificaciones.push(toast);
        if (this.notificaciones.length === 5) {
          this.eliminarPrimeraNotificacion();
        } else {
          setTimeout(() => {
            this.eliminarPrimeraNotificacion();
          }, notificacion.tiempo);
        }
      }
    })
  }

  private eliminarPrimeraNotificacion() {
    this.notificaciones.shift();
  }

  getContrastColor(tipoNotificacion: TipoNotificacion): string {
    if (tipoNotificacion === (TipoNotificacion.COMPLETADO || TipoNotificacion.ERROR)) {
      return 'blanco';
    }
    if (tipoNotificacion === TipoNotificacion.PRECAUSION) {
      return 'negro';
    }
    return 'blanco';
  }
}

interface Toast {
  mensaje: string,
  background: string,
  textContrast: string
}