// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

interface Usuario {
  id: string;
  email: string;
  password: string;
  nombre: string;
  rol: 'admin' | 'usuario';
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'https://68b22452a860fe41fd606dbe.mockapi.io/usuarios';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<boolean> {
    return this.http.get<Usuario[]>(this.apiUrl).pipe(
      map(users => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          return true;
        }
        return false;
      })
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): Usuario | null {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  getCurrentRole(): 'admin' | 'usuario' | null {
    const user = this.getCurrentUser();
    return user ? user.rol : null;
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }
}
