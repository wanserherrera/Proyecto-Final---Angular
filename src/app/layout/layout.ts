// src/app/pages/layout/layout.ts
// Proyecto realizado por Edilson Herrera.
// Componente: layout.ts
// Funcionalidad: Estructura principal de la aplicación con navbar lateral y toolbar superior. Contiene el router-outlet central.

import { Component, ViewChild } from '@angular/core';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, RouterOutlet } from '@angular/router';
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
    RouterModule,
    Navbar,
    Toolbar
  ],
  templateUrl: './layout.html',
  styleUrls: ['./layout.css']
})
export class Layout {
  @ViewChild('sidenav') sidenav!: MatSidenav;
}
