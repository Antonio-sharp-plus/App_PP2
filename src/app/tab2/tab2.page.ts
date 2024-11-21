import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  lists: { name: string, tasks: { name: string, completed: boolean }[] }[] = [];
  newList: string = '';

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit() {
    this.lists = this.taskService.getLists();
  }

  addList() {
    if (this.newList.trim().length > 0) {
      this.taskService.addList(this.newList);
      this.newList = '';
      this.lists = this.taskService.getLists();
    }
  }

  selectList(name: string) {
    this.router.navigate(['/tabs/tab3', name]);
  }
  
}