import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import {
  getIsLastTake,
  getIsLoading,
  getAllPosts,
  IAppState,
} from '../../../store';
import {
  getDashboardPosts,
  getPersonalPosts,
  getPublicPosts,
  clearPosts,
} from '../../../store/all-posts/actions';
import { LoaderService } from '../../../shared/services/loader-service/loader.service';
import { LOADER_MODE_CUSTOM } from '../../../users/constants/loader-props.constants';
import { DASHBOARD, PERSONAL, PUBLIC } from '../../constants/posts-path.constants';
import { getLoggedUsername } from '../../../store';
import { IPost } from '../../models/post.model';


@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  posts$: Observable<IPost[]>;
  loggedUsername: string;
  finished: boolean;
  postsTake = 10;

  @Input() postsType: string;
  @Input() userId: number;

  constructor(private store: Store<IAppState>,
              private loaderService: LoaderService) {
  }

  ngOnInit(): void {
    this.getLoggedUsername();
    this.resetPostsState();
    this.getIsLastTake();
    this.getPosts();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  resetPostsState(): void {
    this.store.dispatch(clearPosts());
  }

  getLoggedUsername(): void {
    this.subscription.add(this.store.select(getLoggedUsername)
      .subscribe((result: string) => {
        this.loggedUsername = result;
      }));
  }

  getIsLastTake(): void {
    this.subscription.add(this.store.select(getIsLastTake)
      .subscribe((response: boolean) => {
        this.finished = response;
      }));
  }

  getPosts(): void {
    if (this.finished) {
      return;
    }

    switch (this.postsType) {
      case PUBLIC:
        this.dispatchPublicPosts();
        break;
      case DASHBOARD:
        this.dispatchDashboardPosts();
        break;
      case PERSONAL:
        this.subscription.add(this.store.select(getIsLoading)
          .subscribe((response: boolean) => {
            if (response) {
              this.loaderService.show({ className: LOADER_MODE_CUSTOM });
            } else {
              this.loaderService.hide();
            }
          }));
        this.dispatchPersonalPosts();
        break;
    }

    this.posts$ = this.store.select(getAllPosts);
  }

  onScroll(): void {
    this.getPosts();
  }

  dispatchPublicPosts(): void {
    this.store.dispatch(getPublicPosts(this.getPayload(this.postsTake)));
  }

  dispatchDashboardPosts(): void {
    this.store.dispatch(getDashboardPosts(this.getPayload(this.postsTake)));
  }

  dispatchPersonalPosts(): void {
    this.store.dispatch(getPersonalPosts(this.getPayload(this.postsTake, this.userId)));
  }

  getPayload(take: number, userId?: number): { payload: any } {
    return {
      payload: {
        take,
        userId,
      },
    };
  }
}
