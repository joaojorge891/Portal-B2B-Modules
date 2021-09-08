import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { PoModalComponent, PoModalAction, PoNotificationService, PoEmailComponent } from '@po-ui/ng-components';

import { UsersService } from 'src/app/users/services/users.service';


@Component({
  selector: 'app-pwd-recovery',
  templateUrl: './pwd-recovery.component.html',
  styleUrls: ['./pwd-recovery.component.css']
})
export class PwdRecoveryComponent implements OnInit {

  pwdRecoveryForm!: FormGroup

  email: any

  isDisable: boolean = true

  submit: PoModalAction = {

    action: () => {
      this.onSubmit()
    },
    label: 'Enviar',
    disabled: this.isDisable,
    loading: false
  }

  cancel: PoModalAction = {
    action: () => {
      this.onClosepoModal()
    },
    label: 'Cancelar',
  }

  resend: PoModalAction = {

    action: () => {
      this.onSubmitResend()
    },
    label: 'Reenviar',
    loading: false
  }

  closeResend: PoModalAction = {
    action: () => {
      this.onCloseEmailSent()
    },
    label: 'Fechar',
  }


  @ViewChild(PoModalComponent, { static: true }) poModal!: PoModalComponent
  @ViewChild(PoEmailComponent, { static: true }) poEmail!: PoEmailComponent
  @ViewChild('emailSent') poModalEmailSent!: PoModalComponent

  constructor(
    private service: UsersService,
    private notification: PoNotificationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.pwdRecoveryForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],

    })

    this.pwdRecoveryForm.valueChanges.subscribe((data: any) => this.onPwdRecoveryFormValueChange(data))

    this.poModal.open()
  }

  private onSubmit() {
    this.checkAndSendEmail()
  }

  private onPwdRecoveryFormValueChange(data: any) {
    this.email = data.email
  }

  private checkAndSendEmail() {
    if (this.email != '' && this.email !== undefined) {
      this.submit.loading = true
      try {
        this.service.mailValidate(this.email).subscribe(
          (result: any) => {
            if (result.exist === false) {
              this.notification.error('E-mail não localizado na base de dados. Por favor, informe outro e-mail válido.')
              this.email = ''
              this.mailFocus()
              this.submit.loading = false
              return
            } else {
              this.sendPwdRecovery()
            }
          },
          (err: any) => this.notification.error(err)
        )
      } catch (error: any) {
        this.notification.error(error)
      }
    }
  }

  private onSubmitResend() {
    this.sendPwdRecovery()
  }

  private sendPwdRecovery() {
    this.submit.loading = true
    this.resend.loading = true
    try {
      this.service.pwdRecovery(this.email).subscribe(
        (result: any) => {
          this.submit.loading = false
          this.resend.loading = false
          if (result.status === "ok") {
            this.poModalEmailSent.open()
            
          } else {
            this.notification.error('Erro ao enviar e-mail de reset. Contate o administrador: LD-PORTALB2BBR@oi.net.br')
            return
          }
        },
        (err: any) => this.notification.error(err))
    } catch (error: any) {
      this.notification.error(error)
    }
  }

  private mailFocus() {
    this.poEmail.focus()
  }

  onChangeModel() {
    if (this.pwdRecoveryForm.valid === true) {
      this.submit.disabled = false
    } else this.submit.disabled = true
  }

  private onCloseEmailSent() {
    this.poModalEmailSent.close()
    this.router.navigate(['portal'])
  }

  private onClosepoModal() {
    this.poModal.close()
    this.router.navigate(['portal'])
  }

}
