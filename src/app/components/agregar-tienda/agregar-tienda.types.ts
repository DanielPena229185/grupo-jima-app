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
}

export interface TiendaDTO {
    id: string;
    nombre: string;
    telefono: string;
    direccion: string;
}