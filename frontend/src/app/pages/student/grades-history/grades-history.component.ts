import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Entrega } from '../../../models/entrega.model';
import { StudentService } from '../../../services/student.service';
import { CommonModule } from '@angular/common'; // Importación necesaria

@Component({
  selector: 'app-grades-history',
  standalone: true, // Declarar como standalone
  imports: [CommonModule], // Importar CommonModule para directivas y pipes
  templateUrl: './grades-history.component.html',
})
export class GradesHistoryComponent implements OnInit {

  public history$!: Observable<Entrega[]>;

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.history$ = this.studentService.getGradesHistory();
  }

}
