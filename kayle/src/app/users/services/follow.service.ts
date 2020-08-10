import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

import { IFollower } from '../models/follower.model';
import { IUser } from '../models/user.model';


@Injectable({
  providedIn: 'root',
})
export class FollowService {
  private followersSubject: BehaviorSubject<IFollower[]> = new BehaviorSubject<IFollower[]>(null);
  private followAndUnfollowSubject: Subject<IUser> = new Subject<IUser>();
  followersState$: Observable<IFollower[]> = this.followersSubject.asObservable();
  followAndUnfollowState$: Observable<IUser> = this.followAndUnfollowSubject.asObservable();

  constructor() {
  }

  sendFollowers(followers: IFollower[]): void {
    this.followersSubject.next(followers);
  }

  update(user: IUser): void {
    this.followAndUnfollowSubject.next(user);
  }
}
