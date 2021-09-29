import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';



const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      { path: 'oemp', component: DashboardComponent },
      {
        path: 'oemp/exports', loadChildren: () => import('./components/exports/exports.module').then(
          m => m.ExportsModule)
      },
      {
        path: 'oemp/new-orders', loadChildren: () => import('./components/new-orders/new-orders.module').then(
          m => m.NewOrdersModule)
      },
      {
        path: 'oemp/exec-orders', loadChildren: () => import('./components/exec-orders/exec-orders.module').then(
          m => m.ExecOrdersModule)
      },
      {
        path: 'oemp/completed-orders', loadChildren: () => import('./components/completed-orders/completed-orders.module').then(
          m => m.CompletedOrdersModule)
      },
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OempRoutingModule { }
