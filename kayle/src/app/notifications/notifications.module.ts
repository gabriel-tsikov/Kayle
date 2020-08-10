import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NotificationAlertComponent } from './components/notification-alert/notification-alert.component';
import { NotificationBellComponent } from './components/notification-bell/notification-bell.component';
import { NotificationUnitComponent } from './components/notification-unit/notification-unit.component';
import { FilterUnreadPipe } from './pipes/filter-unread.pipe';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    NotificationAlertComponent,
    NotificationBellComponent,
    NotificationUnitComponent,
    FilterUnreadPipe,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    NotificationAlertComponent,
    NotificationBellComponent,
    NotificationUnitComponent,
  ],
})
export class NotificationsModule {
}
