import {
  ComponentFactoryResolver,
  ChangeDetectorRef,
  HostListener,
  ElementRef,
  ViewChild,
  Component,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { DynamicContentDirective } from '../../directives/dynamic-content.directive';
import { ModalService } from '../../services/modal-service/modal.service';
import { IModalState } from '../../models/modal-state.model';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  private subscription: Subscription;
  shouldHideCloseButton: boolean;
  shouldCloseOnClick: boolean;
  shouldRenderModal: boolean;
  paddingBottom: number;
  paddingRight: number;
  paddingLeft: number;
  paddingTop: number;
  autoWidth: boolean;
  headerText: string;
  maxHeight: number;
  maxWidth: number;

  @ViewChild(DynamicContentDirective) content: DynamicContentDirective;
  @ViewChild('containerModal') containerModal: ElementRef;

  @HostListener('click', ['$event.target'])
  onClick(target) {
    if (target === this.containerModal?.nativeElement && this.shouldCloseOnClick) {
      this.closeModal();
    }
  }

  constructor(private modalService: ModalService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.subscription = this.modalService.modalState$
      .subscribe((response: IModalState) => {
        this.shouldRenderModal = response.shouldShow;
        this.changeDetector.detectChanges();

        if (this.shouldRenderModal) {
          this.setProps(response);
          this.loadComponent(response.component);
        }
      });
  }

  setProps(response: IModalState): void {
    const {
      maxWidth, maxHeight, autoWidth, headerText, paddingTop, paddingLeft, paddingRight,
      paddingBottom, shouldHideCloseButton, shouldCloseOnOutsideClick,
    } = response.props;

    this.maxWidth = maxWidth;
    this.maxHeight = maxHeight;
    this.autoWidth = autoWidth;
    this.headerText = headerText;
    this.paddingTop = paddingTop;
    this.paddingLeft = paddingLeft;
    this.paddingRight = paddingRight;
    this.paddingBottom = paddingBottom;
    this.shouldHideCloseButton = shouldHideCloseButton;
    this.shouldCloseOnClick = shouldCloseOnOutsideClick;
  }

  loadComponent(component: any): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);

    const viewContainerRef = this.content.viewContainerRef;
    viewContainerRef.clear();
    viewContainerRef.createComponent(componentFactory);
  }

  closeModal(): void {
    this.modalService.hide();
  }
}
