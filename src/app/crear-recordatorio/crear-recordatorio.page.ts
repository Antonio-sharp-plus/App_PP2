import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecordatorioService } from '../services/recordatorio.service';

@Component({  
  selector: 'app-crear-recordatorio',
  templateUrl: './crear-recordatorio.page.html',
  styleUrls: ['./crear-recordatorio.page.scss'],
})
export class CrearRecordatorioPage {
  recordatorio = {
    titulo: '',
    comentario: '',
    fecha: '',
    hora: '',
    repetir: 'no-repetir',
  };

  constructor(
    private recordatorioService: RecordatorioService,
    private router: Router
  ) {}

  guardarRecordatorio() {
    // Guarda el recordatorio en el servicio
    this.recordatorioService.agregarRecordatorio(this.recordatorio);

    // Redirige a la tab 1
    this.router.navigate(['/tabs/tab1']);
  }
  volverARecordatorios(){
    //Vuelve al menu de recordatorios
    this.router.navigate(['/tabs/tab1'])
  }

  //Método para redirigir a la página a las listas
  irAListas(){
    this.router.navigate(['/tabs/tab2'])
  }
  //Método para cerrar sesion
  CerrarSesion(){
    this.router.navigate(['/tabs/login'])
  }
   // Método para redirigir a la página de crear recordatorio
   irACrearRecordatorio() {
    this.router.navigate(['/tabs/crear-recordatorio']);
  }

}
