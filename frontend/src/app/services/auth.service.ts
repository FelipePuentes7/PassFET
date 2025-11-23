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
    // Clear local storage on logout
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    localStorage.removeItem('user_role');
    return this.http.post(`${this.backendUrl}/logout`, {}, { withCredentials: true });
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true';
  }
  
  getUserId(): number | null {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      return user.id;
    }
    return null;
  }

  verifyRecovery(data: any): Observable<any> {
    return this.http.post(`${this.backendUrl}/api/verify-recovery`, data);
  }

  resetPassword(data: any): Observable<any> {
    return this.http.post(`${this.backendUrl}/api/reset-password`, data);
  }

  getUsersByRole(role: string): Observable<any> {
    return this.http.get(`${this.backendUrl}/api/users/role/${role}`);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.backendUrl}/api/users`);
  }
}