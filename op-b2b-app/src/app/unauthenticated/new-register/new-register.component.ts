import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


import { PoEmailComponent, PoInputComponent, PoNotificationService } from '@po-ui/ng-components';
import { Md5 } from 'ts-md5';

import { UsersService } from 'src/app/users/services/users.service';
import { customValidation } from '../../users/passwordValidator';


@Component({
  selector: 'app-new-register',
  templateUrl: './new-register.component.html',
  styleUrls: ['./new-register.component.css']
})
export class NewRegisterComponent implements OnInit {

  newRegValidateForm!: FormGroup

  model: any = {}

  maxLengthTextArea: number = 200

  maxLengthInputMatricula = 8

  requester: string = ''

  inputUserErrorPattern: string = 'Informe o login de rede com 8 dígitos em letra minúscula (Ex: oixxxxxx, trxxxxxx)'

  inputMailErrorPattern: string = 'Por favor informe um e-mail válido'

  inputPwdErrorPattern: string = 'A senha deve conter oito caracteres'

  inputConfirmPwdErrorPattern = 'As senhas não conferem'



  @ViewChild('user') userField!: PoInputComponent
  @ViewChild('mail') mailField!: PoEmailComponent

  constructor(
    private notification: PoNotificationService,
    private service: UsersService,
    private router: Router,
    private formBuilder: FormBuilder,

  ) { }

  ngOnInit(): void {
    this.newRegValidateForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      userId: ['', [Validators.required, Validators.pattern('^oi|^tr|^bt|^cr|^pr|^mt|^tc|^ms|^df|^ro|^go|^sc|^rs|^ac|^to[0-9]+')]],
      company: ['', [Validators.required]],
      department: ['', [Validators.required]],
      uf: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      reason: ['', [Validators.required, Validators.maxLength(200)]],
    },
      {
        validator: customValidation.passwordsMatch
      }
    )
    this.newRegValidateForm.valueChanges.subscribe((data: any) => this.onNewRegValidateFormValueChange(data))

  }

  private onNewRegValidateFormValueChange(data: any) {
    this.model.name = data.name
    this.model.userId = data.userId
    this.model.company = data.company
    this.model.department = data.department
    this.model.uf = data.uf
    this.model.email = data.email
    this.model.password = data.password
    this.model.reason = data.reason
  }

  userFocus(): void {
    this.userField.focus();
  }

  mailFocus(): void {
    this.mailField.focus()
  }

  verifyEmail(): void {
    if (this.model.email != '') {

      this.service.mailValidate(this.model.email).subscribe(
        (result: any) => {
          if (result.exist) {
            this.notification.error('E-mail já existe. Por favor, informe outro e-mail válido.')
            this.model.email = ''
            this.newRegValidateForm.get('email')?.setValue('')
            this.mailFocus()


          }
        },
        (err: any) => this.notification.error(err)
      )
    }
  }

  userVerify(): void {
    if (this.model.userId != '') {
      this.service.userValidate(this.model.userId).subscribe(
        (result: any) => {
          if (result != '' && result != null && result != undefined) {
            this.notification.error('Matrícula já existe. Por favor, informe outra matrícula válida.')
            this.model.userId = ''
            this.newRegValidateForm.get('userId')?.setValue('')
            this.userFocus()

          }
        },
        (err: any) => this.notification.error(err)
      )
    }
  }

  onSubmit(): void {

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

  cancel(): void {
    this.router.navigate(['portal'])
  }

  private onBack(): void {
    this.router.navigate(['portal']);
  }

}
