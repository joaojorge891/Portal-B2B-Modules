import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { PoModule } from '@po-ui/ng-components';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { LinkExternalRedirectComponent } from './globals/link-external-redirect/link-external-redirect.component';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LinkExternalRedirectComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PoModule,
    PoTemplatesModule,
    LoginModule,
    FontAwesomeModule, 
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
