import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PoEmailComponent, PoInputComponent, PoNotificationService } from '@po-ui/ng-components';
import { Md5 } from 'ts-md5';

import { UsersService } from 'src/app/users/services/users.service';
import { AccessValidate } from 'src/app/globals/accessvalidate';
import { customValidation } from 'src/app/users/passwordValidator';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent extends AccessValidate implements OnInit {

  newUserValidateForm!: FormGroup
  model: any = {}
  isAutoFocus: boolean = true
  password = ''
  confirmPassword = ''
  requester: string = ''
  maxLengthInputMatricula = 8
  inputUserErrorPattern: string = 'Informe o login de rede com 8 dígitos em letra minúscula (Ex: oixxxxxx, trxxxxxx)'
  inputMailErrorPattern: string = 'Por favor informe um e-mail válido'
  inputPwdErrorPattern: string = 'A senha deve conter oito caracteres'
  inputConfirmPwdErrorPattern = 'As senhas não conferem'

  @ViewChild('userId') userIdField!: PoInputComponent
  @ViewChild('email') emailField!: PoEmailComponent

  constructor(
    private router: Router,
    private service: UsersService,
    private notification: PoNotificationService,
    private formBuilder: FormBuilder
  ) {
    super()
  }

  ngOnInit() {
    // if (this.validateUser() === 'user') {
    //   this.router.navigateByUrl('')
    // }
    this.newUserValidateForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      userId: ['', [Validators.required, Validators.pattern('^oi|^tr|^bt|^cr|^pr|^mt|^tc|^ms|^df|^ro|^go|^sc|^rs|^ac|^to[0-9]+')]],
      company: ['', [Validators.required]],
      department: ['', [Validators.required]],
      uf: ['', [Validators.required]],
      status: ['', [Validators.required]],
      typeUser: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
    },
      {
        validator: customValidation.passwordsMatch
      }
    )
    this.newUserValidateForm.valueChanges.subscribe(data => this.onNewRegValidateFormValueChange(data))
  }

  private onNewRegValidateFormValueChange(data: any) {
    this.model.name = data.name
    this.model.userId = data.userId
    this.model.company = data.company
    this.model.department = data.department
    this.model.uf = data.uf
    this.model.email = data.email
    this.model.typeUser = data.typeUser
    this.model.status = data.status
    this.model.password = data.password
  }

  userFocus() {
    this.userIdField.focus();
  }

  mailFocus() {
    this.emailField.focus()
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


  onSubmit(): void {
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
      (err: any) => err.status === 401 ? this.router.navigateByUrl('/home-admin/users') : this.notification.error(err)
    )
  }

  private onBack() {
    this.router.navigate(['/home-admin/users'])
  }

  cancel(): void {
    this.router.navigate(['/home-admin/users'])
  }

}
