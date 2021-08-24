import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PoButtonModule, PoDisclaimerGroupModule, PoDividerModule, PoDynamicModule, PoFieldModule, PoInfoModule, PoModalModule, PoPageModule, PoTableModule, PoWidgetModule } from '@po-ui/ng-components';
import { PoPageDynamicSearchModule } from '@po-ui/ng-templates';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CompletedOrdersComponent } from './components/completed-orders/completed-orders.component';
import { ExecOrdersComponent } from './components/exec-orders/exec-orders.component';
import { NewOrdersComponent } from './components/new-orders/new-orders.component';



@NgModule({
  declarations: [
    DashboardComponent,
    CompletedOrdersComponent,
    ExecOrdersComponent,
    NewOrdersComponent,
  ],
  imports: [
    CommonModule,
    PoFieldModule,
    FormsModule,
    PoTableModule,
    PoPageDynamicSearchModule,
    PoPageModule,
    PoButtonModule,
    PoFieldModule,
    PoModalModule,
    PoWidgetModule,
    ReactiveFormsModule,
    PoDividerModule,
    PoInfoModule,
    PoDisclaimerGroupModule,
    PoDynamicModule
  ]
})
export class OempModule { }
