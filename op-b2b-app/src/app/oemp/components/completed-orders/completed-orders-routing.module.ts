import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CompletedOrdersComponent } from './completed-orders.component';

const routes: Routes = [
  {
    path: '', component: CompletedOrdersComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompletedOrdersRoutingModule { }
