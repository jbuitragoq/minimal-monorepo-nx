import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Course, CreateCourseRequest, UpdateCourseRequest, ApiService } from '@minimal-monorepo/utils-common';
import { TableComponent, ButtonComponent, CourseCardComponent } from '@minimal-monorepo/ui-shared';
import { TableAction, TableColumn } from 'packages/ui-shared/src/lib/core/interfaces/table.interfaces';

@Component({
    selector: 'course-management-page',
    imports: [FormsModule, TableComponent, ButtonComponent, CourseCardComponent],
    templateUrl: './course-management.html',
    styleUrl: './course-management.scss'
})
export default class CourseManagement implements OnInit {
    
    public courses: Course[] = [];
    public loading = true;
    public error: string | null = null;
    public isSubmitting = false;
    public editingCourse: Course | null = null;

    public courseForm: CreateCourseRequest = {
        title: '',
        description: '',
        teacher: ''
    };

    // Configuración de la tabla
    public tableColumns: TableColumn[] = [
        { key: 'title', label: 'Título', sortable: true },
        { key: 'teacher', label: 'Profesor', sortable: true },
        { key: 'description', label: 'Descripción' }
    ];

    public tableActions: TableAction[] = [
        {
            label: 'Editar',
            variant: 'primary',
            onClick: (course: Course) => this.editCourse(course)
        },
        {
            label: 'Eliminar',
            variant: 'danger',
            onClick: (course: Course) => this.deleteCourse(course)
        }
    ];

    private readonly apiService = inject(ApiService);

    ngOnInit(): void {
        this.loadCourses();
    }

    loadCourses(): void {
        this.loading = true;
        this.error = null;

        this.apiService.getCourses().subscribe({
            next: (courses) => {
                this.courses = courses;
                this.loading = false;
            },
            error: (error) => {
                console.error('Error loading courses:', error);
                this.error = 'No se pudieron cargar los cursos. Verifica que el servidor esté ejecutándose.';
                this.loading = false;
            }
        });
    }

    saveCourse(): void {
        if (this.isSubmitting) return;

        // Validar que todos los campos requeridos estén llenos
        if (!this.isFormValid()) {
            alert('Por favor, completa todos los campos requeridos.');
            return;
        }

        this.isSubmitting = true;

        if (this.editingCourse) {
            // Actualizar curso existente
            const updateRequest: UpdateCourseRequest = {
                title: this.courseForm.title,
                description: this.courseForm.description,
                teacher: this.courseForm.teacher
            };

            this.apiService.updateCourse(this.editingCourse.id, updateRequest).subscribe({
                next: () => {
                    alert('Curso actualizado exitosamente');
                    this.resetForm();
                    this.loadCourses();
                },
                error: (error) => {
                    console.error('Error updating course:', error);
                    alert('Error al actualizar el curso. Inténtalo de nuevo.');
                    this.isSubmitting = false;
                }
            });
        } else {
            // Crear nuevo curso
            this.apiService.createCourse(this.courseForm).subscribe({
                next: () => {
                    alert('Curso creado exitosamente');
                    this.resetForm();
                    this.loadCourses();
                },
                error: (error) => {
                    console.error('Error creating course:', error);
                    alert('Error al crear el curso. Inténtalo de nuevo.');
                    this.isSubmitting = false;
                }
            });
        }
    }

    editCourse(course: Course): void {
        this.editingCourse = course;
        this.courseForm = {
            title: course.title,
            description: course.description,
            teacher: course.teacher
        };
    }

    cancelEdit(): void {
        this.resetForm();
    }

    deleteCourse(course: Course): void {
        if (confirm(`¿Estás seguro de que quieres eliminar el curso "${course.title}"?`)) {
            this.apiService.deleteCourse(course.id).subscribe({
                next: () => {
                    alert('Curso eliminado exitosamente');
                    this.loadCourses();
                },
                error: (error) => {
                    console.error('Error deleting course:', error);
                    alert('Error al eliminar el curso. Inténtalo de nuevo.');
                }
            });
        }
    }

    isFormValid(): boolean {
        return !!(
            this.courseForm.title?.trim() &&
            this.courseForm.description?.trim() &&
            this.courseForm.teacher?.trim()
        );
    }

    private resetForm(): void {
        this.courseForm = {
            title: '',
            description: '',
            teacher: ''
        };
        this.editingCourse = null;
        this.isSubmitting = false;
    }

}