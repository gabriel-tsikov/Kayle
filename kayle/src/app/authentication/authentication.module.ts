import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RegisterFormComponent } from './components/register-form/register-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginGuardService } from './guards/login-guard.service';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    LoginFormComponent,
    RegisterFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [
    LoginGuardService,
  ],
})
export class AuthenticationModule {
}
