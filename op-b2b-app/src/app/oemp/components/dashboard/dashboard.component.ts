import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { PoDialogService, PoModalAction, PoModalComponent, PoMultiselectOption, PoNotificationService, PoSelectOption, PoTableAction, PoTableColumn, PoTableComponent } from '@po-ui/ng-components';
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

  oempcompanyOptions: Array<any> = this.service.getOempCompanyOptions()

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

  customLiterals: PoPageDynamicSearchLiterals = {
    searchPlaceholder: 'Pesquisa por circuito'
  }

  private statusFilterOptions: Array<PoMultiselectOption> = []

  private respOptions: Array<PoMultiselectOption> = []

  private AdvSearchOempCompanyOptions: Array<PoMultiselectOption> = []

  private AdvSearchManagementOptions: Array<PoMultiselectOption> = []

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
              case 'new':
                this.newCounter = item.count
                break
              case 'execution':
                this.executionCounter = item.count
                break
              case 'completed':
                this.completedCounter = item.count
                break
            }
          })
          this.totalCounter = this.temporaryCounter

        }
      ), (error: any) => this.notification.error(error)

      status = 'completedCounter'
      this.service.filterByStatus(status, this.page++).subscribe(
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
    this.openModal()
    this.service.filterById(order._id).subscribe(
      (result: any) => {
        this.editItems = result
        if (this.editItems.status === 'completed') {
          this.isReadOnly = true
          this.confirm.disabled = true
        } else {
          this.isReadOnly = false
          this.confirm.disabled = false
        }

      }

    ), (error: any) => this.notification.error(error)
  }

  onShowMore() {
    this.isLoading = true
    this.showMoreDisabled = false
    setTimeout(() => {
      this.page++
      this.loadServiceOrders(this.page)
      this.isLoading = false
    }, 1000)

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
    this.loading = !this.loading
    try {
      this.service.advancedSearchFilter(filters).subscribe(
        (result: any) => {
          this.items = result
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
    filter ? this.quickSearchItems(filter) : this.resetFilters(this.page++)
  }

  private quickSearchItems(filter: any) {
    this.loading = !this.loading
    try {
      this.service.quickSearchFilter(filter).subscribe(
        (result: any) => {
          this.items = result
          this.loading = !this.loading
        }), (error: any) => this.notification.error(error)
    } catch (error) {
      this.notification.error(error)
    }
  }

  private resetFilters(page: number) {
    this.loading = !this.loading
    this.service.loadAllByPage(page).subscribe(
      (result: any) => {
        this.items = result.items
        this.loading = !this.loading
      }), (error: any) => this.notification.error(error)
  }

  delivPredCalc() {
    if (this.editItems.contractDate !== null && this.editItems.contractDate !== undefined &&
      this.editItems.oempDeadLine !== null && this.editItems.oempDeadLine !== undefined) {
      let dateConvert = moment(this.editItems.contractDate).add(this.editItems.oempDeadLine, 'days').toDate()
      this.editItems.deliveryPrediction = dateConvert
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
      case 'new':
        this.statusFoco()
        this.poDialog.alert({
          literals: { ok: 'Ok' },
          title: 'Aviso de Campos Obrigatórios',
          message: 'Para salvar a edição realizada, é necessário informar status atual.'
        })

        return
      case 'execution':
        if ((this.editItems.installationFee === '' || this.editItems.installationFee === undefined || this.editItems.installationFee === null) ||
          (this.editItems.monthlyPayment === '' || this.editItems.monthlyPayment === undefined || this.editItems.monthlyPayment === null) ||
          (this.editItems.contractDate === '' || this.editItems.contractDate === undefined || this.editItems.contractDate === null) ||
          (this.editItems.feasibilityCode === '' || this.editItems.feasibilityCode === undefined || this.editItems.feasibilityCode === null)) {
          this.dateFoco()
          this.poDialog.alert({
            literals: { ok: 'Ok' },
            title: 'Aviso de Campos Obrigatórios',
            message: 'Para status "Em Execução", é necessário informar os seguintes campos: data de contratação, taxa de instalação, taxa mensal e código de viabilidade.'
          })
          return
        }
        break
      case 'completed':
        if ((this.editItems.oempDesignation === '' || this.editItems.oempDesignation === undefined || this.editItems.oempDesignation === null) ||
          (this.editItems.installationFee === '' || this.editItems.installationFee === undefined || this.editItems.installationFee === null) ||
          (this.editItems.monthlyPayment === '' || this.editItems.monthlyPayment === undefined || this.editItems.monthlyPayment === null) ||
          (this.editItems.contractDate === '' || this.editItems.contractDate === undefined || this.editItems.contractDate === null) ||
          (this.editItems.oempCompany === '' || this.editItems.oempCompany === undefined || this.editItems.oempCompany === null) ||
          (this.editItems.installationDate === '' || this.editItems.installationDate === undefined || this.editItems.installationDate === null) ||
          (this.editItems.contractTime === '' || this.editItems.contractTime === undefined || this.editItems.contractTime === null)) {
          this.dateFoco()
          this.poDialog.alert({
            literals: { ok: 'Ok' },
            title: 'Aviso de Campos Obrigatórios',
            message: 'Para status "Concluído", é necessário informar os seguintes campos: data de contratação, data instalação, taxa instalação, taxa mensal, tempo contrato, operadora e designação operadora.'
          })
          return
        }
        break

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
    if (this.editItems.status === 'execution') {
      while ((this.editItems.installationFee === '' || this.editItems.installationFee === undefined) ||
        (this.editItems.monthlyPayment === '' || this.editItems.monthlyPayment === undefined) ||
        (this.editItems.contractDate === '' || this.editItems.contractDate === undefined) ||
        (this.editItems.feasibilityCode === '' || this.editItems.feasibilityCode === undefined)) {
        this.confirm.disabled = true
      }
      this.confirm.disabled = false
    }
  }
  openModal() {
    this.poModal.open()



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
    return {
      filters: [
        { property: 'status', label: 'Status', options: this.statusFilterOptions, gridColumns: 6, optionsMulti: true },
        { property: 'protocolo', label: 'Protocolo', gridColumns: 6 },
        { property: 'accountable', label: 'Responsável', options: this.respOptions, gridColumns: 6, optionsMulti: true },
        { property: 'oempCompany', label: 'Operadora', options: this.AdvSearchOempCompanyOptions, gridColumns: 6, optionsMulti: true },
        { property: 'management', label: 'Gestão', options: this.AdvSearchManagementOptions, gridColumns: 6, optionsMulti: true },

      ]
    }
  }

  installationFeeMask() {
    let value = this.editItems.installationFee
    value = value + ''
    value = parseInt(value.replace(/[\D]+/g, ''))
    value = value + ''
    value = value.replace(/([0-9]{2})$/g, ",$1")

    if (value.length > 6) {
      value = value.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2")
    }

    this.editItems.installationFee = value
    if (value == 'NaN') this.editItems.installationFee = ''
  }

  monthlyPaymentMask() {
    let value = this.editItems.monthlyPayment
    value = value + ''
    value = parseInt(value.replace(/[\D]+/g, ''))
    value = value + ''
    value = value.replace(/([0-9]{2})$/g, ",$1")

    if (value.length > 6) {
      value = value.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2")
    }

    this.editItems.monthlyPayment = value
    if (value == 'NaN') this.editItems.monthlyPayment = ''
  }

  onChangeOempCompany(e: any) {
    const searchOemp = this.service.getOempOempCompanyOptions().find((companyName, index, array) => companyName.value === e)
    const searchInter = this.service.getIntercompanyOempCompanyOptions().find((companyName, index, array) => companyName.value === e)
    const searchUN = this.service.getUNOempCompanyOptions().find((companyName, index, array) => companyName.value === e)
    const searchNA = this.service.getNAOempCompanyOptions().find((companyName, index, array) => companyName.value === e)
    if (searchOemp) {
      this.editItems.management = 'OEMP'
    } else if (searchInter) {
      this.editItems.management = 'Intercompany'
    } else if (searchUN) {
      this.editItems.management = 'UN'
    } else if (searchNA) {
      this.editItems.management = 'NA'
    }
    else {
      this.editItems.management = undefined
      this.editItems.oempCompany = undefined
      this.oempcompanyOptions = this.service.getOempCompanyOptions()
      this.managementOptions = this.service.getManagementOptions()
    }
  }


  onChangeManagement(e: any) {
    if (e === 'OEMP') {
      this.accountableOptions = this.service.getOempAccountableOptions()
      this.oempcompanyOptions = this.service.getOempOempCompanyOptions()
    } else if (e === 'Intercompany') {
      this.accountableOptions = this.service.getIntercompanyAccountableOptions()
      this.oempcompanyOptions = this.service.getIntercompanyOempCompanyOptions()
    } else if (e === 'UN') {
      this.accountableOptions = this.service.getUnAccountableOptions()
      this.oempcompanyOptions = this.service.getUNOempCompanyOptions()
    } else if (e === 'NA') {
      this.oempcompanyOptions = this.service.getNAOempCompanyOptions()
    }
    else {
      this.editItems.oempCompany = undefined
      this.editItems.management = undefined
      this.editItems.accountable = undefined
      this.accountableOptions = this.service.getAccountableOptions()

    }

  }

}
