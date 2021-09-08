import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { PoPageDynamicSearchModule } from '@po-ui/ng-templates';
import { PoButtonModule, PoDisclaimerGroupModule, PoFieldModule, PoMenuModule, PoPageModule, PoTableModule, PoToolbarModule } from '@po-ui/ng-components';


import { UsersRoutingModule } from './users-routing.module';
import { NewUserComponent } from './components/dashboard/new-user/new-user.component';
import { UpdateUserComponent } from './components/dashboard/update-user/update-user.component';
import { NewRegisterComponent } from './components/new-register/new-register.component';
import { ValidateComponent } from './components/validate/validate.component';
import { UserDashboardComponent } from './components/dashboard/dashboard.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';



@NgModule({
  declarations: [
    NewUserComponent,
    UpdateUserComponent,
    NewRegisterComponent,
    ValidateComponent,
    UserDashboardComponent,
    HomeAdminComponent
  ],
  imports: [
    CommonModule,
    PoButtonModule,
    PoFieldModule,
    PoPageModule,
    FormsModule,
    PoTableModule,
    PoFieldModule,
    PoToolbarModule,
    PoMenuModule,
    PoPageDynamicSearchModule,
    ReactiveFormsModule,
    PoDisclaimerGroupModule,
    UsersRoutingModule
    
  ]
})
export class UsersModule { }
