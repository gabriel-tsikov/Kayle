import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { ILayoutMode } from '../models/layout-mode.model';


@Injectable({
  providedIn: 'root',
})
export class LayoutModeService {
  layoutSubject: Subject<ILayoutMode> = new Subject<ILayoutMode>();
  layoutState$: Observable<ILayoutMode> = this.layoutSubject.asObservable();

  constructor() {
  }

  switchMode(type: string): void {
    this.layoutSubject.next({ type });
  }
}
