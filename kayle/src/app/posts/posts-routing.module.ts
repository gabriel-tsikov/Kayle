import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PostPageComponent } from './pages/post-page/post-page.component';


const routes: Routes = [
  { path: 'post' + '/:id', component: PostPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {
}
