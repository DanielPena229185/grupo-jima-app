export interface PedidoDTO {
    id: string,
    codigoRastreo: string,
    fechaHoraCreacion: string,
    tienda: TiendaDTO
}

interface TiendaDTO {
    id: string,
    nombre: string
}