import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PoFieldModule, PoModalModule, PoTabsModule, PoDividerModule, PoPageModule } from '@po-ui/ng-components';

import { ExportsComponent } from './exports.component';
import { ExportsRoutingModule } from './exports-routing.module';


@NgModule({
  declarations: [
    ExportsComponent
  ],
  imports: [
    CommonModule,
    ExportsRoutingModule,
    PoFieldModule,
    PoModalModule,
    PoTabsModule,
    PoDividerModule,
    FormsModule,
    PoPageModule
  ]
})
export class ExportsModule { }
