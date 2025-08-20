// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { authGuard } from './services/auth.guard';
import { roleGuard } from './services/role.guard';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },

  // Rutas solo para ADMIN
  {
    path: 'alumnos',
    loadChildren: () =>
      import('./pages/alumnos/alumnos.routes').then(m => m.default),
    canActivate: [authGuard, roleGuard],
    data: { role: 'admin' }
  },
  {
    path: 'usuarios',
    loadChildren: () =>
      import('./pages/usuarios/usuarios.routes').then(m => m.default),
    canActivate: [authGuard, roleGuard],
    data: { role: 'admin' }
  },
  {
    path: 'cursos',
    loadChildren: () =>
      import('./pages/cursos/cursos.routes').then(m => m.default),
    canActivate: [authGuard, roleGuard],
    data: { role: 'admin' }
  },

  // Rutas solo para USUARIO
  {
    path: 'listado',
    loadChildren: () =>
      import('./pages/listado/listado.routes').then(m => m.default),
    canActivate: [authGuard, roleGuard],
    data: { role: 'usuario' }
  },
  {
    path: 'inscripciones',
    loadChildren: () =>
      import('./pages/inscripciones/inscripciones.routes').then(m => m.default),
    canActivate: [authGuard, roleGuard],
    data: { role: 'usuario' }
  },

  { path: '**', redirectTo: 'login' }
];
