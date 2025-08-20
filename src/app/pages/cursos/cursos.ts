// src/app/pages/cursos/cursos.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Curso } from '../../models/curso.model';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatInputModule, FormsModule, RouterModule],
  templateUrl: './cursos.html',
  styleUrls: ['./cursos.css']
})
export class Cursos {
  auth = inject(AuthService);

  // Lista interna simulando backend
  private cursosSubject = new BehaviorSubject<Curso[]>([
    { id: 1, nombre: 'Matemáticas' },
    { id: 2, nombre: 'Física' },
    { id: 3, nombre: 'Química' }
  ]);

  cursos$: Observable<Curso[]> = this.cursosSubject.asObservable().pipe(map(c => c ?? []));

  displayedColumns: string[] = ['id', 'nombre', 'acciones'];

  // Campos para agregar/editar
  nuevoNombre = '';
  editId: number | null = null;

  // Crear un curso
  agregarCurso() {
    if (!this.nuevoNombre.trim()) return;
    const cursos = this.cursosSubject.value;
    const nuevoCurso: Curso = {
      id: cursos.length ? Math.max(...cursos.map(c => c.id)) + 1 : 1,
      nombre: this.nuevoNombre
    };
    this.cursosSubject.next([...cursos, nuevoCurso]);
    this.nuevoNombre = '';
  }

  // Preparar edición
  editarCurso(curso: Curso) {
    this.editId = curso.id;
    this.nuevoNombre = curso.nombre;
  }

  // Guardar edición
  guardarEdicion() {
    if (this.editId === null || !this.nuevoNombre.trim()) return;
    const cursos = this.cursosSubject.value.map(c =>
      c.id === this.editId ? { ...c, nombre: this.nuevoNombre } : c
    );
    this.cursosSubject.next(cursos);
    this.editId = null;
    this.nuevoNombre = '';
  }

  // Cancelar edición
  cancelarEdicion() {
    this.editId = null;
    this.nuevoNombre = '';
  }

  // Eliminar curso
  eliminarCurso(id: number) {
    if (confirm('¿Seguro que desea eliminar este curso?')) {
      const cursos = this.cursosSubject.value.filter(c => c.id !== id);
      this.cursosSubject.next(cursos);
    }
  }
}
