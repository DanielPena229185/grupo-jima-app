export interface Opcion{
    nombre: string;
    opcion: TiposOpciones;
    icono: string;
}

export enum TiposOpciones{
    INICIO = "inicio",
    PEDIDOS = "pedidos",
    TIENDAS = "clientes",
    TORTILLERIAS = "tortillerias",
    PRODUCTOS = "productos",
    CONFIGURACION = "configuracion",
    AYUDA = 'ayuda',
} 

