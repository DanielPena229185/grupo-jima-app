export interface NotificacionToast {
    message: string,
    tipo: TipoNotificacion, 
    tiempo: TiempoNotificacion,
    textColor? : TextoColor | string,
}

export interface Notificacion {
    mensaje: string,
    background: string,
    colorTexto: string
}

export enum TiempoNotificacion {
    CORTO = 5000,
    MEDIO = 7000,
    LARGO = 10000
}

export enum TextoColor {
    BLANCO = 'blanco',
    NEGRO = 'negro'
}

export enum TipoNotificacion {
    COMPLETADO = "success",
    ERROR = "danger",
    PRECAUSION = "warning",
}