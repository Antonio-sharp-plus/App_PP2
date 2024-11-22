import { inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection, collectionData, Firestore, doc, updateDoc, arrayUnion, arrayRemove , getDoc } from '@angular/fire/firestore';
import { NavController } from '@ionic/angular';
import { Auth, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  firestore: Firestore = inject(Firestore)
  idUsuarioLogueado:string = ""

  constructor(
    private navCtrl: NavController,
    private firestoreD: AngularFirestore, // Inyecta Firestore
    private toastController: ToastController,
    private router: Router,
    private auth:Auth
  ) { 
    
  }


    /**
   * Obtiene el ID del usuario actualmente autenticado.
   * Utiliza el método `onAuthStateChanged` de Firebase para verificar si un usuario
   * ha iniciado sesión, y resuelve con su UID. Si no hay un usuario autenticado, la
   * promesa se rechaza con un mensaje de error.
   * 
   * @returns {Promise<string>} - Promesa que resuelve con el UID del usuario autenticado o
   *                              se rechaza si no hay usuario autenticado.
   */
    async idUserActual(): Promise<string> {
      const auth = getAuth();
      return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            this.idUsuarioLogueado = user.uid;
            resolve(user.uid);
          } else {
            reject("Usuario no autenticado");
          }
        });
      });
  }


}
