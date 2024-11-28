import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, onAuthStateChanged } from '@angular/fire/auth';
import { User } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  usuarioActual: User | null = null;

  constructor(private auth: Auth) {}

  async login(email: string, password: string): Promise<string | null> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      return userCredential.user.email; // Devuelve el email si el login es exitoso
    } catch (error: any) {
      // errores
      switch (error.code) {
        case 'auth/user-not-found':
          throw new Error('Usuario no encontrado.');
        case 'auth/wrong-password':
          throw new Error('Contraseña incorrecta.');
        default:
          throw new Error('Email o Contraseña incorrecta.');
      }
    }
  }

  async isLoggedIn(): Promise<boolean> {
    return new Promise((resolve) => {
      onAuthStateChanged(this.auth, (user) => {
        resolve(!!user); // Devuelve true si el usuario está autenticado
      });
    });
  }

  getUsuarioActual(): User | null {
    return this.usuarioActual;
  }
}