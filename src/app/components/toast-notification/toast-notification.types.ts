export interface NotificacionToast {
    mensaje: string,
    tipo: TipoNotificacion, 
    tiempo: number,
}

export enum TiempoNotificacion {
    CORTO = 5000,
    MEDIO = 7000,
    LARGO = 10000
}

export enum TipoNotificacion {
    COMPLETADO = "success",
    ERROR = "danger",
    PRECAUSION = "warning",
}