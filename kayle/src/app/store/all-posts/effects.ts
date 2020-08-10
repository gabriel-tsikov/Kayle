import {
  withLatestFrom,
  catchError,
  mergeMap,
  filter,
  map,
  tap,
} from 'rxjs/operators';
import {
  Actions,
  Effect,
  ofType,
} from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import {
  getSpecificPostSuccess,
  changePostStatusSuccess,
  changePostStatusFailed,
  getSpecificPostFailed,
  editCommentSuccess,
  getDashboardPosts,
  updatePostSuccess,
  createPostSuccess,
  deletePostSuccess,
  getPersonalPosts,
  changePostStatus,
  getPostsSuccess,
  getSpecificPost,
  getPostsFailed,
  getPublicPosts,
  editComment,
  createPost,
  deletePost,
  updatePost,
} from './actions';
import {
  getLoggedUsername,
  getPostsType,
  IAppState,
  getToken,
  getSkip,
} from '..';
import {
  MESSAGE_EDIT_POST_STATUS_SUCCESS,
  MESSAGE_CREATE_POST_SUCCESS,
  MESSAGE_ERROR_SERVER,
  SUCCESS,
  _ERROR,
} from '../../shared/constants/alert.constants';
import {
  decreaseLoggedInUserPostsCount,
  increaseLoggedInUserPostCount,
} from '../authentication/actions';
import { AlertService } from '../../shared/services/alert-service/alert.service';
import { ModalService } from '../../shared/services/modal-service/modal.service';
import { PERSONAL } from '../../posts/constants/posts-path.constants';
import { PostService } from '../../posts/services/post.service';
import { IPost } from '../../posts/models/post.model';


@Injectable({
  providedIn: 'root',
})
export class AllPostsEffects {

  constructor(private actions$: Actions,
              private postService: PostService,
              private store: Store<IAppState>,
              private alertService: AlertService,
              private modalService: ModalService,
              private router: Router) {
  }

  @Effect()
  getPublicPosts$ = this.actions$.pipe(
    ofType(getPublicPosts),
    withLatestFrom(this.store.select(getSkip)),
    mergeMap(([query, skip]) =>
      this.postService.getPosts(query.payload.take, skip)
        .pipe(
          map((data) =>
            getPostsSuccess({
              payload: {
                posts: data,
                lastTake: query.payload.take,
                skip,
              },
            }),
          ),
          catchError(error => of(getPostsFailed({
            payload: error,
          }))),
        ),
    ),
  );

  @Effect()
  getDashboardPosts$ = this.actions$.pipe(
    ofType(getDashboardPosts),
    withLatestFrom(this.store.select(getSkip)),
    mergeMap(([query, skip]) =>
      this.postService.getPrivatePosts(query.payload.take, skip)
        .pipe(
          map((data) =>
            getPostsSuccess({
              payload: {
                posts: data,
                lastTake: query.payload.take,
                skip,
              },
            }),
          ),
          catchError(error => of(getPostsFailed({
            payload: error,
          }))),
        ),
    ),
  );

  @Effect()
  getPersonalPosts$ = this.actions$.pipe(
    ofType(getPersonalPosts),
    withLatestFrom(this.store.select(getSkip)),
    mergeMap(([query, skip]) => {
        return this.postService.getPersonalPosts(query.payload.userId, query.payload.take, skip)
          .pipe(
            map((data: IPost[]) =>
              getPostsSuccess({
                payload: {
                  posts: data,
                  lastTake: query.payload.take,
                  skip,
                },
              }),
            ),
            catchError(error => of(getPostsFailed({
              payload: error,
            }))),
          );
      },
    ),
  );

  @Effect()
  getSpecificPost$ = this.actions$.pipe(
    ofType(getSpecificPost),
    mergeMap(data => {
      return this.postService.getSinglePost(data.payload.postId)
        .pipe(
          map((post: IPost) =>
            getSpecificPostSuccess({
              payload: {
                post,
              },
            })),
          catchError(error => of(getSpecificPostFailed({
              payload: error,
            }),
          )),
        );
    }),
  );

  @Effect()
  createPost$ = this.actions$.pipe(
    ofType(createPost),
    withLatestFrom(this.store.select(getPostsType), this.store.select(getLoggedUsername)),
    mergeMap(([data, postsType, loggedUsername]) => {
      return this.postService.createPost(data.payload.post)
        .pipe(
          tap(() => {
            this.modalService.hide();
            this.alertService.sendAlert(SUCCESS, MESSAGE_CREATE_POST_SUCCESS);
          }),
          map((post: IPost) => {
              if (post.author.username === loggedUsername) {
                return createPostSuccess({
                  payload: {
                    post,
                  },
                });
              }
            },
          ),
          filter(action => !!action));
    }),
  );

  @Effect()
  createPostSuccess$ = this.actions$.pipe(
    ofType(createPostSuccess),
    withLatestFrom(this.store.select(getToken), this.store.select(getPostsType), this.store.select(getLoggedUsername)),
    map(([query, token, postsType, loggedUsername]) => {
      if (token && postsType === PERSONAL && query.payload.post.author.username === loggedUsername) {
        return increaseLoggedInUserPostCount();
      }
    }),
    filter(action => !!action),
  );

  @Effect()
  updatePost$ = this.actions$.pipe(
    ofType(updatePost),
    map((data) => {
      return updatePostSuccess({
        payload: {
          post: data.payload.post,
        },
      });
    }),
  );

  @Effect()
  changePostStatus$ = this.actions$.pipe(
    ofType(changePostStatus),
    mergeMap((data) => {
      return this.postService.editPostStatus(data.payload.postId, data.payload.public)
        .pipe(
          tap(() => {
            this.modalService.hide();
            this.alertService.sendAlert(SUCCESS, MESSAGE_EDIT_POST_STATUS_SUCCESS);
          }),
          map((post: IPost) => {
            return changePostStatusSuccess({
              payload: {
                postId: post.id,
                public: post.public,
              },
            });
          }),
          catchError((error) => {
            this.alertService.sendAlert(_ERROR, MESSAGE_ERROR_SERVER);
            return of(changePostStatusFailed({
              payload: {
                error,
              },
            }));
          }),
        );
    }),
  );

  @Effect()
  editComment$ = this.actions$.pipe(
    ofType(editComment),
    map((data) => {
      return editCommentSuccess({
        payload: {
          comment: data.payload.comment,
        },
      });
    }),
  );

  @Effect()
  deletePost$ = this.actions$.pipe(
    ofType(deletePost),
    mergeMap((data) => {
      const shouldRedirect = data.payload.isInSinglePostPage;
      return this.postService.deletePost(data.payload.postId)
        .pipe(
          mergeMap(() => {
              return [deletePostSuccess({
                payload: {
                  postId: data.payload.postId,
                },
              }), decreaseLoggedInUserPostsCount()];
            },
          ),
          tap(() => {
            if (shouldRedirect) {
              this.router.navigate(['/']);
            }
          }),
          catchError(() => {
            return of();
          }));
    }),
  );
}

