import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AlertService } from '../../services/alert-service/alert.service';
import { IAlert } from '../../models/alert.model';


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  alert: IAlert;

  constructor(private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.subscription = this.alertService.getAlert()
      .subscribe((alert: IAlert) => {
        this.alert = alert;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  closeAlert(): void {
    this.alertService.clear();
  }
}
