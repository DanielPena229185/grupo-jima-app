import { Component, Input, OnInit } from '@angular/core';
import { RepartidorDTO, TiendaDTO, TortilleriaDTO } from './informacion-pedido.types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-informacion-pedido',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './informacion-pedido.component.html',
  styleUrl: './informacion-pedido.component.css'
})
export class InformacionPedidoComponent implements OnInit{

  @Input() codigoRastreo: string;
  @Input() tienda: TiendaDTO;
  @Input() repartidor: RepartidorDTO;
  @Input() tortilleria: TortilleriaDTO;

  ngOnInit(): void {
  }
}
