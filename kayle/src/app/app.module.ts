import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';

import { CustomRouteReuseStrategy } from './shared/route-strategy/custom-route-reuse-strategy';
import { SearchUserComponent } from './users/components/search-user/search-user.component';
import { lightTheme } from './core/theme/constants/light-theme.constants';
import { NotificationsModule } from './notifications/notifications.module';
import { darkTheme } from './core/theme/constants/dark-theme.constants';
import { AuthenticationEffects } from './store/authentication/effects';
import { AllPostsEffects } from './store/all-posts/effects';
import { ThemeModule } from './core/theme/theme.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { metaReducers } from './store/reset-store';
import { UsersModule } from './users/users.module';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { reducers } from './store';


@NgModule({
  declarations: [
    AppComponent,
    SearchUserComponent,
  ],
  imports: [
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    EffectsModule.forRoot([
      AuthenticationEffects,
      AllPostsEffects,
    ]),
    ThemeModule.forRoot({
      themes: [lightTheme, darkTheme],
      active: 'light',
    }),
    StoreDevtoolsModule.instrument(),
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    FormsModule,
    UsersModule,
    ReactiveFormsModule,
    NotificationsModule,
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: CustomRouteReuseStrategy,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
