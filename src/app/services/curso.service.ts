// src/app/services/curso.service.ts
// Proyecto realizado por Edilson Herrera
// Servicio: CursoService
// Funcionalidad: CRUD de cursos con datos locales simulados

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Curso } from '../models/curso.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  // Lista interna de cursos simulada
  private cursosSubject = new BehaviorSubject<Curso[]>([
    { id: 1, nombre: 'Matemáticas' },
    { id: 2, nombre: 'Historia' },
    { id: 3, nombre: 'Física' }
  ]);

  private nextId = 4; // Para asignar ID a nuevos cursos

  constructor() {}

  // Obtener todos los cursos
  getCursos(): Observable<Curso[]> {
    return this.cursosSubject.asObservable();
  }

  // Crear nuevo curso
  createCurso(curso: Curso): Observable<Curso> {
    const nuevosCursos = [...this.cursosSubject.getValue()];
    curso.id = this.nextId++;
    nuevosCursos.push(curso);
    this.cursosSubject.next(nuevosCursos);
    return of(curso);
  }

  // Actualizar curso existente
  updateCurso(curso: Curso): Observable<Curso> {
    const cursos = this.cursosSubject.getValue().map(c =>
      c.id === curso.id ? { ...c, nombre: curso.nombre } : c
    );
    this.cursosSubject.next(cursos);
    return of(curso);
  }

  // Eliminar curso por ID
  deleteCurso(id: number): Observable<void> {
    const cursos = this.cursosSubject.getValue().filter(c => c.id !== id);
    this.cursosSubject.next(cursos);
    return of();
  }
}
