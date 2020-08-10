import { Component, EventEmitter, Input, Output } from '@angular/core';

import { IUser } from '../../models/user.model';


@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent {
  @Output() shouldAddClass: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() noResultsFound: boolean;
  @Input() searchResult: IUser;
  @Input() index: number;

  constructor() {
  }

  emitMouseEnter(): void {
    if (this.index === 0) {
      this.shouldAddClass.emit(true);
    }
  }

  emitMouseLeave(): void {
    this.shouldAddClass.emit(false);
  }
}
