import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuardService } from '../authentication/guards/auth-guard.service';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PersonalComponent } from './pages/personal/personal.component';
import { APP_ROUTES } from '../shared/constants/routes.constants';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: APP_ROUTES.homepage.path, component: HomeComponent },
  {
    path: APP_ROUTES.dashboard.path,
    component: DashboardComponent,
    canActivate: [AuthGuardService],
  },
  { path: ':username', component: PersonalComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {
}
