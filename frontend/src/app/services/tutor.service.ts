import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pasantia } from '../models/pasantia.model';

@Injectable({
  providedIn: 'root'
})
export class TutorService {
  private apiUrl = '/api'; // Base API URL

  constructor(private http: HttpClient) { }

  /**
   * Fetches the internships assigned to the currently authenticated tutor.
   * @returns An Observable array of Pasantia objects.
   */
  getMisPasantias(): Observable<Pasantia[]> {
    return this.http.get<Pasantia[]>(`${this.apiUrl}/tutor/pasantias`);
  }
}
