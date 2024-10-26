import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  listName!: string;
  tasks: { name: string, completed: boolean }[] = [];
  newTask: string = '';

  constructor(private route: ActivatedRoute, private taskService: TaskService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.listName = params.get('name') || ''; // Use a fallback empty string
      this.tasks = this.taskService.getTasks(this.listName);
    });
  }
  

  addTask() {
    if (this.newTask.trim().length > 0) {
      this.taskService.addTaskToList(this.listName, this.newTask);
      this.newTask = '';
      this.tasks = this.taskService.getTasks(this.listName);
    }
  }
}
