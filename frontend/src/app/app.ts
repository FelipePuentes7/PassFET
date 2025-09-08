import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api.service'; // 👈 importa tu servicio

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');

  constructor(private api: ApiService) {}

  checkConnection() {
    this.api.testConnection().subscribe({
      next: (res) => console.log('✅ Respuesta del backend:', res),
      error: (err) => console.error('❌ Error al conectar:', err)
    });
  }
}
