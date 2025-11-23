// C:\Users\felipe\Documents\PassFET\frontend\src\app\auth\recover-password\recover-password.component.ts

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common'; // Importación añadida

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink]
})
export class RecoverPasswordComponent {
  verificationForm: FormGroup;
  resetForm: FormGroup;
  
  verificationSuccess = false;
  isLoading = false;
  message: { type: 'success' | 'error', text: string } | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.verificationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      cedula: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      student_code: ['', [Validators.required]]
    });

    this.resetForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onVerify(): void {
    if (this.verificationForm.invalid) {
      this.verificationForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.message = null;

    this.authService.verifyRecovery(this.verificationForm.value).subscribe({
      next: () => {
        this.verificationSuccess = true;
        this.isLoading = false;
      },
      error: (err) => {
        this.message = { type: 'error', text: err.error.message || 'Error al conectar con el servidor.' };
        this.isLoading = false;
      }
    });
  }

  onReset(): void {
    if (this.resetForm.invalid) {
      this.resetForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.message = null;
    
    const fullData = {
      ...this.verificationForm.value,
      ...this.resetForm.value
    };

    this.authService.resetPassword(fullData).subscribe({
      next: (res) => {
        this.message = { type: 'success', text: res.message };
        this.isLoading = false;
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.message = { type: 'error', text: err.error.message || 'Error al actualizar la contraseña.' };
        this.isLoading = false;
      }
    });
  }
}
