import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PoPageDynamicSearchModule } from '@po-ui/ng-templates';
import { PoButtonModule, PoFieldModule, PoPageModule, PoTableModule } from '@po-ui/ng-components';


import { NewUserComponent } from './components/dashboard/new-user/new-user.component';
import { UpdateUserComponent } from './components/dashboard/update-user/update-user.component';
import { NewRegisterComponent } from './components/new-register/new-register.component';
import { ValidateComponent } from './components/validate/validate.component';
import { UserDashboardComponent } from './components/dashboard/dashboard.component';



@NgModule({
  declarations: [
    NewUserComponent,
    UpdateUserComponent,
    NewRegisterComponent,
    ValidateComponent,
    UserDashboardComponent
  ],
  imports: [
    CommonModule,
    PoButtonModule,
    PoFieldModule,
    PoPageModule,
    FormsModule,
    PoTableModule,
    PoPageDynamicSearchModule
    
  ]
})
export class UsersModule { }
