export interface PedidoDTO {
    id: string,
    codigoRastreo: string,
    fecha: string,
    tienda: TiendaDTO
}

interface TiendaDTO {
    id: string,
    nombre: string,
}