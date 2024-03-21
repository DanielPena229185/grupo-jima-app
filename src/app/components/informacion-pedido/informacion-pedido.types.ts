export interface PedidoDTO {
    id: string,
    codigoRastreo: string,
    numeroRecorrido: number,
    detalles: string,
    estado: string,
    fechaHoraCreacion: string,
    fechaHoraActualizado: string,
    total: number,
    repartidor: RepartidorDTO,
    tortilleria: TortilleriaDTO,
    tienda: TiendaDTO,
    paquetes: PaqueteDTO[]
}

export interface RepartidorDTO {
    nombres: string,
    apellidos: string
}

export interface TortilleriaDTO {
    nombre: string
}

export interface TiendaDTO {
    telefono: string,
    nombre: string
}

export interface PaqueteDTO {
    id: string,
    cantidad: number,
    producto: ProductoDTO,
}

export interface ProductoDTO {
    id: string,
    precio: number,
    gramaje: GramajeDTO,
}

export interface GramajeDTO {
    id: string,
    gramaje: string
}
