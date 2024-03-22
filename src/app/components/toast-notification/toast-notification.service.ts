import { Injectable } from '@angular/core';
import { NotificacionToast } from './toast-notification.types';
import { Subject } from 'rxjs';

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
