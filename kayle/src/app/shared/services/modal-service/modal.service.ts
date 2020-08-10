import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { IModalProps, IModalState } from '../../models/modal-state.model';


@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private renderer: Renderer2;
  private modalSubject: BehaviorSubject<IModalState> = new BehaviorSubject<IModalState>({ shouldShow: false });
  modalState$: Observable<IModalState> = this.modalSubject.asObservable();

  constructor(private renderedFactory: RendererFactory2) {
    this.renderer = renderedFactory.createRenderer(null, null);
  }

  show(component: any, props: IModalProps): void {
    this.renderer.addClass(document.body, 'hide-scroll');
    this.modalSubject.next({
      shouldShow: true,
      props,
      component,
    });
  }

  hide(): void {
    this.renderer.removeClass(document.body, 'hide-scroll');
    this.modalSubject.next({
      shouldShow: false,
      props: null,
      component: null,
    });
  }
}
