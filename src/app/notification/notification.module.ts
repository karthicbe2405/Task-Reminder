import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NotificationComponent } from './notification.component';
import { AuthGuard } from '../auth/auth.guard';


const route : Routes = [
  {path:'notification',component:NotificationComponent, canActivate : [AuthGuard]}
];

@NgModule({
  declarations: [
    NotificationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ],
  exports:[
    NotificationComponent
  ]
})
export class NotificationModule { }
