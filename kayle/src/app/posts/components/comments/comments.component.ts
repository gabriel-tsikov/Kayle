import { Component, OnInit, Input } from '@angular/core';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import {
  MESSAGE_ERROR_SERVER,
  _ERROR,
} from 'src/app/shared/constants/alert.constants';
import { AlertService } from 'src/app/shared/services/alert-service/alert.service';
import { getSpecificPostSuccess, updatePost } from '../../../store/all-posts/actions';
import { PostService } from '../../services/post.service';
import { IComment } from '../../models/comment.model';
import { IPost } from '../../models/post.model';
import { IAppState } from '../../../store';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  switchableMaxLength = 120;
  isAllTextShown: boolean;
  baseMaxLength = 120;
  isForEdit = false;
  lastUpdate: Date;

  @Input() loggedUsername: string;
  @Input() comment: IComment;
  @Input() postId: number;

  constructor(
    private postService: PostService,
    private alertService: AlertService,
    private store: Store<IAppState>,
  ) {
  }

  /**
   * formats the date displayed for the comment
   * checks if the comment needs to be shortened
   */
  ngOnInit(): void {
    this.formatDate();
    this.isAllTextShown =
      this.comment.content.length > this.switchableMaxLength ? false : null;
  }

  // converts Date.now to a usable Date format
  formatDate(): void {
    const date: Date = new Date(this.comment.updatedOn * 1000);
    this.lastUpdate = new Date(date);
  }

  /**
   * switches the visible text of the comment
   * to display the full content
   */
  showAll(): void {
    this.switchableMaxLength = this.comment.content.length;
    this.isAllTextShown = true;
  }

  /**
   * switches the visible text of the comment
   * to display a portion of the content:
   * the base max lenght
   */
  showLess(): void {
    this.switchableMaxLength = this.baseMaxLength;
    this.isAllTextShown = false;
  }

  /**
   * Changes the state of the comment
   * from displayed text to form state
   * and vise versa in the DOM
   */
  editClick(): void {
    this.isForEdit = !this.isForEdit;
  }

  /**
   * Sends a delete request,
   * if successful: store state update
   * if unsuccessful: an alert is displayed
   */
  deleteClick(): void {
    this.postService
      .deleteComment(this.comment.id)
      .pipe(take(1))
      .subscribe(
        (data: IPost) => {
          this.updatePost(data);
        },
        () => {
          this.alertService.sendAlert(_ERROR, MESSAGE_ERROR_SERVER);
        },
      );
  }

  // updates the store for this post and DOM
  updatePost(post: IPost): void {
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
