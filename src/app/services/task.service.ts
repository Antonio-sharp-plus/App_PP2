import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private lists: { name: string, tasks: { name: string, completed: boolean }[] }[] = [];

  constructor() {}

  getLists() {
    return this.lists;
  }

  addList(name: string) {
    this.lists.push({ name, tasks: [] });
  }

  addTaskToList(listName: string, taskName: string) {
    const list = this.lists.find(l => l.name === listName);
    if (list) {
      list.tasks.push({ name: taskName, completed: false });
    }
  }

  getTasks(listName: string) {
    const list = this.lists.find(l => l.name === listName);
    return list ? list.tasks : [];
  }
}
