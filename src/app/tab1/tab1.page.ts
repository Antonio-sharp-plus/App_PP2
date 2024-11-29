import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})


export class Tab1Page implements OnInit{

  constructor(
    public firestoreService: FirestoreService,
    private router: Router,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {}
  isLoading = true; // Variable para manejar el estado de carga


  async ngOnInit() {
    this.isLoading = true; // Activa el loader antes de cargar los datos
    await this.firestoreService.idUserActual()
    const userId = this.firestoreService.idUsuarioLogueado;
    await this.firestoreService.getRecordatorios(userId);
    this.isLoading = false; // Activa el loader antes de cargar los datos
  }
  irCrearRecordatorio(){
    this.router.navigate(['/crear-recordatorio'])
  }

  async mostrarConfirmacionEliminar(recordatorio : any) {
    const alert = await this.alertCtrl.create({
      header: '¿Está seguro que quiere eliminar el recordatorio?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Eliminación cancelada');
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.eliminarRecordatorio(recordatorio); // Aquí llamas a la función para eliminar el recordatorio
          }
        }
      ]
    });
  
    await alert.present();
  }

  async eliminarRecordatorio(recordatorio: any) {
    const id = this.firestoreService.idUsuarioLogueado;
  
    // Crear y mostrar el loader
    const loader = await this.loadingCtrl.create({
      message: "Eliminando recordatorio, por favor espere..."
    });
    await loader.present();
  
    await this.firestoreService.eliminarRecordatorio(id, recordatorio);

      loader.dismiss();
  }

  irDetalles(nombreRecordatorio : string){
    this.router.navigate(['/detalles-recordatorio/' + nombreRecordatorio])
  }

  
  //metodo para ver los detalles del recordatorio
  // verDetalles(recordatorio: Recordatorio) {
  //   // Navegar a la página de detalles y pasar el recordatorio seleccionado
  //   this.router.navigate(['./detalles-recordatorio'], 
  //     { state: { recordatorio: recordatorio }
  //   });
  // }
  

  //  // Método para borrar un recordatorio
  //  borrarRecordatorio(recordatorio: Recordatorio) {
  //   // Llamamos al servicio para eliminar el recordatorio
  //   this.recordatorioService.eliminarRecordatorio(recordatorio);

  //   // Actualizamos la lista de recordatorios
  //   this.recordatorios = this.recordatorioService.obtenerRecordatorios();
  
  }

  
