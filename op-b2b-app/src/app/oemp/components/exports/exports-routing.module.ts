import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExportsComponent } from './exports.component';



const routes: Routes = [
  {
    path: '', component: ExportsComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExportsRoutingModule { }
