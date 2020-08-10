import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { ILoaderProps, ILoaderState } from '../../models/loader-state.model';


@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loaderSubject: BehaviorSubject<ILoaderState> =
    new BehaviorSubject<ILoaderState>(this.initialState());
  loaderState$: Observable<ILoaderState> = this.loaderSubject.asObservable();

  constructor() {
  }

  show(loaderProps?: ILoaderProps) {
    this.loaderSubject.next({ shouldShow: true, props: loaderProps });
  }

  hide() {
    this.loaderSubject.next({ shouldShow: false });
  }

  initialState(): ILoaderState {
    return { shouldShow: false };
  }
}
