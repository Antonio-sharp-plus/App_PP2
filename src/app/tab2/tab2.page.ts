import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  lists: { name: string, tasks: { name: string, completed: boolean }[], tags: string[] }[] = [];
  newList: string = '';
  newTag: string = '';

  constructor(
    private router: Router,
    private storage: Storage,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    await this.storage.create();
    this.loadLists();
  }

  async loadLists() {
    const storedLists = await this.storage.get('lists');
    if (storedLists) {
      this.lists = storedLists;
    }
  }

  async addList() {
    if (this.newList.trim().length > 0) {
      this.lists.push({ name: this.newList.trim(), tasks: [], tags: [this.newTag.trim()] });
      await this.storage.set('lists', this.lists);
      this.newList = '';
      this.newTag = '';
    }
  }

  selectList(name: string) {
    this.router.navigate(['/tabs/tab3', name]);
  }

  async editList(index: number, list: { name: string, tasks: { name: string, completed: boolean }[], tags: string[] }) {
    const alert = await this.alertController.create({
      header: 'Editar Lista',
      inputs: [
        {
          name: 'listName',
          type: 'text',
          placeholder: 'Nombre de la lista',
          value: list.name
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Guardar',
          handler: (data) => {
            if (data.listName.trim().length > 0) {
              this.lists[index].name = data.listName.trim();
              this.storage.set('lists', this.lists);
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async deleteList(index: number) {
    this.lists.splice(index, 1);
    await this.storage.set('lists', this.lists);
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
