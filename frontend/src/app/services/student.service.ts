import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entrega, Tarea } from '../models/entrega.model';

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

  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  getStudentPasantia(studentId: number): Observable<Pasantia> {
    return this.http.get<Pasantia>(`${this.apiUrl}/student/${studentId}/pasantia`);
  }

  getPasantiaTareas(pasantiaId: number, studentId: number): Observable<Tarea[]> {
    const params = new HttpParams().set('student_id', studentId.toString());
    return this.http.get<Tarea[]>(`${this.apiUrl}/pasantias/${pasantiaId}/tareas`, { params });
  }

  getStudentEntrega(tareaId: number): Observable<Entrega> {
    return this.http.get<Entrega>(`${this.apiUrl}/tareas/${tareaId}/entrega`);
  }

  submitTask(tareaId: number, formData: FormData): Observable<Entrega> {
    return this.http.post<Entrega>(`${this.apiUrl}/tareas/${tareaId}/submit`, formData);
  }

  getGradesHistory(studentId: number): Observable<Entrega[]> {
    return this.http.get<Entrega[]>(`${this.apiUrl}/student/${studentId}/historial-calificaciones`);
  }
}