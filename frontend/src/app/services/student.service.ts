import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entrega, Tarea } from '../models/entrega.model'; // Usamos el modelo corregido

// Defino una interfaz para Pasantia aquí para que el servicio la entienda
export interface Pasantia {
  id: number;
  titulo: string;
  nombre_empresa: string;
  estado: string;
  tutor?: { name: string };
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = '/api'; // Asumo la misma URL base

  constructor(private http: HttpClient) { }

  // --- Métodos que faltaban y causaban errores ---

  getStudentPasantia(): Observable<Pasantia> {
    return this.http.get<Pasantia>(`${this.apiUrl}/student/pasantia`);
  }

  getPasantiaTareas(pasantiaId: number): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(`${this.apiUrl}/pasantias/${pasantiaId}/tareas`);
  }

  getStudentEntrega(tareaId: number): Observable<Entrega> {
    return this.http.get<Entrega>(`${this.apiUrl}/tareas/${tareaId}/entrega`);
  }

  submitTask(tareaId: number, formData: FormData): Observable<Entrega> {
    return this.http.post<Entrega>(`${this.apiUrl}/tareas/${tareaId}/submit`, formData);
  }

  // --- Nuevo método para el historial ---

  getGradesHistory(): Observable<Entrega[]> {
    return this.http.get<Entrega[]>(`${this.apiUrl}/student/historial-calificaciones`);
  }
}