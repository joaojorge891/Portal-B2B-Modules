import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoPageLoginModule, PoPageChangePasswordModule } from '@po-ui/ng-templates';

import { LoginComponent } from './components/login.component';
import { ResetPwdComponent } from './components/reset-pwd/reset-pwd.component';
import { PwdRecoveryComponent } from './components/pwd-recovery/pwd-recovery.component';
import { PoFieldModule, PoModalModule } from '@po-ui/ng-components';



@NgModule({
  declarations: [
    LoginComponent,
    ResetPwdComponent,
    PwdRecoveryComponent,
  ],
  imports: [
    CommonModule,
    PoPageLoginModule,
    PoPageChangePasswordModule,
    FormsModule,
    PoModalModule,
    PoFieldModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { }
