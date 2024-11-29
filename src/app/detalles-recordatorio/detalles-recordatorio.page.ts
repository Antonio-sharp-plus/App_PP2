import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { Routes, RouterModule } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-detalles-recordatorio',
  templateUrl: './detalles-recordatorio.page.html',
  styleUrls: ['./detalles-recordatorio.page.scss'],
})
export class DetallesRecordatorioPage implements OnInit {
  recordatorio: any = {
    nombreRecordatorio: '',
    descRecordatorio: '',
    fechaRecordatorio: '',
    horaRecordatorio: '',
    recordar: ''
  };
  
  nombreRecordatorio: string = "";
  isLoading = true; 

  constructor(public firestoreService: FirestoreService, private navCtrl: NavController,private activatedRoute: ActivatedRoute, private toastController: ToastController, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.isLoading = true; // Activar el loader inicialmente
    this.activatedRoute.paramMap.subscribe(async (params) => {
      const idParam = params.get('nombreRecordatorio'); // Esto puede ser string o null
      if (idParam) {
        this.nombreRecordatorio = idParam; // Asignar solo si no es null
        console.log(this.nombreRecordatorio);
  
        // Llama a cargarDetalles y espera a que termine
        await this.cargarDetalles(this.nombreRecordatorio);
      } else {
        this.nombreRecordatorio = ''; // Asigna un valor por defecto si es null
        console.log('El parámetro "nombreRecordatorio" no se encontró');
      }
      this.isLoading = false; // Desactiva el loader cuando termine todo
    });
  }

  async cargarDetalles(nombreRecordatorio: string) {
    const idUsuario = this.firestoreService.idUsuarioLogueado;
    const recordatorio = await this.firestoreService.traerDetalles(idUsuario, nombreRecordatorio);
    if (recordatorio) {
      this.recordatorio = { ...recordatorio }; // Asigna los valores al objeto del formulario
    } else {
      console.error('Recordatorio no encontrado');
    }
  }

  async editarRecordatorio() {
   
    if (!this.formValidation()) {
      return; 
    }
  
    // Muestra un loader mientras se procesa la edición
    let loader = await this.loadingCtrl.create({
      message: "Actualizando recordatorio...",
    });
    await loader.present();
  
    // Recoger los datos del formulario
    const userId = this.firestoreService.idUsuarioLogueado;
    const nombreRecordatorio = this.recordatorio.nombreRecordatorio;
    const nuevosDatos = {
      descRecordatorio: this.recordatorio.descRecordatorio,
      fechaRecordatorio: this.recordatorio.fechaRecordatorio,
      horaRecordatorio: this.recordatorio.horaRecordatorio,
      recordar: this.recordatorio.recordar
    };
  
    try {
      // Llama al servicio para actualizar el recordatorio
      await this.firestoreService.editarRecordatorio(userId, nombreRecordatorio, nuevosDatos);
      this.showToast("Recordatorio actualizado correctamente.");
      this.navCtrl.navigateBack('/tabs/tab1'); // Regresa a la vista anterior
    } catch (error) {
      console.error("Error al editar el recordatorio:", error);
      this.showToast("Error al actualizar el recordatorio: " + error);
    } finally {
      loader.dismiss(); // Oculta el loader
    }
  }

  formValidation() {
    if (!this.recordatorio.nombreRecordatorio) {
      this.showToast("Ingrese un titulo");
      return false;
    }

    if (!this.recordatorio.fechaRecordatorio) {
      this.showToast("Ingrese una fecha");
      return false;
    }

    if (!this.recordatorio.horaRecordatorio) {
      this.showToast("Ingrese una hora");
      return false;
    }
    return true;
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, 
      position: 'bottom' // Posición en la pantalla (puede ser 'top', 'middle' o 'bottom')
    });
    toast.present();
    }
  

  volver(){
    this.navCtrl.navigateForward('/tabs/tab1')
  }

}
