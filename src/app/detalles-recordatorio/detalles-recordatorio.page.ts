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

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() 
  { this.loadRecordatorio(); } 
  
  
  loadRecordatorio() 
  { if (this.router.getCurrentNavigation()?.extras.state?.['recordatorio']) 
    { this.recordatorio = this.router.getCurrentNavigation()?.extras.state?.['recordatorio']; } 
    else 
    { this.irARecordatorios(); } 
  } 
  
  irARecordatorios() 
  { this.router.navigate(['/tabs/tab1']); } 
  
  habilitarEdicion() 
  { // Implementar lógica para habilitar edición si es necesario 
  
  }

  irAListas(){
    this.router.navigate(['/tabs/tab2'])
  }
  //Método para cerrar sesion
  CerrarSesion(){
    this.router.navigate(['/tabs/login'])
  }
}
