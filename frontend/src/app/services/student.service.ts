import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pasantia } from '../models/pasantia.model';
import { Tarea } from '../models/tarea.model';
import { Entrega } from '../models/entrega.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = '/api';

  constructor(private http: HttpClient) { }

  getStudentPasantia(): Observable<Pasantia> {
    return this.http.get<Pasantia>(`${this.apiUrl}/student/pasantia`);
  }

  getPasantiaTareas(pasantiaId: number): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(`${this.apiUrl}/pasantias/${pasantiaId}/tareas`);
  }

  getStudentEntrega(tareaId: number): Observable<Entrega> {
    return this.http.get<Entrega>(`${this.apiUrl}/tareas/${tareaId}/entrega`);
  }

  submitTask(tareaId: number, submissionData: FormData): Observable<Entrega> {
    return this.http.post<Entrega>(`${this.apiUrl}/tareas/${tareaId}/submit`, submissionData);
  }
}
