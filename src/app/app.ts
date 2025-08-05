// Proyecto realizado por Edilson Herrera.
// Componente: app.ts
// Funcionalidad: Root component que inicializa el sistema y redirige al login si no hay rol almacenado.

import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
})
export class App {
  constructor(router: Router) {
    const rol = localStorage.getItem('rol');
    if (!rol) {
      router.navigate(['/login']);
    }
  }
}
