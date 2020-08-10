import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthenticationModule } from '../authentication/authentication.module';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SharedModule } from '../shared/shared.module';
import { UsersModule } from '../users/users.module';
import { ThemeModule } from './theme/theme.module';


@NgModule({
  declarations: [NavBarComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    AuthenticationModule,
    UsersModule,
    ThemeModule,
  ],
  exports: [
    NavBarComponent,
  ],
})
export class CoreModule {
}
