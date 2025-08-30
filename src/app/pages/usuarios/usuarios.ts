// src/app/pages/usuarios/usuarios.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatTableModule, MatButtonModule, MatInputModule],
  template: `
    <h2>Gestión de Usuarios</h2>

    <form [formGroup]="usuarioForm" (ngSubmit)="onSubmit()" class="form-container">
      <div>
        <input matInput placeholder="Nombre" formControlName="nombre" />
        <div class="error" *ngIf="usuarioForm.get('nombre')?.touched && usuarioForm.get('nombre')?.invalid">
          <small *ngIf="usuarioForm.get('nombre')?.errors?.['required']">El nombre es obligatorio.</small>
        </div>
      </div>

      <div>
        <input matInput placeholder="Email" formControlName="email" />
        <div class="error" *ngIf="usuarioForm.get('email')?.touched && usuarioForm.get('email')?.invalid">
          <small *ngIf="usuarioForm.get('email')?.errors?.['required']">El email es obligatorio.</small>
          <small *ngIf="usuarioForm.get('email')?.errors?.['email']">El email no es válido.</small>
        </div>
      </div>

      <div>
        <select matInput formControlName="rol">
          <option value="admin">Admin</option>
          <option value="usuario">Usuario</option>
        </select>
      </div>

      <button mat-raised-button color="primary" type="submit" [disabled]="usuarioForm.invalid">
        {{ editando ? 'Guardar Cambios' : 'Agregar Usuario' }}
      </button>
      <button mat-button type="button" (click)="cancelar()" *ngIf="editando">Cancelar</button>
    </form>

    <br />

    <table mat-table [dataSource]="usuarios" class="mat-elevation-z8">
      <ng-container matColumnDef="nombre">
        <th mat-header-cell *matHeaderCellDef>Nombre</th>
        <td mat-cell *matCellDef="let usuario">{{ usuario.nombre }}</td>
      </ng-container>

      <ng-container matColumnDef="email">
        <th mat-header-cell *matHeaderCellDef>Email</th>
        <td mat-cell *matCellDef="let usuario">{{ usuario.email }}</td>
      </ng-container>

      <ng-container matColumnDef="rol">
        <th mat-header-cell *matHeaderCellDef>Rol</th>
        <td mat-cell *matCellDef="let usuario">{{ usuario.rol }}</td>
      </ng-container>

      <ng-container matColumnDef="acciones">
        <th mat-header-cell *matHeaderCellDef>Acciones</th>
        <td mat-cell *matCellDef="let usuario">
          <button mat-button color="accent" (click)="editar(usuario)">Editar</button>
          <button mat-button color="warn" (click)="eliminar(usuario.id)">Eliminar</button>
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
export class Usuarios implements OnInit {
  usuarioForm!: FormGroup;
  usuarios: Usuario[] = [];
  displayedColumns: string[] = ['nombre', 'email', 'rol', 'acciones'];

  editando = false;
  editId: string | null = null;

  private fb: FormBuilder = inject(FormBuilder);
  private usuarioService: UsuarioService = inject(UsuarioService);

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      rol: ['usuario', [Validators.required]]
    });

    this.refrescarUsuarios();
  }

  refrescarUsuarios() {
    this.usuarioService.getUsuarios().subscribe(data => this.usuarios = data);
  }

  onSubmit() {
    if (this.usuarioForm.invalid) return;

    const usuarioPayload: Usuario = this.usuarioForm.value;

    if (this.editando && this.editId) {
      this.usuarioService.actualizarUsuario(this.editId, usuarioPayload).subscribe(() => {
        this.refrescarUsuarios();
        this.cancelar();
      });
    } else {
      this.usuarioService.crearUsuario(usuarioPayload).subscribe(() => {
        this.refrescarUsuarios();
        this.usuarioForm.reset({ rol: 'usuario' });
      });
    }
  }

  editar(usuario: Usuario) {
    if (!usuario.id) return; // asegura que exista el id
    this.editando = true;
    this.editId = usuario.id.toString();
    this.usuarioForm.setValue({
      nombre: usuario.nombre ?? '',
      email: usuario.email ?? '',
      rol: usuario.rol ?? 'usuario'
    });
  }

  eliminar(id?: string) {
    if (!id) return;
    if (confirm('¿Desea eliminar este usuario?')) {
      this.usuarioService.eliminarUsuario(id).subscribe(() => this.refrescarUsuarios());
    }
  }

  cancelar() {
    this.editando = false;
    this.editId = null;
    this.usuarioForm.reset({ rol: 'usuario' });
  }
}
