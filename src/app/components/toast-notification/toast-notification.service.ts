import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NotificacionToast } from './toast-notification.types';

@Injectable({
  providedIn: 'root'
})
export class ToastNotificationService {

  notificacionCambio = new Subject<NotificacionToast>();

  constructor() { }


  addNotificacion(notificacion: NotificacionToast){
    this.notificacionCambio.next(notificacion);
  }
}
