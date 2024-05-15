import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BuscarRepartidorComponent } from '../buscar-repartidor/buscar-repartidor.component';
import {
  GramajeDTO,
  ProductoDTO,
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
  gramajes: GramajeDTO[] = [];
  productos: ProductoDTO[] = [];
  sarchParams: SearchParamsDTO;
  showAddPage = true;
  repartidorSeleccionado: string = '';
  nombreTienda: string = '';
  telefonoTienda: string = '';
  direccionTienda: string = '';
  gramajeSeleccionado: string = '';
  precioSeleccionado: string = '';

  constructor(
    private readonly agregarTiendaService: AgregarTiendaService,
    private readonly router: Router,
    private readonly notificationService: ToastNotificationService,
    private readonly location: Location
  ) {}

  ngOnInit() {
    this.initSearchParams();
    this.getRepartidores();
    this.getGramajes();
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

  getGramajes() {
    this.agregarTiendaService.getGramajes().subscribe({
      next: (gramajes: GramajeDTO[]) => {
        this.gramajes = gramajes;
      },
    });
  }

  agregarProducto() {
    const gramaje = this.getGramajeByGramaje(this.gramajeSeleccionado);
    const precio = parseInt(this.precioSeleccionado);
    if (!gramaje && !precio) {
      this.notificationService.addNotificacion({
        mensaje:
          'El gramaje seleccionado no está disponible y el precio ingresado no es válido',
        tiempo: 5000,
        tipo: TipoNotificacion.PRECAUSION,
      });
      return;
    }
    if (!gramaje) {
      this.notificationService.addNotificacion({
        mensaje: 'El gramaje seleccionado no está disponible',
        tiempo: 5000,
        tipo: TipoNotificacion.PRECAUSION,
      });
      return;
    }
    if (!precio || precio < 0) {
      this.notificationService.addNotificacion({
        mensaje: 'El precio ingresado no es válido',
        tiempo: 5000,
        tipo: TipoNotificacion.PRECAUSION,
      });
      return;
    }
    if (gramaje && precio) {
      const producto: ProductoDTO = {
        gramajeDTO: gramaje,
        precio,
      };
      this.productos.push(producto);
      const index = this.gramajes.indexOf(gramaje);
      if (index > -1) {
        this.gramajes.splice(index, 1);
      }
      this.gramajeSeleccionado = '';
      this.precioSeleccionado = '';
    }
  }

  revertirProducto(producto: ProductoDTO) {
    const index = this.productos.indexOf(producto);
    const gramaje = producto.gramajeDTO;
    if (index > -1) {
      this.productos.splice(index, 1);
      this.gramajes.push(producto.gramajeDTO);
    }
  }

  getGramajeByGramaje(gramaje: string): GramajeDTO | undefined {
    const gramajeNumber = parseInt(gramaje);
    const gramajeDto: GramajeDTO | undefined = this.gramajes.find(
      (g) => g.gramaje === gramajeNumber
    );
    return gramajeDto;
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
    if(this.productos.length === 0){
      this.notificationService.addNotificacion({
        mensaje: 'Debe agregar al menos un producto para registrar la tienda',
        tiempo: 5000,
        tipo: TipoNotificacion.PRECAUSION,
      });
      return;
    }
    if (!this.repartidorSeleccionado) {
      this.notificationService.addNotificacion({
        mensaje: 'Debe seleccionar un repartidor para registrar la tienda',
        tiempo: 5000,
        tipo: TipoNotificacion.PRECAUSION,
      });
      return;
    }
    if (!this.nombreTienda) {
      this.notificationService.addNotificacion({
        mensaje: 'Debe ingresar un nombre para la tienda',
        tiempo: 5000,
        tipo: TipoNotificacion.PRECAUSION,
      });
      return;
    }
    if (!this.telefonoTienda) {
      this.notificationService.addNotificacion({
        mensaje: 'Debe ingresar un teléfono para la tienda',
        tiempo: 5000,
        tipo: TipoNotificacion.PRECAUSION,
      });
      return;
    }
    if (!this.direccionTienda) {
      this.notificationService.addNotificacion({
        mensaje: 'Debe ingresar una dirección para la tienda',
        tiempo: 5000,
        tipo: TipoNotificacion.PRECAUSION,
      });
      return;
    }
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
      productos: this.productos,
    };
    this.agregarTiendaService.registrarTienda(registrarTienda).subscribe({
      next: (tienda: TiendaDTO) => {
        console.log('Tienda registrada', tienda);
        this.notificationService.addNotificacion({
          mensaje: 'Tienda registrada con éxito',
          tiempo: 5000,
          tipo: TipoNotificacion.COMPLETADO,
        });
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.notificationService.addNotificacion({
          mensaje: 'Algo salió mal al registrar la tienda, intente nuevamente',
          tiempo: 5000,
          tipo: TipoNotificacion.ERROR,
        });
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
