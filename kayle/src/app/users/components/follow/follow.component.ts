import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { FollowService } from '../../services/follow.service';
import { UsersService } from '../../services/users.service';
import { getLoggedUser, IAppState } from '../../../store';
import { IFollower } from '../../models/follower.model';
import { IUser } from '../../models/user.model';


@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.scss'],
})
export class FollowComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  isFollowerTheLoggedUser: boolean;
  isUserFollowed: boolean;
  loggedUser: IUser;

  @Input() follower: IFollower;

  constructor(private usersService: UsersService,
              private followService: FollowService,
              private store: Store<IAppState>) {
  }

  ngOnInit(): void {
    this.getLoggedUser();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getLoggedUser(): void {
    this.subscription = this.store.select(getLoggedUser)
      .subscribe((response: IUser) => {
        this.loggedUser = response;
        this.checkIfFollowerIsTheLoggedUser();
        this.checkIsUserFollowed();
      });
  }

  checkIfFollowerIsTheLoggedUser(): void {
    if (this.loggedUser.id === this.follower.id) {
      this.isFollowerTheLoggedUser = true;
    }
  }

  checkIsUserFollowed(): void {
    for (const follower of this.loggedUser.following) {
      if (follower.id === this.follower.id) {
        this.isUserFollowed = true;
        break;
      }
    }
  }
}
