import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { TortilleriasComponent } from './pages/tortillerias/tortillerias.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { DetallePedidoComponent } from './components/detalle-pedido/detalle-pedido.component';
import { TiendasComponent } from './pages/tiendas/tiendas.component';
import { AgregarTiendaComponent } from './components/agregar-tienda/agregar-tienda.component';

export const routes: Routes = [
    {path: '', component: InicioComponent},
    {path: 'pedidos', component: PedidosComponent},
    {path: 'tiendas', component: TiendasComponent},
    {path: 'tortillerias', component: TortilleriasComponent},
    {path: 'productos', component: ProductosComponent},
    {path: 'detalle-pedido/:pedidoId', component: DetallePedidoComponent},
    {path: 'agregar-tienda', component: AgregarTiendaComponent},
];
