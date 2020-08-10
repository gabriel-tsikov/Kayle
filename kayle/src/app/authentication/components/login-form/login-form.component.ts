import {
  ChangeDetectorRef,
  ElementRef,
  ViewChild,
  Component,
  OnInit, OnDestroy,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import {
  LAST_LOGGED_USER,
  PASSWORD,
  USERNAME,
} from '../../../shared/constants/common.constants';
import { NoWhitespaceValidator } from '../../../shared/validators/no-white-space.validator';
import { login, loginFailed } from '../../../store/authentication/actions';
import { ILoginRequest } from '../../models/authentication.model';
import { IUser } from '../../../users/models/user.model';
import { IAppState } from 'src/app/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  shouldShowLoginForm: boolean;
  lastLoggedUser: IUser;
  loginForm: FormGroup;
  errorMessage: string;

  @ViewChild('passwordRef') passwordRef: ElementRef;

  constructor(private formBuilder: FormBuilder,
              private store: Store<IAppState>,
              private actions$: Actions,
              private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.getSavedUserInfo();
    this.createLoginForm();
    this.getErrorMessage();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getSavedUserInfo(): void {
    this.lastLoggedUser = JSON.parse(localStorage.getItem(LAST_LOGGED_USER));

    if (!this.lastLoggedUser) {
      this.shouldShowLoginForm = true;
    }
  }

  createLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      username: [
        this.fillInitialUsername(),
        [Validators.required, NoWhitespaceValidator.cannotContainSpace],
      ],
      password: [
        '',
        [Validators.required, NoWhitespaceValidator.cannotContainSpace],
      ],
    });
  }

  fillInitialUsername(): string {
    return this.lastLoggedUser ? this.lastLoggedUser.username : '';
  }

  getErrorMessage(): void {
    this.subscription = this.actions$.pipe(ofType(loginFailed))
      .subscribe((response) => {
        this.errorMessage = response.payload.error.message;
      });
  }

  loginSubmit(): void {
    const data: ILoginRequest = this.loginForm.value;

    this.store.dispatch(
      login({
        payload: {
          username: data.username,
          password: data.password,
        },
      }),
    );

    this.loginForm.reset();
  }

  get username(): AbstractControl {
    return this.loginForm?.get(USERNAME);
  }

  get password(): AbstractControl {
    return this.loginForm?.get(PASSWORD);
  }

  differentUserLogin(): void {
    this.username.patchValue('');
    this.shouldShowLoginForm = true;
  }

  loginWithSavedUser(): void {
    this.shouldShowLoginForm = true;
    this.changeDetector.detectChanges();
    this.passwordRef.nativeElement.focus();
  }
}
