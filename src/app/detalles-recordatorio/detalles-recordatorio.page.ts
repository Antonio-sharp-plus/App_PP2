import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalles-recordatorio',
  templateUrl: './detalles-recordatorio.page.html',
  styleUrls: ['./detalles-recordatorio.page.scss'],
})
export class DetallesRecordatorioPage implements OnInit {

  constructor(private router: Router,) { 
    
  }

  ngOnInit() {
  }

  // Método para redirigir a la página de Recordatorios
  irARecordatorios() {
    this.router.navigate(['/tabs/tab1']);
  }
}
