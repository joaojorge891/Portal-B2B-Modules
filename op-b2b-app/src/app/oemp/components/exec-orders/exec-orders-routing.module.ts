import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExecOrdersComponent } from './exec-orders.component';

const routes: Routes = [
  {
    path: '', component: ExecOrdersComponent
  },
  { path: 'exec-orders/:id', component: ExecOrdersComponent }
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExecOrdersRoutingModule { }
