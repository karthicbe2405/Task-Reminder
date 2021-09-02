import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Notification } from '../models/notification.model';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, OnDestroy {

  notifications : Notification[];
  notificationSubscription : Subscription;

  constructor(private notificationService : NotificationService) { }

  ngOnInit(): void {
    
    this.notifications = this.notificationService.getNotifications();

    this.notificationSubscription = this.notificationService.notificationUpdate
      .subscribe( (notification : Notification[]) => {
        this.notifications = notification;
      } 
    );
  }

  ngOnDestroy(){
    this.notificationSubscription.unsubscribe();
  }

}
