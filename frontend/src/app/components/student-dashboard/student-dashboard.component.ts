import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../../services/student.service'; // Use the correct service

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class StudentDashboardComponent implements OnInit {
  studentName = 'Nombre del Estudiante'; // Mock data, should be replaced by auth user data
  pasantia: any = null;
  tareas: any[] = [];
  selectedFile: File | null = null;
  comentarioEstudiante = '';
  isLoading = true;
  error: string | null = null;

  constructor(private studentService: StudentService) {} // Use StudentService

  ngOnInit(): void {
    this.loadInitialData();
  }

  loadInitialData(): void {
    this.isLoading = true;
    this.error = null;
    this.studentService.getStudentPasantia().subscribe({
      next: (data: any) => {
        this.pasantia = data;
        if (this.pasantia) {
          this.loadTareas();
        }
        this.isLoading = false;
      },
      error: (err: any) => {
        this.error = 'Error al cargar la información de la pasantía.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  loadTareas(): void {
    this.studentService.getPasantiaTareas(this.pasantia.id).subscribe({
      next: (data: any) => {
        this.tareas = data;
        // For each task, load its specific submission
        this.tareas.forEach(tarea => {
          this.studentService.getStudentEntrega(tarea.id).subscribe((entrega: any) => {
            tarea.entrega = entrega;
          });
        });
      },
      error: (err: any) => {
        this.error = 'Error al cargar las tareas.';
        console.error(err);
      }
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
  }

  submitTask(tareaId: number): void {
    const formData = new FormData();
    
    if (this.comentarioEstudiante) {
      formData.append('comentario_estudiante', this.comentarioEstudiante);
    }
    if (this.selectedFile) {
      formData.append('submission_file', this.selectedFile, this.selectedFile.name);
    }

    this.studentService.submitTask(tareaId, formData).subscribe({
      next: () => {
        alert('Tarea entregada con éxito!');
        this.loadTareas(); // Refresh the tasks list to show the submission
        this.comentarioEstudiante = '';
        this.selectedFile = null;
      },
      error: (err: any) => {
        this.error = 'Error al entregar la tarea.';
        console.error(err);
      }
    });
  }
}
