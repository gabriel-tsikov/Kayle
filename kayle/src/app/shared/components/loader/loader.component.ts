import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { LOADER_MODE_CUSTOM } from '../../../users/constants/loader-props.constants';
import { LoaderService } from '../../services/loader-service/loader.service';
import { LayoutModeService } from '../../services/layout-mode.service';
import { LAYOUT_COMPACT } from '../../constants/layout-mode.constants';
import { ILoaderState } from '../../models/loader-state.model';


@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  shouldSwitchToCustomMode: boolean;
  loaderState: ILoaderState;
  isInCompactMode: boolean;

  constructor(private loaderService: LoaderService,
              private layoutModeService: LayoutModeService) {
  }

  ngOnInit(): void {
    this.getLoaderState();
    this.getLayoutState();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getLoaderState(): void {
    this.subscription.add(this.loaderService.loaderState$
      .subscribe((response: ILoaderState) => {
        this.loaderState = response;
        this.shouldSwitchToCustomMode = this.loaderState.props?.className === LOADER_MODE_CUSTOM;
      }));
  }

  getLayoutState(): void {
    this.subscription = this.layoutModeService.layoutState$
      .subscribe(response => {
        this.isInCompactMode = response.type === LAYOUT_COMPACT;
      });
  }
}
