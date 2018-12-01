import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ActionSheetController,
  AlertController
} from 'ionic-angular';

/**
 * Generated class for the TaskListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-task-list',
  templateUrl: 'task-list.html'
})
export class TaskListPage {
  tasks: Array<{ name: string }> = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskListPage');
  }

  ionViewWillEnter() {
    if (window.localStorage.getItem('tasks')) {
      this.tasks = JSON.parse(window.localStorage.getItem('tasks'));
    }
  }

  changeTask(index: number) {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'タスクの変更',
      buttons: [
        {
          text: '削除',
          role: 'destrutive',
          handler: () => {
            this.tasks.splice(index, 1);
            window.localStorage.setItem('tasks', JSON.stringify(this.tasks));
          }
        },
        {
          text: '変更',
          handler: () => {
            this.removeTask(index);
          }
        },
        {
          text: '閉じる',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  private removeTask(index: number) {
    const prompt = this.alertCtrl.create({
      title: '変更後のタスク',
      inputs: [
        {
          name: 'task',
          placeholder: 'タスク',
          value: this.tasks[index].name
        }
      ],
      buttons: [
        {
          text: '閉じる'
        },
        {
          text: '保存',
          handler: data => {
            this.tasks[index] = { name: data.task };
            window.localStorage.setItem('tasks', JSON.stringify(this.tasks));
          }
        }
      ]
    });
    prompt.present();
  }
}
