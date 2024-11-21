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

  constructor() {}

  // Agrega un recordatorio
  agregarRecordatorio(recordatorio: Recordatorio) {
    this.recordatorios.push(recordatorio);
  }

  // Obtiene todos los recordatorios
  obtenerRecordatorios() {
    return this.recordatorios;
  }
}