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

  // Este metodo se ejecuta cuando se accede a la pagina
  ngOnInit() {
    // Resetear los campos a valores vacios al acceder a la pagina
    this.resetForm();
  }

  // Metodo para resetear el formulario a valores vacios
  resetForm() {
    this.recordatorio = {
      titulo: '',
      comentario: '',
      fecha: '',
      hora: '',
      repetir: 'no-repetir',
    };
  }

  guardarRecordatorio() {
    // Crear una nueva instancia del recordatorio
    const nuevoRecordatorio = { ...this.recordatorio }; // Crear una copia del objeto

    // Guarda el nuevo recordatorio en el servicio
    this.recordatorioService.agregarRecordatorio(nuevoRecordatorio);

    // Redirige a la tab 1
    this.router.navigate(['/tabs/tab1']);
  }
  volverARecordatorios(){
    //Vuelve al menu de recordatorios
    this.router.navigate(['/tabs/tab1'])
  }

  //Metodo para redirigir a la página a las listas
  irAListas(){
    this.router.navigate(['/tabs/tab2'])
  }
  //Metodo para cerrar sesion
  CerrarSesion(){
    this.router.navigate(['/tabs/login'])
  }
   // Metodo para redirigir a la tab de crear recordatorio
   irACrearRecordatorio() {
    this.router.navigate(['/tabs/crear-recordatorio']);
  }

}
