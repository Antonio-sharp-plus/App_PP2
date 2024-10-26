import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  email: string = '';
  password: string = '';

  constructor(private afAuth: AngularFireAuth, private navCtrl: NavController) {}

  async onRegister() {
    try {
      const user = await this.afAuth.createUserWithEmailAndPassword(this.email, this.password);
      console.log('Usuario registrado:', user);
      
      // Redirige al usuario a la pantalla de inicio de sesión después de registrarse
      this.navCtrl.navigateRoot('/login');
    } catch (error) {
      console.error('Error en el registro:', error);
    }
  }
}
