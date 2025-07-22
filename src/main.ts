// src/main.ts
import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app'; 
import { Router } from '@angular/router';

bootstrapApplication(App, appConfig)
  .then(appRef => {
    const router = appRef.injector.get(Router);
    const rol = localStorage.getItem('rol');

    if (!rol) {
      router.navigate(['/login']);
    }
  })
  .catch(err => console.error(err));
