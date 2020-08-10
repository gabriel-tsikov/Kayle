import { Pipe, PipeTransform } from '@angular/core';
import { INotification } from '../models/notification.model';

@Pipe({
  name: 'filterUnread',
})
export class FilterUnreadPipe implements PipeTransform {
  transform(notifications: INotification[]): number {
    return notifications?.filter(
      (notification) => notification.status === 'unread'
    ).length;
  }
}
