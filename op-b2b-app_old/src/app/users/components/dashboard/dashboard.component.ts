import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { PoDisclaimer, PoPageAction, PoTableAction, PoTableColumn, PoDialogService, PoNotificationService } from '@po-ui/ng-components';
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

  loading: boolean = false

  quickSearchValue: any

  tableHeight: number = 370

  filters: Array<PoDisclaimer> = []

  customLiterals: PoPageDynamicSearchLiterals = {
    searchPlaceholder: 'Pesquisa por matrícula'
  }

  private subscriptions$: Array<Subscription> = []

  columns: Array<PoTableColumn> = this.service.getColumns()

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
    private notification: PoNotificationService,
    private poDialog: PoDialogService
  ) {
    super()
  }

  ngOnInit() {
    // if (this.validateUser() === 'user') {
    //   this.router.navigateByUrl('')
    // }
    this.loading = !this.loading
    try {
      this.service.filter().subscribe(
        (result: any) => {
          this.items = result.items
          this.loading = !this.loading
        }
      ), (error: any) => this.notification.error(error)
    } catch (error: any) {
      this.router.navigateByUrl('home-admin')
    }
  }


  private onFormPage() {

    this.router.navigate(['home-admin/users/new'])
  }

  private onForm(users: any) {
    this.router.navigateByUrl(`home-admin/users/update/${users._id}`)
  }

  private onDelete(item: any) {
    this.poDialog.confirm({
      title: 'Aviso',
      message: 'Confirma remoção do usuário?',
      confirm: () => this.removeUser(item),
    })

  }

  private removeUser(item: any): void {
    const index = this.items.findIndex(elem => elem._id === item._id)
    this.loading = !this.loading
    this.service.delete(item._id).subscribe(result => {
      this.items.splice(index, 1)
      this.loading = !this.loading
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
      this.loadUsers(this.page)
      this.isLoading = false
    }, 1000)

  }

  private loadUsers(page: number) {
    this.subscriptions$.push(this.service.find(page).subscribe(
      result => this.items = this.items.concat(result.items)
    ))
  }

  onQuickSearch(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      if (this.quickSearchValue) {
        this.filters = []
        this.filters.push({ label: 'Pesquisa rápida: ' + this.quickSearchValue, value: this.quickSearchValue })
      } else {
        this.filters = []
        this.tableHeight = 370
      }
    }
  }

  onChangeDisclaimers(disclaimers: []) {
    disclaimers.length ? this.searchItems({ userId: this.quickSearchValue }) : this.resetFilters()
  }

  private searchItems(filter: any) {
    this.tableHeight = 300
    this.loading = !this.loading
    try {
      this.service.quickSearchFilter(filter).subscribe(
        (result: any) => {
          this.items = result
          this.loading = !this.loading
        }), (error: any) => this.notification.error(error)
    } catch (error: any) {
      this.notification.error(error)
     }

  }

  private resetFilters() {
    this.quickSearchValue = undefined
    this.tableHeight = 370
    this.loading = !this.loading
    this.service.resetFilterSearch().subscribe(
      (result: any) => {
        this.items = result.items
        this.loading = !this.loading
      }), (error: any) => this.notification.error(error)
  }
}


