import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

interface Alumno {
  id: number;
  nombre: string;
}

interface Curso {
  id: number;
  nombre: string;
}

interface Inscripcion {
  alumno: Alumno;
  curso: Curso;
}

@Component({
  selector: 'app-inscripciones',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatListModule
  ],
  templateUrl: './inscripciones.html',
  styleUrls: ['./inscripciones.css']
})
export class Inscripciones {
  alumnos: Alumno[] = [
    { id: 1, nombre: 'Juan Pérez' },
    { id: 2, nombre: 'María López' },
    { id: 3, nombre: 'Carlos Ruiz' }
  ];

  cursos: Curso[] = [
    { id: 101, nombre: 'Angular' },
    { id: 102, nombre: 'React' },
    { id: 103, nombre: 'Vue' }
  ];

  alumnoSeleccionado: Alumno | null = null;
  cursoSeleccionado: Curso | null = null;

  inscripciones: Inscripcion[] = [];

  agregarInscripcion() {
    if (!this.alumnoSeleccionado || !this.cursoSeleccionado) {
      alert('Seleccione alumno y curso');
      return;
    }

    const yaExiste = this.inscripciones.some(
      i =>
        i.alumno.id === this.alumnoSeleccionado!.id &&
        i.curso.id === this.cursoSeleccionado!.id
    );

    if (yaExiste) {
      alert('Esta inscripción ya existe');
      return;
    }

    this.inscripciones.push({
      alumno: this.alumnoSeleccionado,
      curso: this.cursoSeleccionado
    });

    // Limpiar selección
    this.alumnoSeleccionado = null;
    this.cursoSeleccionado = null;
  }

  eliminarInscripcion(inscripcion: Inscripcion) {
    this.inscripciones = this.inscripciones.filter(i => i !== inscripcion);
  }
}
