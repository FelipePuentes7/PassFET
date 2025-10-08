import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { Registro } from './auth/registro/registro';
import { PasantiasAdminComponent } from './components/admin/pasantias-admin/pasantias-admin';
import { AdminLayoutComponent } from './layouts/admin-layout';

export const routes: Routes = [
  // Public routes (no layout)
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: Registro },

  // Admin routes (wrapped in AdminLayoutComponent)
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: 'pasantias', component: PasantiasAdminComponent },
      // Future admin routes can be added here
      { path: '', redirectTo: 'pasantias', pathMatch: 'full' } // Default admin route
    ]
  },

  // Redirect root to login
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // Wildcard route for 404s can be added later
  // { path: '**', component: NotFoundComponent },
];