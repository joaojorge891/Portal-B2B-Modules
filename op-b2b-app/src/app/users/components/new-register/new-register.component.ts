import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { PoNotificationService } from '@po-ui/ng-components';
import { Md5 } from 'ts-md5';

import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-new-register',
  templateUrl: './new-register.component.html',
  styleUrls: ['./new-register.component.css']
})
export class NewRegisterComponent implements OnInit {
  model: any = {}

  actions: any

  maxLengthTextArea: number = 200

  maxLengthInputMatricula = 8

  isDisabled: boolean = true

  requester: string = ''

  autoFocus: boolean = true

  inputUserPattern: string = '^oi|^tr|^bt|^cr|^pr|^mt|^tc|^ms|^df|^ro|^go|^sc|^rs|^ac|^to[0-9]+'

  inputUserErrorPattern: string = 'Informe o login de rede com 8 dígitos em letra minúscula (Ex: oixxxxxx, trxxxxxx)'

  inputMailErrorPattern: string = 'Por favor informe um e-mail válido'

  inputPwdErrorPattern: string = 'Deve conter oito caracteres, pelo menos uma letra maiúscula, uma letra minúscula e um número'

  @ViewChild('user') userField!: HTMLElement
  @ViewChild('mail') mailField!: HTMLElement

  constructor(
    private notification: PoNotificationService,
    private service: UsersService,
    private router: Router
  ) { }

  private restore() {
    this.model.name = ''
    this.model.email = ''
    this.model.user = ''
    this.model.company = ''
    this.model.department = ''
    this.model.uf = ''
    this.model.password = ''
    this.model.confirmPassword = ''
    this.model.reason = ''
  }

  ngOnInit(): void {
    this.restore()
  }

  userFocus() {
    this.userField.focus();
  }

  mailFocus() {
    this.mailField.focus()
  }

  verifyEmail() {

    if (this.model.email != '') {

      this.service.mailValidate(this.model.email).subscribe(
        (result: any) => {
          if (result.exist) {
            this.notification.error('E-mail já existe. Por favor, informe outro e-mail válido.')
            this.model.email = ''
            this.mailFocus()


          }
        },
        (err: any) => this.notification.error(err)
      )
    }
  }

  userVerify() {
    if (this.model.user != '') {
      this.service.userValidate(this.model.user).subscribe(
        (result: any) => {
          if (result != '' && result != null && result != undefined) {
            this.notification.error('Matrícula já existe. Por favor, informe outra matrícula válida.')
            this.model.user = ''
            this.userFocus()

          }
        },
        (err: any) => this.notification.error(err)
      )
    }
  }

  onDisable() {
    if ((this.model.name != '' && this.model.name != undefined && this.model.name != null) &&
      (this.model.user != '' && this.model.user != undefined && this.model.user != null) &&
      (this.model.company != '' && this.model.company !== undefined && this.model.company !== null) &&
      (this.model.department != '' && this.model.department != undefined && this.model.department != null) &&
      (this.model.uf != '' && this.model.uf != undefined && this.model.uf != null) &&
      (this.model.email != '' && this.model.email != undefined && this.model.email != null) &&
      (this.model.password != '' && this.model.password != undefined && this.model.password != null) &&
      (this.model.confirmPassword != '' && this.model.confirmPassword != undefined && this.model.confirmPassword != null) &&
      (this.model.reason != '' && this.model.reason != undefined && this.model.reason != null)) {

      this.isDisabled = false

    } else {
      this.isDisabled = true


    }
  }


  enviar() {

    if (this.model.password !== this.model.confirmPassword) {
      this.notification.warning('As senhas não conferem.');
      this.model.confirmPassword = '';
      return;
    }

    this.model.status = 'pending';

    this.model.requester = 'newByUser'

    this.model.password = Md5.hashStr(this.model.password);

    this.model.typeUser = 'user'

    this.service.saveNewRegister(this.model).subscribe(
      (result: any) => {
        if (result.status === 'ok') {

          this.notification.success('Solicitação enviada com sucesso. Favor aguardar aprovação!');
          this.onBack();
        }
      },
      (err: any) => this.notification.error(err)
    )
  }

  cancelar() {
    this.router.navigate([''])
  }

  private onBack() {
    this.router.navigate(['']);
  }

}
