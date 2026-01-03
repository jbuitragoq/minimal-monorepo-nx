import { Component, OnInit, OnDestroy } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Course, ApiService, CreateEnrollmentRequest } from '@minimal-monorepo/utils-common';
import { CourseCardComponent, ButtonComponent } from '@minimal-monorepo/ui-shared';
import { SimpleUserService } from '../../services/simple-user.service';

@Component({
    selector: 'courses-page',
    imports: [CourseCardComponent, ButtonComponent],
    templateUrl: './courses.html',
    styleUrl: './courses.scss'
})
export default class Courses implements OnInit, OnDestroy {

    public courses: Course[] = [];
    public loading = true;
    public error: string | null = null;
    public isEnrolling = false;
    public enrollmentStatus: { [courseId: string]: boolean } = {}; // Para trackear inscripciones

    private unsubscribe?: () => void;

    constructor(private readonly apiService: ApiService) { }

    ngOnInit(): void {
        this.loadCoursesAndEnrollments();

        // Suscribirse a cambios de usuario
        this.unsubscribe = SimpleUserService.subscribe(() => {
            // Cuando cambia el usuario, recargar los cursos para actualizar el estado
            this.loadCoursesAndEnrollments();
        });
    }

    ngOnDestroy(): void {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }

    private getCurrentStudentId(): string {
        return SimpleUserService.getCurrentUserId();
    }

    private loadCoursesAndEnrollments(): void {
        this.loading = true;
        this.error = null;
        const currentStudentId = this.getCurrentStudentId();

        this.apiService.getCourses().subscribe({
            next: (courses) => {
                this.courses = courses;
                // Para cada curso, verificar si el usuario está inscripto
                this.checkEnrollmentStatus(courses, currentStudentId);
            },
            error: (error) => {
                console.error('Error loading courses:', error);
                this.error = 'No se pudieron cargar los cursos. Verifica que el servidor esté ejecutándose.';
                this.loading = false;
            }
        });
    }

    private checkEnrollmentStatus(courses: Course[], studentId: string): void {
        const enrollmentChecks = courses.map(course =>
            this.apiService.isStudentEnrolledInCourse(studentId, course.id)
        );

        // Usar Promise.all para esperar todas las verificaciones
        Promise.all(enrollmentChecks.map(obs => lastValueFrom(obs))).then(results => {
            this.enrollmentStatus = {};
            courses.forEach((course, index) => {
                this.enrollmentStatus[course.id] = results[index] || false;
            });
            this.loading = false;
        }).catch(error => {
            console.error('Error checking enrollment status:', error);
            this.loading = false;
        });
    }

    isEnrolledInCourse(courseId: string): boolean {
        return this.enrollmentStatus[courseId] || false;
    }

    getButtonText(courseId: string): string {
        return this.isEnrolledInCourse(courseId) ? 'Ya inscripto' : 'Inscribirse';
    }

    getButtonVariant(courseId: string): "primary" | "secondary" | "success" | "danger" {
        return this.isEnrolledInCourse(courseId) ? 'secondary' : 'success';
    }

    canEnroll(courseId: string): boolean {
        return !this.isEnrolledInCourse(courseId) && !this.isEnrolling;
    }

    enrollInCourse(courseId: string): void {
        if (this.isEnrolling || this.isEnrolledInCourse(courseId)) return;

        this.isEnrolling = true;
        const currentStudentId = this.getCurrentStudentId();

        // Crear la inscripción directamente ya que sabemos que no está inscripto
        const enrollmentRequest: CreateEnrollmentRequest = {
            studentId: currentStudentId,
            courseId: courseId,
            date: new Date().toISOString().split('T')[0] // Formato YYYY-MM-DD
        };

        this.apiService.createEnrollment(enrollmentRequest).subscribe({
            next: () => {
                alert('¡Te has inscrito exitosamente en el curso!');
                this.isEnrolling = false;
                // Actualizar el estado local
                this.enrollmentStatus[courseId] = true;
            },
            error: (error) => {
                console.error('Error enrolling in course:', error);
                alert('Error al inscribirse en el curso. Inténtalo de nuevo.');
                this.isEnrolling = false;
            }
        });
    }
}