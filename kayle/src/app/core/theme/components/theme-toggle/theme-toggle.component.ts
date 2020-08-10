import { Component, OnInit, Input } from '@angular/core';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { THEME_LIGHT, THEME_DARK } from '../../constants/theme.constants';
import { IAppState, getIsUserLoggedIn } from 'src/app/store';
import { ThemeService } from '../../services/theme.service';


@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss'],
})
export class ThemeToggleComponent implements OnInit {
  isUserLogged: boolean;

  @Input() checked: boolean;

  constructor(
    private themeService: ThemeService,
    private store: Store<IAppState>
  ) {}

  ngOnInit(): void {
    this.checkIsUserLogged();
    this.setActiveTheme();
    this.setToggleState();
  }

  checkIsUserLogged(): void {
    this.store
      .select(getIsUserLoggedIn)
      .pipe(take(1))
      .subscribe((response: boolean) => {
        this.isUserLogged = response;
      });
  }

  setActiveTheme(): void {
    if (this.isUserLogged) {
      let lastThemeActive: string = JSON.parse(localStorage.getItem('theme'));
      if (lastThemeActive === null) {
        lastThemeActive = THEME_LIGHT;
      }
      this.themeService.setTheme(lastThemeActive);
    }
  }

  setToggleState(): void {
    let isChecked = true;
    const activeTheme = this.themeService.getActiveTheme();
    if (activeTheme.name === THEME_DARK) {
      isChecked = false;
    }
    this.checked = isChecked;
  }

  toggle(): void {
    const active = this.themeService.getActiveTheme();
    if (active.name === THEME_LIGHT) {
      this.themeService.setTheme(THEME_DARK);
    } else {
      this.themeService.setTheme(THEME_LIGHT);
    }
    this.storeTheme();
  }

  storeTheme(): void {
    const active = this.themeService.getActiveTheme();
    localStorage.setItem('theme', JSON.stringify(active.name));
  }
}
