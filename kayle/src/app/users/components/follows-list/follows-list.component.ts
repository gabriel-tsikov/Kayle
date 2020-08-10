import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { FollowService } from '../../services/follow.service';
import { IFollower } from '../../models/follower.model';


@Component({
  selector: 'app-follow-list',
  templateUrl: './follows-list.component.html',
  styleUrls: ['./follows-list.component.scss'],
})
export class FollowsListComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  followers: IFollower[];

  constructor(private followService: FollowService) {
  }

  ngOnInit(): void {
    this.subscription = this.followService.followersState$
      .subscribe((response: IFollower[]) => {
        this.followers = response;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
