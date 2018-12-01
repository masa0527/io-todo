import { Component } from '@angular/core';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  title: string = 'タスク登録';
  tasks: Array<{ name: string }> = [];
  task: string;
  constructor() {}

  ionViewWillEnter() {
    if (window.localStorage.getItem('tasks')) {
      this.tasks = JSON.parse(window.localStorage.getItem('tasks'));
    }
  }

  addTask() {
    this.tasks.push({
      name: this.task
    });
    window.localStorage.setItem('tasks', JSON.stringify(this.tasks));
    this.task = '';
  }
}
