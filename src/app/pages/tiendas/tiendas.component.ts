import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tiendas',
  standalone: true,
  imports: [],
  templateUrl: './tiendas.component.html',
  styleUrl: './tiendas.component.css'
})
export class TiendasComponent {

  constructor(
    private readonly router: Router
  ) { }

  goToAgregarTienda() {
    this.router.navigate(['/agregar-tienda']);
  }
}
