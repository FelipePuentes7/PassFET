import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { AuthService } from '../../services/auth.service';
import { Pasantia } from '../../models/pasantia.model';
import { Tarea } from '../../models/tarea.model';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive]
})
export class StudentViewComponent implements OnInit {
  pasantia: Pasantia | null = null;
  tareas: Tarea[] = [];
  selectedFile: File | null = null;
  comentarioEstudiante = '';
  isLoading = true;
  error: string | null = null;
  isSidebarCollapsed = false; // Changed to false by default

  constructor(
    private studentService: StudentService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log('[v0] Iniciando carga de datos del estudiante');
    this.loadInitialData();
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        console.log('[v0] Sesión cerrada correctamente');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('[v0] Error al cerrar sesión:', err);
        // Navigate anyway
        this.router.navigate(['/login']);
      }
    });
  }

  loadInitialData(): void {
    this.isLoading = true;
    this.error = null;
    const studentId = this.authService.getUserId();

    console.log('[v0] ID del estudiante:', studentId);

    if (!studentId) {
      this.error = 'No se pudo obtener el ID del estudiante. Por favor, inicia sesión nuevamente.';
      this.isLoading = false;
      console.error('[v0] No hay ID de estudiante disponible');
      return;
    }

    this.studentService.getStudentPasantia(studentId).subscribe({
      next: (data: any) => {
        console.log('[v0] Datos de pasantía recibidos:', data);
        
        // Handle both array and single object responses
        if (Array.isArray(data) && data.length > 0) {
          this.pasantia = data[0];
        } else if (data && !Array.isArray(data)) {
          this.pasantia = data;
        } else {
          this.pasantia = null;
          console.log('[v0] No hay pasantía asignada');
        }

        if (this.pasantia && this.pasantia.id) {
          console.log('[v0] Cargando tareas para pasantía ID:', this.pasantia.id);
          this.loadTareas(this.pasantia.id, studentId);
        } else {
          this.isLoading = false;
        }
      },
      error: (err: any) => {
        console.error('[v0] Error al cargar pasantía:', err);
        this.error = `Error al cargar la información de la pasantía: ${err.message || 'Error desconocido'}`;
        this.isLoading = false;
      }
    });
  }

  loadTareas(pasantiaId: number, studentId: number): void {
    console.log('[v0] Cargando tareas - Pasantía ID:', pasantiaId, 'Student ID:', studentId);
    
    this.studentService.getPasantiaTareas(pasantiaId, studentId).subscribe({
      next: (data: any) => {
        console.log('[v0] Tareas recibidas:', data);
        this.tareas = Array.isArray(data) ? data : [];
        
        // Load submissions for each task
        this.tareas.forEach((tarea, index) => {
          if (tarea.id) {
            this.studentService.getStudentEntrega(tarea.id).subscribe({
              next: (entrega: any) => {
                console.log(`[v0] Entrega para tarea ${tarea.id}:`, entrega);
                this.tareas[index].entrega = entrega;
              },
              error: (err: any) => {
                console.log(`[v0] No hay entrega para tarea ${tarea.id} (esto es normal si no se ha entregado)`);
              }
            });
          }
        });
        
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('[v0] Error al cargar tareas:', err);
        this.error = `Error al cargar las tareas: ${err.message || 'Error desconocido'}`;
        this.isLoading = false;
      }
    });
  }

  onFileSelected(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.selectedFile = files[0];
      if (this.selectedFile) {
        console.log('[v0] Archivo seleccionado:', this.selectedFile.name);
      }
    } else {
      this.selectedFile = null;
    }
  }

  submitTask(tareaId: number): void {
    const studentId = this.authService.getUserId();

    if (!studentId) {
      this.error = 'No se pudo obtener el ID del estudiante para la entrega.';
      console.error('[v0] No hay ID de estudiante para enviar tarea');
      return;
    }

    if (!this.selectedFile && !this.comentarioEstudiante) {
      alert('Por favor, añade un comentario o sube un archivo antes de entregar.');
      return;
    }

    const formData = new FormData();
    formData.append('student_id', studentId.toString());
    formData.append('tarea_id', tareaId.toString());

    if (this.comentarioEstudiante) {
      formData.append('comentario_estudiante', this.comentarioEstudiante);
    }
    
    if (this.selectedFile) {
      formData.append('submission_file', this.selectedFile, this.selectedFile.name);
    }

    console.log('[v0] Enviando tarea ID:', tareaId);

    this.studentService.submitTask(tareaId, formData).subscribe({
      next: (response) => {
        console.log('[v0] Tarea entregada exitosamente:', response);
        alert('¡Tarea entregada con éxito!');
        this.comentarioEstudiante = '';
        this.selectedFile = null;
        
        // Reset file input
        const fileInput = document.getElementById('archivo-' + tareaId) as HTMLInputElement;
        if (fileInput) {
          fileInput.value = '';
        }
        
        this.loadInitialData(); // Refresh all data
      },
      error: (err: any) => {
        console.error('[v0] Error al entregar tarea:', err);
        this.error = `Error al entregar la tarea: ${err.error?.message || err.message || 'Error desconocido'}`;
        alert(this.error);
      }
    });
  }

  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      'pendiente': 'Pendiente',
      'entregado': 'Entregado',
      'por revisar': 'Por Revisar',
      'revisado': 'Revisado',
      'aprobado': 'Aprobado',
      'rechazado': 'Rechazado'
    };
    return labels[status] || status;
  }
}