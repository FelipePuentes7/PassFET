import { User } from './user.model';

export interface Pasantia {
    id: number;
    estudiante_id: number;
    tutor_id: number | null;
    nombre_empresa: string;
    direccion_empresa?: string;
    contacto_empresa?: string;
    supervisor_empresa?: string;
    telefono_supervisor?: string;
    titulo: string;
    descripcion?: string;
    fecha_inicio: string; // YYYY-MM-DD
    fecha_fin: string; // YYYY-MM-DD
    estado: 'planificada' | 'en_proceso' | 'finalizada' | 'cancelada';
    created_at: string;
    updated_at: string;

    // Eager loaded relationships
    estudiante?: User;
    tutor?: User;
}
