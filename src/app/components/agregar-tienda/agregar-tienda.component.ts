import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BuscarRepartidorComponent } from '../buscar-repartidor/buscar-repartidor.component';
import {
  RegistrarTiendaDTO,
  RepartidorDTO,
  SearchParamsDTO,
  TiendaDTO,
} from './agregar-tienda.types';
import { HttpClientModule } from '@angular/common/http';
import { AgregarTiendaService } from './agregar-tienda.service';
import { enviroment } from '../../../enviroments/enviroment';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastNotificationService } from '../toast-notification/toast-notification.service';
import { TipoNotificacion } from '../toast-notification/toast-notification.types';

@Component({
  selector: 'app-agregar-tienda',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    BuscarRepartidorComponent,
    FormsModule,
  ],
  templateUrl: './agregar-tienda.component.html',
  styleUrl: './agregar-tienda.component.css',
  providers: [AgregarTiendaService],
})
export class AgregarTiendaComponent implements OnInit {
  repartidores: RepartidorDTO[] = [];
  sarchParams: SearchParamsDTO;
  showAddPage = true;
  repartidorSeleccionado: string = '';
  nombreTienda: string = '';
  telefonoTienda: string = '';
  direccionTienda: string = '';

  constructor(
    private readonly agregarTiendaService: AgregarTiendaService,
    private readonly router: Router,
    private readonly notificationService: ToastNotificationService,
    private readonly location: Location,
  ) {}

  ngOnInit() {
    this.initSearchParams();
    this.getRepartidores();
  }

  initSearchParams() {
    this.sarchParams = {
      campos: 'id,nombres,apellidos',
      relaciones: '',
      pagina: 0,
      cantidad: 10,
      tortilleriaId: enviroment.apiUrl,
    };
  }

  getRepartidores() {
    this.agregarTiendaService.getRepartidores(this.sarchParams).subscribe({
      next: (repartidores: RepartidorDTO[]) => {
        if (repartidores.length < this.sarchParams.cantidad) {
          this.showAddPage = false;
        } else {
          this.showAddPage = true;
        }
        this.repartidores = repartidores;
      },
    });
  }

  registrarTienda() {
    const repartidorId: string = this.repartidorSeleccionado;
    const tortilleriaId: string = enviroment.tortilleriaId;
    const nombre: string = this.nombreTienda;
    const telefono: string = this.telefonoTienda;
    const direccion: string = this.direccionTienda;
    const registrarTienda: RegistrarTiendaDTO = {
      repartidorId,
      tortilleriaId,
      nombre,
      telefono,
      direccion,
    };
    this.agregarTiendaService.registrarTienda(registrarTienda).subscribe({
      next: (tienda: TiendaDTO) => {
        console.log('Tienda registrada', tienda);
        this.notificationService.addNotificacion({
          mensaje: 'Tienda registrada con éxito',
          tiempo: 5000,
          tipo: TipoNotificacion.COMPLETADO
        })
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.notificationService.addNotificacion({
          mensaje: 'Algo salió mal al registrar la tienda, intente nuevamente',
          tiempo: 5000,
          tipo: TipoNotificacion.ERROR
        })
        console.error('Error al registrar tienda', error);
      },
    });
  }

  addPage() {
    if (this.showAddPage) {
      this.sarchParams.pagina++;
      this.getRepartidores();
    }
  }

  removePage() {
    if (this.sarchParams.pagina > 0) {
      this.sarchParams.pagina--;
      this.getRepartidores();
    }
  }

  volverPagina(): void {
    this.location.back();
  }
}
