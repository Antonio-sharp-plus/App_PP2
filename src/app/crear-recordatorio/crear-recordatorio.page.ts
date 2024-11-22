import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { Routes, RouterModule } from '@angular/router';
import { NavController } from '@ionic/angular';

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

  constructor(public firestoreService: FirestoreService, private navCtrl: NavController,) { }

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
  

  async guardarRecordatorio(){
    const id = this.firestoreService.idUsuarioLogueado
    const nombreRecordatorio = this.recordatorio.titulo;
    const descRecordatorio = this.recordatorio.comentario;
    const fechaRecordatorio = this.recordatorio.fecha;
    const horaRecordatorio = this.recordatorio.hora;
    const recordar = this.recordatorio.recordar;

    await this.firestoreService.guardarRecordatorio(id, { nombreRecordatorio, descRecordatorio, fechaRecordatorio, horaRecordatorio, recordar })

    this.navCtrl.navigateBack('/tabs/tab1');
  }

  cancelarCreacion(){
    this.navCtrl.navigateBack('/tabs/tab1');
  }

  // await this.firestoreService.getFavourites(id);
    
}
