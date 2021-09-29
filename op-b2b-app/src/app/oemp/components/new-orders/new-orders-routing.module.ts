import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewOrdersComponent } from './new-orders.component';

const routes: Routes = [
  {
    path: '', component: NewOrdersComponent
  },
  { path: 'new-orders/:id', component: NewOrdersComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewOrdersRoutingModule { }
