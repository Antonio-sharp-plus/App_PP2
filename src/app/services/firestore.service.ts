import { inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection, collectionData, Firestore, doc, updateDoc, arrayUnion, arrayRemove , getDoc } from '@angular/fire/firestore';
import { NavController } from '@ionic/angular';
import { Auth, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { signOut } from '@firebase/auth';
import { setDoc } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { query, where, getDocs } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  recordatoriosSubject = new BehaviorSubject<any[]>([]); // Subject para los recordatorios

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
    const uid = await this.idUserActual();
    this.idUsuarioLogueado = uid;
  } catch (error) {
    // Const para verificar si estamos en la ruta correcta.
    const currentRoute = this.router.url;

    // Si no estamos en "/login" o "/register" se muestra el mensaje de error y redirigimos.
    if (!currentRoute.includes('/login') && !currentRoute.includes('/register')) {
      this.showToast("Necesitas iniciar sesión para ingresar a este sitio.");
      console.error("Error obteniendo el ID del usuario logueado:", error);
      this.navCtrl.navigateForward('/login'); // Redirige al login si no hay usuario autenticado.
    } else {
      // Si ya estamos en login o register mostramos un mensaje para saber que la funcionalidad esta ok.
      return
    }
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


//   async guardarRecordatorio(userId: string, recordatorio: { nombreRecordatorio: string, descRecordatorio: string, fechaRecordatorio: string, horaRecordatorio: string, recordar: string}) {
//     const userDocRef = doc(this.firestore, `Usuarios/${userId}`);
//     try {
//       await setDoc(userDocRef, {
//         recordatorio: arrayUnion(recordatorio)
//     }, { merge: true }); // Combina con los datos existentes en lugar de sobrescribir
//         this.getRecordatorios(userId);
//         this.showToast("Recordatorio agregado.");
//     } catch (error) {
//       this.showToast("Error al agregar a recordatorio: "+error);
//     }
// }

async guardarRecordatorio(userId: string, recordatorio: { nombreRecordatorio: string, descRecordatorio: string, fechaRecordatorio: string, horaRecordatorio: string, recordar: string}) {
  const userDocRef = doc(this.firestore, `Usuarios/${userId}`);
  try {
    // Obtener el documento actual del usuario
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      const datos = userDoc.data();
      const recordatoriosExistentes = datos['recordatorio'] || [];

      console.log('Recordatorios existentes:', recordatoriosExistentes);

      // Verificar si ya existe un recordatorio con el mismo nombre
      const recordatorioDuplicado = recordatoriosExistentes.find(
        (r: any) => r.nombreRecordatorio.trim().toLowerCase() === recordatorio.nombreRecordatorio.trim().toLowerCase()
      );

      if (recordatorioDuplicado) {
        console.log('Recordatorio duplicado encontrado:', recordatorioDuplicado);
        this.showToast("Ya existe un recordatorio con ese nombre, cree otro porfavor");
        return; // Salir de la función si hay duplicado
      }
    }

    // Si no hay duplicado, agregar el nuevo recordatorio
    await setDoc(
      userDocRef,
      {
        recordatorio: arrayUnion(recordatorio),
      },
      { merge: true } // Combina los datos existentes en lugar de sobrescribir
    );

    this.getRecordatorios(userId);
    this.showToast("Recordatorio agregado.");
  } catch (error) {
    console.error('Error al guardar el recordatorio:', error);
    this.showToast("Error al agregar recordatorio: " + error);
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

      /**
 * Elimina un recordatorio de la lista de recordatorios del usuario en Firestore.
 * 
 * @param {string} userId - ID del usuario del que se eliminará el recordatorio.
 * @param {{ nombreRecordatorio: string }} - Objeto que contiene el nombre y ID de la ciudad a eliminar.
 */
      async eliminarRecordatorio(userId: string, recordatorio: any) {
        const userDocRef = doc(this.firestore, `Usuarios/${userId}`);
        
        try {
          // Asegúrate de que este objeto sea el mismo que el que guardas en Firestore
          const recordatorioRef = {
            nombreRecordatorio: recordatorio.nombreRecordatorio,
            descRecordatorio: recordatorio.descRecordatorio,
            fechaRecordatorio: recordatorio.fechaRecordatorio,
            horaRecordatorio: recordatorio.horaRecordatorio,
            recordar: recordatorio.recordar
          };
      
          await updateDoc(userDocRef, {
            recordatorio: arrayRemove(recordatorioRef) // Eliminar el objeto específico
          });
      
          this.showToast("Recordatorio eliminado");
          this.getRecordatorios(userId);
        } catch (error) {
          this.showToast("Error al eliminar el recordatorio: " + error);
        }
      }
      

      /**
       * Trae los valores para rellenar el formulario en mi html de /detalles
       * @param userId 
       * @param nombreRecordatorio 
       * @returns 
       */
      async traerDetalles(userId: string, nombreRecordatorio: string) {
        const userDocRef = doc(this.firestore, `Usuarios/${userId}`);
        
        try {
          // Intentar acceder al documento y buscar el recordatorio específico
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            const recordatorios = userData?.['recordatorio'] || [];
            const recordatorio = recordatorios.find((r: { nombreRecordatorio: string; }) => r.nombreRecordatorio === nombreRecordatorio);
            console.log("mostrar recordatorios")
            console.log(recordatorios)
            if (recordatorio) {
              console.log("mostrar recordatorio")
              console.log(recordatorio)
              return recordatorio; // Devuelve el recordatorio encontrado
            } else {
              console.log('No se encontró el recordatorio');
              return null;
            }
          } else {
            console.log('El documento no existe');
            return null;
          }
        } catch (error) {
          console.error('Error al obtener el recordatorio:', error);
          return null;
        }
      }

      async editarRecordatorio(
        userId: string,
        nombreRecordatorio: string,
        nuevosDatos: { descRecordatorio: string; fechaRecordatorio: string; horaRecordatorio: string; recordar: string }
      ) {
        const userDocRef = doc(this.firestore, `Usuarios/${userId}`);
        try {
          
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const datos = userDoc.data();
            const recordatoriosExistentes = datos['recordatorio'] || [];
      
            // Encuentra el índice del recordatorio a editar
            const index = recordatoriosExistentes.findIndex(
              (r: any) => r.nombreRecordatorio === nombreRecordatorio
            );
      
            if (index !== -1) {
              // Actualiza los datos en el arreglo local
              recordatoriosExistentes[index] = {
                ...recordatoriosExistentes[index], // Mantén los datos originales
                ...nuevosDatos, // Sobrescribe con los nuevos valores
              };
      
              // Guarda los cambios en Firestore
              await setDoc(
                userDocRef,
                { recordatorio: recordatoriosExistentes },
                { merge: true } // Combina con los datos existentes
              );
            } else {
              throw new Error("No se encontró el recordatorio con el nombre proporcionado.");
            }
          } else {
            throw new Error("No se encontró el documento del usuario.");
          }
        } catch (error) {
          console.error("Error al actualizar el recordatorio:", error);
          throw error; // Re-lanza el error para que sea manejado en la página
        }
      }

}
