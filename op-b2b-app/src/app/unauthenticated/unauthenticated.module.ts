import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoPageChangePasswordModule } from '@po-ui/ng-templates';
import { PoButtonModule, PoFieldModule, PoModalModule, PoPageModule } from '@po-ui/ng-components';

import { ResetPwdComponent } from './reset-pwd/reset-pwd.component';
import { UnauthenticatedRoutingModule } from './unauthenticated-routing.module';
import { PwdRecoveryComponent } from './pwd-recovery/pwd-recovery.component';
import { NewRegisterComponent } from './new-register/new-register.component';



@NgModule({
  declarations: [
    PwdRecoveryComponent,
    ResetPwdComponent,
    NewRegisterComponent
  ],

  imports: [
    CommonModule,
    PoPageChangePasswordModule,
    PoModalModule,
    PoFieldModule,
    ReactiveFormsModule,
    PoPageChangePasswordModule,
    PoButtonModule,
    PoPageModule,
    UnauthenticatedRoutingModule

  ]
})
export class UnauthenticatedModule { }
