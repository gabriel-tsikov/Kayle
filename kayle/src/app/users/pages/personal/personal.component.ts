import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import {
  getLoggedUserInfoSuccess,
  getLoggedUserInfo,
  logout,
} from '../../../store/authentication/actions';
import { PostsListComponent } from '../../../posts/components/posts-list/posts-list.component';
import { FollowsListComponent } from '../../components/follows-list/follows-list.component';
import { EditPictureComponent } from '../../components/edit-picture/edit-picture.component';
import { _ERROR, MESSAGE_ERROR_FOLLOW } from '../../../shared/constants/alert.constants';
import { LoaderService } from '../../../shared/services/loader-service/loader.service';
import { AlertService } from '../../../shared/services/alert-service/alert.service';
import { ModalService } from '../../../shared/services/modal-service/modal.service';
import { FOLLOWERS, FOLLOWING } from '../../constants/follows-types.constants';
import { getLoggedUser, getLoggedUsername, IAppState } from '../../../store';
import { LOADER_MODE_CUSTOM } from '../../constants/loader-props.constants';
import { IModalProps } from '../../../shared/models/modal-state.model';
import { FollowService } from '../../services/follow.service';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../models/user.model';


@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss'],
  host: { '[class.full-width]': 'shouldBeFullWidth' },
})
export class PersonalComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  shouldShowFollowButton: boolean;
  shouldBeFullWidth: boolean;
  isUserFollowed: boolean;
  isInOwnProfile: boolean;
  loggedUsername: string;
  username: string;
  user: IUser;

  @ViewChild('postsListComponent') postsListComponent: PostsListComponent;

  constructor(private route: ActivatedRoute,
              private usersService: UsersService,
              private modalService: ModalService,
              private store: Store<IAppState>,
              private alertService: AlertService,
              private followService: FollowService,
              private router: Router,
              private loaderService: LoaderService) {
  }

  ngOnInit(): void {
    this.shouldBeFullWidth = true;
    this.getLoggedUsername();
    this.getUsername();
    this.getUserInfo();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Gets loggedUser's username from the store
   */
  getLoggedUsername(): void {
    this.store.select(getLoggedUsername).pipe(take(1))
      .subscribe((response: string) => {
        this.loggedUsername = response;
      });
  }

  /**
   * Gets the username of the profile that has to be displayed from the route snapshot
   * If username is equal to logged user's username sets the values of
   * 'shouldShowFollowButton' and 'isInOwnProfile' accordingly
   */
  getUsername(): void {
    this.username = this.route.snapshot.params.username;
    if (this.username.toLowerCase() === this.loggedUsername.toLowerCase()) {
      this.shouldShowFollowButton = false;
      this.isInOwnProfile = true;
    } else {
      this.shouldShowFollowButton = true;
    }
  }

  /**
   * Sends an API request for user's information
   * If the request is successful calls 'checkIsUserFollowed',
   * 'handleFollowAndUnfollowActions' and 'updateIfLoggedUser' methods
   * If the request isn't successful navigates to 404 page
   */
  getUserInfo(): void {
    this.loaderService.show({ className: LOADER_MODE_CUSTOM });

    this.usersService.getByUsername(this.username).pipe(take(1))
      .subscribe((response: IUser) => {
          this.user = response;
          this.checkIsUserFollowed();
          this.handleFollowAndUnfollowActions();
          this.updateIfLoggedUser(response);
        },
        () => {
          this.loaderService.hide();
          this.router.navigate(['404']);
        });
  }

  /**
   * Checks if the loggedUser has followed the user
   */
  checkIsUserFollowed(): void {
    if (!this.isInOwnProfile) {
      for (const follower of this.user.followers) {
        if (follower.username.toLowerCase() === this.loggedUsername.toLowerCase()) {
          this.isUserFollowed = true;
          return;
        }
      }
      this.isUserFollowed = false;
    }
  }

  /**
   * Subscribes to logged user from the store
   */
  getLoggedUser(): void {
    this.subscription.add(this.store.select(getLoggedUser)
      .subscribe((response: IUser) => {
        this.user = response;
      }));
  }

  /**
   * Opens a list of following
   */
  openFollowing(): void {
    if (this.user.following.length === 0) {
      return;
    } else if (this.isUserFollowed || this.isInOwnProfile) {
      this.followService.sendFollowers(this.user.following);
      this.modalService.show(FollowsListComponent, this.getProps(FOLLOWING));
    } else {
      this.alertService.sendAlert(_ERROR, MESSAGE_ERROR_FOLLOW);
    }
  }

  /**
   * Opens a list of followers
   */
  openFollowers(): void {
    if (this.user.followers.length === 0) {
      return;
    } else if (this.isUserFollowed || this.isInOwnProfile) {
      this.followService.sendFollowers(this.user.followers);
      this.modalService.show(FollowsListComponent, this.getProps(FOLLOWERS));
    } else {
      this.alertService.sendAlert(_ERROR, MESSAGE_ERROR_FOLLOW);
    }
  }

  /**
   * Returns an object with modal properties
   */
  getProps(headerText: string): IModalProps {
    return {
      maxWidth: 450,
      paddingRight: 0,
      paddingLeft: 10,
      paddingTop: 10,
      paddingBottom: 0,
      shouldCloseOnOutsideClick: true,
      headerText,
    };
  }

  handleFollowAndUnfollowActions(): void {
    this.subscription.add(this.followService.followAndUnfollowState$
      .subscribe(() => {
        this.store.dispatch(getLoggedUserInfo({
          payload: {
            username: this.loggedUsername,
          },
        }));
      }));
  }

  updateIfLoggedUser(response: IUser): void {
    if (this.isInOwnProfile) {
      this.getLoggedUser();
      this.store.dispatch(getLoggedUserInfoSuccess({
        payload: {
          user: response,
        },
      }));
    }
  }

  openEditProfilePictureForm(): void {
    this.modalService.show(EditPictureComponent, {
      maxWidth: 1200,
      shouldCloseOnOutsideClick: false,
    });
  }

  // TODO: use modal
  deleteUserProfile(user: IUser): void {
    if (confirm(`Are you sure you want to delete your account? - ${this.username}`)) {
      this.usersService.deleteUserProfile(user)
        .pipe(take(1)).subscribe();
      this.store.dispatch(logout());
    }
  }

  updateUsersData(): void {
    this.refreshPersonalComponent();
    this.refreshPosts();
  }

  refreshPersonalComponent(): void {
    this.subscription.unsubscribe();
    this.ngOnInit();
  }

  refreshPosts(): void {
    this.postsListComponent.ngOnDestroy();
    this.postsListComponent.ngOnInit();
  }
}
