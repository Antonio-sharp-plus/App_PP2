import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecordatorioService } from '../services/recordatorio.service';

interface Recordatorio {
  titulo: string;
  comentario: string;
  fecha: string;
  hora: string;
  repetir: string;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  recordatorios: Recordatorio[] = []; // Lista de recordatorios

  constructor(
    private router: Router, 
    private recordatorioService: RecordatorioService
  ) {}

  // Se ejecuta cuando el componente se inicializa
  ngOnInit() {
    // Obtener los recordatorios desde el servicio
    this.recordatorios = this.recordatorioService.obtenerRecordatorios();
  }

  // Método para redirigir a la página de crear recordatorio
  irACrearRecordatorio() {
    this.router.navigate(['/tabs/crear-recordatorio']);
  }

  //metodo para ver los detalles del recordatorio
  verDetalles(recordatorio: Recordatorio) {
    // Navegar a la página de detalles y pasar el recordatorio seleccionado
    this.router.navigate(['/tabs/detalles-recordatorio'], {
      state: { recordatorio }
    });
  }
  //Método para redirigir a la página a las listas
  irAListas(){
    this.router.navigate(['/tabs/tab2'])
  }
  //Método para cerrar sesion
  CerrarSesion(){
    this.router.navigate(['/tabs/login'])
  }
  // Método para redirigir a la página de Recordatorios
  irARecordatorios() {
    this.router.navigate(['/tabs/tab1']);
  }
   // Método para borrar un recordatorio
   borrarRecordatorio(recordatorio: Recordatorio) {
    // Llamamos al servicio para eliminar el recordatorio
    this.recordatorioService.eliminarRecordatorio(recordatorio);

    // Actualizamos la lista de recordatorios
    this.recordatorios = this.recordatorioService.obtenerRecordatorios();
  }
}