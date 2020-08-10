import { Component, Input } from '@angular/core';

import { IUser } from '../../models/user.model';


@Component({
  selector: 'app-search-results',
  templateUrl: './search-results-list.component.html',
  styleUrls: ['./search-results-list.component.scss'],
})
export class SearchResultsListComponent {
  @Input() noResultsFound: boolean;
  @Input() searchResults: IUser[];

  shouldAddClass: boolean;

  constructor() {
  }
}
