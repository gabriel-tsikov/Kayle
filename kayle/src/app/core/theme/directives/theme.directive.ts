import { Directive, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { ThemeService } from '../services/theme.service';
import { Theme } from '../models/theme.model';

@Directive({
  selector: '[appTheme]',
})
export class ThemeDirective implements OnInit, OnDestroy {
  private destroy$ = new Subject();

  constructor(
    private elementRef: ElementRef,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    const active = this.themeService.getActiveTheme();
    if (active) {
      this.updateTheme(active);
    }

    this.themeService.themeChange
      .pipe(takeUntil(this.destroy$))
      .subscribe((theme: Theme) => this.updateTheme(theme));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  updateTheme(theme: Theme): void {
    // project theme properties onto the element
    for (const key in theme.properties) {
      this.elementRef.nativeElement.style.setProperty(
        key,
        theme.properties[key]
      );
    }

    // removes old theme
    for (const name of this.themeService.theme) {
      this.elementRef.nativeElement.classList.remove(`${name}-theme`);
    }

    // bonds element with theme name
    this.elementRef.nativeElement.classList.add(`${theme.name}-theme`);
  }
}
