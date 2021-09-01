import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/service/task.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/models/user.model';
import * as moment from 'moment';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {

  editMode : Boolean = false;
  taskId !: number;
  task !: Task;
  taskForm !: FormGroup;
  users !: User[];
  activeUser : User;

  constructor(private route: ActivatedRoute,private router: Router,private taskService : TaskService, private userService : UserService,private store : Store<AppState>) { }

  ngOnInit(): void {

    this.route.params.subscribe((params : Params) => {
        this.taskId = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
    });

    this.store.select('auth').subscribe( (state) => {
        this.activeUser = state.user;
    });

    this.users = this.userService.getUsers();
  }
  
  initForm(){

    let title = '';
    let description = '';
    let reminderTime = moment(new Date()).format('YYYY-MM-DDTHH:mm') ;
    let createdBy = '';
    let assignedTo = '';

    console.log(reminderTime);

    if (this.editMode) {

      this.task = this.taskService.getTask(this.taskId);
      title = this.task.title;
      description = this.task.description;
      createdBy = this.task.createdBy;
      reminderTime = moment(new Date(this.task.reminderTime)).format('YYYY-MM-DDTHH:mm');
      assignedTo = this.task.assignedTo;
    }

    this.taskForm = new FormGroup({
      title: new FormControl(title, Validators.required),
      description: new FormControl(description, Validators.required),
      reminderTime: new FormControl(reminderTime, Validators.required),
      createdBy: new FormControl(createdBy),
      assignedTo: new FormControl(assignedTo, Validators.required),
    });

  }

  onSubmit(){
    this.taskForm.value.reminderTime=new Date(this.taskForm.value['reminderTime']).toISOString();
    if(this.editMode && confirm('Are You Sure You want to Update this Task ? ')){
      this.taskService.updateTask(this.taskId,this.taskForm.value);
      this.formCompleted('Task Updated');
    }
    else if(!this.editMode){
      this.taskForm.value.createdBy=this.activeUser.email;
      this.taskService.addTask(this.taskForm.value);
      this.formCompleted('Task Added');
    }
    
  }

  onDelete(){
    if(confirm('Are You Sure You want to Delete this Task ? ')){
      this.taskService.deleteTask(this.taskId);
      this.formCompleted('Task Deleted');
    }
  }

  onCancel(){
    this.initForm();
  }
  
  formCompleted(message : string){
    alert(message);
    this.router.navigate(['tasks','new','task']);
  }

}
