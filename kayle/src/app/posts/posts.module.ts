import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CommentFormComponent } from './components/comment-form/comment-form.component';
import { LikeButtonComponent } from './components/like-button/like-button.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { CommentsComponent } from './components/comments/comments.component';
import { PostPageComponent } from './pages/post-page/post-page.component';
import { PostComponent } from './components/post/post.component';
import { PostsRoutingModule } from './posts-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PostService } from './services/post.service';


@NgModule({
  declarations: [
    PostsListComponent,
    PostComponent,
    CreatePostComponent,
    LikeButtonComponent,
    CommentsComponent,
    CommentFormComponent,
    PostPageComponent,
    EditPostComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    PostsRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    InfiniteScrollModule,
    PickerModule,
  ],
  exports: [PostsListComponent],
  providers: [PostService],
})
export class PostsModule {
}
