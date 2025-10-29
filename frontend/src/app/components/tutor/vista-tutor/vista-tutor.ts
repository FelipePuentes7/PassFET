import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Needed for ngModel
import { TutorService } from '../../../services/tutor.service';
import { Pasantia } from '../../../models/pasantia.model';
import { Tarea } from '../../../models/tarea.model';
import { User } from '../../../models/user.model';
import { Entrega } from '../../../models/entrega.model';

@Component({
  selector: 'app-vista-tutor',
  standalone: true,
  imports: [CommonModule, FormsModule], // Add FormsModule
  templateUrl: './vista-tutor.html',
  styleUrls: ['./vista-tutor.css']
})
export class VistaTutorComponent implements OnInit {
  // State for data
  pasantias: Pasantia[] = [];
  selectedPasantia: Pasantia | null = null;
  tareas: Tarea[] = [];
  
  // State for UI
  isLoading = true;
  error: string | null = null;

  // Form models
  nuevaTarea = {
    titulo: '',
    descripcion: ''
  };
  
  calificacionModel: { [key: number]: { calificacion: number | null, comentario_tutor: string } } = {};


  constructor(private tutorService: TutorService) { }

  ngOnInit(): void {
    this.loadPasantias();
  }

  loadPasantias(): void {
    this.isLoading = true;
    this.tutorService.getMisPasantias().subscribe({
      next: (data) => {
        this.pasantias = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar las pasantías.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  selectPasantia(pasantia: Pasantia): void {
    this.selectedPasantia = pasantia;
    this.isLoading = true;
    this.tutorService.getTareasForPasantia(pasantia.id).subscribe({
      next: (data) => {
        this.tareas = data;
        // Initialize calificacion model for each entrega
        this.tareas.forEach(tarea => {
          tarea.entregas.forEach((entrega: Entrega) => {
            this.calificacionModel[entrega.id] = {
              calificacion: entrega.calificacion,
              comentario_tutor: entrega.comentario_tutor || ''
            };
          });
        });
        this.isLoading = false;
      },
      error: (err) => {
        this.error = `Error al cargar las tareas para ${pasantia.titulo}.`;
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  unselectPasantia(): void {
    this.selectedPasantia = null;
    this.tareas = [];
    this.error = null;
  }

  onSubmitTarea(): void {
    if (!this.selectedPasantia) return;

    const tareaData = {
      pasantia_id: this.selectedPasantia.id,
      titulo: this.nuevaTarea.titulo,
      descripcion: this.nuevaTarea.descripcion
    };

    this.tutorService.addTarea(tareaData).subscribe({
      next: () => {
        this.nuevaTarea = { titulo: '', descripcion: '' }; // Reset form
        this.selectPasantia(this.selectedPasantia!); // Refresh tasks list
      },
      error: (err) => {
        this.error = 'Error al crear la tarea.';
        console.error(err);
      }
    });
  }

  onCalificar(entregaId: number): void {
    const model = this.calificacionModel[entregaId];
    if (model.calificacion === null) return;

    const calificacionData = {
      calificacion: model.calificacion,
      comentario_tutor: model.comentario_tutor
    };

    this.tutorService.calificarEntrega(entregaId, calificacionData).subscribe({
      next: () => {
        // Refresh tasks to show updated grade
        this.selectPasantia(this.selectedPasantia!);
      },
      error: (err) => {
        this.error = 'Error al guardar la calificación.';
        console.error(err);
      }
    });
  }
}