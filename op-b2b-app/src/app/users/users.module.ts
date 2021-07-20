import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PoPageChangePasswordModule, PoPageDynamicSearchModule, PoPageLoginModule } from '@po-ui/ng-templates';
import { PoButtonModule, PoFieldModule, PoPageModule, PoTableModule } from '@po-ui/ng-components';


import { NewUserComponent } from './components/dashboard/new-user/new-user.component';
import { UpdateUserComponent } from './components/dashboard/update-user/update-user.component';
import { LoginComponent } from './components/login/login.component';
import { NewRegisterComponent } from './components/new-register/new-register.component';
import { ValidateComponent } from './components/validate/validate.component';
import { ResetPwdComponent } from './components/login/reset-pwd/reset-pwd.component';
import { UserDashboardComponent } from './components/dashboard/dashboard.component';



@NgModule({
  declarations: [
    NewUserComponent,
    UpdateUserComponent,
    LoginComponent,
    NewRegisterComponent,
    ValidateComponent,
    ResetPwdComponent,
    UserDashboardComponent
  ],
  imports: [
    CommonModule,
    PoPageLoginModule,
    PoButtonModule,
    PoFieldModule,
    PoPageModule,
    FormsModule,
    PoPageChangePasswordModule,
    PoTableModule,
    PoPageDynamicSearchModule
    
  ]
})
export class UsersModule { }
