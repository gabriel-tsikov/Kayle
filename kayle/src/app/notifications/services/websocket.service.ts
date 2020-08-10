import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as io from 'socket.io-client';
import { Socket } from 'ngx-socket-io';
import { Store } from '@ngrx/store';

import {
  getPostAuthorUsername,
  getLoggedUsername,
  getPostsType,
  IAppState,
} from 'src/app/store';
import {
  createPostSuccess,
  deletePostSuccess,
  editComment,
  updatePost,
} from 'src/app/store/all-posts/actions';
import { IEditComment } from 'src/app/posts/models/edit-comment.model';
import { PERSONAL } from '../../posts/constants/posts-path.constants';
import { INotification } from '../models/notification.model';
import { IPost } from 'src/app/posts/models/post.model';
import { getToken } from 'src/app/store/';


@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  readonly url: string = 'https://social-app.scalefocus.academy';
  postAuthorUsername: string;
  loggedUsername: string;
  postsType: string;
  socket: Socket;
  token: string;

  notificationsSocket$ = new Subject<INotification>();

  constructor(private store: Store<IAppState>) {
    this.socket = io(this.url);
    this.store.select(getToken).subscribe((token) => {
      this.token = token;
      this.initializeJoin();
      this.initializeNotifications();
    });

    this.initializeSockets();
    this.getLoggedUsername();
    this.getPostsType();
    this.getPostAuthorUsername();
  }

  initializeJoin(): void {
    this.socket.emit('leave');
    this.resetSockets();
    this.socket.emit('join', this.token);
  }

  initializeSockets(): void {
    this.socket.on('addPost', (post: IPost) => {
      this.addPostToView(post);
    });
    this.socket.on('addComment', (post: IPost) => {
      this.updatePost(post);
    });
    this.socket.on('likePost', (post: IPost) => {
      this.updatePost(post);
    });
    this.socket.on('updateComment', (comment: IEditComment) => {
      this.updateComment(comment);
    });
    this.socket.on('deletePost', (postId: string) => {
      this.removePostFromView(+postId);
    });

  }

  initializeNotifications(): void {
    if (this.token) {
      this.socket.on('notifications', (notification: INotification) => {
        this.notificationsSocket$.next(notification);
      });
    }
  }

  getLoggedUsername(): void {
    this.store.select(getLoggedUsername).subscribe((response: string) => {
      this.loggedUsername = response;
    });
  }

  getPostsType(): void {
    this.store.select(getPostsType).subscribe((response: string) => {
      this.postsType = response;
    });
  }

  getPostAuthorUsername(): void {
    this.store.select(getPostAuthorUsername).subscribe((response: string) => {
      this.postAuthorUsername = response;
    });
  }

  updatePost(post: IPost): void {
    const payload = {
      post,
    };

    this.store.dispatch(
      updatePost({
        payload,
      }),
    );
  }

  updateComment(comment: IEditComment): void {
    const payload = {
      comment,
    };

    this.store.dispatch(
      editComment({
        payload,
      }),
    );
  }

  addPostToView(post: IPost): void {
    if (this.postsType !== PERSONAL && this.loggedUsername !== post.author.username) {
      this.dispatchCreatePost(post);
    }
  }

  removePostFromView(postId: number): void {
    if (this.postsType === PERSONAL && this.postAuthorUsername === this.loggedUsername) {
      this.dispatchDeletePost(postId);
    } else if (this.postsType !== PERSONAL) {
      this.dispatchDeletePost(postId);
    }
  }

  dispatchCreatePost(post: IPost): void {
    const payload = {
      post,
    };

    this.store.dispatch(
      createPostSuccess({
        payload,
      }),
    );
  }

  dispatchDeletePost(postId: number): void {
    const payload = {
      postId,
    };

    this.store.dispatch(
      deletePostSuccess({
        payload,
      }),
    );
  }

  resetSockets() {
    this.socket.disconnect();
    this.socket.connect();
  }

  readNotification(notificationId: number): void {
    this.socket.emit('readNotification', notificationId);
  }
}
