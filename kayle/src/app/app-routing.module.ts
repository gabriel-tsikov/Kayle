import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NgModule } from '@angular/core';

import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { APP_ROUTES } from './shared/constants/routes.constants';


const routes: Routes = [
  { path: APP_ROUTES.nonExistent.path, component: PageNotFoundComponent },
  { path: '', redirectTo: APP_ROUTES.homepage.path, pathMatch: 'full' },
  {
    path: '',
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
