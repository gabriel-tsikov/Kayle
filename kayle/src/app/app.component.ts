import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { LayoutModeService } from './shared/services/layout-mode.service';
import { LAYOUT_COMPACT } from './shared/constants/layout-mode.constants';
import { ILayoutMode } from './shared/models/layout-mode.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  shouldSwitchToCompactMode: boolean;
  private subscription: Subscription;

  constructor(private layoutModeService: LayoutModeService) {
  }

  ngOnInit(): void {
    this.getLayoutMode();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getLayoutMode(): void {
    this.subscription = this.layoutModeService.layoutState$
      .subscribe((response: ILayoutMode) => {
          this.shouldSwitchToCompactMode = response.type === LAYOUT_COMPACT;
        },
      );
  }
}
