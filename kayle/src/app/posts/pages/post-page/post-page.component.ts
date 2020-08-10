import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import {
  getSpecificPostFailed,
  clearCurrentPost,
  getSpecificPost,
} from '../../../store/all-posts/actions';
import { getCurrentPost, getLoggedUsername, IAppState } from '../../../store';
import { IPost } from '../../models/post.model';


@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
})
export class PostPageComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  loggedUsername$: Observable<string>;
  isPostNonExisting: boolean;
  postId: number;
  post: IPost;

  constructor(private route: ActivatedRoute,
              private store: Store<IAppState>,
              private actions$: Actions) {
  }

  ngOnInit(): void {
    this.resetCurrentPostState();
    this.getParams();
    this.getPost();
    this.getLoggedUsername();

    this.subscription.add(this.actions$.pipe(ofType(getSpecificPostFailed))
      .subscribe(() => {
        this.isPostNonExisting = true;
      }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  resetCurrentPostState(): void {
    this.store.dispatch(clearCurrentPost());
  }

  getParams(): void {
    this.postId = this.route.snapshot.params.id;
  }

  getPost(): void {
    this.store.dispatch(getSpecificPost({
      payload: {
        postId: this.postId,
      },
    }));

    this.subscription.add(this.store.select(getCurrentPost)
      .subscribe(response => {
        this.post = response;
      }));
  }

  getLoggedUsername(): void {
    this.loggedUsername$ = this.store.select(getLoggedUsername);
  }
}
