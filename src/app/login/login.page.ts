import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit{
  email: string = '';
  password: string = '';
  recordarEmail: boolean = false;
  

  constructor(private navCtrl: NavController,
    private router: Router
  ) {}

  ngOnInit() {
    // Cargar el email si está guardado en localStorage
    const emailGuardadoVar = localStorage.getItem('emailGuardado');
    if (emailGuardadoVar) {
      this.email = emailGuardadoVar;
      this.recordarEmail = true;
    }
  }

  onSubmit() {
    // logica de autenticacion
    console.log('Correo:', this.email);
    console.log('Contraseña:', this.password);

    // Si el checkbox está marcado, guarda el email en localStorage
    if (this.recordarEmail) {
    localStorage.setItem('emailGuardado', this.email);
    } else {
      localStorage.removeItem('emailGuardado');
    }
      
    // Lógica adicional para iniciar sesión
    console.log('Iniciar sesión con:', this.email);
    // redireccion si la autenticacion esta bien
    this.navCtrl.navigateForward('/tabs');
  }
  goToRegister() {
    this.navCtrl.navigateForward('/register');
  }
  goToRestorePassword(){
    this.navCtrl.navigateForward('/restore-password');
  }
}
