import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PoNotificationService, PoPageAction, PoDialogService } from '@po-ui/ng-components';

import { UsersService } from 'src/app/users/services/users.service';

@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.css']
})
export class ValidateComponent implements OnInit {

  user: any = {}

  requester: string = ''

  maxLength: number = 0

  isDisabled: boolean = true

  actions: Array<PoPageAction> = [
    { label: 'Enviar', icon: 'save', action: this.onValidate.bind(this) },
    { label: 'Cancelar', action: this.onCancel.bind(this) }
  ]


  constructor(
    private router: Router,
    private service: UsersService,
    private notification: PoNotificationService,
    private route: ActivatedRoute,
    private poDialog: PoDialogService
  ) {

  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')
    try {
      this.service.filterByIdNoValidate(id).subscribe(user => {
        this.user = user
        if (this.user.status !== 'pending'){
          this.poDialog.alert({
            title:'Aviso',
            message:'Usuário já foi avaliado!',
            ok: () => this.router.navigate(['portal'])
          })
          return
        }
      }), (error: any) => this.notification.error(error)
    } catch (error: any) {
      this.notification.error(error)
    }
    
  }

  onChooseValidate(): void {

    if (this.user.validate === 'inactive') {
      this.isDisabled = false
    }
    else {
      this.user.rejectReason = ''
      this.isDisabled = true
    }
  }

  private onValidate() {

    switch (this.user.validate) {
      case 'active':
        this.user.requester = 'validateUser'
        this.user.status = 'active'
        this.service.saveNoValidateUser(this.user).subscribe(
          (result: any) => {
            if (result.status === 'ok') {
              this.notification.success('Usuário liberado com sucesso!')
              this.onCancel()
            }
          },
          (err: any) => this.notification.error(err)
        )
        break
      case 'inactive':
        this.user.requester = 'validateUser'
        this.user.status = 'inactive'
        if (this.user.rejectReason != '' && this.user.rejectReason != null && this.user.rejectReason != undefined) {
          this.service.saveNoValidateUser(this.user).subscribe(
            (result: any) => {
              if (result.status === 'ok') {
                this.notification.warning('Solicitação rejeitada. Enviado e-mail ao usuário para aviso.')
                this.onCancel()
              }
            },
            (err: any) => this.notification.error(err)
          )
        } else {
          this.notification.error('Para rejeitar solicitação, o campo justificativa deve ser preenchido.')
        }
        break
      case null || undefined:
        this.notification.error('Por favor, informe se deseja validar ou não a solicitação.')
    }

  }

  private onCancel() {
    this.router.navigate(['portal'])
  }


}
