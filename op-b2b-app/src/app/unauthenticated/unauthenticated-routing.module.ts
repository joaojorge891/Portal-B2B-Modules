import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewRegisterComponent } from './new-register/new-register.component';
import { PwdRecoveryComponent } from './pwd-recovery/pwd-recovery.component';
import { ResetPwdComponent } from './reset-pwd/reset-pwd.component';



const routes: Routes = [

  { path: 'reset-pwd/:id/:token', component: ResetPwdComponent },
  { path: 'pwdRecovery', component: PwdRecoveryComponent },
  { path: 'new-register', component: NewRegisterComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnauthenticatedRoutingModule { }
