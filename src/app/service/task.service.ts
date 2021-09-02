import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Task } from '../models/task.model';
import { Notification } from '../models/notification.model';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  taskUpdate = new Subject<Task[]>();

  tasks : Task[] = [{
    title : "Task1",
    description : "First Try",
    reminderTime : "2019-12-31T18:30:00Z",
    createdBy : "aravind@maximl.com",
    assignedTo : "lakshman@maximl.com"
  },
  {
    title : "Task2",
    description : "Second Try",
    reminderTime : "2019-12-31T18:30:00Z",
    createdBy : "hari@maximl.com",
    assignedTo : "kumar@maximl.com"
  },
  { 
    title : "Task3",
    description : "Third Try",
    reminderTime : "2019-12-31T18:30:00Z",
    createdBy : "kumar@maximl.com",
    assignedTo : "aravind@maximl.com"
  },
  {
    title : "Task4",
    description : "First Try",
    reminderTime : "2019-12-31T18:30:00Z",
    createdBy : "lakshman@maximl.com",
    assignedTo : "hari@maximl.com"
  }
];

  constructor() { }

  getTasks(){
    return this.tasks.slice();
  }

  getTask(index : number){
    return this.tasks[index];
  }

  addTask(task : Task){
    this.tasks.push(task);
    this.taskUpdated();
  }
  updateTask(index : number,task : Task){
    this.tasks[index] = task;
    this.taskUpdated();
  }

  deleteTask(index : number){
    this.tasks.splice(index,1);
    this.taskUpdated();
  }

  taskUpdated(){
    this.taskUpdate.next(this.tasks);
  }

  getUserTaksNotifications(userEmail : string){
    let notifications : Notification[] = this.tasks.filter( (task) => {
        if( userEmail === task.assignedTo)
          return true;
        return false;
    }).map( (task) => {
        return {
          text : task.title + ' ' + task.description,
          timeCreated : task.reminderTime
        };
    });
    return notifications;
  }

}
