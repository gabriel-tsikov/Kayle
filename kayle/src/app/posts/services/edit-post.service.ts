import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { IPost } from '../models/post.model';


@Injectable({
  providedIn: 'root',
})
export class EditPostService {
  private postSubject: BehaviorSubject<IPost> = new BehaviorSubject<IPost>(null);
  postState$: Observable<IPost> = this.postSubject.asObservable();

  constructor() {
  }

  sendPost(post: IPost): void {
    this.postSubject.next(post);
  }
}
