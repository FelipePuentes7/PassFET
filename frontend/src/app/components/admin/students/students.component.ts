import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

export interface Student {
  id: number;
  nombre: string;
  email: string;
  rol: string;
  student_code: string;
  estado: string;
}

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.isLoading = true;
    this.authService.getUsersByRole('estudiante').subscribe({
      next: (data: Student[]) => {
        this.students = data;
        this.isLoading = false;
      },
      error: (err: any) => {
        this.error = 'Error al cargar los estudiantes.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  viewStudent(id: number): void {
    console.log(`Viewing student ${id}`);
  }

  editStudent(id: number): void {
    console.log(`Editing student ${id}`);
  }

  deleteStudent(id: number): void {
    console.log(`Deleting student ${id}`);
  }
}