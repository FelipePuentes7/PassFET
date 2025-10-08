import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasantiaService } from '../../../services/pasantia.service';
import { User } from '../../../models/user.model';
import { Pasantia } from '../../../models/pasantia.model';

@Component({
  selector: 'app-pasantias-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pasantias-admin.html',
  styleUrls: ['./pasantias-admin.css']
})
export class PasantiasAdminComponent implements OnInit {

  pasantiaForm: FormGroup;
  estudiantes: User[] = [];
  tutores: User[] = [];
  pasantias: Pasantia[] = [];

  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private pasantiaService: PasantiaService
  ) {
    this.pasantiaForm = this.fb.group({
      titulo: ['', Validators.required],
      estudiante_id: ['', Validators.required],
      tutor_id: [''],
      nombre_empresa: ['', Validators.required],
      supervisor_empresa: [''],
      telefono_supervisor: [''],
      fecha_inicio: ['', Validators.required],
      fecha_fin: ['', Validators.required],
      descripcion: ['']
    });
  }

  ngOnInit(): void {
    this.loadInitialData();
  }

  loadInitialData(): void {
    this.pasantiaService.getEstudiantes().subscribe(data => {
      this.estudiantes = data;
    });

    this.pasantiaService.getTutores().subscribe(data => {
      this.tutores = data;
    });

    this.loadPasantias();
  }

  loadPasantias(): void {
    this.pasantiaService.getPasantias().subscribe(data => {
      this.pasantias = data;
    });
  }

  onSubmit(): void {
    if (this.pasantiaForm.invalid) {
      this.errorMessage = 'Por favor, complete todos los campos requeridos.';
      return;
    }

    this.errorMessage = null;
    this.successMessage = null;

    this.pasantiaService.createPasantia(this.pasantiaForm.value).subscribe({
      next: (response) => {
        this.successMessage = response.message;
        this.pasantiaForm.reset();
        this.loadPasantias(); // Refresh the list
      },
      error: (error) => {
        this.errorMessage = 'Ocurrió un error al crear la pasantía. Por favor, intente de nuevo.';
        console.error(error);
      }
    });
  }
}