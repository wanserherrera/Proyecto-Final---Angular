// src/app/layout/navbar/navbar.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
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
        <a mat-list-item routerLink="/cursos">Cursos</a>
        <a mat-list-item routerLink="/usuarios">Usuarios</a>
      </ng-container>

      <!-- USUARIO -->
      <ng-container *ngIf="esUsuario">
        <a mat-list-item routerLink="/">Inicio</a>
        <a mat-list-item routerLink="/listado">Listado Alumnos</a>
        <a mat-list-item routerLink="/inscripciones">Inscripciones</a>
      </ng-container>

      <button mat-button *ngIf="auth.isLoggedIn()" (click)="cerrarSesion()">Cerrar sesión</button>
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
  private router: Router = inject(Router);

  get esAdmin(): boolean {
    return this.auth.getCurrentRole() === 'admin';
  }

  get esUsuario(): boolean {
    return this.auth.getCurrentRole() === 'usuario';
  }

  cerrarSesion() {
    this.auth.logout();
    this.router.navigate(['/login']); // Redirige al login después de cerrar sesión
  }
}
