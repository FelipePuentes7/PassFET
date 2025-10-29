import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Pasantia } from '../models/pasantia.model';
import { Tarea } from '../models/tarea.model';
import { Entrega } from '../models/entrega.model';


@Injectable({
  providedIn: 'root'
})
export class TutorService {
  private apiUrl = '/api'; 

  constructor(private http: HttpClient) { }

  /**
   * Fetches the profile of the currently authenticated user.
   * @returns An Observable of the User object.
   */
  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/user`);
  }

  /**
   * Fetches the internships assigned to the currently authenticated tutor.
   * @returns An Observable array of Pasantia objects.
   */
  getMisPasantias(): Observable<Pasantia[]> {
    return this.http.get<Pasantia[]>(`${this.apiUrl}/tutor/pasantias`);
  }

  /**
   * Fetches the tasks for a specific internship.
   * @param pasantiaId The ID of the internship.
   * @returns An Observable array of Tarea objects.
   */
  getTareasForPasantia(pasantiaId: number): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(`${this.apiUrl}/pasantias/${pasantiaId}/tareas`);
  }

  /**
   * Creates a new task for an internship.
   * @param tareaData The data for the new task.
   * @returns An Observable of the created Tarea object.
   */
  addTarea(tareaData: { pasantia_id: number; titulo: string; descripcion: string; fecha_entrega?: string }): Observable<Tarea> {
    return this.http.post<Tarea>(`${this.apiUrl}/tareas`, tareaData);
  }

  /**
   * Grades a student's submission.
   * @param entregaId The ID of the submission to grade.
   * @param calificacionData The grading data.
   * @returns An Observable of the updated Entrega object.
   */
  calificarEntrega(entregaId: number, calificacionData: { calificacion: number; comentario_tutor?: string }): Observable<Entrega> {
    return this.http.post<Entrega>(`${this.apiUrl}/entregas/${entregaId}/calificar`, calificacionData);
  }
}
