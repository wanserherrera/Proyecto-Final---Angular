// src/app/layout/toolbar/toolbar.ts
// Proyecto realizado por Edilson Herrera.
// Componente: toolbar.ts
// Funcionalidad: Barra superior que muestra el nombre de la aplicación, título de la página y usuario logueado.

import { Component, EventEmitter, Output, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule],
  template: `
    <mat-toolbar color="primary">
      <button mat-icon-button (click)="toggleMenu.emit()" class="menu-button">
        <mat-icon>menu</mat-icon>
      </button>

      <span class="app-name">Gestor de Asistentes</span>
      <span class="page-title">{{ titulo }}</span>
      <span class="spacer"></span>
      <span *ngIf="usuario">{{ usuario?.nombre }}</span>
    </mat-toolbar>
  `,
  styles: [`
    .menu-button {
      display: none;
    }

    @media (max-width: 768px) {
      .menu-button {
        display: inline-flex;
      }
    }

    mat-toolbar {
      position: sticky;
      top: 0;
      z-index: 1000;
      display: flex;
      align-items: center;
    }

    .app-name {
      font-weight: bold;
      margin-right: 20px;
    }

    .page-title {
      font-size: 16px;
    }

    .spacer {
      flex: 1 1 auto;
    }
  `]
})
export class Toolbar implements OnInit {
  @Output() toggleMenu = new EventEmitter<void>();

  auth = inject(AuthService);
  router = inject(Router);

  usuario = this.auth.getCurrentUser();
  titulo: string = '';

  ngOnInit(): void {
    // Actualizar título según la ruta
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const url = this.router.url;

        switch (true) {
          case url.includes('alumnos'):
            this.titulo = 'Gestión de Alumnos';
            break;
          case url.includes('usuarios'):
            this.titulo = 'Gestión de Usuarios';
            break;
          case url.includes('cursos'):
            this.titulo = 'Gestión de Cursos';
            break;
          case url.includes('listado'):
            this.titulo = 'Listado de Alumnos';
            break;
          case url.includes('inscripciones'):
            this.titulo = 'Inscripciones';
            break;
          default:
            this.titulo = '';
        }
      });
  }
}
