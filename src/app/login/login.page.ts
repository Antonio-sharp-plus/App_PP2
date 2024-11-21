import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  recordarEmail: boolean = false;

  constructor(private navCtrl: NavController, private router: Router,  private afAuth: AngularFireAuth) {}

  ngOnInit() {
    // Carga el email si está guardado en localStorage
    const emailGuardadoVar = localStorage.getItem('emailGuardado');
    if (emailGuardadoVar) {
      this.email = emailGuardadoVar;
      this.recordarEmail = true;
    }
  }

  onSubmit() {
    // Valida que el email tenga un formato válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      alert('Por favor, ingresa un correo válido.');
      return; //se detiene el proceso si el email no es válido
    }

    // Valida que la contraseña no este vacía
    if (this.password.trim() === '') {
      alert('Por favor, ingresa una contraseña.');
      return;
    }

    this.afAuth.signInWithEmailAndPassword(this.email, this.password)
    .then(userCredential => {
      // Si el inicio de sesión es exitoso, redirige al usuario
      console.log('Usuario autenticado:', userCredential.user);
      
      // Si el checkbox está marcado, guarda el email en localStorage
      if (this.recordarEmail) {
        localStorage.setItem('emailGuardado', this.email);
      } else {
        localStorage.removeItem('emailGuardado');
      }

      // Redirige a la página principal
      this.navCtrl.navigateForward('/tabs/tab1');
    })
    .catch(error => {
      // Manejo de errores (por ejemplo, si las credenciales son incorrectas)
      console.error('Error de autenticación:', error);
      alert('Correo o contraseña incorrectos.');
    });
}

  goToRegister() {
    this.navCtrl.navigateForward('/register');
  }

  goToRestorePassword() {
    this.navCtrl.navigateForward('/restore-password');
  }
}
