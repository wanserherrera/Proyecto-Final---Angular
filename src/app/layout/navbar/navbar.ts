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
      <ng-container *ngIf="auth.rolActual === 'admin'">
        <a mat-list-item routerLink="/">Inicio</a>
        <a mat-list-item routerLink="/alumnos">Alumnos</a>
      </ng-container>

      <!-- USUARIO -->
      <ng-container *ngIf="auth.rolActual === 'usuario'">
        <a mat-list-item routerLink="/">Inicio</a>
        <a mat-list-item routerLink="/listado">Listado</a>
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

  cerrarSesion() {
    this.auth.logout();
  }
}
