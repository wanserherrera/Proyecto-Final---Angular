// src/app/guards/role.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const userRole = authService.getCurrentRole(); // 'admin' | 'usuario' | null
  const expectedRole = route.data?.['role'] as string;

  // Si no hay sesión iniciada, redirige al login
  if (!userRole) {
    router.navigate(['/login']);
    return false;
  }

  // Si hay rol requerido y no coincide, muestra alerta y redirige
  if (expectedRole && userRole !== expectedRole) {
    alert('Acceso denegado: Solo los ' + expectedRole + 's pueden ingresar a esta sección.');
    router.navigate(['/']); // Redirige al home o ruta raíz
    return false;
  }

  return true; // Acceso permitido
};
