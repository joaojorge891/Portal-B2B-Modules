import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PoDialogService, PoNotificationService } from '@po-ui/ng-components';
import { PoPageChangePassword, PoPageChangePasswordComponent, PoPageChangePasswordRequirement } from '@po-ui/ng-templates';
import * as moment from 'moment';

import { UsersService } from 'src/app/users/services/users.service';
import { AccessValidate } from 'src/app/globals/accessvalidate';

@Component({
  selector: 'app-reset-pwd',
  templateUrl: './reset-pwd.component.html',
  styleUrls: ['./reset-pwd.component.css']
})
export class ResetPwdComponent extends AccessValidate implements OnInit {

  id!: any
  requester: string = ''
  requirements: Array<PoPageChangePasswordRequirement> =
    [
      {
        requirement: 'A senha deve conter oito caracteres.',
        status: true
      }
    ]

  @ViewChild(PoPageChangePasswordComponent, { static: true }) changePassword!: PoPageChangePasswordComponent



  constructor(
    private service: UsersService,
    private route: ActivatedRoute,
    private poDialog: PoDialogService,
    private notification: PoNotificationService,
    private router: Router
  ) {
    super()
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    const token = this.route.snapshot.paramMap.get('token')



    const currentTime = moment().valueOf()

    if (currentTime > Number(token)) {
      this.notification.error('Link de Recuperação de senha expirado. Por favor, gere novo link.')
      this.router.navigate(['portal'])
    }
  }

  onSubmit(formData: PoPageChangePassword) {
    this.requester = 'resetPwdByUser'
    this.service.changePwd(this.id, formData.newPassword, this.requester).subscribe(
      (result: any) => {
        if (result.status === 'ok') {
          this.notification.success('Usuário atualizado com sucesso!');

        }
      },
      (err: any) => this.notification.error(err)
    )
    this.poDialog.alert({
      title: 'Dados da Nova Autenticação',
      message: JSON.stringify(formData),
      ok: () => this.changePassword.openConfirmation()
    });
  }

}
