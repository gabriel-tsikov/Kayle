import {
  HttpErrorResponse,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
} from '@angular/common/http';
import { finalize, take, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { BEARER, REQUEST_GET, VOTES } from '../../constants/interceptor.constants';
import { LoaderService } from '../loader-service/loader.service';
import { logout } from '../../../store/authentication/actions';
import { API_REQUESTS } from '../../constants/api.constants';
import { getToken, IAppState } from '../../../store';
import { STATUS_CODE_UNAUTHORIZED } from '../../constants/common.constants';


@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  token: string;

  constructor(private loaderService: LoaderService,
              private store: Store<IAppState>) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.getToken();
    request = this.addToken(request);

    this.showLoader(request);

    return next.handle(request).pipe(
      tap(() => {
        },
        (error: HttpErrorResponse) => {
          if (error.status === STATUS_CODE_UNAUTHORIZED) {
            this.store.dispatch(logout());
          }
        }),
      finalize(() => {

        this.hideLoader(request);
      }));
  }

  private addToken(request: HttpRequest<any>): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `${BEARER} ${this.token}`,
      },
    });
  }

  private showLoader(request): void {
    if (request.method !== REQUEST_GET && !request.url.includes(VOTES)
      && !request.url.includes(API_REQUESTS.comments.add)) {
      this.loaderService.show();
    }
  }

  private hideLoader(request: HttpRequest<any>): void {
    if (request.method !== REQUEST_GET) {
      this.loaderService.hide();
    }
  }

  private getToken(): void {
    this.store.select(getToken).pipe(take(1))
      .subscribe((response: string) => {
        this.token = response;
      });
  }
}
