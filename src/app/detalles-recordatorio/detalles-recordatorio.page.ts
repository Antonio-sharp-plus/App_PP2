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
  nombreRecordatorio: string = "";

  constructor(public firestoreService: FirestoreService, private navCtrl: NavController,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      const idParam = params.get('nombreRecordatorio'); // Esto puede ser string o null
      if (idParam) {
        this.nombreRecordatorio = idParam; // Asignar solo si no es null
      } else {
        this.nombreRecordatorio = ''; // O asigna un valor por defecto si es null
        console.log('El parámetro "nombreRecordatorio" no se encontró');
      }
    });

    const recordatorioDetalles = this.traerDetalles(this.nombreRecordatorio)
  }

  traerDetalles(nombreRecordatorio:string){
    const id = this.firestoreService.idUsuarioLogueado;
    this.firestoreService.traerDetalles(id,nombreRecordatorio);
  }
}
