import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { DEFAULT_AVATAR, DEFAULT_AVATAR_TEXT } from '../../constants/common.constants';
import { _ERROR, MESSAGE_AUTH_GUARD } from '../../constants/alert.constants';
import { AlertService } from '../../services/alert-service/alert.service';
import { ModalService } from '../../services/modal-service/modal.service';
import { getIsUserLoggedIn, IAppState } from '../../../store';


@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit {
  isUserLoggedIn: boolean;

  @Input() disableClick: boolean;
  @Input() username: string;
  @Input() height: number;
  @Input() avatar: string;
  @Input() width: number;

  constructor(private router: Router,
              private store: Store<IAppState>,
              private alertService: AlertService,
              private modalService: ModalService) {
  }

  ngOnInit(): void {
    this.getIsUserLoggedIn();
  }

  getIsUserLoggedIn(): void {
    this.store.select(getIsUserLoggedIn).pipe(take(1))
      .subscribe((response: boolean) => {
        this.isUserLoggedIn = response;
      });
  }

  onImageError(event): void {
    event.target.src = DEFAULT_AVATAR;
  }

  getAvatar(): string {
    if (!this.avatar || this.avatar === DEFAULT_AVATAR_TEXT) {
      return DEFAULT_AVATAR;
    }

    return this.avatar;
  }

  openUserProfile(): void {
    if (this.disableClick) {
      return;
    }

    if (this.isUserLoggedIn) {
      this.router.navigate([this.username]);
      this.modalService.hide();
    } else {
      this.alertService.sendAlert(_ERROR, MESSAGE_AUTH_GUARD, true);
    }
  }
}
