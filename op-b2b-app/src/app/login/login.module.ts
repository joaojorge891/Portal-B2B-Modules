import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoPageLoginModule, PoPageChangePasswordModule } from '@po-ui/ng-templates';

import { LoginComponent } from './components/login.component';
import { ResetPwdComponent } from './components/reset-pwd/reset-pwd.component';



@NgModule({
  declarations: [
    LoginComponent,
    ResetPwdComponent
  ],
  imports: [
    CommonModule,
    PoPageLoginModule,
    PoPageChangePasswordModule,
    FormsModule
  ]
})
export class LoginModule { }
