import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { AlertController } from '@ionic/angular';

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
    private storage: Storage,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    await this.storage.create();
    this.loadRecordatorios();
  }

  async loadRecordatorios() {
    const storedRecordatorios = await this.storage.get('recordatorios');
    if (storedRecordatorios) {
      this.recordatorios = storedRecordatorios;
    }
  }

  // Método para redirigir a la página de crear recordatorio
  irACrearRecordatorio() {
    this.router.navigate(['./crear-recordatorio']);
  }

  // Método para redirigir a la página de ver los detalles del recordatorio
  async verDetalles(recordatorio: Recordatorio) {
    const alert = await this.alertController.create({
      header: recordatorio.titulo,
      subHeader: `Fecha: ${recordatorio.fecha}`,
      message: `Hora: ${recordatorio.hora} <br> Comentario: ${recordatorio.comentario} <br> Repetir: ${recordatorio.repetir}`,
      buttons: ['OK']
    });

    await alert.present();
  }

  // Método para eliminar un recordatorio
  async eliminarRecordatorio(index: number) {
    const alert = await this.alertController.create({
      header: 'Eliminar Recordatorio',
      message: '¿Estás seguro de que quieres eliminar este recordatorio?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.recordatorios.splice(index, 1);
            this.storage.set('recordatorios', this.recordatorios);
          }
        }
      ]
    });

    await alert.present();
  }

  // Métodos de navegación para otros botones
  irAListas() {
    this.router.navigate(['/tabs/tab2']);
  }

  CerrarSesion() {
    this.router.navigate(['/tabs/login']);
  }

  irARecordatorios() {
    this.router.navigate(['/tabs/tab1']);
  }
}
