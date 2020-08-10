import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SearchResultsListComponent } from './components/search-results-list/search-results-list.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { FollowsListComponent } from './components/follows-list/follows-list.component';
import { EditPictureComponent } from './components/edit-picture/edit-picture.component';
import { FollowButtonComponent } from './follow-button/follow-button.component';
import { NotificationsModule } from '../notifications/notifications.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PersonalComponent } from './pages/personal/personal.component';
import { FollowComponent } from './components/follow/follow.component';
import { HomeComponent } from './pages/home/home.component';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PostsModule } from '../posts/posts.module';

@NgModule({
  declarations: [
    HomeComponent,
    PersonalComponent,
    EditPictureComponent,
    FollowsListComponent,
    FollowComponent,
    DashboardComponent,
    FollowButtonComponent,
    SearchResultsListComponent,
    SearchResultComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    PostsModule,
    SharedModule,
    NotificationsModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [SearchResultsListComponent],
})
export class UsersModule {
}
