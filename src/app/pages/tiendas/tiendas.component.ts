import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tiendas',
  standalone: true,
  imports: [],
  templateUrl: './tiendas.component.html',
  styleUrl: './tiendas.component.css',
})
export class TiendasComponent {
  constructor(private readonly router: Router) {}

  goToEliminarTienda() {
    this.router.navigate(['/eliminar-tienda']);
  }

  goToAgregarTienda() {
    this.router.navigate(['/agregar-tienda']);
  }

  goToActualizarTienda() {
    this.router.navigate(['/actualizar-tienda']);
  }
}
