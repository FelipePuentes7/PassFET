
// Defino una interfaz básica para el usuario para usarla dentro de la Entrega
export interface SimpleUser {
  id: number;
  name: string;
}

// Defino una interfaz básica para la Tarea
export interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  status: string;
  due_date: string; // Asumo que la fecha de vencimiento viene como string
  entregas: Entrega[]; // Una tarea puede tener muchas entregas
}

export interface Entrega {
  id: number;
  tarea_id: number;
  estudiante_id: number;
  calificacion: number | null;
  comentario_tutor: string | null;
  fecha_entrega: string;
  is_late: boolean;
  tarea?: Tarea; // La tarea puede ser opcional
  estudiante?: SimpleUser; // El estudiante puede ser opcional

  // Campos que faltaban y causaban errores
  comentario_estudiante: string | null;
  archivo_path: string | null;
}
