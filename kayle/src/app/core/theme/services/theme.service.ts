import { Injectable, Inject } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { THEMES, ACTIVE_THEME } from '../constants/theme.constants';
import { Theme } from '../models/theme.model';


@Injectable()
export class ThemeService {
  themeChange = new Subject<Theme>();

  constructor(@Inject(THEMES) public themes: Theme[],
              @Inject(ACTIVE_THEME) public theme: string) {
  }

  getThemeChange(): Observable<Theme> {
    return this.themeChange.asObservable();
  }

  getTheme(name: string): Theme {
    const theme = this.themes.find((t) => t.name === name);
    if (!theme) {
      throw new Error(`Theme not found: '${name}'`);
    }
    return theme;
  }

  getActiveTheme(): Theme {
    return this.getTheme(this.theme);
  }

  getProperty(propName: string): any {
    return this.getActiveTheme().properties[propName];
  }

  setTheme(name: string): void {
    this.theme = name;
    this.themeChange.next(this.getActiveTheme());
  }
}
