import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup,
} from '@angular/forms';
import {
  EventEmitter,
  Component,
  OnDestroy,
  OnInit,
  Output,
  Input,
} from '@angular/core';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import {
  MESSAGE_ERROR_SERVER,
  _ERROR,
} from 'src/app/shared/constants/alert.constants';
import { editComment, getSpecificPostSuccess, updatePost } from '../../../store/all-posts/actions';
import { AlertService } from 'src/app/shared/services/alert-service/alert.service';
import { IAvatar } from 'src/app/shared/models/avatar-profile.model';
import { IEditComment } from '../../models/edit-comment.model';
import { getAvatarInfo, IAppState } from '../../../store';
import { PostService } from '../../services/post.service';
import { IPost } from '../../models/post.model';


@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  comment: FormControl = new FormControl();
  shouldOpenPicker: boolean;
  commentForm: FormGroup;
  avatarInfo: IAvatar;

  @Output() doneBeingEdited: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  @Input() commentForEdit: string;
  @Input() commentId: number;
  @Input() postId: number;

  constructor(
    private store: Store<IAppState>,
    private formBuilder: FormBuilder,
    private postService: PostService,
    private alertService: AlertService,
  ) {
  }

  ngOnInit(): void {
    this.currentlyLoggedAvatar();
    this.createCommentForm();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // builds the comment form
  createCommentForm(): void {
    this.comment = new FormControl(this.currentComment(), [
      Validators.required,
    ]);
    this.commentForm = this.formBuilder.group({
      comment: this.comment,
    });
  }

  currentComment(): string {
    if (this.commentForEdit) {
      return unescape(this.commentForEdit);
    }

    return '';
  }

  // gets the currently logged user's avatar
  currentlyLoggedAvatar(): void {
    this.subscription.add(this.store.select(getAvatarInfo)
      .subscribe((response: IAvatar) => {
        this.avatarInfo = response;
      }),
    );
  }

  /**
   * Form Submit,
   * checks if form is valid,
   * comment isn't filled with only spaces
   * sends for edit or creates a new comment
   */
  commentSubmit(): void {
    if (this.commentForm.valid) {
      const comment = escape(this.commentForm.get('comment').value);

      if (comment.trim().length > 0) {
        if (this.commentForEdit) {
          this.editComment(comment);
        } else {
          this.createComment(comment);
        }
      }
    }
  }

  /**
   * Sends a patch request,
   * if successful updates the state of the DOM
   * by closing the form and using the store,
   * if unsuccessful: alert appears notifying the user
   */
  editComment(comment: string): void {
    this.postService
      .editComment(this.commentId, comment)
      .pipe(take(1))
      .subscribe(
        (data: IEditComment) => {
          this.doneBeingEdited.emit(true);
          this.updateComment(data);
        },
        () => {
          this.errorAlert();
        },
      );
  }

  /**
   * Sends a post request,
   * if successful updates the state of the DOM
   * by setting the form field to empty and using the store,
   * if unsuccessful: alert appears notifying the user
   */
  createComment(comment: string): void {
    this.postService
      .addComment(this.postId, comment)
      .pipe(take(1))
      .subscribe(
        (data: IPost) => {
          this.comment.setValue('');
          this.updatePost(data);
        },
        () => {
          this.errorAlert();
        },
      );
  }

  /**
   * Updates the state of the post
   */
  updatePost(post: IPost): void {
    const payload = {
      post,
    };

    this.store.dispatch(
      updatePost({
        payload,
      }),
    );

    this.store.dispatch(
      getSpecificPostSuccess({
        payload,
      }),
    );
  }

  updateComment(comment: IEditComment) {
    this.store.dispatch(
      editComment({
        payload: {
          comment,
        },
      }),
    );
  }

  // Alerts if a request was not successful
  errorAlert(): void {
    this.alertService.sendAlert(_ERROR, MESSAGE_ERROR_SERVER);
  }

  addEmoji(event): void {
    const data = this.commentForm.get('comment');
    data.patchValue(data.value + event.emoji.native);
  }

  togglePicker(): void {
    this.shouldOpenPicker = !this.shouldOpenPicker;
  }
}
