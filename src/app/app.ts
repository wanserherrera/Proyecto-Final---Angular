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
