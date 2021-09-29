import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PoPageLoginModule, PoPageChangePasswordModule } from '@po-ui/ng-templates';
import { PoFieldModule, PoModalModule } from '@po-ui/ng-components';

import { LoginComponent } from './components/login.component';



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
