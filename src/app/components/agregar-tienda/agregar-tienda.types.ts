export interface RepartidorDTO{
    id: string;
    nombres: string;
    apellidos: string;
}

export interface SearchParamsDTO{
    campos: string;
    relaciones: string;
    pagina: number;
    cantidad: number;
    tortilleriaId: string;
}

export interface RegistrarTiendaDTO{
    nombre: string;
    telefono: string;
    repartidorId: string;
    tortilleriaId: string;
    direccion: string;
    productos: ProductoDTO[];
}

export interface TiendaDTO {
    id: string;
    nombre: string;
    telefono: string;
    direccion: string;
}

export interface ProductoDTO{
    precio: number;
    gramajeDTO: GramajeDTO;
}

export interface GramajeDTO{
    id: string;
    gramaje: number;
}