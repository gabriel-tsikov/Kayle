import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from '../../shared/services/http-service/http.service';
import { API_REQUESTS } from '../../shared/constants/api.constants';
import { IUser } from '../models/user.model';


@Injectable({
  providedIn: 'root',
})
export class UsersService {

  constructor(private http: HttpService) {
  }

  getAllUsers(): Observable<IUser[]> {
    return this.http.get(`${API_REQUESTS.users.all}`);
  }

  getByUsername(username: string): Observable<IUser> {
    return this.http.get(`${API_REQUESTS.users.specificUser}/${username}`);
  }

  followUser(username: string): Observable<IUser> {
    return this.http.put(`${API_REQUESTS.users.specificUser}/${username}/followers`);
  }

  unfollowUser(username: string): Observable<IUser> {
    return this.http.delete(`${API_REQUESTS.users.specificUser}/${username}/followers`);
  }

  deleteUserProfile(user: IUser): Observable<IUser> {
    return this.http.delete(`${API_REQUESTS.users.specificUser}/${user.username}`);
  }

  changeProfilePicture(avatar: FormData): Observable<IUser> {
    return this.http.put(`${API_REQUESTS.users.changePicture}` , avatar);
  }
}
