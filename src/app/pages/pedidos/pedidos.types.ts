export interface parametrosBusquedaDTO {
    pagina: number,
    cantidad: number,
    ordenamiento: string,
    campos: string,
    relaciones: string,
    codigoRastreo: string,
    detalles: string,
    nombreTienda: string,
}

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