import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  user : User = {} as User;

  constructor(    private toastCtrl: ToastController,
    private firestore: AngularFirestore,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth, 
    private navCtrl: NavController) {}

  async onRegister() {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(this.user.email, this.user.password)
      console.log('Usuario registrado:', this.user.email);
      
      await this.firestore.collection('Usuarios').doc(userCredential.user?.uid).set({
        id: userCredential.user?.uid,
        email: this.user.email,
        recordatorios: [], // Array vacío
        listas: [],
        etiquetas: []
      });

      // Redirige al usuario a la pantalla de inicio de sesión después de registrarse
      this.navCtrl.navigateRoot('/login');
    } catch (error) {
      console.error('Error en el registro:', error);
    }
  }

  goToLogin(){
    this.navCtrl.navigateForward('/login');
  }
}
