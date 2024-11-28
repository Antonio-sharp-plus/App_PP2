import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { Auth, sendPasswordResetEmail } from '@angular/fire/auth'; // Incluir Firebase Auth

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.page.html',
  styleUrls: ['./restore-password.page.scss'],
})
export class RestorePasswordPage implements OnInit {
  email: string = '';

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private auth: Auth // Inyecta el servicio de autenticación
  ) {}

  ngOnInit() {}

  async onRestore() {
    if (!this.email) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Por favor, ingresa tu correo electrónico.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    try {
      // Intentar enviar el correo de restablecimiento de contraseña
      await sendPasswordResetEmail(this.auth, this.email);
      const alert = await this.alertCtrl.create({
        header: 'Éxito',
        message: `Se ha enviado un enlace de restablecimiento de contraseña a ${this.email}. Revisa tu bandeja de entrada.`,
        buttons: [
          {
            text: 'OK',
            handler: () => {
              // Redirigir al login después de enviar el correo
              this.goToLogin();
            },
          },
        ],
      });
      await alert.present();
    } catch (error: any) {
      let errorMessage = 'Ocurrió un error inesperado. Inténtalo nuevamente.';

      // Manejo de errores comunes de Firebase
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No se encontró un usuario con este correo electrónico.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'El formato del correo electrónico no es válido.';
      }

      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: errorMessage,
        buttons: ['OK'],
      });
      await alert.present();
    }
  }

  goToLogin() {
    this.navCtrl.navigateForward('/login');
  }
}
