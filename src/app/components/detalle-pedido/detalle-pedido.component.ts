import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-pedido',
  standalone: true,
  imports: [],
  templateUrl: './detalle-pedido.component.html',
  styleUrl: './detalle-pedido.component.css'
})
export class DetallePedidoComponent implements OnInit{

  codigoRastreo: string;

  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.codigoRastreo = String(this.route.snapshot.paramMap.get('codigoRastreo'));
    console.log(this.codigoRastreo);
  }

  obtenerOrdenByCodigoRastreo(codigoRastreo: string){
    
  }

  volverPagina(): void {
    this.location.back();
  }
}
