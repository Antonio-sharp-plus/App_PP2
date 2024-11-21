import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  listName!: string;
  tasks: { name: string, completed: boolean }[] = [];
  newTask: string = '';
  tags: string[] = [];
  allChecked: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.listName = params.get('name') || ''; // Use a fallback empty string
      this.loadTasks();
    });
  }

  async loadTasks() {
    const list = this.taskService.getList(this.listName);
    if (list) {
      this.tasks = list.tasks;
      this.tags = list.tags;
    }
  }

  addTask() {
    if (this.newTask.trim().length > 0) {
      this.taskService.addTaskToList(this.listName, this.newTask);
      this.newTask = '';
      this.loadTasks(); // Asegurarse de actualizar la lista de tareas después de añadir una nueva
    }
  }

  toggleAllTasks() {
    this.tasks.forEach(task => task.completed = this.allChecked);
    this.taskService.updateTasks(this.listName, this.tasks);
  }

  async editTask(task: { name: string, completed: boolean }) {
    const alert = await this.alertController.create({
      header: 'Edit Task',
      inputs: [
        {
          name: 'taskName',
          type: 'text',
          placeholder: 'Task Name',
          value: task.name
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Save',
          handler: (data) => {
            if (data.taskName.trim().length > 0) {
              task.name = data.taskName.trim();
              this.taskService.updateTasks(this.listName, this.tasks);
            }
          }
        }
      ]
    });
    await alert.present();
  }

  deleteTask(task: { name: string, completed: boolean }) {
    this.tasks = this.tasks.filter(t => t !== task);
    this.taskService.updateTasks(this.listName, this.tasks);
  }
}
