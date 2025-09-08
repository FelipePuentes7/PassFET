import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router'; // <-- AÑADIR ESTA LÍNEA
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, RouterLink] // Importamos FormsModule y RouterLink aquí
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService) { }

  login() {
    this.authService.login(this.email, this.password).subscribe(
      (response: any) => {
        console.log('Login exitoso!', response);
        // Aquí puedes guardar el token de usuario y redirigir
      },
      (error: any) => {
        console.error('Error en el login', error);
        // Aquí puedes mostrar un mensaje de error al usuario
      }
    );
  }
}
