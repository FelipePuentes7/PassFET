import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { Registro } from './auth/registro/registro';
import { PasantiasAdminComponent } from './components/admin/pasantias-admin/pasantias-admin';
import { VistaTutorComponent } from './components/tutor/vista-tutor/vista-tutor';
import { StudentViewComponent } from './components/student-view/student-view.component';
import { GradesHistoryComponent } from './pages/student/grades-history/grades-history.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: Registro },
  { path: 'admin/pasantias', component: PasantiasAdminComponent },
  { path: 'admin/tutor', component: VistaTutorComponent },
  { path: 'student/dashboard', component: StudentViewComponent },
  { path: 'student/historial', component: GradesHistoryComponent }, // Nueva ruta

  // Redirect root to login
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' } // Wildcard route for a 404-like behavior
];