import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ReactiveFormsModule, FormBuilder, type FormGroup, Validators } from "@angular/forms"
import { Router, RouterLink, RouterLinkActive } from "@angular/router" 
import { PasantiaService } from "../../../services/pasantia.service"
import type { User } from "../../../models/user.model"
import type { Pasantia } from "../../../models/pasantia.model"
import { StudentsComponent } from '../students/students.component';
import { TutorsComponent } from '../tutors/tutors.component';
import { ReportsComponent } from '../reports/reports.component';
import { EditPasantiaModalComponent } from '../edit-pasantia-modal/edit-pasantia-modal.component';

@Component({
  selector: "app-pasantias-admin",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    StudentsComponent,
    TutorsComponent,
    ReportsComponent,
    EditPasantiaModalComponent,
  ],
  templateUrl: "./pasantias-admin.html",
  styleUrls: ["./pasantias-admin.css"],
})
export class PasantiasAdminComponent implements OnInit {
  activeView: string = 'pasantias'; // Default view
  isModalOpen = false;
  selectedPasantia: Pasantia | null = null;

  // Form and data
  pasantiaForm!: FormGroup
  pasantias: Pasantia[] = []
  estudiantes: User[] = []
  tutores: User[] = []
  empresas: string[] = []
  isEditing = false
  editingId: number | null = null
  successMessage: string = ""
  errorMessage: string = ""

  constructor(
    private fb: FormBuilder,
    private pasantiaService: PasantiaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm()
    this.loadData()
  }

  changeView(view: string): void {
    this.activeView = view;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.setItem('isAuthenticated', 'false');
    this.router.navigate(['/login']);
  }

  openEditModal(pasantia: Pasantia): void {
    this.selectedPasantia = pasantia;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedPasantia = null;
  }

  savePasantia(pasantia: Pasantia): void {
    this.pasantiaService.updatePasantia(pasantia.id, pasantia).subscribe({
      next: () => {
        this.successMessage = "Pasantía actualizada exitosamente.";
        this.loadData();
        this.closeModal();
      },
      error: (err) => {
        this.errorMessage = "Error al actualizar la pasantía.";
        console.error(err);
      }
    });
  }

  initForm(): void {
    this.pasantiaForm = this.fb.group({
      titulo: ["", Validators.required],
      estudiante_id: ["", Validators.required],
      tutor_id: [""],
      nombre_empresa: ["", Validators.required],
      supervisor_empresa: [""],
      telefono_supervisor: [""],
      fecha_inicio: ["", Validators.required],
      fecha_fin: ["", Validators.required],
      descripcion: [""],
      estado: ["planificada", Validators.required],
    })
  }

  loadData(): void {
    this.pasantiaService.getPasantias().subscribe((data: Pasantia[]) => {
      this.pasantias = data
    })

    this.pasantiaService.getEstudiantes().subscribe((data: User[]) => {
      this.estudiantes = data
    })

    this.pasantiaService.getTutores().subscribe((data: User[]) => {
      this.tutores = data
    })

    this.pasantiaService.getEmpresas().subscribe((data: string[]) => {
      this.empresas = data
    })
  }

  onSubmit(): void {
    if (this.pasantiaForm.valid) {
      this.errorMessage = ""
      this.successMessage = ""
      if (this.isEditing && this.editingId !== null) {
        this.pasantiaService
          .updatePasantia(this.editingId, this.pasantiaForm.value)
          .subscribe({
            next: () => {
              this.successMessage = "Pasantía actualizada exitosamente."
              this.loadData()
              this.resetForm()
            },
            error: (err) => {
              this.errorMessage = "Error al actualizar la pasantía."
              console.error(err)
            }
          })
      } else {
        this.pasantiaService.createPasantia(this.pasantiaForm.value).subscribe({
            next: () => {
              this.successMessage = "Pasantía creada exitosamente."
              this.loadData()
              this.resetForm()
            },
            error: (err) => {
              this.errorMessage = "Error al crear la pasantía."
              console.error(err)
            }
        })
      }
    }
  }

  editPasantia(pasantia: Pasantia): void {
    this.isEditing = true
    this.editingId = pasantia.id
    this.pasantiaForm.patchValue({
      titulo: pasantia.titulo,
      estudiante_id: pasantia.estudiante_id,
      tutor_id: pasantia.tutor_id,
      nombre_empresa: pasantia.nombre_empresa,
      supervisor_empresa: pasantia.supervisor_empresa,
      telefono_supervisor: pasantia.telefono_supervisor,
      fecha_inicio: pasantia.fecha_inicio,
      fecha_fin: pasantia.fecha_fin,
      descripcion: pasantia.descripcion,
      estado: pasantia.estado,
    })
  }

  deletePasantia(id: number): void {
    if (confirm("¿Está seguro de eliminar esta pasantía?")) {
      this.pasantiaService.deletePasantia(id).subscribe({
        next: () => {
          this.successMessage = "Pasantía eliminada exitosamente."
          this.loadData()
        },
        error: (err) => {
          this.errorMessage = "Error al eliminar la pasantía."
          console.error(err)
        }
      })
    }
  }

  resetForm(): void {
    this.pasantiaForm.reset({ estado: "Pendiente" })
    this.isEditing = false
    this.editingId = null
  }

  getEstudianteNombre(id: number): string {
    const estudiante = this.estudiantes.find((e) => e.id === id)
    return estudiante ? estudiante.name : "N/A"
  }

  getTutorNombre(id: number): string {
    const tutor = this.tutores.find((t) => t.id === id)
    return tutor ? tutor.name : "N/A"
  }
}
