import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoFieldModule, PoModalModule, PoPageModule, PoTableModule } from '@po-ui/ng-components';
import { FormsModule } from '@angular/forms';

import { NewOrdersRoutingModule } from './new-orders-routing.module';
import { NewOrdersComponent } from './new-orders.component';


@NgModule({
  declarations: [
    NewOrdersComponent
  ],
  imports: [
    CommonModule,
    NewOrdersRoutingModule,
    PoFieldModule,
    FormsModule,
    PoModalModule,
    PoTableModule,
    PoPageModule
  ]
})
export class NewOrdersModule { }
