import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './tasks.component';
import { AuthGuard } from '../auth/auth.guard';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskListComponent } from './task-list/task-list.component';
import { SharedModule } from '../shared/shared.module';
import { FilterTaskPipe } from '../pipes/filter-task.pipe';


const route : Routes = [
  {path:'tasks',component:TasksComponent, canActivate : [AuthGuard],
    children : [
      {path:'new/task',component:TaskDetailComponent},
      {path:':id/task',component:TaskDetailComponent}
    ]
  }
];
@NgModule({
  declarations: [
    TasksComponent,
    TaskListComponent,
    TaskDetailComponent,
    FilterTaskPipe
  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(route)
  ],
  exports:[
    TasksComponent,
    TaskListComponent,
    TaskDetailComponent
  ]
})
export class TasksModule { }
