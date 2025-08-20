// Proyecto realizado por Edilson Herrera.
// Componente: navbar.ts
// Funcionalidad: Barra lateral de navegación que muestra opciones distintas según el rol (admin o usuario). Incluye botón para cerrar sesión.

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatListModule, MatButtonModule],
  template: `
    <mat-nav-list>
      <!-- ADMIN -->
      <ng-container *ngIf="esAdmin">
        <a mat-list-item routerLink="/">Inicio</a>
        <a mat-list-item routerLink="/alumnos">Alumnos</a>
        <a mat-list-item routerLink="/cursos">Cursos</a> <!-- Solo admins -->
      </ng-container>

      <!-- USUARIO -->
      <ng-container *ngIf="esUsuario">
        <a mat-list-item routerLink="/">Inicio</a>
        <a mat-list-item routerLink="/listado">Listado Alumnos</a>
        <a mat-list-item routerLink="/inscripciones">Inscripciones</a>
      </ng-container>

      <button mat-button *ngIf="auth.rolActual" (click)="cerrarSesion()">Cerrar sesión</button>
    </mat-nav-list>
  `,
  styles: [`
    mat-nav-list {
      width: 200px;
    }
  `]
})
export class Navbar {
  auth: AuthService = inject(AuthService);

  // Variables para roles
  esAdmin = this.auth.rolActual === 'admin';
  esUsuario = this.auth.rolActual === 'usuario';

  cerrarSesion() {
    this.auth.logout();
  }
}
