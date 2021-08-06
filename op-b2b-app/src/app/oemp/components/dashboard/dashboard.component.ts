import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { PoDialogService, PoModalAction, PoModalComponent, PoMultiselectOption, PoNotificationService, PoRadioGroupOption, PoTableAction, PoTableColumn, PoTableComponent, PoTableRowTemplateArrowDirection } from '@po-ui/ng-components';
import { PoPageDynamicSearchLiterals, PoPageDynamicSearchOptions } from '@po-ui/ng-templates';
import * as moment from 'moment';

import { ExcelService } from 'src/app/services/excel-export.service';
import { OempService } from 'src/app/services/oemp.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  items: Array<any> = []

  editItems: any = {}

  page: number = 0

  
  isLoading: boolean = false
  
  showMoreDisabled: boolean = false
  
  executionCounter: string = '0'
  
  newCounter: string = '0'
  
  totalCounter: number = 0

  completedCounter: string = '0'
  
  maxColumns: number = 0
  
  loading: boolean = false
  
  lastUpdate!: Date
  
  lastUpdateCompleted!: Date
  
  isReadOnly: any
  
  exportAllOrders: any
  
  temporaryCounter = 0
  
  AdvSearchMark: boolean = false
  
  AdvSearchFilterContent: any

  rowDirection: PoTableRowTemplateArrowDirection = PoTableRowTemplateArrowDirection.Right
  
  oempCompanyOptions: Array<any> = this.service.getOempCompanyOptions()

  statusOptions: Array<any> = this.service.getStatusOptions()
  
  oempDeadLineOptions: Array<any> = this.service.getOempDeadLineOptions()

  contractTimeOptions: Array<any> = this.service.getContractTimeOptions()

  accountableOptions: Array<any> = this.service.getAccountableOptions()

  managementOptions: Array<any> = this.service.getManagementOptions()

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

  customLiterals: PoPageDynamicSearchLiterals = {
    searchPlaceholder: 'Pesquisa por circuito'
  }

  private statusFilterOptions: Array<PoMultiselectOption> = []

  private respOptions: Array<PoMultiselectOption> = []

  private AdvSearchOempCompanyOptions: Array<PoMultiselectOption> = []

  private AdvSearchManagementOptions: Array<PoMultiselectOption> = []

  private AdvClientOptions: any

  private AdvSearchGrossOptions: Array<PoRadioGroupOption> = [{ label: 'Sim', value: 'SIM' }, { label: 'Não', value: 'NAO' }]

  private subscriptions$: Array<Subscription> = []

  columns: Array<PoTableColumn> = this.service.getColumns()

  actions: Array<PoTableAction> = [
    { action: this.onForm.bind(this), icon: 'po-icon-edit', label: '' }
  ]


  @ViewChild(PoModalComponent, { static: true }) poModal!: PoModalComponent
  @ViewChild(PoTableComponent, { static: true }) poTable!: PoTableComponent
  @ViewChild('date') dateFocus!: HTMLElement
  @ViewChild('status') statusFocus!: HTMLElement
  // @ViewChild('TABLE') table!: ElementRef;

  // @ViewChild('optionsForm', { static: true }) form!: NgForm

  constructor(
    private service: OempService,
    private router: Router,
    private notification: PoNotificationService,
    private excelService: ExcelService,
    private poDialog: PoDialogService


  ) { }




  ngOnInit() {
    // if (this.validateUser() === 'user') {
    //   this.router.navigateByUrl('')
    // }
    this.loading = !this.loading
    try {

      this.service.filter().subscribe(
        (result: any) => {
          this.lastUpdate = (result.items[0].lastUpdate)
          this.items = result.items
          this.loading = !this.loading

        }
      ), (error: any) => this.notification.error(error)
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

  exportToXlsx(): void {
    try {
      this.service.getOpenOrdersToExport().subscribe(
        (result: any) => {
          this.exportAllOrders = result
          this.excelService.exportAsExcelFile(this.exportAllOrders, 'abertas')

        }
      ), (error: any) => this.notification.error(error)
    } catch (error) {
      this.notification.error(error)
    }
  }


  private onForm(order: any) {
    this.restore()
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

  private restore() {
    this.editItems.status = undefined
    this.editItems.observacao_Status = undefined
    this.editItems.data_Contratacao = undefined
    this.editItems.prazo_Operadora = undefined
    this.editItems.previsao_Entrga = undefined
    this.editItems.data_Instalacao = undefined
    this.editItems.taxa_Instalacao = undefined
    this.editItems.taxa_Mensal = undefined
    this.editItems.tempo_Contrato = undefined
    this.editItems.codigo_Viabilidade = undefined
    this.editItems.designacao_Oemp = undefined
    this.editItems.responsavel = undefined
    this.editItems.gestao = undefined

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

  onChangeDisclaimers(disclaimers: []) {
    const filter: any = {}
    disclaimers.forEach((item: any) => {
      filter[item.property] = item.value
    })
    disclaimers.length ? this.advancedSearchItems(filter) : this.resetFilters(this.page++)

  }

  onQuickSearch(filter: string) {
    filter ? this.quickSearchItems({ circuito: filter }) : this.resetFilters(this.page++)
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
      case 'novo':
        if (this.editItems.operadora_Oemp !== 'Sem Atuação OEMP') {
          this.statusFoco()
          this.poDialog.alert({
            literals: { ok: 'Ok' },
            title: 'Aviso de Campos Obrigatórios',
            message: 'Para salvar a edição realizada, é necessário informar status atual.'
          })
          return
        }
        break
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
    this.router.navigate(['/oemp/new-orders'])
  }

  openExec() {
    this.router.navigate(['/oemp/exec-orders'])
  }

  openCompleted() {
    this.router.navigate(['/oemp/completed-orders'])
  }

  closeModal() {
    this.poModal.close()
    this.ngOnInit()
  }




  loadSearchOptions(): PoPageDynamicSearchOptions {
    this.statusFilterOptions = this.service.getStatus()
    this.respOptions = this.service.getAccountableOptions()
    this.AdvSearchOempCompanyOptions = this.service.getOempCompanyOptions()
    this.AdvSearchManagementOptions = this.service.getManagementOptions()
    this.AdvClientOptions = `${this.service.host}/api/oemp/getClient`

    return {
      filters: [
        { property: 'conglomerado', label: 'Cliente (Conglomerado)', optionsService: this.AdvClientOptions, gridColumns: 7, fieldLabel: 'conglomerado', fieldValue: 'conglomerado', order: 1 },
        { property: 'protocolo', label: 'Protocolo', gridColumns: 5, order: 2 },
        { property: 'status', label: 'Status', options: this.statusFilterOptions, gridColumns: 5, optionsMulti: true, order: 3 },
        { property: 'operadora_Oemp', label: 'Operadora', options: this.AdvSearchOempCompanyOptions, gridColumns: 6, optionsMulti: true, order: 5 },
        { property: 'pove', label: 'GROSS', options: this.AdvSearchGrossOptions, gridColumns: 5, order: 7 },
        { property: 'responsavel', label: 'Responsável', options: this.respOptions, gridColumns: 7, optionsMulti: true, order: 4 },
        { property: 'gestao', label: 'Gestão', options: this.AdvSearchManagementOptions, gridColumns: 6, optionsMulti: true, order: 6 },




      ]
    }
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

  onChangeOempCompany(e: any) {
    const searchOemp = this.service.getOempOempCompanyOptions().find((companyName, index, array) => companyName.value === e)
    const searchInter = this.service.getIntercompanyOempCompanyOptions().find((companyName, index, array) => companyName.value === e)
    const searchUN = this.service.getUNOempCompanyOptions().find((companyName, index, array) => companyName.value === e)
    const searchNA = this.service.getNAOempCompanyOptions().find((companyName, index, array) => companyName.value === e)
    if (searchOemp) {
      this.editItems.gestao = 'OEMP'
    } else if (searchInter) {
      this.editItems.gestao = 'Intercompany'
    } else if (searchUN) {
      this.editItems.gestao = 'UN'
    } else if (searchNA) {
      this.editItems.gestao = 'NA'
    }
    else if (e === 'Sem Atuação OEMP') {
      this.editItems.operadora_Oemp = e
      this.editItems.status = 'concluído'

    } else {
      this.editItems.gestao = undefined
      this.editItems.operadora_Oemp = undefined
      this.oempCompanyOptions = this.service.getOempCompanyOptions()
      this.managementOptions = this.service.getManagementOptions()
    }
  }


  onChangeManagement(e: any) {
    if (e === 'OEMP') {
      this.accountableOptions = this.service.getOempAccountableOptions()
      this.oempCompanyOptions = this.service.getOempOempCompanyOptions()
    } else if (e === 'Intercompany') {
      this.accountableOptions = this.service.getIntercompanyAccountableOptions()
      this.oempCompanyOptions = this.service.getIntercompanyOempCompanyOptions()
    } else if (e === 'UN') {
      this.accountableOptions = this.service.getUnAccountableOptions()
      this.oempCompanyOptions = this.service.getUNOempCompanyOptions()
    } else if (e === 'NA') {
      this.oempCompanyOptions = this.service.getNAOempCompanyOptions()
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
