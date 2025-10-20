import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, RouterLink],
})
export class LoginComponent {
  email = '';
  password = '';
  error: string | null = null;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  login() {
    this.error = null;
    this.isLoading = true;

    this.authService.login(this.email, this.password).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        console.log('Login exitoso!', response);
        const userRole = response.rol;

        // Optional: Store user info if needed elsewhere
        localStorage.setItem("user", JSON.stringify(response));
        localStorage.setItem("isAuthenticated", "true");

        // Route based on user role
        if (userRole === 'admin') {
          this.router.navigate(['/admin/pasantias']);
        } else if (userRole === 'tutor') {
          this.router.navigate(['/admin/tutor']);
        } else if (userRole === 'estudiante') {
          this.router.navigate(['/estudiante/dashboard']);
        } else {
          this.error = 'Rol de usuario no reconocido.';
          console.log('Rol no reconocido o sin redirección definida:', userRole);
        }
      },
      error: (err: any) => {
        this.isLoading = false;
        console.error('Error en el login', err);
        if (err.status === 419 || err.status === 401) {
          this.error = "Error de autenticación. Por favor, recargue la página e intente nuevamente.";
        } else if (err.status === 422) {
          this.error = "Credenciales incorrectas. Por favor, verifique su email y contraseña.";
        } else {
          this.error = "Error al conectar con el servidor. Por favor, intente de nuevo.";
        }
      },
    });
  }
}
