import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastNotificationConfiguration } from './toast-notification.types';

@Component({
  selector: 'app-toast-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast-notification.component.html',
  styleUrl: './toast-notification.component.css'
})
export class ToastNotificationComponent {

  notificaciones: ToastNotificationConfiguration[] = [
    {message: 'Hola Mundo', color: 'bg-primary'},
    {message: 'Adios Mundo', color: 'bg-primary'},
  ];

  constructor(){

  }

  notificar(message: string, tipoMensaje: string){
    this.notificaciones.push({message, color: tipoMensaje})
  }

}
