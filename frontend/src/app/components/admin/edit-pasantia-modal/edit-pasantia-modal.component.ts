import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pasantia } from '../../../models/pasantia.model';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-edit-pasantia-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-pasantia-modal.component.html',
  styleUrls: ['./edit-pasantia-modal.component.css']
})
export class EditPasantiaModalComponent implements OnInit {
  @Input() pasantia: Pasantia | null = null;
  @Input() estudiantes: User[] = [];
  @Input() tutores: User[] = [];
  @Output() closeModal = new EventEmitter<void>();
  @Output() savePasantia = new EventEmitter<Pasantia>();

  editForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      id: [this.pasantia?.id],
      titulo: [this.pasantia?.titulo, Validators.required],
      estudiante_id: [this.pasantia?.estudiante_id, Validators.required],
      tutor_id: [this.pasantia?.tutor_id],
      nombre_empresa: [this.pasantia?.nombre_empresa, Validators.required],
      supervisor_empresa: [this.pasantia?.supervisor_empresa],
      telefono_supervisor: [this.pasantia?.telefono_supervisor],
      fecha_inicio: [this.pasantia?.fecha_inicio, Validators.required],
      fecha_fin: [this.pasantia?.fecha_fin, Validators.required],
      descripcion: [this.pasantia?.descripcion],
      estado: [this.pasantia?.estado, Validators.required],
    });
  }

  onSave(): void {
    if (this.editForm.valid) {
      this.savePasantia.emit(this.editForm.value);
    }
  }

  onClose(): void {
    this.closeModal.emit();
  }
}
