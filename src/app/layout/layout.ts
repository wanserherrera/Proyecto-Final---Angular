// src/app/layout/layout.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar'; 

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, Navbar],
  template: `
    <app-navbar></app-navbar>
    <main class="contenido">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .contenido {
      padding: 16px;
    }
  `]
})
export class Layout {}
