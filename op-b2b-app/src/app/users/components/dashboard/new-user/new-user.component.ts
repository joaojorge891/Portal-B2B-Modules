import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { PoNotificationService, PoPageAction } from '@po-ui/ng-components';
import { Md5 } from 'ts-md5';

import { UsersService } from 'src/app/users/services/users.service';
import { AccessValidate } from 'src/utils/accessvalidate';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent extends AccessValidate implements OnInit {

  model: any = {}
  isAutoFocus: boolean = true
  password = ''
  confirmPassword = ''
  requester: string = ''
  maxLengthInputMatricula = 8
  inputUserPattern: string = '^oi|^tr|^bt|^cr|^pr|^mt|^tc|^ms|^df|^ro|^go|^sc|^rs|^ac[0-9]+'
  inputUserErrorPattern: string = 'Informe o login de rede com 8 dígitos em letra minúscula (Ex: oixxxxxx, trxxxxxx)'
  inputMailErrorPattern: string = 'Por favor informe um e-mail válido'

  @ViewChild('user') userField!: HTMLElement
  @ViewChild('mail') mailField!: HTMLElement

  actions: Array<PoPageAction> = [
    { label: 'Salvar', icon: 'save', action: this.onSave.bind(this) },
    { label: 'Voltar', action: this.onBack.bind(this) }
  ]

  constructor(
    private router: Router,
    private service: UsersService,
    private notification: PoNotificationService
  ) {
    super()
  }

  private restore(){
    this.model.email = ''
    this.model.name === ''
    this.model.userId === ''
    this.model.typeUser === ''
    this.model.company === ''
    this.model.department === ''
    this.model.uf === ''
    this.model.status === ''
    this.password === ''
    this.confirmPassword === ''
  }

  ngOnInit() {
    if (this.validateUser() === 'user') {
      this.router.navigateByUrl('')
    }
    this.restore()
  }

  userFocus() {
    this.userField.focus();
  }

  mailFocus() {
    this.mailField.focus()
  }

  mailVerify() {
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
    if (this.model.userId != '') {
      this.service.userValidate(this.model.userId).subscribe(
        (result: any) => {
          if (result != '' && result != null && result != undefined) {
            this.notification.error('Matrícula já existe. Por favor, informe outra matrícula válida.')
            this.model.userId = ''
            this.userFocus()

          }
        },
        (err: any) => this.notification.error(err)
      )
    }
  }


  private onSave() {
    if (this.model.email === '' || this.model.name === '' ||
      this.model.userId === '' || this.model.company === '' ||
      this.model.department === '' || this.model.uf === '' ||
      this.model.status === '' || this.password === '' ||
      this.confirmPassword === '') {

      this.notification.error('Por favor, preencha todos os campos.')
      return
    }

    if (this.password !== this.confirmPassword) {
      this.notification.warning('As senhas não conferem.')
      this.confirmPassword = ''
      return
    }

    if (this.model.status) {
      this.model.status = 'active'
    } else {
      this.model.status = 'inactive'
    }

    this.model.password = Md5.hashStr(this.password)

    this.model.requester = 'newByAdmin'

    this.service.save(this.model).subscribe(
      (result: any) => {
        if (result.status === 'ok') {
          this.notification.success('Usuário criado com sucesso!')
          this.onBack()
        }
      },
      (err: any) => err.status === 401 ? this.router.navigateByUrl('') : this.notification.error(err)
    )
  }

  private onBack() {
    this.router.navigate(['/home-admin/users'])
  }

}
