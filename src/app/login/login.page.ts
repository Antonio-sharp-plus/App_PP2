import { Component, inject, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { FirestoreService } from '../services/firestore.service';
import { signOut } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';
import { browserLocalPersistence, getAuth, GoogleAuthProvider, setPersistence, signInWithPopup, signInWithEmailAndPassword, browserSessionPersistence } from "firebase/auth";





@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit{
  email: string = '';
  password: string = '';
  recordarEmail: boolean = false;
  
  isToastOpen:boolean = false;
  constructor(
    public firestoreService: FirestoreService,
    private fb: FormBuilder,
    private navCtrl: NavController,
    private authService: AuthService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    // Cargar el email si está guardado en localStorage
    const emailGuardadoVar = localStorage.getItem('emailGuardado');
    if (emailGuardadoVar) {
      this.email = emailGuardadoVar;
      this.recordarEmail = true;
    }
  }

  async onSubmit() {
    // logica de autenticacion
    console.log('Correo:', this.email);
    console.log('Contraseña:', this.password);
  }
    
      
    async onLogin() {
      try {
        const userEmail = await this.authService.login(this.email, this.password);
        const alert = await this.alertCtrl.create({
          header: 'Inicio de sesión exitoso',
          message: `Recordatorio de bienvenida: Bienvenido, ${userEmail}!`,
          buttons: [
            {
              text: 'OK',
              handler: () => {
                // redireccion a la pag principal
                this.navCtrl.navigateForward('/tabs/tab1');
              },
            },
          ],
        });
        await alert.present();
      } catch (error: any) {
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: error.message,
          buttons: ['OK'],
        });
        await alert.present();
      }
      // Si el checkbox está marcado, guarda el email en localStorage 
      if (this.recordarEmail) { 
        localStorage.setItem('emailGuardado', this.email); 
      } else { 
        localStorage.removeItem('emailGuardado'); }
    }
    goToRegister() { 
      this.navCtrl.navigateForward('/register'); 
    } 
    goToRestorePassword()
    { this.navCtrl.navigateForward('/restore-password'); 

    } 
  }
  