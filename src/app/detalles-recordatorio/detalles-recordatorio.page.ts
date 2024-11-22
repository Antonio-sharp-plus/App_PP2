import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalles-recordatorio',
  templateUrl: './detalles-recordatorio.page.html',
  styleUrls: ['./detalles-recordatorio.page.scss'],
})
export class DetallesRecordatorioPage implements OnInit {

  recordatorio: any; // Variable para almacenar el recordatorio

  constructor( private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // Recibir el recordatorio desde el estado de la navegación
    if (this.router.getCurrentNavigation()?.extras.state?.['recordatorio']) {
      this.recordatorio = this.router.getCurrentNavigation()?.extras.state?.['recordatorio'];
  }
}

  // Método para redirigir a la página de Recordatorios
  irARecordatorios() {
    this.router.navigate(['/tabs/tab1']);
  }
}