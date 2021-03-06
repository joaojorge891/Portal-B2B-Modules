import { OempRoutingModule } from './oemp-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { PoButtonModule, PoDisclaimerGroupModule, PoDividerModule, PoDynamicModule, PoFieldModule, PoInfoModule, PoMenuModule, PoModalModule, PoPageModule, PoTableModule, PoTabsModule, PoToolbarModule, PoWidgetModule } from '@po-ui/ng-components';
import { PoPageDynamicSearchModule } from '@po-ui/ng-templates';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';



@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    OempRoutingModule,
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
    PoToolbarModule,
    PoMenuModule,
    PoDisclaimerGroupModule,
    PoDynamicModule,
    FontAwesomeModule,
    PoTabsModule,
    OempRoutingModule
  ]
})
export class OempModule { }
