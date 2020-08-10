import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { NOTIFICATION_MESSAGE } from '../../constants/notification-message.constants';
import { WebsocketService } from '../../services/websocket.service';
import { INotification } from '../../models/notification.model';


@Component({
  selector: 'app-notification-alert',
  templateUrl: './notification-alert.component.html',
  styleUrls: ['./notification-alert.component.scss'],
})
export class NotificationAlertComponent implements OnInit, OnDestroy {
  notifications: INotification[] = [];
  subscription: Subscription;
  message: string;

  constructor(private websocketService: WebsocketService) {
  }

  ngOnInit(): void {
    this.getNotificationArray();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getNotificationArray(): void {
    this.subscription = this.websocketService.notificationsSocket$.subscribe(
      (response: INotification) => {
        if (response.id !== this.notifications[this.notifications?.length - 1]?.id) {
          this.notifications.push(response);
          this.buildMessage(response);
        }
      },
    );
  }

  buildMessage(notification: INotification): void {
    switch (notification.type) {
      case 'like':
        this.message = `${notification.notificationAuthor.username} ${NOTIFICATION_MESSAGE.like}`;
        break;
      case 'post':
        this.message = `${notification.notificationAuthor.username} ${NOTIFICATION_MESSAGE.post}`;
        break;
      case 'comment':
        this.message = `${notification.notificationAuthor.username} ${NOTIFICATION_MESSAGE.comment}`;
        break;
      case 'follow':
        this.message = `${notification.notificationAuthor.username} ${NOTIFICATION_MESSAGE.follow}`;
        break;
    }
    this.clear();
  }

  clear(): void {
    if (this.notifications) {
      setTimeout(() => this.popNotification(), 5000);
    }
  }

  readNotification(notificationId: number): void {
    this.websocketService.readNotification(notificationId);
    this.popNotification();
  }

  popNotification(): void {
    this.notifications.pop();
  }
}
