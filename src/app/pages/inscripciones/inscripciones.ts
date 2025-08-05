// src/app/pages/inscripciones/inscripciones.ts
// Proyecto realizado por Edilson Herrera.
// Componente: inscripciones.ts
// Funcionalidad: Gestiona la inscripción de alumnos a cursos mediante un formulario con selectores desplegables. Permite agregar y eliminar inscripciones.

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

import { ALUMNOS_MOCK, CURSOS_MOCK } from '../../mocks/inscripciones.mock';

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
  alumnos = ALUMNOS_MOCK;
  cursos = CURSOS_MOCK;

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
