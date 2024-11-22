import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { Routes, RouterModule } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-recordatorio',
  templateUrl: './crear-recordatorio.page.html',
  styleUrls: ['./crear-recordatorio.page.scss'],
})
export class CrearRecordatorioPage implements OnInit {

  recordatorio = {
    titulo: '',
    comentario: '',
    fecha: '',
    hora: '',
    recordar: 'no-repetir',
  };

  constructor(public firestoreService: FirestoreService, private navCtrl: NavController, private toastCtrl: ToastController, private loadingCtrl: LoadingController, private router: Router) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm() {
    this.recordatorio = {
      titulo: '',
      comentario: '',
      fecha: '',
      hora: '',
      recordar: 'no-repetir',
    };
  }
  

  async guardarRecordatorio() {
    // Primero, valida los campos
    if (!this.formValidation()) {
      return;  // Si la validación falla, no se ejecuta el resto de la función
    }
  
    // Si la validación es exitosa, se muestra el loader
    let loader = await this.loadingCtrl.create({
      message: "Espere por favor..."
    });
    await loader.present();
  
    // Recoger los valores del recordatorio
    const id = this.firestoreService.idUsuarioLogueado;
    const nombreRecordatorio = this.recordatorio.titulo;
    const descRecordatorio = this.recordatorio.comentario;
    const fechaRecordatorio = this.recordatorio.fecha;
    const horaRecordatorio = this.recordatorio.hora;
    const recordar = this.recordatorio.recordar;
  
    // Guardar el recordatorio en Firestore
    await this.firestoreService.guardarRecordatorio(id, { nombreRecordatorio, descRecordatorio, fechaRecordatorio, horaRecordatorio, recordar });
  
    // Mostrar mensaje de éxito y navegar hacia atrás
    this.showToast("Se guardó el recordatorio");
    this.navCtrl.navigateBack('/tabs/tab1');
  
    // Ocultar el loader
    loader.dismiss();
  }



  cancelarCreacion(){
    this.navCtrl.navigateBack('/tabs/tab1');
  }

  showToast(message: string){
    this.toastCtrl.create({
      message: message,
      duration: 3000,
    }).then (toastData => toastData.present())
  }

  formValidation() {
    if (!this.recordatorio.titulo) {
      this.showToast("Ingrese un titulo");
      return false;
    }

    if (!this.recordatorio.fecha) {
      this.showToast("Ingrese una fecha");
      return false;
    }

    if (!this.recordatorio.hora) {
      this.showToast("Ingrese una hora");
      return false;
    }
    return true;
  }

    //Método para redirigir a la página a las listas
    irAListas(){
      this.router.navigate(['/tabs/tab2'])
    }
    //Método para cerrar sesion
    CerrarSesion(){
      this.firestoreService.cerrarSesion();
    }
    // Método para redirigir a la página de Recordatorios
    irARecordatorios() {
      this.router.navigate(['/tabs/tab1']);
    }
    irCrearRecordatorio(){
      this.router.navigate(['/crear-recordatorio'])
    }
      // Método para redirigir a la página de crear recordatorio
    irACrearRecordatorio() {
      this.router.navigate(['./crear-recordatorio']);
    }

  // await this.firestoreService.getFavourites(id);
    
}
