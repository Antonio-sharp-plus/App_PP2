import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private lists: { name: string, tasks: { name: string, completed: boolean }[], tags: string[] }[] = [];

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
    const storedLists = await this.storage.get('lists');
    if (storedLists) {
      this.lists = storedLists;
    }
  }

  getLists() {
    return this.lists;
  }

  async addList(name: string, tags: string[] = []) {
    this.lists.push({ name, tasks: [], tags });
    await this.storage.set('lists', this.lists);
  }

  async addTaskToList(listName: string, taskName: string) {
    const list = this.lists.find(l => l.name === listName);
    if (list) {
      list.tasks.push({ name: taskName, completed: false });
      await this.storage.set('lists', this.lists);
    }
  }

  async updateTasks(listName: string, tasks: { name: string, completed: boolean }[]) {
    const list = this.lists.find(l => l.name === listName);
    if (list) {
      list.tasks = tasks;
      await this.storage.set('lists', this.lists);
    }
  }

  getTasks(listName: string) {
    const list = this.lists.find(l => l.name === listName);
    return list ? list.tasks : [];
  }

  getList(listName: string) {
    return this.lists.find(l => l.name === listName);
  }
}
