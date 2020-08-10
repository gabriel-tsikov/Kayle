import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { take } from 'rxjs/operators';

import { BUTTON_PROPS, BUTTON_TYPE } from '../../shared/constants/common.constants';
import { FollowButton } from '../classes/follow-button.class';
import { FollowService } from '../services/follow.service';
import { UsersService } from '../services/users.service';
import { IUser } from '../models/user.model';


@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.scss'],
})
export class FollowButtonComponent implements OnInit {
  button: FollowButton = new FollowButton();

  @Output() updateFollowedStatus: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() buttonType: string;
  @Input() username: string;

  constructor(private usersService: UsersService,
              private followService: FollowService) {
  }

  ngOnInit(): void {
    this.getButtonProps();
  }

  followUser(): void {
    this.usersService.followUser(this.username)
      .pipe(take(1)).subscribe((response: IUser) => {
      this.updateFollowedStatus.emit(true);
      this.followService.update(response);
    });
  }

  unfollowUser(): void {
    this.usersService.unfollowUser(this.username)
      .pipe(take(1)).subscribe((response: IUser) => {
      this.updateFollowedStatus.emit(false);
      this.followService.update(response);
    });
  }

  getButtonProps(): void {
    switch (this.buttonType) {
      case BUTTON_TYPE.follow:
        this.button.onClick = this.followUser.bind(this);
        this.button.text = BUTTON_PROPS.textFollow;
        break;
      case BUTTON_TYPE.unfollow:
        this.button.onClick = this.unfollowUser.bind(this);
        this.button.class = BUTTON_PROPS.classButtonEmpty;
        this.button.text = BUTTON_PROPS.textUnfollow;
        break;
    }
  }
}
