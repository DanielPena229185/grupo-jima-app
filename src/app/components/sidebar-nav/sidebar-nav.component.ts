import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Opcion, TiposOpciones } from './sidebar-nav.types';
import { CommonModule } from '@angular/common';
import { enviroment } from '../../../enviroments/enviroment';

@Component({
  selector: 'app-sidebar-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar-nav.component.html',
  styleUrl: './sidebar-nav.component.css'
})
export class SidebarNavComponent {

  IMG_GRUPO_JIMA: string = `${enviroment.imagenes}/GrupoJima.png`;

  opcionesPaginas: Array<Opcion> = [
    { nombre: 'Inicio', opcion: TiposOpciones.INICIO, icono: `${enviroment.icons}/inicio.icon.svg` },
    { nombre: 'Pedidos', opcion: TiposOpciones.PEDIDOS, icono: `${enviroment.icons}/pedidos.icon.svg` },
    { nombre: 'Clientes', opcion: TiposOpciones.CLIENTES, icono: `${enviroment.icons}/clientes.icon.svg` },
    { nombre: 'Tortillerias', opcion: TiposOpciones.TORTILLERIAS, icono: `${enviroment.icons}/tortillerias.icon.svg` },
    { nombre: 'Productos', opcion: TiposOpciones.PRODUCTOS, icono: `${enviroment.icons}/productos.icon.svg` },
  ];

  opcionesExtra: Array<Opcion> = [
    { nombre: 'Configuración', opcion: TiposOpciones.CONFIGURACION, icono: `${enviroment.icons}/configuracion.icon.svg` },
    { nombre: 'Ayuda', opcion: TiposOpciones.AYUDA, icono: `${enviroment.icons}/ayuda.icon.svg` }
  ];

  constructor(private readonly router: Router) { }

  goToPage(pagina: Opcion) {
    switch (pagina.opcion) {
      case TiposOpciones.INICIO:
        this.router.navigate(['/']);
        return;
        case TiposOpciones.PEDIDOS:
          this.router.navigate(['/pedidos']);
        return;
        case TiposOpciones.CLIENTES:
          this.router.navigate(['/clientes']);
        return;
        case TiposOpciones.TORTILLERIAS:
          this.router.navigate(['/tortillerias']);
        return;
        case TiposOpciones.PRODUCTOS:
          this.router.navigate(['/productos']);
        return;
    }
  }
}
