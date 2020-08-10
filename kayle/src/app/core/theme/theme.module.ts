import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';
import { THEMES, ACTIVE_THEME } from './constants/theme.constants';
import { ThemeDirective } from './directives/theme.directive';
import { ThemeService } from './services/theme.service';
import { ThemeOptions } from './models/theme.model';


@NgModule({
  imports: [CommonModule],
  providers: [ThemeService],
  declarations: [
    ThemeDirective,
    ThemeToggleComponent,
  ],
  exports: [
    ThemeDirective,
    ThemeToggleComponent,
  ],
})
export class ThemeModule {
  static forRoot(options: ThemeOptions): ModuleWithProviders {
    return {
      ngModule: ThemeModule,
      providers: [
        {
          provide: THEMES,
          useValue: options.themes,
        },
        {
          provide: ACTIVE_THEME,
          useValue: options.active,
        },
      ],
    };
  }
}
