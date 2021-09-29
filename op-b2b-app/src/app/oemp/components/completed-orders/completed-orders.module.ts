import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoPageModule, PoTableModule } from '@po-ui/ng-components';

import { CompletedOrdersRoutingModule } from './completed-orders-routing.module';
import { CompletedOrdersComponent } from './completed-orders.component';



@NgModule({
  declarations: [
    CompletedOrdersComponent
  ],
  imports: [
    CommonModule,
    CompletedOrdersRoutingModule,
    PoTableModule,
    PoPageModule 
  ]
})
export class CompletedOrdersModule { }
