import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { NotificationService } from '../../services/notifications.service';
import { WebsocketService } from '../../services/websocket.service';
import { INotification } from '../../models/notification.model';
import {
  MAX_NOTIFICATIONS_COUNT,
  STATUS_READ,
} from '../../constants/notification-message.constants';

@Component({
  selector: 'app-notification-bell',
  templateUrl: './notification-bell.component.html',
  styleUrls: ['./notification-bell.component.scss'],
})
export class NotificationBellComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  shouldShowNotifications: boolean;
  notifications: INotification[];
  isLoading: boolean;

  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private websocketService: WebsocketService,
  ) {
  }

  ngOnInit(): void {
    this.getNotifications();
    this.checkForRouteChanges();
    this.checkForNewNotifications();
  }

  getNotifications(): void {
    this.isLoading = true;
    this.notificationService.getNotifications().pipe(take(1))
      .subscribe(response => {
        this.notifications = response;
        this.isLoading = false;
      });
  }

  checkForRouteChanges(): void {
    this.subscription.add(
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.shouldShowNotifications = false;
        }
      }),
    );
  }

  checkForNewNotifications(): void {
    this.subscription.add(this.websocketService.notificationsSocket$.subscribe(
      (response: INotification) => {
        if (!this.shouldShowNotifications && this.notifications.length < MAX_NOTIFICATIONS_COUNT) {
          this.notifications = [response, ...this.notifications];
        }
      },
    ));
  }

  toggleNotifications(event: Event): void {
    event.stopPropagation();
    this.shouldShowNotifications = !this.shouldShowNotifications;
    if (this.shouldShowNotifications) {
      this.getNotifications();
    }
  }

  readNotification(notificationId): void {
    this.notifications = this.notifications.map(notification => {
      if (notification.id === notificationId) {
        notification.status = STATUS_READ;
        return notification;
      }
      return notification;
    });
  }
}
