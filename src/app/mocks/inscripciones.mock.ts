// src/app/mocks/inscripciones.mock.ts

// Datos de alumnos
export const ALUMNOS_MOCK = [
  { id: 1, nombre: 'Juan Pérez' },
  { id: 2, nombre: 'María López' },
  { id: 3, nombre: 'Carlos Ruiz' }
];

// Datos de cursos
export const CURSOS_MOCK = [
  { id: 101, nombre: 'Angular' },
  { id: 102, nombre: 'React' },
  { id: 103, nombre: 'Vue' }
];

// Datos de inscripciones (relacionando alumno con curso)
export const INSCRIPCIONES_MOCK = [
  { id: 1, alumnoId: 1, cursoId: 101 },
  { id: 2, alumnoId: 2, cursoId: 102 },
  { id: 3, alumnoId: 3, cursoId: 103 }
];
