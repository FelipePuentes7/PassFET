import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './registro.html',
  styleUrls: ['./registro.css']
})
export class Registro implements OnInit {
  registerForm!: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/@fet\.edu\.co$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', Validators.required],
      terms: [false, Validators.requiredTrue], // <-- AÑADIR ESTA LÍNEA
      rol: ['estudiante', Validators.required],
      documento: ['', Validators.required],
      telefono: [''],
      ciclo: [''],
      opcion_grado: [''],
      nombre_proyecto: [''],
      nombre_empresa: [''],
      codigo_estudiante: [''],
      codigo_institucional: ['']
    }, { validators: this.passwordMatchValidator });

    this.onRoleChange();
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('password_confirmation');
    return password && confirmPassword && password.value === confirmPassword.value ? null : { mismatch: true };
  }

  onRoleChange(): void {
    this.registerForm.get('rol')?.valueChanges.subscribe(rol => {
      const codigoEstudiante = this.registerForm.get('codigo_estudiante');
      const codigoInstitucional = this.registerForm.get('codigo_institucional');

      if (rol === 'estudiante') {
        codigoEstudiante?.setValidators([Validators.required, Validators.pattern(/^SOF/i)]);
        codigoInstitucional?.clearValidators();
      } else if (rol === 'tutor') {
        codigoInstitucional?.setValidators(Validators.required);
        codigoEstudiante?.clearValidators();
      }

      codigoEstudiante?.updateValueAndValidity();
      codigoInstitucional?.updateValueAndValidity();
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Por favor, completa todos los campos requeridos correctamente.';
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';

    this.authService.register(this.registerForm.value).subscribe({
      next: (response) => {
        this.successMessage = response.message;
        this.registerForm.reset();
        // Opcional: redirigir al login después de un registro exitoso
        // setTimeout(() => this.router.navigate(['/']), 2000);
      },
      error: (err) => {
        if (err.status === 422) {
          // Manejar errores de validación de Laravel
          const errors = err.error.errors;
          const firstError = Object.values(errors)[0] as string[];
          this.errorMessage = firstError[0];
        } else {
          this.errorMessage = 'Ocurrió un error en el servidor. Por favor, inténtalo de nuevo más tarde.';
        }
        console.error(err);
      }
    });
  }
}