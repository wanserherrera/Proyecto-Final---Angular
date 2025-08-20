import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Alumno } from '../models/alumno.model';

@Injectable({
  providedIn: 'root',
})
export class AlumnoService {
  private alumnos: Alumno[] = [
    { id: 1, nombre: 'Juan', apellido: 'Pérez', email: 'juan@test.com' },
    { id: 2, nombre: 'María', apellido: 'García', email: 'maria@test.com' },
  ];

  private alumnosSubject = new BehaviorSubject<Alumno[]>(this.alumnos);

  getAlumnos(): Observable<Alumno[]> {
    return this.alumnosSubject.asObservable();
  }

  agregarAlumno(alumno: Alumno): void {
    alumno.id = this.alumnos.length > 0 ? Math.max(...this.alumnos.map(a => a.id)) + 1 : 1;
    this.alumnos.push(alumno);
    this.alumnosSubject.next([...this.alumnos]);
  }

  editarAlumno(alumno: Alumno): void {
    const index = this.alumnos.findIndex(a => a.id === alumno.id);
    if (index !== -1) {
      this.alumnos[index] = alumno;
      this.alumnosSubject.next([...this.alumnos]);
    }
  }

  eliminarAlumno(id: number): void {
    this.alumnos = this.alumnos.filter(a => a.id !== id);
    this.alumnosSubject.next([...this.alumnos]);
  }
}
