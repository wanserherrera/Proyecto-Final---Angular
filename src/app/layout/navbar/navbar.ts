// Proyecto realizado por Edilson Herrera.
// src/app/layout/navbar/navbar.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule],
  template: `
    <mat-toolbar color="primary">
      <span>Gestor de Asistentes</span>
      <span class="spacer"></span>

      <!-- ADMIN -->
      <ng-container *ngIf="auth.rolActual === 'admin'">
        <a mat-button routerLink="/">Inicio</a>
        <a mat-button routerLink="/alumnos">Alumnos</a>
      </ng-container>

      <!-- USUARIO -->
      <ng-container *ngIf="auth.rolActual === 'usuario'">
        <a mat-button routerLink="/">Inicio</a>
        <a mat-button routerLink="/listado">Listado</a>
        <a mat-button routerLink="/inscripciones">Inscripciones</a>
      </ng-container>

      <!-- Cerrar sesión -->
      <button mat-button *ngIf="auth.rolActual" (click)="cerrarSesion()">Cerrar sesión</button>
    </mat-toolbar>
  `,
  styles: [`.spacer { flex: 1 1 auto; }`]
})
export class Navbar {
  auth: AuthService = inject(AuthService); // tipado explícito para evitar errores

  cerrarSesion() {
    this.auth.logout();
  }
}
