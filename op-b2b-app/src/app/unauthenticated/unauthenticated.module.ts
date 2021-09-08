import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoPageChangePasswordModule } from '@po-ui/ng-templates';
import { PoFieldModule, PoModalModule } from '@po-ui/ng-components';

import { ResetPwdComponent } from './reset-pwd/reset-pwd.component';
import { UnauthenticatedRoutingModule } from './unauthenticated-routing.module';
import { PwdRecoveryComponent } from './pwd-recovery/pwd-recovery.component';



@NgModule({
  declarations: [
    PwdRecoveryComponent,
    ResetPwdComponent
  ],

  imports: [
    CommonModule,
    PoPageChangePasswordModule,
    PoModalModule,
    PoFieldModule,
    ReactiveFormsModule,
    UnauthenticatedRoutingModule

  ]
})
export class UnauthenticatedModule { }
