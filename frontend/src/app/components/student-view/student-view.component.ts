import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { Pasantia } from '../../models/pasantia.model';
import { Tarea } from '../../models/tarea.model';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class StudentViewComponent implements OnInit {
  pasantia: Pasantia | null = null;
  tareas: Tarea[] = [];
  selectedFile: File | null = null;
  comentarioEstudiante = '';
  isLoading = true;
  error: string | null = null;

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.loadInitialData();
  }

  loadInitialData(): void {
    this.isLoading = true;
    this.error = null;
    // Assuming the student is logged in and we can get the pasantia directly.
    // For now, as there is no login, we need a way to identify the student.
    // Let's assume the service can get the pasantia for a default student for now.
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
    this.studentService.getPasantiaTareas(this.pasantia!.id).subscribe({
      next: (data: any) => {
        this.tareas = data;
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
        this.loadTareas(); // Refresh the tasks list
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
