import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorService } from '../../../services/tutor.service';
import { Pasantia } from '../../../models/pasantia.model';

@Component({
  selector: 'app-vista-tutor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-tutor.html',
  styleUrls: ['./vista-tutor.css']
})
export class VistaTutorComponent implements OnInit {
  pasantias: Pasantia[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private tutorService: TutorService) { }

  ngOnInit(): void {
    this.tutorService.getMisPasantias().subscribe({
      next: (data) => {
        this.pasantias = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar las pasantías. Por favor, intente más tarde.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }
}