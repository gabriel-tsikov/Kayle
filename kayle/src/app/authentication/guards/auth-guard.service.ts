import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { _ERROR, MESSAGE_AUTH_GUARD } from '../../shared/constants/alert.constants';
import { AlertService } from '../../shared/services/alert-service/alert.service';
import { getIsUserLoggedIn, IAppState } from '../../store';


@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  isUserLogged: boolean;

  constructor(private router: Router,
              private store: Store<IAppState>,
              private alertService: AlertService) {
  }

  canActivate(): boolean {
    this.checkIsUserLoggedIn();

    if (!this.isUserLogged) {
      this.router.navigate(['/']);
      this.alertService.sendAlert(_ERROR, MESSAGE_AUTH_GUARD);
      return false;
    }
    return true;
  }

  checkIsUserLoggedIn(): void {
    this.store.select(getIsUserLoggedIn).pipe(take(1))
      .subscribe((response: boolean) => {
        this.isUserLogged = response;
      });
  }
}
