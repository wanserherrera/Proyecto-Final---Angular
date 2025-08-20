// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { authGuard } from './services/auth.guard';
import { roleGuard } from './services/role.guard';
import { Layout } from './layout/layout';

export const routes: Routes = [
  // Ruta de login
  { path: 'login', component: Login },

  // Ruta principal con Layout (navbar + toolbar)
  {
    path: '',
    component: Layout,
    canActivate: [authGuard], // el guard principal
    children: [
      // Rutas solo para ADMIN
      {
        path: 'alumnos',
        loadChildren: () =>
          import('./pages/alumnos/alumnos.routes').then(m => m.default),
        canActivate: [roleGuard],
        data: { role: 'admin' }
      },
      {
        path: 'usuarios',
        loadChildren: () =>
          import('./pages/usuarios/usuarios.routes').then(m => m.default),
        canActivate: [roleGuard],
        data: { role: 'admin' }
      },
      {
        path: 'cursos',
        loadChildren: () =>
          import('./pages/cursos/cursos.routes').then(m => m.default),
        canActivate: [roleGuard],
        data: { role: 'admin' }
      },

      // Rutas solo para USUARIO
      {
        path: 'listado',
        loadChildren: () =>
          import('./pages/listado/listado.routes').then(m => m.default),
        canActivate: [roleGuard],
        data: { role: 'usuario' }
      },
      {
        path: 'inscripciones',
        loadChildren: () =>
          import('./pages/inscripciones/inscripciones.routes').then(m => m.default),
        canActivate: [roleGuard],
        data: { role: 'usuario' }
      },

      // Ruta por defecto dentro del Layout
      { path: '', redirectTo: 'listado', pathMatch: 'full' }
    ]
  },

  // Redirección global para rutas no encontradas
  { path: '**', redirectTo: 'login' }
];
