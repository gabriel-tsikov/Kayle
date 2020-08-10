import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { changePostStatus } from '../../../store/all-posts/actions';
import { EditPostService } from '../../services/edit-post.service';
import { IPost } from '../../models/post.model';
import { IAppState } from '../../../store';


@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
})
export class EditPostComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  post: IPost;

  constructor(private store: Store<IAppState>,
              private editPostService: EditPostService) {
  }

  ngOnInit(): void {
    this.subscription = this.editPostService.postState$
      .subscribe((response: IPost) => {
        this.post = response;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  changeStatusToPublic(): void {
    this.dispatchChangeStatus(true);
  }

  changeStatusToPrivate(): void {
    this.dispatchChangeStatus(false);
  }

  dispatchChangeStatus(isPostPublic: boolean): void {
    this.store.dispatch(changePostStatus({
      payload: {
        postId: this.post.id,
        public: isPostPublic,
      },
    }));
  }
}
