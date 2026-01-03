import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService, Student } from '@minimal-monorepo/utils-common';
import { SimpleUserService } from './services/simple-user.service';

@Component({
  imports: [RouterModule, CommonModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {

  protected title = 'Plataforma de Estudiantes';
  public students: Student[] = [];
  public currentStudentId = '1'; // Valor por defecto simple

  constructor(private readonly apiService: ApiService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  private loadStudents(): void {
    this.apiService.getStudents().subscribe({
      next: (students) => {
        this.students = students;
        // Si hay estudiantes, seleccionar el primero por defecto
        if (students.length > 0) {
          this.currentStudentId = students[0].id;
          SimpleUserService.setCurrentUserId(this.currentStudentId);
        }
      },
      error: (error) => {
        console.error('Error loading students:', error);
      }
    });
  }

  onStudentChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.currentStudentId = target.value;
    SimpleUserService.setCurrentUserId(this.currentStudentId);
  }
}