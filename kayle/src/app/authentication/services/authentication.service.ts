import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  ILoginSuccessResponse,
  IRegisterRequest,
  ILoginRequest,
} from '../models/authentication.model';
import { HttpService } from '../../shared/services/http-service/http.service';
import { API_REQUESTS } from '../../shared/constants/api.constants';


@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  constructor(private http: HttpService) {
  }

  authenticate(user: ILoginRequest): Observable<ILoginSuccessResponse> {
    return this.http.post(API_REQUESTS.authentication.login, user);
  }

  register(register: IRegisterRequest): Observable<IRegisterRequest> {
    return this.http.post(API_REQUESTS.authentication.register, register);
  }


  logout(): Observable<string> {
    return this.http.delete(API_REQUESTS.authentication.logout);
  }
}
