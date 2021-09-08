import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { PoModule } from '@po-ui/ng-components';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { LoginModule } from './login/login.module';
//import { UsersModule } from './users/users.module';
//import { OempModule } from './oemp/oemp.module';


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
    //UsersModule,
    LoginModule,
    //OempModule,
    FontAwesomeModule, 
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
