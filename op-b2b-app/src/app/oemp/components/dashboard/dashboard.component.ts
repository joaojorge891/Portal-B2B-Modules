import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import {
  PoDialogService, PoDisclaimer, PoDynamicFormField, PoModalAction,
  PoModalComponent, PoMultiselectOption, PoNotificationService, PoRadioGroupOption,
  PoTableAction, PoTableComponent, PoTableRowTemplateArrowDirection
} from '@po-ui/ng-components';
import { PoPageDynamicSearchLiterals } from '@po-ui/ng-templates';
import * as moment from 'moment';


import { OempService } from 'src/app/oemp/components/dashboard/services/oemp.service';
import { NgForm } from '@angular/forms';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  fieldsInitValues = {}

  items: Array<any> = []

  editItems: any = []

  quickSearchValue: any

  page: number = 0

  tableHeight: number = 320

  isLoading: boolean = false

  showMoreDisabled: boolean = false

  executionCounter: any

  newCounter: any

  totalCounter: any

  completedCounter: any

  loading: boolean = false

  lastUpdate!: Date

  lastUpdateCompleted!: Date

  isReadOnly: any

  temporaryCounter = 0

  AdvSearchMark: boolean = false

  AdvSearchFilterContent: any

  AdvSearchDynamicForm!: NgForm

  getAdvFilters: any

  rowDirection: PoTableRowTemplateArrowDirection = PoTableRowTemplateArrowDirection.Right

  oempCompanyOptions: Array<any> = this.service.getOempCompanyOptions()

  statusOptions: Array<any> = this.service.getStatusOptions()

  oempDeadLineOptions: Array<any> = this.service.getOempDeadLineOptions()

  contractTimeOptions: Array<any> = this.service.getContractTimeOptions()

  accountableOptions: Array<any> = this.service.getAccountableOptions()

  managementOptions: Array<any> = this.service.getManagementOptions()

  filters: Array<PoDisclaimer> = []

  confirm: PoModalAction = {
    action: () => {
      this.proccessOrder()
    },
    label: 'Confirmar'

  }

  close: PoModalAction = {
    action: () => {
      this.closeModal()
    },
    label: 'Fechar',
    danger: true
  }

  advSearchApply: PoModalAction = {
    action: () => {
      this.applyFilters()
    },
    label: 'Aplicar Filtros'
  }

  advSearchCancel: PoModalAction = {
    action: () => {
      this.closeSearchModal()
    },
    label: 'Cancelar',
    danger: true

  }

  customLiterals: PoPageDynamicSearchLiterals = {
    searchPlaceholder: 'Pesquisa por circuito'
  }


  private statusFilterOptions: Array<PoMultiselectOption> = this.service.getStatusOptions()

  private respOptions: Array<PoMultiselectOption> = this.service.getAccountableOptions()

  private AdvSearchOempCompanyOptions: Array<PoMultiselectOption> = this.service.getOempCompanyOptions()

  private AdvSearchManagementOptions: Array<PoMultiselectOption> = this.service.getManagementOptions()

  private AdvSearchRegionalOptions: Array<PoMultiselectOption> = this.service.getRegionalOptions()

  private AdvSearchUFOptions: Array<PoMultiselectOption> = this.service.getUFOptions()

  private AdvClientOptions: string = `${this.service.host}/api/oemp/getClient`

  private AdvSearchGrossOptions: Array<PoRadioGroupOption> = [{ label: 'Sim', value: 'SIM' }, { label: 'Não', value: 'NAO' }]


  innerWidth: any

  private subscriptions$: Array<Subscription> = []

  columns = this.service.getColumns()

  actions: Array<PoTableAction> = [
    { action: this.onForm.bind(this), icon: 'po-icon-edit', label: '' }
  ]

  advSearchFields: Array<PoDynamicFormField> = [
    { property: 'conglomerado', divider: 'Busca Avançada', label: 'Cliente (Conglomerado)', optionsService: this.AdvClientOptions, gridColumns: 7, fieldLabel: 'conglomerado', fieldValue: 'conglomerado', order: 1 },
    { property: 'protocolo', label: 'Protocolo', gridColumns: 5, order: 2 },
    { property: 'status', label: 'Status', options: this.statusFilterOptions, gridColumns: 5, optionsMulti: true, order: 3 },
    { property: 'operadora_Oemp', label: 'Operadora', options: this.AdvSearchOempCompanyOptions, gridColumns: 6, optionsMulti: true, order: 5 },
    { property: 'pove', label: 'GROSS', options: this.AdvSearchGrossOptions, gridColumns: 5, order: 9 },
    { property: 'responsavel', label: 'Responsável', options: this.respOptions, gridColumns: 7, optionsMulti: true, order: 4 },
    { property: 'gestao', label: 'Gestão', options: this.AdvSearchManagementOptions, gridColumns: 6, optionsMulti: true, order: 6 },
    { property: 'geo', label: 'Regional', options: this.AdvSearchRegionalOptions, gridColumns: 3, optionsMulti: true, order: 7 },
    { property: 'uf', label: 'UF', options: this.AdvSearchUFOptions, gridColumns: 3, optionsMulti: true, order: 8 },
  ]

  @ViewChild(PoModalComponent, { static: true }) poModal!: PoModalComponent
  @ViewChild('searchModal') poAdvSearchModal!: PoModalComponent
  @ViewChild(PoTableComponent, { static: true }) poTable!: PoTableComponent
  @ViewChild('date') dateFocus!: HTMLElement
  @ViewChild('status') statusFocus!: HTMLElement

  constructor(
    private service: OempService,
    private router: Router,
    private notification: PoNotificationService,
    private poDialog: PoDialogService


  ) { }



  @HostListener('window:resize', ['$event'])

  onResize(event: any) {
    this.innerWidth = event.target.innerWidth
    this.responsiveTable()

  }

  public responsiveTable() {
    if (this.innerWidth <= 1366 && this.innerWidth >= 1260) {
      for (let property in this.columns) {

      }
      this.columns[0].width = '70px'
      this.columns[1].width = '80px'
      this.columns[2].width = '80px'
      this.columns[2].visible = false
      this.columns[3].width = '50px'
      this.columns[4].width = '100px'
      this.columns[5].width = '100px'
      this.columns[6].width = '190px'
      this.columns[7].width = '65px'
      this.columns[8].width = '75px'
      this.columns[8].visible = false
      this.columns[9].width = '70px'
      this.columns[10].width = '80px'
      this.columns[11].width = '110px'
      this.columns[12].width = '130px'
      this.columns[12].visible = false
      this.columns[13].width = '120px'
    }
    if (this.innerWidth >= 1024 && this.innerWidth < 1260) {
      this.columns[0].width = '70px'
      this.columns[0].visible = false
      this.columns[1].width = '80px'
      this.columns[2].width = '80px'
      this.columns[2].visible = false
      this.columns[3].width = '50px'
      this.columns[4].width = '100px'
      this.columns[5].width = '100px'
      this.columns[6].width = '190px'
      this.columns[7].width = '65px'
      this.columns[7].visible = false
      this.columns[8].width = '75px'
      this.columns[8].visible = false
      this.columns[9].width = '70px'
      this.columns[9].visible = false
      this.columns[10].width = '80px'
      this.columns[11].width = '110px'
      this.columns[12].width = '130px'
      this.columns[12].visible = false
      this.columns[13].width = '120px'
      this.columns[13].visible = false
    }

  }

  ngOnInit() {
    // if (this.validateUser() === 'user') {
    //   this.router.navigateByUrl('')
    // }
    this.innerWidth = window.innerWidth

    this.responsiveTable()

    this.loading = !this.loading

    this.updateCounters()

    try {

      this.service.filter().subscribe(
        (result: any) => {
          this.lastUpdate = (result.items[0].lastUpdate)
          this.items = result.items
          this.loading = !this.loading
        }
      ), (error: any) => this.notification.error(error)

      status = 'completedCounter'
      this.service.filterByStatus(status, this.page).subscribe(
        (result: any) => {
          this.lastUpdateCompleted = (result.completedLastUpdate)
        }

      ), (error: any) => this.notification.error(error)
    } catch (error) {
      this.notification.error(error)

    }


  }

  updateCounters() {
    //this.temporaryCounter = 0
    this.service.getCounters().subscribe(
      (result: Array<any>) => {
        result.forEach(item => {
          this.temporaryCounter += item.count
          switch (item._id) {
            case 'novo':
              this.newCounter = item.count
              break
            case 'execução':
              this.executionCounter = item.count
              break
            case 'concluído':
              this.completedCounter = item.count
              break
          }
        })
        this.totalCounter = this.temporaryCounter

      }
    ), (error: any) => this.notification.error(error)
  }

  onShowMore() {
    if (this.AdvSearchMark) {
      this.isLoading = true
      this.showMoreDisabled = false
      setTimeout(() => {
        this.AdvSearchFilterContent.page = this.AdvSearchFilterContent.page + 1
        this.loadAdvSearchOrders(this.AdvSearchFilterContent)
        this.isLoading = false
      }, 1000)

    } else {
      this.isLoading = true
      this.showMoreDisabled = false
      setTimeout(() => {
        this.page++
        this.loadServiceOrders(this.page)
        this.isLoading = false
      }, 1000)
    }
  }

  private loadAdvSearchOrders(filters: any) {
    this.subscriptions$.push(this.service.advancedSearchFilter(filters).subscribe(
      result => this.items = this.items.concat(result.items)
    ))
  }

  private loadServiceOrders(page: number) {
    this.subscriptions$.push(this.service.loadAllByPage(page).subscribe(
      result => this.items = this.items.concat(result.items)
    ))
  }

  onAdvancedSearch(filter: any) {
    filter ? this.advancedSearchItems(filter) : this.resetFilters(this.page++)
  }


  private advancedSearchItems(filters: any) {
    this.page = 0
    filters.page = this.page
    this.AdvSearchMark = true
    this.AdvSearchFilterContent = filters
    this.loading = !this.loading
    try {
      this.service.advancedSearchFilter(filters).subscribe(
        (result: any) => {
          this.items = result.items
          this.loading = !this.loading
        }), (error: any) => this.notification.error(error)

    } catch (error) {
      this.notification.error(error)
    }


  }

  onQuickSearch(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      if (this.quickSearchValue) {
        this.filters = []
        this.filters.push({ label: 'Pesquisa rápida: ' + this.quickSearchValue, value: this.quickSearchValue })
      } else {
        this.filters = []
      }
    }
  }


  onChangeDisclaimers(disclaimers: []) {
    if (disclaimers.length) {
      this.tableHeight = 220
      if (this.filters[0].label?.charAt(0) == 'P' && this.filters[0].label.charAt(1) == 'e' &&
        this.filters[0].label?.charAt(2) == 's' && this.filters[0].label?.charAt(3) == 'q') {
        this.quickSearchItems({ circuito: this.quickSearchValue })
      } else {
        const filter: any = {}
        disclaimers.forEach((item: any) => {
          filter[item.property] = item.value
        })
        this.advancedSearchItems(filter)
      }
    } else {
      this.tableHeight = 320
      this.resetFilters(this.page)
    }
  }

  openModalAdvSearch() {
    this.fieldsInitValues = {
      conglomerado: undefined,
      protocolo: undefined,
      status: undefined,
      operadora_Oemp: undefined,
      pove: undefined,
      responsavel: undefined,
      gestao: undefined,
      geo: undefined,
      uf: undefined
    }
    this.poAdvSearchModal.open()

  }

  getForm(form: NgForm) {
    this.AdvSearchDynamicForm = form
    this.AdvSearchDynamicForm.control.valueChanges.subscribe(values => this.getAdvFilters = values)
  }

  applyFilters() {
    this.filters = []
    let values = this.getAdvFilters
    for (let key in values) {
      if (values[key]) {
        this.filters.push({ label: key + ': ' + values[key], property: key, value: values[key] })
      }
    }
    this.closeSearchModal()
  }

  closeSearchModal() {
    this.poAdvSearchModal.close()

  }

  private quickSearchItems(filters: any) {
    this.loading = !this.loading
    try {
      this.service.quickSearchFilter(filters).subscribe(
        (result: any) => {
          this.items = result
          this.loading = !this.loading
        }
      ), (error: any) => this.notification.error(error)

    } catch (error) {
      this.notification.error(error)
    }

  }

  private resetFilters(page: number) {
    this.AdvSearchMark = false
    this.loading = !this.loading
    this.service.loadAllByPage(page).subscribe(
      (result: any) => {
        this.items = result.items
        this.loading = !this.loading
      }), (error: any) => this.notification.error(error)

  }


  delivPredCalc() {
    if (this.editItems.data_Contratacao !== null && this.editItems.data_Contratacao !== undefined &&
      this.editItems.prazo_Operadora !== null && this.editItems.prazo_Operadora !== undefined) {
      let dateConvert = moment(this.editItems.data_Contratacao).add(this.editItems.prazo_Operadora, 'days').toDate()
      this.editItems.previsao_Entrega = dateConvert

    }
  }


  dateFoco() {
    this.dateFocus.focus()
  }

  statusFoco() {
    this.statusFocus.focus()
  }


  confirmOrderWithoutActing() {
    this.service.save(this.editItems).subscribe(
      (result: any) => {
        if (result.status === 'ok') {
          this.confirm.loading = true
          setTimeout(() => {
            this.notification.success('Ordem atualizada com sucesso!')
            this.confirm.loading = false
            this.closeModal()

          }, 700)

        }
      },
      (err: any) => this.notification.error(err)


    )
  }

  private onUpdate(item: any) {
    const index = this.items.findIndex((elem: any) => elem._id === item._id)
    this.service.save(item).subscribe(result => {
      if (result.status === 'ok') {
        this.confirm.loading = true
        this.items.splice(index, 1, item)
        this.getCounters()
        setTimeout(() => {
          this.notification.success('Ordem atualizada com sucesso!')
          this.confirm.loading = false
          this.closeModal()

        }, 700)

      }

    },
      (error) => {
        this.notification.error(error)
      })
  }

  private proccessOrder() {

    switch (this.editItems.status) {
      case undefined:
        this.statusFoco()
        this.poDialog.alert({
          literals: { ok: 'Ok' },
          title: 'Aviso de Campos Obrigatórios',
          message: 'Para salvar a edição realizada, é necessário informar status atual.'
        })
        return
      case null:
        this.statusFoco()
        this.poDialog.alert({
          literals: { ok: 'Ok' },
          title: 'Aviso de Campos Obrigatórios',
          message: 'Para salvar a edição realizada, é necessário informar status atual.'
        })
        return
      case '':
        this.statusFoco()
        this.poDialog.alert({
          literals: { ok: 'Ok' },
          title: 'Aviso de Campos Obrigatórios',
          message: 'Para salvar a edição realizada, é necessário informar status atual.'
        })
        return
      // case 'novo':
      //   if (this.editItems.operadora_Oemp !== 'Sem Atuação OEMP') {
      //     this.statusFoco()
      //     this.poDialog.alert({
      //       literals: { ok: 'Ok' },
      //       title: 'Aviso de Campos Obrigatórios',
      //       message: 'Para salvar a edição realizada, é necessário informar status atual.'
      //     })
      //     return
      //   }
      //   break
      case 'execução':
        if ((this.editItems.taxa_Instalacao === '' || this.editItems.taxa_Instalacao === undefined || this.editItems.taxa_Instalacao === null) ||
          (this.editItems.taxa_Mensal === '' || this.editItems.taxa_Mensal === undefined || this.editItems.taxa_Mensal === null) ||
          (this.editItems.data_Contratacao === '' || this.editItems.data_Contratacao === undefined || this.editItems.data_Contratacao === null) ||
          (this.editItems.codigo_Viabilidade === '' || this.editItems.codigo_Viabilidade === undefined || this.editItems.codigo_Viabilidade === null) ||
          (this.editItems.operadora_Oemp === '' || this.editItems.operadora_Oemp === undefined || this.editItems.operadoraOemp === null) ||
          (this.editItems.responsavel == '' || this.editItems.responsavel === undefined || this.editItems.responsavel === null)) {
          this.dateFoco()
          this.poDialog.alert({
            literals: { ok: 'Ok' },
            title: 'Aviso de Campos Obrigatórios',
            message: 'Para status "Em Execução", é necessário informar os seguintes campos: data de contratação, taxa de instalação, taxa mensal, código de viabilidade, operadora e responsável.'
          })
          return
        }
        break
      case 'concluído':
        if (this.editItems.operadora_Oemp !== 'Sem Atuação OEMP') {
          if ((this.editItems.designacao_Oemp === '' || this.editItems.designacao_Oemp === undefined || this.editItems.designacao_Oemp === null) ||
            (this.editItems.taxa_Instalacao === '' || this.editItems.taxa_Instalacao === undefined || this.editItems.taxa_Instalacao === null) ||
            (this.editItems.taxa_Mensal === '' || this.editItems.taxa_Mensal === undefined || this.editItems.taxa_Mensal === null) ||
            (this.editItems.data_Contratacao === '' || this.editItems.data_Contratacao === undefined || this.editItems.data_Contratacao === null) ||
            (this.editItems.operadora_Oemp === '' || this.editItems.operadora_Oemp === undefined || this.editItems.operadora_Oemp === null) ||
            (this.editItems.data_Instalacao === '' || this.editItems.data_Instalacao === undefined || this.editItems.data_Instalacao === null) ||
            (this.editItems.tempo_Contrato === '' || this.editItems.tempo_Contrato === undefined || this.editItems.tempo_Contrato === null) ||
            (this.editItems.operadora_Oemp === '' || this.editItems.operadora_Oemp === undefined || this.editItems.operadora_Oemp === null)) {
            this.dateFoco()
            this.poDialog.alert({
              literals: { ok: 'Ok' },
              title: 'Aviso de Campos Obrigatórios',
              message: 'Para status "Concluído", é necessário informar os seguintes campos: data de contratação, data instalação, taxa instalação, taxa mensal, tempo contrato, operadora e designação operadora.'
            })
            return
          }
        } else {
          this.poDialog.confirm({
            literals: { cancel: 'Cancelar', confirm: 'Confirmar' },
            title: 'Aviso',
            message: 'Ao prosseguir com envio, a ordem será tramitada para status "concluído", sem possibilidade de reedição. Deseja confirmar?',
            confirm: () => this.confirmOrderWithoutActing(),

          })
          return

        } break

    }

    this.onUpdate(this.editItems)

  }

  private onForm(order: any) {
    this.service.filterById(order._id).subscribe(
      (result: any) => {
        this.editItems = result
        this.openModal()
        if (this.editItems.status === 'concluído') {
          this.isReadOnly = true
          this.confirm.disabled = true
        } else {
          this.isReadOnly = false
          this.confirm.disabled = false
        }

      }

    ), (error: any) => this.notification.error(error)
  }

  openModal() {
    this.poModal.open()
  }

  private getCounters() {
    this.temporaryCounter = 0
    this.service.getCounters().subscribe(
      (result: Array<any>) => {
        result.forEach(item => {
          this.temporaryCounter += item.count
          switch (item._id) {
            case 'novo':
              this.newCounter = item.count
              break
            case 'execução':
              this.executionCounter = item.count
              break
            case 'concluído':
              this.completedCounter = item.count
              break
          }
        })
        this.totalCounter = this.temporaryCounter

      }
    ), (error: any) => this.notification.error(error)
  }

  closeModal() {
    this.poModal.close()
    this.editItems = []
  }


  isDisable() {
    if (this.editItems.status === 'execução') {
      while ((this.editItems.taxa_Instalacao === '' || this.editItems.taxa_Instalacao === undefined) ||
        (this.editItems.taxa_Mensal === '' || this.editItems.taxa_Mensal === undefined) ||
        (this.editItems.data_Contratacao === '' || this.editItems.data_Contratacao === undefined) ||
        (this.editItems.codigo_Viabilidade === '' || this.editItems.codigo_Viabilidade === undefined)) {
        this.confirm.disabled = true
      }
      this.confirm.disabled = false
    }
  }



  openNew() {
    this.router.navigate(['home/oemp/new-orders'])
  }

  openExec() {
    this.router.navigate(['home/oemp/exec-orders'])
  }

  openCompleted() {
    this.router.navigate(['home/oemp/completed-orders'])
  }

  installationFeeMask() {
    let value = this.editItems.taxa_Instalacao
    value = value + ''
    value = parseInt(value.replace(/[\D]+/g, ''))
    value = value + ''
    value = value.replace(/([0-9]{2})$/g, ",$1")

    if (value.length > 6) {
      value = value.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2")
    }

    this.editItems.taxa_Instalacao = value
    if (value == 'NaN') this.editItems.taxa_Instalacao = ''
  }

  monthlyPaymentMask() {
    let value = this.editItems.taxa_Mensal
    value = value + ''
    value = parseInt(value.replace(/[\D]+/g, ''))
    value = value + ''
    value = value.replace(/([0-9]{2})$/g, ",$1")

    if (value.length > 6) {
      value = value.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2")
    }

    this.editItems.taxa_Mensal = value
    if (value == 'NaN') this.editItems.taxa_Mensal = ''
  }

  onChangeOempCompany(event: any) {
    const searchOemp = this.service.getOempOempCompanyOptions().find((companyName, index, array) => companyName.value == event)
    const searchInter = this.service.getIntercompanyOempCompanyOptions().find((companyName, index, array) => companyName.value == event)
    const searchUN = this.service.getUNOempCompanyOptions().find((companyName, index, array) => companyName.value == event)
    const searchNA = this.service.getNAOempCompanyOptions().find((companyName, index, array) => companyName.value == event)
    if (searchOemp) {
      this.editItems.gestao = 'OEMP'
    } else if (searchInter) {
      this.editItems.gestao = 'Intercompany'
    } else if (searchUN) {
      this.editItems.gestao = 'UN'
    } else if (searchNA) {
      this.editItems.gestao = 'NA'
    }
    else if (event === 'Sem atuação OEMP') {
      this.editItems.operadora_Oemp = event
      this.editItems.status = 'concluído'

    } else {
      this.editItems.gestao = undefined
      this.editItems.operadora_Oemp = undefined
      this.oempCompanyOptions = this.service.getOempCompanyOptions()
      this.managementOptions = this.service.getManagementOptions()
    }
  }


  onChangeManagement(e: any) {
    if (e == 'OEMP') {
      this.accountableOptions = this.service.getOempAccountableOptions()
      this.oempCompanyOptions = this.service.getOempOempCompanyOptions()
    } else if (e == 'Intercompany') {
      this.accountableOptions = this.service.getIntercompanyAccountableOptions()
      this.oempCompanyOptions = this.service.getIntercompanyOempCompanyOptions()
      this.editItems.status = 'NA'
    } else if (e == 'UN') {
      this.accountableOptions = this.service.getUnAccountableOptions()
      this.oempCompanyOptions = this.service.getUNOempCompanyOptions()
      this.editItems.status = 'NA'
    } else if (e == 'NA') {
      this.oempCompanyOptions = this.service.getNAOempCompanyOptions()
      this.editItems.status = 'NA'
    }
    else {
      this.editItems.operadora_Oemp = undefined
      this.editItems.gestao = undefined
      this.editItems.responsavel = undefined
      this.accountableOptions = this.service.getAccountableOptions()
      this.oempCompanyOptions = this.service.getOempCompanyOptions()
      this.managementOptions = this.service.getManagementOptions()
    }

  }

}
