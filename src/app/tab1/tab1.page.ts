import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  constructor(
    public firestoreService: FirestoreService,
    private router: Router
  ) {}


  async ngOnInit() {
    await this.firestoreService.idUserActual()
    const userId = this.firestoreService.idUsuarioLogueado;
    // await this.firestoreService.getFavourites(userId);
  }


  
}
