import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.page.html',
  styleUrls: ['./restore-password.page.scss'],
})
export class RestorePasswordPage implements OnInit {
  email: string = '';

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  onRestore(){

  }

  goToLogin(){
    this.navCtrl.navigateForward('/login');
  }
}
