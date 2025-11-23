import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Report {
  student: string;
  tutor: string;
  submissions: number;
  task_status: string;
}

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  reports: Report[] = [
    { student: 'Juan Perez', tutor: 'Dr. Garcia', submissions: 5, task_status: 'Completado' },
    { student: 'Ana Gomez', tutor: 'Dra. Martinez', submissions: 3, task_status: 'En Progreso' },
  ];
  isLoading = false;
  error: string | null = null;

  constructor() {}

  ngOnInit(): void {
    // Here you would load reports from a service
  }
}