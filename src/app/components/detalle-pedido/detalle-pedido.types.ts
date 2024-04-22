export interface ParametrosBusquedaDTO {
    campos: string,
    relaciones: string
}

export interface PedidoDTO {
    id: string,
    codigoRastreo: string,
    estado: string,
    detalles: string,
    total: number,
    tienda: TiendaDTO;
    repartidor: RepartidorDTO;
    tortilleria: TortilleriaDTO;
    paquetes: PaqueteDTO[];
}

interface TiendaDTO {
    id: string,
    nombre: string,
    telefono: string
}

interface RepartidorDTO {
    id: string,
    nombres: string,
    apellidos: string
}

interface TortilleriaDTO {
    id: string,
    nombre: string
}

export interface PaqueteDTO {
    id: string,
    cantidad: number,
    producto: ProductoDTO;
}

interface ProductoDTO {
    gramaje: GramajeDTO
}

interface GramajeDTO {
    gramaje: number
}