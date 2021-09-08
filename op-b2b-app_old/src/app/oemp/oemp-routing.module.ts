import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CompletedOrdersComponent } from './components/completed-orders/completed-orders.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ExecOrdersComponent } from './components/exec-orders/exec-orders.component';
import { ExportsComponent } from './components/exports/exports.component';
import { NewOrdersComponent } from './components/new-orders/new-orders.component';


const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: 'oemp/new-orders', component: NewOrdersComponent },
      { path: 'oemp/exec-orders', component: ExecOrdersComponent },
      { path: 'oemp/completed-orders', component: CompletedOrdersComponent },
      { path: 'exports', component: ExportsComponent },
      { path: 'oemp/new-orders/:id', component: NewOrdersComponent },
      { path: 'oemp/exec-orders/:id', component: ExecOrdersComponent },
    ]
  } 
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OempRoutingModule { }
