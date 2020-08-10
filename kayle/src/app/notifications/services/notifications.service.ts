import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from 'src/app/shared/services/http-service/http.service';
import { API_REQUESTS } from 'src/app/shared/constants/api.constants';
import { INotification } from '../models/notification.model';


@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private http: HttpService) {}

  getNotifications(): Observable<INotification[]> {
    return this.http.get(API_REQUESTS.notifications.get);
  }
}
