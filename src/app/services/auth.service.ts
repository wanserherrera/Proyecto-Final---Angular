// src/app/services/auth.service.ts
// Proyecto realizado por Edilson Herrera.
// Servicio: AuthService
// Funcionalidad: Maneja login, logout y roles de usuario (admin | usuario).

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Guardamos el rol actual en memoria
  rolActual: 'admin' | 'usuario' | null = null;

  constructor(private router: Router) {}

  login(rol: 'admin' | 'usuario') {
    this.rolActual = rol;
    // Podríamos guardar en localStorage si quieres persistencia
    localStorage.setItem('rol', rol);
  }

  logout() {
    this.rolActual = null;
    localStorage.removeItem('rol');
    this.router.navigate(['/login']);
  }

  // Método que piden tus guards
  getCurrentRole(): 'admin' | 'usuario' | null {
    return this.rolActual || (localStorage.getItem('rol') as 'admin' | 'usuario' | null);
  }

  // Helper para saber si está logueado
  isLoggedIn(): boolean {
    return this.getCurrentRole() !== null;
  }
}
