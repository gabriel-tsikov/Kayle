import {
  AbstractControl,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import {
  CONFIRM_PASSWORD,
  USERNAME,
  PASSWORD,
  EMAIL,
} from 'src/app/shared/constants/common.constants';
import {
  MESSAGE_REGISTRATION_SUCCESS,
  MESSAGE_ERROR_EMAIL,
  SERVER_ERROR_CODE,
  SUCCESS,
  _ERROR,
} from '../../../shared/constants/alert.constants';
import { ConfirmPasswordValidator } from '../../../shared/validators/confirm-password.validator';
import { NoWhitespaceValidator } from '../../../shared/validators/no-white-space.validator';
import { ModalService } from '../../../shared/services/modal-service/modal.service';
import { AlertService } from '../../../shared/services/alert-service/alert.service';
import { REGEX_EMAIL, REGEX_PASSWORD } from '../../constants/validator.constants';
import { AuthenticationService } from '../../services/authentication.service';
import { take } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
})
export class RegisterFormComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private modalService: ModalService,
    private alertService: AlertService,
  ) {
  }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(): void {
    this.registerForm = this.formBuilder.group(
      {
        username: [
          '',
          [
            Validators.required,
            NoWhitespaceValidator.cannotContainSpace,
            Validators.minLength(2),
          ],
        ],
        email: [
          '',
          [
            Validators.required,
            NoWhitespaceValidator.cannotContainSpace,
            Validators.pattern(REGEX_EMAIL),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            NoWhitespaceValidator.cannotContainSpace,
            Validators.pattern(REGEX_PASSWORD),
          ],
        ],
        confirmPassword: [
          '',
          [
            Validators.required,
            NoWhitespaceValidator.cannotContainSpace,
            Validators.pattern(REGEX_PASSWORD),
          ],
        ],
      },
      {
        validators: ConfirmPasswordValidator.identicalPassword,
      },
    );
  }

  get username(): AbstractControl {
    return this.registerForm?.get(USERNAME);
  }

  get email(): AbstractControl {
    return this.registerForm?.get(EMAIL);
  }

  get password(): AbstractControl {
    return this.registerForm?.get(PASSWORD);
  }

  get confirmPassword(): AbstractControl {
    return this.registerForm?.get(CONFIRM_PASSWORD);
  }

  submitRegister(): void {
    this.authService.register(this.registerForm.value).pipe(take(1))
      .subscribe(() => {
          this.modalService.hide();
          this.alertService.sendAlert(SUCCESS, MESSAGE_REGISTRATION_SUCCESS);
        },
        (error: HttpErrorResponse) => {
          let message: string;
          error.status !== SERVER_ERROR_CODE ?
            message = error.error.message : message = MESSAGE_ERROR_EMAIL;

          this.alertService.sendAlert(_ERROR, message);
        });
  }

}
