import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private backendUrl = 'http://localhost:8000'; // URL de tu backend de Laravel

  constructor(private http: HttpClient) { }

  private getCsrfToken(): Observable<any> {
    return this.http.get(`${this.backendUrl}/sanctum/csrf-cookie`, { withCredentials: true });
  }

  login(email: string, password: string): Observable<any> {
    return this.getCsrfToken().pipe(
      switchMap(() => {
        return this.http.post(`${this.backendUrl}/api/login-directo`, { email, password }, { withCredentials: true });
      })
    );
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.backendUrl}/api/register`, userData);
  }

  logout(): Observable<any> {
    return this.http.post(`${this.backendUrl}/logout`, {}, { withCredentials: true });
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true';
  }
}