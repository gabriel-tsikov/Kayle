import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { ModalService } from '../../../shared/services/modal-service/modal.service';
import { EditPostComponent } from '../edit-post/edit-post.component';
import { EditPostService } from '../../services/edit-post.service';
import { deletePost } from '../../../store/all-posts/actions';
import { getAvatarInfo, IAppState } from '../../../store';
import { IPost } from '../../models/post.model';
import { ILike } from '../../models/like.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  commentSliceEndBase = 3;
  commentSliceEnd = 3;
  shouldShowLikeList: boolean;
  authorUsername: string;
  authorAvatar: string;
  isPostMine: boolean;
  isLiked: boolean;

  @Input() isInSinglePostPage: boolean;
  @Input() loggedUsername: string;
  @Input() post: IPost;


  constructor(
    private store: Store<IAppState>,
    private modalService: ModalService,
    private editPostService: EditPostService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.isPostLiked();
    this.isPostCreatedByMe();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  // checks if a post is created by the user to be able to edit and delete it
  isPostCreatedByMe(): void {
    if (this.loggedUsername === this.post.author.username) {
      this.isPostMine = true;
      this.getAvatarInfo();
    } else {
      this.setUsernameAndAvatar(
        this.post.author.username,
        this.post.author.avatar
      );
    }
  }

  getAvatarInfo(): void {
    this.subscription = this.store
      .select(getAvatarInfo)
      .subscribe((response) => {
        this.setUsernameAndAvatar(response?.username, response?.avatar);
      });
  }

  setUsernameAndAvatar(username: string, avatar: string): void {
    this.authorUsername = username;
    this.authorAvatar = avatar;
  }

  // checks if a post is liked to indicate it in the DOM
  isPostLiked(): void {
    if (this.loggedUsername !== null) {
      this.post?.likes?.forEach((element: ILike) => {
        if (element.votedBy.username === this.loggedUsername) {
          this.isLiked = true;
        }
      });
    }
  }

  openEditPostModal(): void {
    this.modalService.show(EditPostComponent, {
      maxWidth: 400,
      autoWidth: true,
      paddingTop: 10,
      paddingLeft: 0,
      paddingRight: 0,
      paddingBottom: 0,
      shouldHideCloseButton: true,
      shouldCloseOnOutsideClick: true,
    });
    this.editPostService.sendPost(this.post);
  }

  // updates the store state upon post deletion
  deletePost(): void {
    this.store.dispatch(
      deletePost({
        payload: {
          postId: this.post.id,
          isInSinglePostPage: this.isInSinglePostPage,
        },
      })
    );
  }

  triggerLikeList(): void {
    this.shouldShowLikeList = !this.shouldShowLikeList;
  }

  goToUsersPage(likeAuthor: string): void {
    this.router.navigate([`${likeAuthor}`]);
  }

  showMorePosts(): void {
    this.commentSliceEnd += 5;
  }

  showLessPosts(): void {
    this.commentSliceEnd -= 5;
  }
}
