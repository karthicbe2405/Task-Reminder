import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  taskUpdate = new Subject<Task[]>();

  tasks : Task[] = [{
    title : "Task1",
    description : "First Try",
    reminderTime : "2019-12-31T18:30:00Z",
    createdBy : "utkarsh.patel@maximl.com",
    assignedTo : "sakshee.jain@maximl.com"
  },
  {
    title : "Task2",
    description : "First Try",
    reminderTime : "2019-12-31T18:30:00Z",
    createdBy : "utkarsh.patel@maximl.com",
    assignedTo : "sakshee.jain@maximl.com"
  },
  { 
    title : "Task3",
    description : "First Try",
    reminderTime : "2019-12-31T18:30:00Z",
    createdBy : "utkarsh.patel@maximl.com",
    assignedTo : "hari@maximl.com"
  },
  {
    title : "Task4",
    description : "First Try",
    reminderTime : "2019-12-31T18:30:00Z",
    createdBy : "utkarsh.patel@maximl.com",
    assignedTo : "sakshee.jain@maximl.com"
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

}
