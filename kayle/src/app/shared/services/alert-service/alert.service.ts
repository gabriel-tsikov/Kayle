import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NavigationStart, Router } from '@angular/router';

import { IAlert } from '../../models/alert.model';
import {
  CLASS_WARNING,
  CLASS_SUCCESS,
  CLASS_ERROR,
  SUCCESS,
  WARNING,
  _ERROR,
} from '../../constants/alert.constants';


@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private subject: Subject<IAlert> = new Subject<IAlert>();
  private keepMessageAfterRouteChange = false;
  shouldShowAlert = true;

  constructor(private router: Router) {
    // clear alert message on route change unless 'keepMessageAfterRouteChange' is true
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepMessageAfterRouteChange) {
          // keep message for a single route change
          this.keepMessageAfterRouteChange = false;
        } else {
          this.clear();
        }
      }
    });
  }

  getAlert(): Observable<any> {
    return this.subject.asObservable();
  }

  sendAlert(type: string, message: string, keepMessageAfterRouteChange: boolean = false,
            closeInterval: number = 5000): void {
    this.keepMessageAfterRouteChange = keepMessageAfterRouteChange;

    if (this.shouldShowAlert) {
      this.shouldShowAlert = false;

      switch (type) {
        case SUCCESS:
          this.subject.next({ message, cssClass: CLASS_SUCCESS });
          break;
        case _ERROR:
          this.subject.next({ message, cssClass: CLASS_ERROR });
          break;
        case WARNING:
          this.subject.next({ message, cssClass: CLASS_WARNING });
          break;
      }

      setTimeout(() => {
        this.clear();
        this.shouldShowAlert = true;
      }, closeInterval);
    }
  }

  clear() {
    this.subject.next();
  }
}
