// src/app/pages/listado/listado.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Alumno } from '../../models/alumno.model';
import { AlumnoService } from '../../services/alumno.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './listado.html',
  styleUrls: ['./listado.css']
})
export class Listado {
  alumnos$: Observable<Alumno[]>;

  displayedColumns: string[] = ['id', 'nombre', 'email'];

  constructor(private alumnoService: AlumnoService) {
    this.alumnos$ = this.alumnoService.getAlumnos().pipe(
      map(alumnos => alumnos ?? [])
    );
  }
}
