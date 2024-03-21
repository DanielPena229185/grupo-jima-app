export interface PedidoDTO {
    id: string,
    codigoRastreo: string,
    repartidor: RepartidorDTO,
    tienda: TiendaDTO,
    paquetes: PaqueteDTO[]
}

interface RepartidorDTO {
    id: string;
    nombre: string
}

interface TiendaDTO {
    id: string,
    nombre: string,
    telefono: string
}

interface PaqueteDTO {
    id: string,
    cantidad: number,
    gramaje: GramajeDTO
}

interface GramajeDTO {
    id: string,
    gramaje: number
}