import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Alumno } from '../../models/alumno.model';
import { AlumnoService } from '../../services/alumno.service';

@Component({
  selector: 'app-alumnos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatTableModule, MatButtonModule, MatInputModule],
  template: `
    <h2>Gestión de Alumnos</h2>

    <form [formGroup]="alumnoForm" (ngSubmit)="onSubmit()" class="form-container">

      <div>
        <input matInput placeholder="Nombre" formControlName="nombre" />
        <div class="error" *ngIf="alumnoForm.get('nombre')?.touched && alumnoForm.get('nombre')?.invalid">
          <small *ngIf="alumnoForm.get('nombre')?.errors?.['required']">El nombre es obligatorio.</small>
          <small *ngIf="alumnoForm.get('nombre')?.errors?.['minlength']">El nombre debe tener al menos 3 letras.</small>
        </div>
      </div>

      <div>
        <input matInput placeholder="Apellido" formControlName="apellido" />
        <div class="error" *ngIf="alumnoForm.get('apellido')?.touched && alumnoForm.get('apellido')?.invalid">
          <small *ngIf="alumnoForm.get('apellido')?.errors?.['required']">El apellido es obligatorio.</small>
          <small *ngIf="alumnoForm.get('apellido')?.errors?.['minlength']">El apellido debe tener al menos 3 letras.</small>
        </div>
      </div>

      <div>
        <input matInput placeholder="Email" formControlName="email" />
        <div class="error" *ngIf="alumnoForm.get('email')?.touched && alumnoForm.get('email')?.invalid">
          <small *ngIf="alumnoForm.get('email')?.errors?.['required']">El email es obligatorio.</small>
          <small *ngIf="alumnoForm.get('email')?.errors?.['email']">El email no es válido.</small>
        </div>
      </div>

      <button mat-raised-button color="primary" type="submit" [disabled]="alumnoForm.invalid">
        {{ editando ? 'Guardar Cambios' : 'Agregar Alumno' }}
      </button>
    </form>

    <br />

    <table mat-table [dataSource]="alumnos" class="mat-elevation-z8">
      <ng-container matColumnDef="id">
        <th mat-header-cell *matHeaderCellDef> ID </th>
        <td mat-cell *matCellDef="let alumno"> {{ alumno.id }} </td>
      </ng-container>

      <ng-container matColumnDef="nombre">
        <th mat-header-cell *matHeaderCellDef> Nombre </th>
        <td mat-cell *matCellDef="let alumno"> {{ alumno.nombre }} </td>
      </ng-container>

      <ng-container matColumnDef="apellido">
        <th mat-header-cell *matHeaderCellDef> Apellido </th>
        <td mat-cell *matCellDef="let alumno"> {{ alumno.apellido }} </td>
      </ng-container>

      <ng-container matColumnDef="email">
        <th mat-header-cell *matHeaderCellDef> Email </th>
        <td mat-cell *matCellDef="let alumno"> {{ alumno.email }} </td>
      </ng-container>

      <ng-container matColumnDef="acciones">
        <th mat-header-cell *matHeaderCellDef> Acciones </th>
        <td mat-cell *matCellDef="let alumno">
          <button mat-button color="accent" (click)="editar(alumno)">Editar</button>
          <button mat-button color="warn" (click)="eliminar(alumno.id)">Eliminar</button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
  `,
  styles: [`
    .form-container {
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-width: 400px;
    }
    .error {
      color: red;
      font-size: 12px;
    }
  `]
})
export class Alumnos implements OnInit {
  alumnos: Alumno[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'email', 'acciones'];
  alumnoForm!: FormGroup;
  editando = false;
  alumnoEditandoId: number | null = null;

  constructor(private fb: FormBuilder, private alumnoService: AlumnoService) {}

  ngOnInit(): void {
    this.alumnoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
    });

    this.alumnoService.getAlumnos().subscribe(data => {
      this.alumnos = data;
    });
  }

  onSubmit(): void {
    if (this.alumnoForm.invalid) return;

    const nuevoAlumno: Alumno = {
      id: this.alumnoEditandoId ?? 0,
      ...this.alumnoForm.value,
    };

    if (this.editando) {
      this.alumnoService.editarAlumno(nuevoAlumno);
      this.editando = false;
      this.alumnoEditandoId = null;
    } else {
      this.alumnoService.agregarAlumno(nuevoAlumno);
    }

    this.alumnoForm.reset();
  }

  editar(alumno: Alumno): void {
    this.editando = true;
    this.alumnoEditandoId = alumno.id;
    this.alumnoForm.setValue({
      nombre: alumno.nombre,
      apellido: alumno.apellido,
      email: alumno.email,
    });
  }

  eliminar(id: number): void {
    this.alumnoService.eliminarAlumno(id);
  }
}
