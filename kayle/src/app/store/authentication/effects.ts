import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { AuthenticationService } from '../../authentication/services/authentication.service';
import { ModalService } from '../../shared/services/modal-service/modal.service';
import { AlertService } from '../../shared/services/alert-service/alert.service';
import { INIT } from '../constants/store.constants';
import {
  changeLoggedUserAvatarSuccess,
  changeLoggedUserAvatarFailed,
  getLoggedUserInfoSuccess,
  changeLoggedUserAvatar,
  getLoggedUserInfo,
  getAvatarInfo,
  logoutSuccess,
  loginPersist,
  loginSuccess,
  logoutFailed,
  loginFailed,
  logout,
  login,
} from './actions';
import {
  LAST_LOGGED_USER,
  USERNAME,
  TOKEN,
} from '../../shared/constants/common.constants';
import {
  MESSAGE_LOGIN_SUCCESS,
  MESSAGE_ERROR_SERVER,
  SUCCESS,
  _ERROR,
} from '../../shared/constants/alert.constants';
import { THEME_LIGHT } from '../../core/theme/constants/theme.constants';
import { ThemeService } from '../../core/theme/services/theme.service';
import { UsersService } from '../../users/services/users.service';


@Injectable({
  providedIn: 'root',
})
export class AuthenticationEffects {
  constructor(private actions$: Actions,
              private authenticationService: AuthenticationService,
              private router: Router,
              private modalService: ModalService,
              private alertService: AlertService,
              private usersService: UsersService,
              private themeService: ThemeService) {
  }

  // setLastLoggedUserInfo(username, avatar): void {
  //   localStorage.setItem(
  //     LAST_LOGGED_USER,
  //     JSON.stringify({
  //       username,
  //       avatar,
  //     }),
  //   );
  // }

  /**
   * Effect that gets called on the @ngrx store initialization
   * Checks if token or username are present in session storage
   * If yes, dispatches a new loginPersist action
   */
  @Effect()
  init$: Observable<any> = this.actions$.pipe(
    ofType(INIT),
    switchMap(() => {
      const token: string = JSON.parse(sessionStorage.getItem(TOKEN));
      const username: string = JSON.parse(sessionStorage.getItem(USERNAME));

      if (!token || !username) {
        return [];
      }
      return [
        loginPersist({
          payload: {
            token,
            username,
          },
        }),
        getLoggedUserInfo({
          payload: {
            username,
          },
        }),
      ];
    }),
  );

  /**
   * Calls the authenticate method
   *
   * If authenticated, saves username and token to local storage,
   * calls the alert service to display a success message,
   * navigates to home page, hides the modal,
   * dispatches loginSuccess and getLoggedUserInfo actions
   *
   * If unauthenticated, calls the alert service to display an error message,
   * dispatches loginFailed action
   */
  @Effect()
  login$: Observable<any> = this.actions$.pipe(
    ofType(login),
    switchMap((action) => {
        const username = action.payload.username.toLowerCase();
        return this.authenticationService.authenticate(action.payload).pipe(
          tap((response) => {
            sessionStorage.setItem(
              USERNAME,
              JSON.stringify(username),
            );
            sessionStorage.setItem(TOKEN, JSON.stringify(response.token));

            this.alertService.sendAlert(SUCCESS, MESSAGE_LOGIN_SUCCESS, true);
            this.router.navigate(['/']);
            this.modalService.hide();
          }),
          switchMap((response) => [
            loginSuccess({
              payload: {
                token: response.token,
                username,
              },
            }),
            getLoggedUserInfo({
              payload: {
                username,
              },
            }),
          ]),
          catchError((response: HttpErrorResponse) => {
            return of(
              loginFailed({
                payload: response,
              }),
            );
          }),
        );
      },
    ),
  );

  /**
   * Sends a logout request
   *
   * If successful, clears the session storage
   * and dispatches logoutSuccess action
   *
   * If not successful dispatches logoutFailed
   */
  @Effect()
  logout$: Observable<any> = this.actions$.pipe(
    ofType(logout),
    switchMap(() =>
      this.authenticationService.logout().pipe(
        tap(() => {
          sessionStorage.clear();
          this.themeService.setTheme(THEME_LIGHT);
          this.router.navigate(['/']);
        }),
        map(() => logoutSuccess()),
        catchError(() => of(logoutFailed())),
      ),
    ),
  );

  /**
   * Sends a request to the API for a specific user
   *
   * If successful, sets to local storage username and avatar,
   * and dispatches getLoggedUserInfoSuccess action
   */
  @Effect()
  getLoggedUserInfo$: Observable<any> = this.actions$.pipe(
    ofType(getLoggedUserInfo),
    mergeMap((action) =>
      this.usersService.getByUsername(action.payload.username).pipe(
        tap((response) => {
          this.setLastLoggedUserInfo(response.username, response.avatar);
        }),
        switchMap((response) => [
          getLoggedUserInfoSuccess({
            payload: {
              user: response,
            },
          }),
          getAvatarInfo({
            payload: {
              avatarAndUsername: {
                username: response.username,
                avatar: response.avatar,
              },
            },
          }),
        ]),
      ),
    ),
  );

  @Effect()
  changeLoggedUserAvatar$: Observable<any> = this.actions$.pipe(
    ofType(changeLoggedUserAvatar),
    mergeMap((action) =>
      this.usersService.changeProfilePicture(action.payload.data).pipe(
        tap((response) => {
          this.modalService.hide();
          this.setLastLoggedUserInfo(response.username, response.avatar);
        }),
        switchMap((response) => [
          changeLoggedUserAvatarSuccess({
            payload: {
              avatarUrl: response.avatar,
            },
          }),
          getAvatarInfo({
            payload: {
              avatarAndUsername: {
                username: response.username,
                avatar: response.avatar,
              },
            },
          }),
        ]),
        catchError((error) => {
          this.alertService.sendAlert(_ERROR, MESSAGE_ERROR_SERVER);
          return of(changeLoggedUserAvatarFailed({
            payload: {
              error,
            },
          }));
        }),
      ),
    ),
  );

  setLastLoggedUserInfo(username, avatar): void {
    localStorage.setItem(
      LAST_LOGGED_USER,
      JSON.stringify({
        username,
        avatar,
      }),
    );
  }
}
