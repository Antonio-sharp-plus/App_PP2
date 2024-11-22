import { Injectable } from '@angular/core';

interface Recordatorio {
  titulo: string;
  comentario: string;
  fecha: string;
  hora: string;
  repetir: string;
}

@Injectable({
  providedIn: 'root',
})
export class RecordatorioService {
  private recordatorios: Recordatorio[] = [];

  constructor() {
    // Este apartado es para inicializar con un ejemplo de recordatorio.
    this.recordatorios.push({
      titulo: '',
      comentario: '',
      fecha: '',
      hora: '',
      repetir: '',
    });
  }

  // metodo para obtener todos los recordatorios
  obtenerRecordatorios(): Recordatorio[] {
    return this.recordatorios;
  }

  // metodo para un nuevo recordatorio
  agregarRecordatorio(recordatorio: Recordatorio) {
    
    this.recordatorios.push({ ...recordatorio });
  }
  // metodo para eliminar un recordatorio
  eliminarRecordatorio(recordatorio: any) {
    const index = this.recordatorios.findIndex(r => r === recordatorio);
    if (index !== -1) {
      this.recordatorios.splice(index, 1);
    }
  }
}