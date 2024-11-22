import { inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection, collectionData, Firestore, doc, updateDoc, arrayUnion, arrayRemove , getDoc } from '@angular/fire/firestore';
import { NavController } from '@ionic/angular';
import { Auth, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { signOut } from '@firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  firestore: Firestore = inject(Firestore)
  idUsuarioLogueado:string = ""
  recordatorios: { nombreRecordatorio: string, descRecordatorio: string, fechaRecordatorio: string, horaRecordatorio: string, recordar: string }[] = [];

  constructor(
    private navCtrl: NavController,
    private firestoreD: AngularFirestore, // Inyecta Firestore
    private toastController: ToastController,
    private router: Router,
    private auth:Auth
  ) { 
    this.obtenerIdUsuarioLogueado(); // Inicializa el id al construir el servicio
}

private async obtenerIdUsuarioLogueado() {
  try {
    this.idUsuarioLogueado = await this.idUserActual();
  } catch (error) {
    console.error("Error obteniendo el ID del usuario logueado:", error);
  }
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

  async cerrarSesion():Promise<void>{
    const auth = getAuth()
    await signOut(auth).then(() =>{
      
      this.navCtrl.navigateForward('/login');
    }).catch(err => console.log(""))
  }


  async guardarRecordatorio(userId: string, recordatorio: { nombreRecordatorio: string, descRecordatorio: string, fechaRecordatorio: string, horaRecordatorio: string, recordar: string}) {
    const userDocRef = doc(this.firestore, `Usuarios/${userId}`);
    try {
        await updateDoc(userDocRef, {
            recordatorio: arrayUnion(recordatorio) // Guardar objeto en vez del id solo 
        });
        this.showToast("Recordatorio agregado.");
    } catch (error) {
      this.showToast("Error al agregar a recordatorio: "+error);
    }
}
async showToast(message: string) {
  const toast = await this.toastController.create({
    message: message,
    duration: 2000, 
    position: 'bottom' // Posición en la pantalla (puede ser 'top', 'middle' o 'bottom')
  });
  toast.present();
  }

    /**
   * Obtiene la lista de recordatorios de un usuario desde Firestore.
   * 
   * @param {string} userId - ID del usuario del que se quieren obtener los recordatorios.
   * @returns {Promise<Array>} - Promesa que resuelve con un array de objetos de recordatorios o un array vacío si no hay favoritos.
   */
    async getRecordatorios(userId: string){
      const userDocRef = doc(this.firestore, `Usuarios/${userId}`);
      try {
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          this.recordatorios = userData['recordatorio'] || []
          return userData['recordatorio'] || []; // Devuelve el array de recordatoris o uno vacío si no existe
        } else {
          this.recordatorios = []
          return [];
        }
      } catch (error) {
        console.error("Error al obtener recordatoris: ", error);
        this.recordatorios = []
        return [];
      }
      }


}
