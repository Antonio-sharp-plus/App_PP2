import { Component } from '@angular/core';
import { FirestoreService } from '../app/services/firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    public firestoreService: FirestoreService,
    private router: Router
  ) {}

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
}
