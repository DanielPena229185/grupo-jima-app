import { Component, Input, OnInit } from '@angular/core';
import { PedidoDTO } from './pedidos-pendientes-item.types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pedidos-pendientes-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pedidos-pendientes-item.component.html',
  styleUrl: './pedidos-pendientes-item.component.css'
})
export class PedidosPendientesItemComponent implements OnInit{
  
  @Input() pedido: PedidoDTO;
  
  ngOnInit() {
    
  }
}
