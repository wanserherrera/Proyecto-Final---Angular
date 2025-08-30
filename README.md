Gestor de Asistentes - Proyecto Final

Autor: Edilson Wanser Herrera Villa
Fecha: Agosto 2025

## 🚀 Descripción del Proyecto

Esta aplicación web fue desarrollada para la gestión de asistentes, alumnos, cursos y usuarios, diferenciando el acceso según roles (admin y usuario).
Permite a los administradores realizar CRUD sobre alumnos, cursos y usuarios, mientras que los usuarios normales pueden consultar listados e inscribirse en cursos.

La aplicación fue desarrollada usando Angular Standalone Components, Angular Material, y Mock APIs para simular la persistencia de datos.

## 🚀 Tecnologías Utilizadas

- Frontend: Angular 17, TypeScript

- UI/Estilos: Angular Material, CSS

- Gestión de Estado: BehaviorSubject (para Alumnos), servicios Angular

- Routing: Angular Router con Guards (authGuard, roleGuard)

- Backend (simulado): Mock API (https://mockapi.io/) para Usuarios y Cursos

## 🚀 Funcionalidades
Para Administradores (admin):

- Gestionar Alumnos: Crear, editar, eliminar y listar.

- Gestionar Cursos: Crear, editar, eliminar y listar.

- Gestionar Usuarios: Crear, editar, eliminar y listar.

- Visualizar el nombre del usuario logueado y título de funcionalidad en la toolbar.

- Navegación segura con authGuard y roleGuard.

Para Usuarios Normales (usuario):

- Consultar listado de alumnos y cursos.

- Realizar inscripciones a cursos.

- Visualizar su nombre en la toolbar.

- Navegación protegida por authGuard.

## 🚀 Instalación y Ejecución
1.-Clonar el repositorio:
git clone 
2.-Instalar dependencias:
npm install
3.-Ejecutar la aplicación:
ng serve

## 🚀 Credenciales de Prueba
- Administrador:
Usuario: admin@ejemplo.com
Contraseña: 123456

- Usuario Normal:
Usuario: usuario@ejemplo.com
Contraseña: 123456
