import { Component, EventEmitter, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule],
  template: `
    <mat-toolbar color="primary">
      <button mat-icon-button (click)="toggleMenu.emit()" class="menu-button">
        <mat-icon>menu</mat-icon>
      </button>
      <span>Gestor de Asistentes</span>
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
    }
  `]
})
export class Toolbar {
  @Output() toggleMenu = new EventEmitter<void>();
}
