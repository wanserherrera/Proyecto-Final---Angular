// src/app/pages/login/login.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  constructor(private authService: AuthService, private router: Router) {}

  loginAs(role: 'admin' | 'usuario') {
    this.authService.login(role); 

    if (role === 'admin') {
      this.router.navigate(['/alumnos']);
    } else if (role === 'usuario') {
      this.router.navigate(['/listado']);
    }
  }
}
