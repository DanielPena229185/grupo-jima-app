import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoDTO } from './pedidos-pendientes-item.types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedidos-pendientes-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pedidos-pendientes-item.component.html',
  styleUrl: './pedidos-pendientes-item.component.css'
})
export class PedidosPendientesItemComponent {

  @Input() pedido: PedidoDTO;
  
}
