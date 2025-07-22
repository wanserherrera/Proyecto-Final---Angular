// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { DummyHome } from './pages/home/home';
import { Alumnos } from './pages/alumnos/alumnos';
import { Login } from './pages/login/login';
import { roleGuard } from './guards/role.guard';
import { Listado } from './pages/listado/listado';
import { Inscripciones } from './pages/inscripciones/inscripciones';

export const routes: Routes = [
  { path: 'login', component: Login },

  {
    path: '',
    component: Layout,
    children: [
      { path: '', component: DummyHome },

      // ADMIN
      {
        path: 'alumnos',
        component: Alumnos,
        canActivate: [roleGuard],
        data: { role: 'admin' }
      },

      // USUARIO
      {
        path: 'listado',
        component: Listado,
        canActivate: [roleGuard],
        data: { role: 'usuario' }
      },
      {
        path: 'inscripciones',
        component: Inscripciones,
        canActivate: [roleGuard],
        data: { role: 'usuario' }
      }
    ]
  },

  { path: '**', redirectTo: 'login' }
];
