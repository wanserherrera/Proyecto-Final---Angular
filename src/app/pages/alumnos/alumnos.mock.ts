export interface Alumno {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  curso: string;
}

export const ALUMNOS_MOCK: Alumno[] = [
  { id: 1, nombre: 'Juan', apellido: 'Pérez', correo: 'juan@mail.com', curso: 'Angular' },
  { id: 2, nombre: 'María', apellido: 'Gómez', correo: 'maria@mail.com', curso: 'React' },
  { id: 3, nombre: 'Pedro', apellido: 'Ramírez', correo: 'pedro@mail.com', curso: 'Vue' }
];
