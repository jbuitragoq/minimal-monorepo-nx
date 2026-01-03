import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Course, EnrollmentWithDetails, ApiService } from '@minimal-monorepo/utils-common';
import { TableComponent, ButtonComponent } from '@minimal-monorepo/ui-shared';
import { TableColumn } from 'packages/ui-shared/src/lib/core/interfaces/table.interfaces';

@Component({
    selector: 'course-enrollments-page',
    imports: [FormsModule, TableComponent, ButtonComponent],
    templateUrl: './course-enrollments.html',
    styleUrl: './course-enrollments.scss'
})
export default class CourseEnrollments implements OnInit {

    public courses: Course[] = [];
    public enrollments: EnrollmentWithDetails[] = [];
    public selectedCourseId = '';
    public selectedCourse: Course | null = null;
    public loadingCourses = true;
    public loadingEnrollments = false;
    public error: string | null = null;

    // Configuración de la tabla
    public tableColumns: TableColumn[] = [
        { key: 'student.name', label: 'Nombre del Estudiante', sortable: true },
        { key: 'student.email', label: 'Email', sortable: true },
        { key: 'date', label: 'Fecha de Inscripción', sortable: true }
    ];

    private readonly apiService = inject(ApiService);

    ngOnInit(): void {
        this.loadCourses();
    }

    loadCourses(): void {
        this.loadingCourses = true;
        this.error = null;

        this.apiService.getCourses().subscribe({
            next: (courses) => {
                this.courses = courses;
                this.loadingCourses = false;
            },
            error: (error) => {
                console.error('Error loading courses:', error);
                this.error = 'No se pudieron cargar los cursos. Verifica que el servidor esté ejecutándose.';
                this.loadingCourses = false;
            }
        });
    }

    onCourseChange(): void {
        if (this.selectedCourseId) {
            this.selectedCourse = this.courses.find(c => c.id === this.selectedCourseId) || null;
            this.loadEnrollments();
        } else {
            this.selectedCourse = null;
            this.enrollments = [];
        }
    }

    loadEnrollments(): void {
        if (!this.selectedCourseId) return;

        this.loadingEnrollments = true;
        this.error = null;

        this.apiService.getCourseEnrollmentsWithDetails(this.selectedCourseId).subscribe({
            next: (enrollments) => {
                this.enrollments = enrollments;
                this.loadingEnrollments = false;
            },
            error: (error) => {
                console.error('Error loading enrollments:', error);
                this.error = 'No se pudieron cargar las inscripciones del curso.';
                this.loadingEnrollments = false;
            }
        });
    }
}