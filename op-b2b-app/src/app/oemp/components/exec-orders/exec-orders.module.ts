import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PoFieldModule, PoTableModule, PoPageModule, PoModalModule } from '@po-ui/ng-components';

import { ExecOrdersComponent } from './exec-orders.component';
import { ExecOrdersRoutingModule } from './exec-orders-routing.module';


@NgModule({
  declarations: [
    ExecOrdersComponent
  ],
  imports: [
    CommonModule,
    ExecOrdersRoutingModule,
    PoFieldModule,
    FormsModule,
    PoTableModule,
    PoPageModule,
    PoModalModule,
  ]
})
export class ExecOrdersModule { }
