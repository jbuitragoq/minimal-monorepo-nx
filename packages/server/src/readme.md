El servidor expone los siguientes endpoints para operar sobre los recursos principales:

domain: http://localhost:3000

### Cursos

- `GET    ${domain}/courses`         → Listar todos los cursos
- `GET    ${domain}/courses/:id`     → Obtener curso por ID
- `POST   ${domain}/courses`         → Crear nuevo curso
- `PUT    ${domain}/courses/:id`     → Actualizar curso existente
- `DELETE ${domain}/courses/:id`     → Eliminar curso

### Estudiantes

- `GET    ${domain}/students`        → Listar todos los estudiantes
- `GET    ${domain}/students/:id`    → Obtener estudiante por ID
- `POST   ${domain}/students`        → Crear nuevo estudiante
- `PUT    ${domain}/students/:id`    → Actualizar estudiante existente
- `DELETE ${domain}/students/:id`    → Eliminar estudiante

### Inscripciones

- `GET    ${domain}/enrollments`     → Listar todas las inscripciones
- `GET    ${domain}/enrollments/:id` → Obtener inscripción por ID
- `POST   ${domain}/enrollments`     → Crear nueva inscripción
- `PUT    ${domain}/enrollments/:id` → Actualizar inscripción existente
- `DELETE ${domain}/enrollments/:id` → Eliminar inscripción