import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

interface Recordatorio {
  titulo: string;
  comentario: string;
  fecha: string;
  hora: string;
  repetir: string;
}

@Component({
  selector: 'app-crear-recordatorio',
  templateUrl: './crear-recordatorio.page.html',
  styleUrls: ['./crear-recordatorio.page.scss']
})
export class CrearRecordatorioPage {
  titulo: string = '';
  comentario: string = '';
  fecha: string = '';
  hora: string = '';
  repetir: string = 'Nunca';
  recordatorios: Recordatorio[] = [];

  constructor(private router: Router, private storage: Storage) {}

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

  async crearRecordatorio() {
    if (this.titulo.trim() && this.fecha && this.hora) {
      const nuevoRecordatorio: Recordatorio = {
        titulo: this.titulo.trim(),
        comentario: this.comentario.trim(),
        fecha: this.fecha,
        hora: this.hora,
        repetir: this.repetir
      };

      this.recordatorios.push(nuevoRecordatorio);
      await this.storage.set('recordatorios', this.recordatorios);

      // Navegar de vuelta a la página de recordatorios
      this.router.navigate(['/tabs/tab1']);
    } else {
      // Manejar errores: Por ejemplo, mostrar una alerta si faltan datos.
      console.log('Por favor, llena todos los campos obligatorios');
    }
  }

  cancelar() {
    // Navegar de vuelta a la página de recordatorios sin guardar
    this.router.navigate(['/tabs/tab1']);
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
