import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import {
  NOTIFICATION_MESSAGE, NOTIFICATION_TYPES,
  STATUS_UNREAD,
} from '../../constants/notification-message.constants';
import { WebsocketService } from '../../services/websocket.service';
import { INotification } from '../../models/notification.model';


@Component({
  selector: 'app-notification-unit',
  templateUrl: './notification-unit.component.html',
  styleUrls: ['./notification-unit.component.scss'],
})
export class NotificationUnitComponent implements OnInit {
  shouldShowAsUnread: boolean;
  message: string;

  @Output() markAsRead: EventEmitter<number> = new EventEmitter<number>();
  @Input() notification: INotification;

  constructor(
    private websocketService: WebsocketService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildMessage();
    this.checkIfUnread();
  }

  buildMessage(): void {
    switch (this.notification.type) {
      case NOTIFICATION_TYPES.like:
        this.message = `${NOTIFICATION_MESSAGE.like}`;
        break;
      case NOTIFICATION_TYPES.post:
        this.message = `${NOTIFICATION_MESSAGE.post}`;
        break;
      case NOTIFICATION_TYPES.comment:
        this.message = `${NOTIFICATION_MESSAGE.comment}`;
        break;
      case NOTIFICATION_TYPES.follow:
        this.message = `${NOTIFICATION_MESSAGE.follow}`;
        break;
    }
  }

  checkIfUnread(): void {
    this.shouldShowAsUnread = this.notification.status === STATUS_UNREAD;
  }

  readNotification(notificationId: number): void {
    this.websocketService.readNotification(notificationId);
    this.markAsRead.emit(this.notification.id);
    this.shouldShowAsUnread = false;
  }

  goToPost(): void {
    this.readNotification(this.notification.id);
    this.router.navigate([`/post/${this.notification.post.id}`]);
  }

  goToUserPage(): void {
    this.router.navigate([`${this.notification.notificationAuthor.username}`]);
  }
}
