import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Entrega } from '../../../models/entrega.model';
import { StudentService } from '../../../services/student.service';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-grades-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grades-history.component.html',
  styleUrls: ['./grades-history.component.css']
})
export class GradesHistoryComponent implements OnInit {

  public history$!: Observable<Entrega[]>;
  public error: string | null = null;

  constructor(
    private studentService: StudentService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const studentId = this.authService.getUserId();
    if (studentId) {
      this.history$ = this.studentService.getGradesHistory(studentId);
    } else {
      this.error = 'No se pudo obtener el ID del estudiante.';
    }
  }
}
