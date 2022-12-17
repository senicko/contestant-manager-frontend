import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export type Notification = {
  type: 'success' | 'error';
  message: string;
  createdAt: string;
};

export type NotificationCreateData = Omit<Notification, 'createdAt'>;

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  notifications = new Subject<Notification>();

  constructor() {}

  /**
   * Pushes the notification.
   * @param notification notification to be pushed
   */
  push(notification: NotificationCreateData) {
    this.notifications.next({
      ...notification,
      createdAt: new Intl.DateTimeFormat('pl', {
        dateStyle: 'long',
        timeStyle: 'medium',
      }).format(new Date()),
    });
  }
}
