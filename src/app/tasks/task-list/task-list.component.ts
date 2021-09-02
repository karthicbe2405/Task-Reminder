import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/service/task.service';
import { UserService } from 'src/app/service/user.service';
import {User} from 'src/app/models/user.model'

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, OnDestroy {

  tasks : Task[];
  users : User[];

  assignedTo : String = '';

  constructor(private taskService : TaskService,private userService : UserService) { }

  subscription !: Subscription;

  ngOnInit(): void{

    this.tasks = this.taskService.getTasks();

    this.subscription = this.taskService.taskUpdate
      .subscribe( (tasks : Task[]) =>{
        this.tasks = tasks;
      });

    this.users = this.userService.getUsers();

  }

  ngOnDestroy() : void{
    this.subscription.unsubscribe();
  }

}
