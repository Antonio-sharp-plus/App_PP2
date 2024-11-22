import { Component, inject, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { FirestoreService } from '../services/firestore.service';
import { signOut } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
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
    private navCtrl: NavController
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

    // Si el checkbox está marcado, guarda el email en localStorage
    if (this.recordarEmail) {
    localStorage.setItem('emailGuardado', this.email);
    } else {
      localStorage.removeItem('emailGuardado');
    }
      
      const auth = getAuth();
      try {
        await setPersistence(auth, browserLocalPersistence)
        .then(() => signInWithEmailAndPassword(auth, this.email, this.password))
        // Redirigir al usuario a la página principal o donde quieras
        this.navCtrl.navigateForward('/tabs/tab1');
      } catch (error) {
        this.setOpen(true)
      }
    // Lógica adicional para iniciar sesión
    console.log('Iniciar sesión con:', this.email);
    // redireccion si la autenticacion esta bien
    this.navCtrl.navigateForward('/tabs');
  }

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  goToRegister() {
    this.navCtrl.navigateForward('/register');
  }
  goToRestorePassword(){
    this.navCtrl.navigateForward('/restore-password');
  }
}
