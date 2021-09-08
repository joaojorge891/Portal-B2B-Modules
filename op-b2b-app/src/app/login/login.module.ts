import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PoPageLoginModule, PoPageChangePasswordModule } from '@po-ui/ng-templates';

import { LoginComponent } from './components/login.component';
import { PoFieldModule, PoModalModule } from '@po-ui/ng-components';



@NgModule({
  declarations: [
    LoginComponent,
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
