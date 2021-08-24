import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { PoNotificationService, PoPageAction, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { PoPageDynamicSearchLiterals } from '@po-ui/ng-templates';

import { UsersService } from 'src/app/users/services/users.service';
import { AccessValidate } from 'src/utils/accessvalidate';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class UserDashboardComponent extends AccessValidate implements OnInit {
  items: Array<any> = []

  page: number = 0

  isLoading: boolean = false

  showMoreDisabled: boolean = false

  customLiterals: PoPageDynamicSearchLiterals = {
    searchPlaceholder: 'Pesquisa por matrícula'
  }

  private subscriptions$: Array<Subscription> = []

  columns: Array<PoTableColumn> = [
    { property: 'name', label: 'Nome' },
    { property: 'user', label: 'Matrícula' },
    { property: 'company', label: 'Empresa' },
    { property: 'department', label: 'Área' },
    { property: 'typeUser', label: 'Tipo de Usuário' },
    { property: 'uf', label: 'UF' },
    { property: 'creationDate', label: 'Data de Criação', type: 'date', format: 'dd/MM/yyyy' },
    { property: 'lastAccess', label: 'Último Acesso', type: 'date', format: 'dd/MM/yyyy hh:mm' },
    { property: 'status', label: 'Status' }
  ]

  actionsPage: Array<PoPageAction> = [
    { label: 'Novo', action: this.onFormPage.bind(this) }
  ]

  actions: Array<PoTableAction> = [
    { action: this.onForm.bind(this), icon: 'po-icon-edit', label: 'Editar' },
    { action: this.onDelete.bind(this), icon: 'po-icon-delete', label: 'Remover' }
  ]


  constructor(
    private service: UsersService,
    private router: Router,
    private notification: PoNotificationService
  ) {
    super()
  }

  ngOnInit() {
    if (this.validateUser() === 'user') {
      this.router.navigateByUrl('')
    }

    try {
      this.service.filter().subscribe(
        (result: any) => {
          this.items = result.items
        }
      ), (error: any) => this.notification.error(error)
    } catch (error) {
      this.notification.error(error)
      this.router.navigateByUrl('')
    }
  }


  private onFormPage() {

    this.router.navigateByUrl('home-admin/users/new')
  }

  private onForm(users: any) {

    this.router.navigateByUrl(`home-admin/users/update/${users._id}`)
  }

  private onDelete(item: any) {
    const index = this.items.findIndex(elem => elem._id === item._id)
    this.service.delete(item._id).subscribe(result => {
      this.items.splice(index, 1)
      this.notification.success('Usuário removido com sucesso.')

    },
      (error) => {
        this.notification.error(error)
      })
  }

  onShowMore() {
    this.isLoading = true
    this.showMoreDisabled = false
    setTimeout(() => {
      this.page++
      this.loadUsers('', this.page)
      this.isLoading = false
    }, 1000)

  }

  private loadUsers(id: string, page: number) {
    this.subscriptions$.push(this.service.find(page, id).subscribe(
      result => this.items = this.items.concat(result.items)
    ))
  }

  onQuickSearch(filter: string) {
    filter ? this.searchItems(filter) : this.resetFilters()
  }

  private searchItems(filter: any) {
    try {
      this.service.filterSearch(filter).subscribe(
        (result: any) => {
          this.items = result
        }), (error: any) => this.notification.error(error)
    } catch (error) {
      this.notification.error(error)
    }
  }

  private resetFilters() {
    this.service.resetFilterSearch().subscribe(
      (result: any) => {
        this.items = result.items
      }), (error: any) => this.notification.error(error)
  }
}


