import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Curso } from '../../models/curso.model';
import { AuthService } from '../../services/auth.service';
import { CursoService } from '../../services/curso.service';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatInputModule, FormsModule, RouterModule],
  templateUrl: './cursos.html',
  styleUrls: ['./cursos.css']
})
export class Cursos implements OnInit {
  auth = inject(AuthService);
  private cursoService = inject(CursoService);

  cursos$!: Observable<Curso[]>;
  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'acciones'];

  // Campos para agregar/editar
  nuevoNombre = '';
  nuevaDescripcion = '';
  editId: string | null = null;

  ngOnInit(): void {
    this.refrescarCursos();
  }

  // Refrescar lista
  refrescarCursos() {
    this.cursos$ = this.cursoService.getCursos();
  }

  // Crear un curso
  agregarCurso() {
    if (!this.nuevoNombre.trim()) return;
    this.cursoService.createCurso({ nombre: this.nuevoNombre, descripcion: this.nuevaDescripcion })
      .subscribe(() => {
        this.nuevoNombre = '';
        this.nuevaDescripcion = '';
        this.refrescarCursos();
      });
  }

  // Preparar edición
  editarCurso(curso: Curso) {
    this.editId = curso.id;
    this.nuevoNombre = curso.nombre;
    this.nuevaDescripcion = curso.descripcion || '';
  }

  // Guardar edición
  guardarEdicion() {
    if (this.editId === null || !this.nuevoNombre.trim()) return;
    this.cursoService.updateCurso(this.editId, {
      id: this.editId,
      nombre: this.nuevoNombre,
      descripcion: this.nuevaDescripcion
    }).subscribe(() => {
      this.cancelarEdicion();
      this.refrescarCursos();
    });
  }

  // Cancelar edición
  cancelarEdicion() {
    this.editId = null;
    this.nuevoNombre = '';
    this.nuevaDescripcion = '';
  }

  // Eliminar curso
  eliminarCurso(id: string) {
    if (confirm('¿Seguro que desea eliminar este curso?')) {
      this.cursoService.deleteCurso(id).subscribe(() => this.refrescarCursos());
    }
  }
}
