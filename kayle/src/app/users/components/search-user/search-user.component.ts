import {
  HostListener,
  ElementRef,
  OnDestroy,
  Component,
  ViewChild,
  OnInit,
} from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subject, Subscription, Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { LAYOUT_COMPACT } from '../../../shared/constants/layout-mode.constants';
import { LayoutModeService } from '../../../shared/services/layout-mode.service';
import { ILayoutMode } from '../../../shared/models/layout-mode.model';
import { IAppState, getIsUserLoggedIn } from 'src/app/store';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../models/user.model';


@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss'],
})
export class SearchUserComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  private searchDebouncer$: Subject<string> = new Subject<string>();
  shouldSwitchToCompactMode: boolean;
  isUserLogged$: Observable<boolean>;
  shouldHideResults: boolean;
  shouldShowSpinner: boolean;
  shouldGetUsers: boolean;
  noResultsFound: boolean;
  searchForm: FormGroup;
  searchResults: IUser[] = [];
  users: IUser[];

  @ViewChild('searchField') searchField: ElementRef;

  @HostListener('window:click', ['$event.target'])
  onClick(target) {
    this.shouldHideResults = target !== this.searchField.nativeElement;
  }

  constructor(private layoutModeService: LayoutModeService,
              private usersService: UsersService,
              private router: Router,
              private formBuilder: FormBuilder,
              private store: Store<IAppState>) {
  }

  ngOnInit(): void {
    this.checkIfUserLogged();
    this.createForm();
    this.setupSearchDebouncer();
    this.getLayoutMode();
    this.checkForRouteChanges();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  createForm(): void {
    this.searchForm = this.formBuilder.group({
      search: '',
    });
  }

  getLayoutMode(): void {
    this.subscription.add(this.layoutModeService.layoutState$
      .subscribe((response: ILayoutMode) => {
        this.shouldSwitchToCompactMode = response.type === LAYOUT_COMPACT;
      }));
  }

  checkForRouteChanges(): void {
    this.subscription.add(this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.searchForm.get('search').patchValue('');
        this.onSearchInputChange('');
      }
    }));
  }

  checkIfUserLogged(): void {
    this.isUserLogged$ = this.store.select(getIsUserLoggedIn);
  }

  onSearchInputChange(searchValue: string): void {
    this.searchDebouncer$.next(searchValue);
  }

  setupSearchDebouncer(): void {
    this.subscription.add(this.searchDebouncer$.pipe(
      debounceTime(250))
      .subscribe((searchValue: string) => {
        this.getUsers(searchValue);
      }));
  }

  getUsers(searchValue: string): void {
    if (this.users && !this.shouldGetUsers) {
      this.searchUser(searchValue);
    } else if (this.shouldGetUsers && searchValue !== '') {
      this.shouldShowSpinner = true;
      this.usersService.getAllUsers().pipe(take(1))
        .subscribe((response: IUser[]) => {
          this.users = response;
          this.searchUser(searchValue);
          this.shouldShowSpinner = false;
        });
    }

    this.shouldGetUsers = searchValue === '';
  }

  searchUser(searchValue: string): void {
    this.noResultsFound = false;
    this.searchResults = [];

    if (searchValue.length > 2 && searchValue.trim() !== '') {
      this.searchResults = this.users.filter(user => {
        if (user.username.toLowerCase().includes(searchValue.toLowerCase())) {
          return user;
        }
      });

      if (!this.searchResults.length) {
        this.noResultsFound = true;
      }
    }
  }
}
