import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';  // Importa el servicio de autenticación

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.page.html',
  styleUrls: ['./restore-password.page.scss'],
})
export class RestorePasswordPage implements OnInit {
  email: string = '';

  constructor(
    private navCtrl: NavController,
    private afAuth: AngularFireAuth  // Inyecta el servicio de autenticación
  ) { }

  ngOnInit() {}

  // Función para restablecer la contraseña
  onRestore() {
    // Validar que el email tenga un formato válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      alert('Por favor, ingresa un correo válido.');
      return; // Detener el proceso si el email no es válido
    }

    // Enviar el correo de restablecimiento de contraseña
    this.afAuth.sendPasswordResetEmail(this.email)
      .then(() => {
        // Si el correo fue enviado, muestra un mensaje de éxito
        alert('Te hemos enviado un enlace para restablecer tu contraseña. Revisa tu correo.');
        this.navCtrl.navigateForward('/login'); // Redirige al login
      })
      .catch(error => {
        // Manejo de errores (por ejemplo, si el correo no está registrado)
        console.error('Error al enviar el correo:', error);
        alert('Hubo un error al intentar restablecer tu contraseña. Verifica que el correo esté registrado.');
      });
  }

  // Función para redirigir al login
  goToLogin() {
    this.navCtrl.navigateForward('/login');
  }
}