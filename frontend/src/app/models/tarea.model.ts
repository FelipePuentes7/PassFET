import { Entrega } from "./entrega.model";

export interface Tarea {
  id: number;
  pasantia_id: number;
  titulo: string;
  descripcion: string;
  fecha_entrega: string;
  status: 'pendiente' | 'por revisar' | 'entregado';
  entregas: Entrega[];
  entrega?: Entrega; // Optional, as it might not exist for all tasks
}
