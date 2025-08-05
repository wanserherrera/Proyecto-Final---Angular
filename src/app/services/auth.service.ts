// src/app/services/auth.service.ts
// Proyecto realizado por Edilson Herrera.
// Servicio: auth.service.ts
// Funcionalidad: Administra la autenticación basada en roles ("admin" o "usuario") y gestiona el inicio/cierre de sesión.

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public rolActual: 'admin' | 'usuario' | null = null;

  constructor(private router: Router) {
    // intenta recuperar el rol desde localStorage
    const rolGuardado = localStorage.getItem('rol');
    if (rolGuardado === 'admin' || rolGuardado === 'usuario') {
      this.rolActual = rolGuardado;
    }
  }

  login(rol: 'admin' | 'usuario') {
    this.rolActual = rol;
    localStorage.setItem('rol', rol); // Guardar en localStorage

    if (rol === 'admin') {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/listado']);
    }
  }

  logout() {
    this.rolActual = null;
    localStorage.removeItem('rol');
    this.router.navigate(['/login']);
  }

  getCurrentRole(): 'admin' | 'usuario' | null {
    return this.rolActual;
  }
}
