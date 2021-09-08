import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PwdRecoveryComponent } from '../login/components/pwd-recovery/pwd-recovery.component';
import { ResetPwdComponent } from '../login/components/reset-pwd/reset-pwd.component';
import { UserDashboardComponent } from './components/dashboard/dashboard.component';
import { NewUserComponent } from './components/dashboard/new-user/new-user.component';
import { UpdateUserComponent } from './components/dashboard/update-user/update-user.component';
import { NewRegisterComponent } from './components/new-register/new-register.component';
import { ValidateComponent } from './components/validate/validate.component';



const routes: Routes = [
  {
    path: '', component: UserDashboardComponent, children: [
      { path: 'users/new', component: NewUserComponent },
      { path: 'users/update/:id', component: UpdateUserComponent },
      { path: 'users/no-validate/:id', component: ValidateComponent },
    ]
  },
  
  { path: 'pwdRecovery', component: PwdRecoveryComponent },
  { path: 'users/new-register', component: NewRegisterComponent },
  { path: 'users/reset-pwd/:id/:token', component: ResetPwdComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
