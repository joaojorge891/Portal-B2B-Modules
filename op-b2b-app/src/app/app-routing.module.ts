import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CompletedOrdersComponent } from './oemp/components/completed-orders/completed-orders.component';
import { DashboardComponent } from './oemp/components/dashboard/dashboard.component';
import { ExecOrdersComponent } from './oemp/components/exec-orders/exec-orders.component';
import { NewOrdersComponent } from './oemp/components/new-orders/new-orders.component';
import { RedirectGuard } from 'src/utils/linkExternalRedirect';
import { ExportsComponent } from './oemp/components/exports/exports.component';

import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { LoginComponent } from './login/components/login.component';
import { ResetPwdComponent } from './login/components/reset-pwd/reset-pwd.component';
import { NewRegisterComponent } from './users/components/new-register/new-register.component';
import { UserDashboardComponent } from './users/components/dashboard/dashboard.component';
import { NewUserComponent } from './users/components/dashboard/new-user/new-user.component';
import { UpdateUserComponent } from './users/components/dashboard/update-user/update-user.component';
import { ValidateComponent } from './users/components/validate/validate.component';




const routes: Routes = [
  // { path: '', component: LoginComponent },
  
  { path: 'users/reset-pwd/:id/:token', component: ResetPwdComponent },
  { path: 'users/new-register', component: NewRegisterComponent },

  {
    path: 'portal',
    canActivate: [RedirectGuard],
    component: RedirectGuard,
    data: {
      externalUrl: 'http://10.61.81.95/op_b2b/index.php'
    }
},
  {
    path: 'oemp', loadChildren: () => import('./oemp/oemp.module').then(
      m => m.OempModule
      )
    },
    
  {
    path: 'users', loadChildren: () => import('./users/users.module').then(
      m => m.UsersModule
    )
  },

  {
    path: 'home', component: HomeComponent, children: [
      { path: 'oemp', component: DashboardComponent },
      { path: 'oemp/new-orders', component: NewOrdersComponent },
      { path: 'oemp/new-orders/:id', component: NewOrdersComponent },
      { path: 'oemp/exec-orders', component: ExecOrdersComponent },
      { path: 'oemp/exec-orders/:id', component: ExecOrdersComponent },
      { path: 'oemp/completed-orders', component: CompletedOrdersComponent },
      { path: 'oemp/exports', component: ExportsComponent }
    ]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  











  // {
  //   path: 'home', component: HomeComponent, children: [
  //     { path: 'oemp', component: DashboardComponent },
  //     { path: 'oemp/new-orders', component: NewOrdersComponent },
  //     { path: 'oemp/new-orders/:id', component: NewOrdersComponent },
  //     { path: 'oemp/exec-orders', component: ExecOrdersComponent },
  //     { path: 'oemp/exec-orders/:id', component: ExecOrdersComponent },
  //     { path: 'oemp/completed-orders', component: CompletedOrdersComponent },
  //   ]
  // },
  // {
  //   path: 'home-admin', component: HomeAdminComponent, children: [
  //     { path: 'users', component: UserDashboardComponent },
  //     { path: 'users/new', component: NewUserComponent },
  //     { path: 'users/update/:id', component: UpdateUserComponent },
  //     { path: 'users/no-validate/:id', component: ValidateComponent },
  //   ]
  // }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
