import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { getIsUserLoggedIn, IAppState } from '../../store';


@Injectable()
export class LoginGuardService implements CanActivate {
  isUserLogged: boolean;

  constructor(private store: Store<IAppState>,
              private router: Router) {
  }

  canActivate(): boolean {
    this.checkIsUserLoggedIn();

    if (this.isUserLogged) {
      this.router.navigate(['/']);
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
