import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  

  constructor(private navCtrl: NavController,
    private router: Router
  ) {}

  onSubmit() {
    // logica de autenticacion
    console.log('Correo:', this.email);
    console.log('Contraseña:', this.password);

    // redireccion si la autenticacion esta bien
    this.navCtrl.navigateForward('/tabs');
  }

  goToTab1() {
    this.router.navigate(['/tabs/tab1']);
  }
}
