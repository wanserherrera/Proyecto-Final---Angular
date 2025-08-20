// src/app/pages/cursos/cursos.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Cursos } from './cursos';        // <-- usar llaves, no default
import cursosRoutes from './cursos.routes'; // <-- tu rutas ya export default

@NgModule({
  imports: [
    CommonModule,
    Cursos,                        // componente standalone se importa así
    RouterModule.forChild(cursosRoutes)
  ]
})
export class CursosModule {}
