import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LinkExternalRedirectComponent } from './globals/link-external-redirect/link-external-redirect.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'home', loadChildren: () => import('./oemp/oemp.module').then(
      m => m.OempModule), canActivate: [AuthGuard]
  },
  {
    path: 'home/oemp/new-orders', loadChildren: () => import('./oemp/components/new-orders/new-orders.module').then(
      m => m.NewOrdersModule), canActivate: [AuthGuard]
  },
  {
    path: 'home/oemp/exec-orders', loadChildren: () => import('./oemp/components/exec-orders/exec-orders.module').then(
      m => m.ExecOrdersModule), canActivate: [AuthGuard]
  },
  {
    path: 'home/oemp/completed-orders', loadChildren: () => import('./oemp/components/completed-orders/completed-orders.module').then(
      m => m.CompletedOrdersModule), canActivate: [AuthGuard]
  },
  {
    path: 'home-admin', loadChildren: () => import('./users/users.module').then(
      m => m.UsersModule)
  },
  {
    path: 'unauthenticated', loadChildren: () => import('./unauthenticated/unauthenticated.module').then(
      m => m.UnauthenticatedModule)
  },
  {
    path: 'portal',
    canActivate: [LinkExternalRedirectComponent],
    component: LinkExternalRedirectComponent,
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
