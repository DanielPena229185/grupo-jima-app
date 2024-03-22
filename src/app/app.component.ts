import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarNavComponent } from './components/sidebar-nav/sidebar-nav.component';
import { ToastNotificationComponent } from './components/toast-notification/toast-notification.component';
import { NotificacionToast } from './components/toast-notification/toast-notification.types';
import { ToastNotificationService } from './components/toast-notification/toast-notification.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarNavComponent, ToastNotificationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(){
  }

   title: string = '';
}
