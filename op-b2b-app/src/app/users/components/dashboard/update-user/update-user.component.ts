import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PoNotificationService, PoPageAction } from '@po-ui/ng-components';
import { Md5 } from 'ts-md5';

import { UsersService } from 'src/app/users/services/users.service';
import { AccessValidate } from 'src/app/globals/accessvalidate';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent extends AccessValidate implements OnInit {

  user: any = {}

  confirmPassword: string = ''

  currentPwd: string = ''

  requester: string = ''


  actions: Array<PoPageAction> = [
    { label: 'Salvar', icon: 'save', action: this.onUpdate.bind(this) },
    { label: 'Voltar', action: this.onBack.bind(this) }
  ]

  constructor(
    private router: Router,
    private service: UsersService,
    private notification: PoNotificationService,
    private route: ActivatedRoute
  ) {
    super()


  }

  ngOnInit(): void {
    // if (this.validateUser() === 'user') {
    //   this.router.navigateByUrl('')
    // }


    const id = this.route.snapshot.paramMap.get('id')
    this.service.filterById(id).subscribe(user => {
      this.user = user
      this.currentPwd = this.user.password
      this.confirmPassword = this.user.password
    })
  }

  private onUpdate() {
    if (this.user.password !== this.confirmPassword) {
      this.notification.warning('As senhas não conferem.')
      this.confirmPassword = ''

      return
    }

    if (this.user.status) {
      this.user.status = 'active'
    } else {
      this.user.status = 'inactive'
    }

    if (this.currentPwd !== this.user.password) {
      this.user.password = Md5.hashStr(this.user.password)
    }


    this.user.requester = 'updateByAdmin'

    this.service.save(this.user).subscribe(
      (result: any) => {
        if (result.status === 'ok') {
          this.notification.success('Usuário atualizado com sucesso!')
          this.onBack()
        }
      },
      (err: any) => this.notification.error(err)
    )
  }

  private onBack() {
    this.router.navigate(['/home-admin/users'])
  }

}
