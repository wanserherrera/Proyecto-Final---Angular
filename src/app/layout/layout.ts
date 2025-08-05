// Proyecto realizado por Edilson Herrera.
// Componente: layout.ts
// Funcionalidad: Estructura principal de la aplicación con navbar lateral y toolbar superior. Contiene el router-outlet central.

import { Component, ViewChild } from '@angular/core';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { Toolbar } from './toolbar/toolbar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    RouterOutlet,
    Navbar,
    Toolbar
  ],
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav #sidenav class="sidenav" mode="side" [opened]="true">
        <app-navbar></app-navbar>
      </mat-sidenav>

      <mat-sidenav-content>
        <app-toolbar (toggleMenu)="sidenav.toggle()"></app-toolbar>
        <div class="contenido">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .sidenav-container {
      height: 100vh;
    }

    .sidenav {
      width: 220px;
    }

    .contenido {
      padding: 16px;
    }

    @media (max-width: 768px) {
      .sidenav {
        width: 180px;
      }
    }
  `]
})
export class Layout {
  @ViewChild('sidenav') sidenav!: MatSidenav;
}
