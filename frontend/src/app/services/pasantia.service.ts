import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pasantia } from '../models/pasantia.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class PasantiaService {

  private apiUrl = 'http://localhost:8000/api'; // Assuming Laravel runs on port 8000

  constructor(private http: HttpClient) { }

  getPasantias(): Observable<Pasantia[]> {
    return this.http.get<Pasantia[]>(`${this.apiUrl}/pasantias`);
  }

  createPasantia(pasantia: Partial<Pasantia>): Observable<any> {
    return this.http.post(`${this.apiUrl}/pasantias`, pasantia);
  }

  getEstudiantes(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/estudiantes`);
  }

  getTutores(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/tutores`);
  }

}
