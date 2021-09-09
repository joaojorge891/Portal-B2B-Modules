import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserDashboardComponent } from './components/dashboard/dashboard.component';
import { NewUserComponent } from './components/dashboard/new-user/new-user.component';
import { UpdateUserComponent } from './components/dashboard/update-user/update-user.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { ValidateComponent } from './components/validate/validate.component';



const routes: Routes = [
  {
    path: '', component: HomeAdminComponent, children: [
      {path: 'users', component: UserDashboardComponent},
      { path: 'users/new', component: NewUserComponent },
      { path: 'users/update/:id', component: UpdateUserComponent },
      { path: 'users/no-validate/:id', component: ValidateComponent },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
