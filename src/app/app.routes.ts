import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { TortilleriasComponent } from './pages/tortillerias/tortillerias.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { DetallePedidoComponent } from './components/detalle-pedido/detalle-pedido.component';

export const routes: Routes = [
    {path: '', component: InicioComponent},
    {path: 'pedidos', component: PedidosComponent},
    {path: 'clientes', component: ClientesComponent},
    {path: 'tortillerias', component: TortilleriasComponent},
    {path: 'productos', component: ProductosComponent},
    {path: 'configuracion', component: ClientesComponent},
    {path: 'ayuda', component: ClientesComponent},
    {path: 'detalle-pedido/:codigoRastreo', component: DetallePedidoComponent}
];
