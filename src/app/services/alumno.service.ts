// src/app/services/alumno.service.ts
// Proyecto realizado por Edilson Herrera.
// Servicio: alumno.service.ts
// Funcionalidad: Proporciona un listado simulado de alumnos para consumirlo en los componentes mediante observables.

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Alumno } from '../models/alumno.model';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  private alumnos: Alumno[] = [
    { id: 1, nombre: 'Juan Pérez', email: 'juan@example.com' },
    { id: 2, nombre: 'Ana Torres', email: 'ana@example.com' },
    { id: 3, nombre: 'Luis García', email: 'luis@example.com' }
  ];

  getAlumnos(): Observable<Alumno[]> {
    return of(this.alumnos);
  }
}
