import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

export interface Tutor {
  id: number;
  nombre: string;
  email: string;
  rol: string;
  estado: string;
}

@Component({
  selector: 'app-tutors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tutors.component.html',
  styleUrls: ['./tutors.component.css']
})
export class TutorsComponent implements OnInit {
  tutors: Tutor[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadTutors();
  }

  loadTutors(): void {
    this.isLoading = true;
    this.authService.getUsersByRole('tutor').subscribe({
      next: (data: Tutor[]) => {
        this.tutors = data;
        this.isLoading = false;
      },
      error: (err: any) => {
        this.error = 'Error al cargar los tutores.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  viewTutor(id: number): void {
    console.log(`Viewing tutor ${id}`);
  }

  editTutor(id: number): void {
    console.log(`Editing tutor ${id}`);
  }

  deleteTutor(id: number): void {
    console.log(`Deleting tutor ${id}`);
  }
}