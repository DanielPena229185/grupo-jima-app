import { Component, OnInit } from '@angular/core';
import { ParametrosBusquedaDTO, PedidoDTO as PedidoDTO } from './pedidos.types';
import { CommonModule } from '@angular/common';
import { PedidosPendientesItemComponent } from '../../components/pedidos-pendientes-item/pedidos-pendientes-item.component';
import { Router } from '@angular/router';
import { PedidosService } from './pedidos.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule, PedidosPendientesItemComponent, HttpClientModule],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css',
  providers: [PedidosService]
})
export class PedidosComponent implements OnInit {

  parametrosBusqueda: ParametrosBusquedaDTO;
  pedidos: PedidoDTO[] = [];

  constructor(
    private readonly router: Router,
    private readonly pedidoService: PedidosService,
  ) { }

  ngOnInit(): void {
    this.iniciarParametrosBusqueda();
    this.obtenerOrdenesPendientes(this.parametrosBusqueda);
  }

  obtenerOrdenesPendientes(parametrosBusqueda: ParametrosBusquedaDTO) {
    this.pedidoService.obtenerPedidosPendientes(parametrosBusqueda).subscribe({
      next: (response: PedidoDTO[]) => {
        Array.prototype.push.apply(this.pedidos, response);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  goToDetallePedido(pedido: PedidoDTO) {
    this.router.navigate([`/detalle-pedido/${pedido.id}`]);
  }

  iniciarParametrosBusqueda() {
    this.parametrosBusqueda = {
      cantidad: 10,
      pagina: 0,
    }
  }
}
