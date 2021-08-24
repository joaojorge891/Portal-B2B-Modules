import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PoNotificationService } from '@po-ui/ng-components';
import { PoModalPasswordRecoveryType, PoPageLoginLiterals, PoPageLoginRecovery } from '@po-ui/ng-templates';

import { AuthService } from 'src/app/login/services/auth.service'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private authservice: AuthService,
    private notification: PoNotificationService,
    



  ) { }

  ngOnInit(): void {


  }
  pwdRecovery: PoPageLoginRecovery = {
    url: 'http://localhost:8081/api/users/resetPwd',
    contactMail: 'LD-PORTALB2BBR@oi.net.br',
    type: PoModalPasswordRecoveryType.Email
  }

  customLiterals: PoPageLoginLiterals = {
    welcome: 'Bem-Vindo(a)',
    loginPlaceholder: 'Insira sua matrícula'

  }

 
  onLogin(loginFormData: any) {
    let lastLogin = new Date()
    this.authservice.auth(loginFormData.login, loginFormData.password, lastLogin).subscribe(
      (result: any) => {
        if (result.status == 'ok') {
          localStorage.setItem('current_user', JSON.stringify(result))
          if (result.typeUser == 'user') {
            this.router.navigate(['home'])
          } else if (result.typeUser == 'admin') {
            this.router.navigate(['home-admin'])
          } else {
            this.router.navigate([''])
            
            
          }
        }
      },
      (error: any) => this.notification.error(error.error)
    )
  }

}
