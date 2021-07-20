import { OempModule } from './oemp/oemp.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoModule } from '@po-ui/ng-components';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { DashboardComponent } from './oemp/components/dashboard/dashboard.component';
import { CompletedOrdersComponent } from './oemp/components/completed-orders/completed-orders.component';
import { ExecOrdersComponent } from './oemp/components/exec-orders/exec-orders.component';
import { NewOrdersComponent } from './oemp/components/new-orders/new-orders.component';
import { HomeComponent } from './components/home/home.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { UsersModule } from './users/users.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PoModule,
    PoTemplatesModule,
    UsersModule,
    OempModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
