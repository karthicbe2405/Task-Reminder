import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Notification } from '../models/notification.model';
import { User } from '../models/user.model';
import { AppState } from '../store/app.reducer';
import { TaskService } from './task.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notificationUpdate = new Subject<Notification[]>();

  notifications : Notification[] = [];
  activeUser : User;

  constructor(private store : Store<AppState>,private taskService : TaskService) { 

    this.store.select('auth')
      .subscribe( (state) => {
        if(state.user){
          this.activeUser = state.user;
          this.updateNotifications();
        }
      });
      
    this.taskService.taskUpdate
      .subscribe((status) => {
        this.updateNotifications();
      });

  }

  updateNotifications(){
      if(this.activeUser){
        this.notifications = this.taskService.getUserTaksNotifications(this.activeUser.email);
        this.notificationUpdate.next(this.notifications.slice());
      }
  }
  
  getNotifications(){
    return this.notifications.slice();
  }
      
}


