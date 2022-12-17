import { Component, OnInit } from '@angular/core';
import { NotificationService, Notification } from '../../notification.service';

@Component({
  selector: 'app-notification-queue',
  templateUrl: './notification-queue.component.html',
})
export class NotificationQueueComponent implements OnInit {
  notifications: Notification[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.notifications.subscribe((notification) => {
      this.notifications.unshift(notification);

      setTimeout(() => {
        this.notifications.pop();
      }, 5000);
    });
  }
}
