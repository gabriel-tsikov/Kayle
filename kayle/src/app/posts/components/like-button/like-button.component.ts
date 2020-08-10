import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { getSpecificPostSuccess, updatePost } from '../../../store/all-posts/actions';
import { _ERROR, MESSAGE_AUTH_GUARD } from 'src/app/shared/constants/alert.constants';
import { AlertService } from 'src/app/shared/services/alert-service/alert.service';
import { IAppState, getIsUserLoggedIn } from 'src/app/store';
import { PostService } from '../../services/post.service';
import { IPost } from '../../models/post.model';


@Component({
  selector: 'app-like-button',
  templateUrl: './like-button.component.html',
  styleUrls: ['./like-button.component.scss'],
})
export class LikeButtonComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  isLogged: boolean;

  @Input() isLiked: boolean | null;
  @Input() postId: number;

  constructor(
    private postService: PostService,
    private store: Store<IAppState>,
    private alertService: AlertService,
  ) {
  }

  // checks if the user is logged
  ngOnInit(): void {
    this.checkIfLogged();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  checkIfLogged(): void {
    this.store
      .select(getIsUserLoggedIn)
      .pipe(take(1))
      .subscribe((response: boolean) => {
        this.isLogged = response;
      });
  }

  /**
   * If the user is authorized:
   * a request is sent to like/unlike a post
   * depending on its current state
   *
   * If the user is unauthorized:
   * doesn't allow the DOM to display the like action
   * displays an alert
   */
  likeAction(event: Event): void {
    if (this.isLogged === true) {
      if (this.isLiked) {
        this.unlikePost();
      } else {
        this.likePost();
      }
    } else {
      event.preventDefault();
      this.alertService.sendAlert(_ERROR, MESSAGE_AUTH_GUARD);
    }
  }

  // sends a delete request to remove the like
  unlikePost(): void {
    this.subscription.add(this.postService.unlike(this.postId)
      .subscribe((post: IPost) => {
        this.updatePost(post);
        this.isLiked = false;
      }));
  }

  // sends a post request to add the like
  likePost(): void {
    this.subscription.add(this.postService.like(this.postId)
      .subscribe((post: IPost) => {
        this.updatePost(post);
        this.isLiked = true;
      }));
  }

  // updates the state of the post in store
  updatePost(post): void {
    const payload = {
      post,
    };

    this.store.dispatch(updatePost({
      payload,
    }));

    this.store.dispatch(getSpecificPostSuccess({
      payload,
    }));
  }
}
