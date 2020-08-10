import { Component, OnInit, ViewChild, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { RegisterFormComponent } from '../../../authentication/components/register-form/register-form.component';
import { LoginFormComponent } from '../../../authentication/components/login-form/login-form.component';
import { CreatePostComponent } from '../../../posts/components/create-post/create-post.component';
import { ModalService } from '../../../shared/services/modal-service/modal.service';
import { LayoutModeService } from '../../../shared/services/layout-mode.service';
import { IModalProps } from '../../../shared/models/modal-state.model';
import { logout } from '../../../store/authentication/actions';
import { IUser } from '../../../users/models/user.model';
import {
  getIsUserLoggedIn,
  getLoggedUser,
  IAppState,
} from '../../../store';
import {
  LAYOUT_COMPACT,
  LAYOUT_NORMAL,
} from '../../../shared/constants/layout-mode.constants';
import {
  ALT_FORWARD_ARROW,
  ALT_BACK_ARROW,
  CLASS_SLIDER,
} from '../../constants/nav-bar.constants';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  shouldSwitchToCompactMode: boolean;
  isHamburgerMenuChecked: boolean;
  loggedUser$: Observable<IUser>;
  isUserLogged: boolean;

  @ViewChild('svgHamburger') svgHamburger: ElementRef;

  @HostListener('window:click', ['$event.target'])
  closeHamburgerMenu(target) {
    if (this.isHamburgerMenuChecked && target.classList[0] !== CLASS_SLIDER
      && target.alt !== ALT_BACK_ARROW && target.alt !== ALT_FORWARD_ARROW) {
      this.isHamburgerMenuChecked = false;
      this.svgHamburger.nativeElement.classList.toggle('active');
    }
  }

  constructor(private modalService: ModalService,
              private layoutModeService: LayoutModeService,
              private store: Store<IAppState>) {
  }

  ngOnInit(): void {
    this.getIsUserLogged();
    this.getLoggedUser();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getIsUserLogged(): void {
    this.subscription = this.store.select(getIsUserLoggedIn)
      .subscribe((response: boolean) => {
        this.isUserLogged = response;
      });
  }

  getLoggedUser(): void {
    this.loggedUser$ = this.store.select(getLoggedUser);
  }

  toggleHamburgerMenu(event): void {
    event.preventDefault();
    event.stopPropagation();
    this.isHamburgerMenuChecked = !this.isHamburgerMenuChecked;
  }

  openLoginForm(): void {
    this.modalService.show(LoginFormComponent,
      this.getModalProps(true, 440));
  }

  openRegisterForm(): void {
    this.modalService.show(RegisterFormComponent,
      this.getModalProps(true, 440));
  }

  openCreatePostForm(): void {
    this.modalService.show(CreatePostComponent,
      this.getModalProps(false, 1200));
  }

  logoutUser(): void {
    this.store.dispatch(logout());
  }

  getModalProps(closeOnOutsideClick: boolean, maxWidth: number, maxHeight?: number): IModalProps {
    return {
      maxWidth,
      maxHeight,
      shouldCloseOnOutsideClick: closeOnOutsideClick,
    };
  }

  changeLayoutMode(): void {
    if (this.shouldSwitchToCompactMode) {
      this.shouldSwitchToCompactMode = false;
      this.layoutModeService.switchMode(LAYOUT_NORMAL);
    } else {
      this.shouldSwitchToCompactMode = true;
      this.layoutModeService.switchMode(LAYOUT_COMPACT);
    }
  }
}
