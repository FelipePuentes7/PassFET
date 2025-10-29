import { User } from "./user.model";

export interface Entrega {
    id: number;
    tarea_id: number;
    estudiante_id: number;
    estudiante: User;
    archivo_path: string;
    comentario_estudiante: string;
    fecha_entrega: string;
    calificacion: number;
    comentario_tutor: string;
    fecha_calificacion: string;
}
