import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificacionToast, TextoColor, TipoNotificacion } from './toast-notification.types';
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

  notificaciones: NotificacionToast[] = [];
  private subscription: Subscription;

  constructor(private readonly toastService: ToastNotificationService) {

  }

  ngOnInit(): void {
    this.suscribirseNotificaciones();
  }

  private suscribirseNotificaciones() {
    this.subscription = this.toastService.notificacionCambio.subscribe({
      next: (notificacion: NotificacionToast) => {
        if (!notificacion.textColor) {
          notificacion.textColor = this.getTextColor(notificacion.tipo);
        }
        this.notificaciones.push(notificacion);
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
    this.notificaciones.pop();
  }

  getTextColor(tipoNotificacion: TipoNotificacion): TextoColor {
    if (tipoNotificacion === (TipoNotificacion.COMPLETADO || TipoNotificacion.ERROR)) {
      return TextoColor.BLANCO;
    }
    if (tipoNotificacion === TipoNotificacion.PRECAUSION) {
      return TextoColor.NEGRO;
    }
    return TextoColor.BLANCO;
  }
}
