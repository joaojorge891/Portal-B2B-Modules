import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LinkExternalRedirectComponent } from './utils/link-external-redirect/link-external-redirect.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'home', loadChildren: () => import('./oemp/oemp.module').then(
      m => m.OempModule)
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
    data: {
      externalUrl: 'http://10.61.81.95/op_b2b/index.php'
    }
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
