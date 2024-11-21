import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

interface List {
  name: string;
  tasks: { name: string; completed: boolean }[];
  tags: string[];
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  lists: { name: string, tasks: { name: string, completed: boolean }[], tags: string[] }[] = [];
  newList: string = '';
  newTag: string = '';

  constructor(private storage: Storage, private router: Router) {
    this.init();
  }

  async init() {
    await this.storage.create();
    this.loadLists();
  }

  ngOnInit() {
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
      this.newTag = ''; // Limpiar la etiqueta
    }
  }

  selectList(name: string) {
    this.router.navigate(['/tabs/tab3', name]);
  }
}

