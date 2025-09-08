import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { Registro } from './auth/registro/registro';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'registro', component: Registro }
];