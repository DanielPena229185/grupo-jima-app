export interface DatosDialogoDTO {
    titulo: string,
    contenido: string
    dialogRespuesta?: DialogRespuesta;
}

export enum DialogRespuesta {
    CONFIRMAR,
    CANCELAR,
}