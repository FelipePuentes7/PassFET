import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasantiasAdminComponent } from '../pasantias-admin/pasantias-admin';
// Import other components as they are created
// import { StudentsComponent } from '../students/students.component';
// import { TutorsComponent } from '../tutors/tutors.component';
// import { ReportsComponent } from '../reports/reports.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    PasantiasAdminComponent,
    // StudentsComponent,
    // TutorsComponent,
    // ReportsComponent
  ],
  template: `
    <div [ngSwitch]="activeView">
      <app-pasantias-admin *ngSwitchCase="'pasantias'"></app-pasantias-admin>
      <!-- <app-students *ngSwitchCase="'students'"></app-students> -->
      <!-- <app-tutors *ngSwitchCase="'tutors'"></app-tutors> -->
      <!-- <app-reports *ngSwitchCase="'reports'"></app-reports> -->
      <app-pasantias-admin *ngSwitchDefault></app-pasantias-admin>
    </div>
  `
})
export class AdminDashboardComponent {
  activeView: string = 'pasantias'; // Default view
}
