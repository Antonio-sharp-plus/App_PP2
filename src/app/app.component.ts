import { Component } from '@angular/core';
import { FirestoreService } from '../app/services/firestore.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    public firestoreService: FirestoreService,
    private router: Router,
    private menuCtrl: MenuController
  ) {}

  //Método para redirigir a la página a las listas
  async irAListas(){
    this.router.navigate(['/tabs/tab2'])
    await this.menuCtrl.close(); 
  }
  //Método para cerrar sesion
  async CerrarSesion(){
    this.firestoreService.cerrarSesion();
    await this.menuCtrl.close(); 
  }
  // Método para redirigir a la página de Recordatorios
  async irARecordatorios() {
    this.router.navigate(['/tabs/tab1']);
    await this.menuCtrl.close(); 
  }
  async irCrearRecordatorio(){
    this.router.navigate(['/crear-recordatorio'])
    await this.menuCtrl.close(); 
  }
    // Método para redirigir a la página de crear recordatorio
  async irACrearRecordatorio() {
    this.router.navigate(['./crear-recordatorio']);
    await this.menuCtrl.close(); 
  }
}
