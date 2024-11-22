import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})


export class Tab1Page implements OnInit{

  constructor(
    public firestoreService: FirestoreService,
    private router: Router
    
    
  ) {}


  async ngOnInit() {
    await this.firestoreService.idUserActual()
    const userId = this.firestoreService.idUsuarioLogueado;
    await this.firestoreService.getRecordatorios(userId);
  }
  

  // Método para redirigir a la página de crear recordatorio
  irACrearRecordatorio() {
    this.router.navigate(['./crear-recordatorio']);
  }

  //metodo para ver los detalles del recordatorio
  // verDetalles(recordatorio: Recordatorio) {
  //   // Navegar a la página de detalles y pasar el recordatorio seleccionado
  //   this.router.navigate(['./detalles-recordatorio'], 
  //     { state: { recordatorio: recordatorio }
  //   });
  // }
  
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
  //  // Método para borrar un recordatorio
  //  borrarRecordatorio(recordatorio: Recordatorio) {
  //   // Llamamos al servicio para eliminar el recordatorio
  //   this.recordatorioService.eliminarRecordatorio(recordatorio);

  //   // Actualizamos la lista de recordatorios
  //   this.recordatorios = this.recordatorioService.obtenerRecordatorios();
  
  }

  
