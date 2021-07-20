import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { PoDialogService, PoModalAction, PoModalComponent, PoNotificationService, PoSelectOption, PoTableAction, PoTableColumn, PoTableComponent } from '@po-ui/ng-components';
import { PoPageDynamicSearchFilters, PoPageDynamicSearchLiterals } from '@po-ui/ng-templates';
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

  executionCounter: string = ''

  newCounter: string = ''

  totalCounter: string = ''

  completedCounter: string = ''

  maxColumns: number = 0

  loading: boolean = false

  lastUpdate!: Date

  lastUpdateCompleted!: Date

  isReadOnly: any

  exportAllOrders: any

  oempcompanyOptions: Array<any> = [
    { label: 'Algar', value: 'Algar' },
    { label: 'AltaRede', value: 'AltaRede' },
    { label: 'American Tower', value: 'American Tower' },
    { label: 'Arion', value: 'Arion' },
    { label: 'Ativa', value: 'Ativa' },
    { label: 'Avato', value: 'Avato' },
    { label: 'Brasil Telecom', value: 'Brasil Telecom' },
    { label: 'CenturyLink', value: 'CenturyLink' },
    { label: 'Claro', value: 'Claro' },
    { label: 'Conecta', value: 'Conecta' },
    { label: 'Copel', value: 'Copel' },
    { label: 'Gilat', value: 'Gilat' },
    { label: 'Hispamar', value: 'Hispamar' },
    { label: 'Hostfiber', value: 'Hostfiber' },
    { label: 'Hughes', value: 'Hughes' },
    { label: 'Internexa', value: 'Internexa' },
    { label: 'MicroTell', value: 'MicroTell' },
    { label: 'Mob Telecom', value: 'Mob Telecom' },
    { label: 'Nava', value: 'Nava' },
    { label: 'Neovia', value: 'Neovia' },
    { label: 'Net', value: 'Net' },
    { label: 'Net Turbo', value: 'Net Turbo' },
    { label: 'NetFacil', value: 'NetFacil' },
    { label: 'Oi', value: 'Oi' },
    { label: 'OnNeT', value: 'OnNeT' },
    { label: 'RIXBR27', value: 'RIXBR27' },
    { label: 'Sercomtel', value: 'Sercomtel' },
    { label: 'SpeedCast', value: 'SpeedCast' },
    { label: 'STIW', value: 'STIW' },
    { label: 'SumiCity', value: 'SumiCity' },
    { label: 'Telemar', value: 'Telemar' },
    { label: 'Telespazio', value: 'Telespazio' },
    { label: 'Telmex', value: 'Telmex' },
    { label: 'Tim', value: 'Tim' },
    { label: 'TUDDO', value: 'TUDDO' },
    { label: 'Velox R2', value: 'Velox R2' },
    { label: 'Vivax', value: 'Vivax' },
    { label: 'Vivo', value: 'Vivo' },
    { label: 'Vogel', value: 'Vogel' },
    { label: 'WCS Telecom', value: 'WCS Telecom' },
    { label: 'WKVE', value: 'WKVE' },
    { label: 'WT Telecom', value: 'WT Telecom' }
  ]

  statusOptions: Array<any> = [
    { label: 'Aguardando Assinatura', value: 'aguardando assinatura' },
    { label: 'Aprovação de OPEX', value: 'aprovação opex' },
    { label: 'Concluído', value: 'completed' },
    { label: 'Em contratação', value: 'contratação' },
    { label: 'Em estudo viabilidade', value: 'viabilidade' },
    { label: 'Em execução', value: 'execution' },
    { label: 'Falha no Acesso Terceiro', value: 'falha acesso terceiro' },
    { label: 'Pendência Cliente', value: 'pendência cliente' },
    { label: 'Pendência U.N', value: 'pendência U.N' },
    { label: 'Sem atuação OEMP', value: 'sem atuação oemp' }
  ]

  oempDeadLineOptions: Array<any> = [

    { label: '30 dias', value: 30 },
    { label: '40 dias', value: 40 },
    { label: '45 dias', value: 45 },
    { label: '50 dias', value: 50 },
    { label: '60 dias', value: 60 },
    { label: '90 dias', value: 90 },
    { label: '120 dias', value: 120 },

  ]

  contractTimeOptions: Array<any> = [

    { label: '12 meses', value: 12 },
    { label: '24 meses', value: 24 },
    { label: '36 meses', value: 36 },
    { label: '48 meses', value: 48 },
    { label: '60 meses', value: 60 },

  ]

  accountableOptions: Array<any> = [

    { label: 'Alexandre Rodrigues Pereira', value: 'oi88813' },
    { label: 'Camilo Edison Fracetti Da Silveira', value: 'oi320541' },
    { label: 'David Marques Pires', value: 'oi328091' },
    { label: 'Marcio Rodrigo Funatsu', value: 'oi309953' }

  ]

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

  private statusFilterOptions: Array<PoSelectOption> = []

  private respOptions: Array<PoSelectOption> = []

  public readonly filters: Array<PoPageDynamicSearchFilters> = [
    { property: 'status', label: 'Status', options: this.statusFilterOptions, gridColumns: 6 },
    { property: 'protocolo', label: 'Protocolo', gridColumns: 6 },
    { property: 'accountable', label: 'Responsável', options: this.respOptions, gridColumns: 6 },

  ]

  private subscriptions$: Array<Subscription> = []

  columns: Array<PoTableColumn> = [
    { property: 'TempoVida', label: 'T. Vida' },
    { property: 'TempoPosto', label: 'T. Posto' },
    { property: 'geo', label: 'Regional' }, { property: 'uf', label: 'UF' },
    { property: 'circuito', label: 'Circuito' },
    { property: 'pove', label: 'Gross' },
    { property: 'servico', label: 'Serviço' },
    {
      property: 'status',
      type: 'subtitle',
      subtitles: [
        { value: 'execution', color: 'color-11', label: 'Em execução', content: 'EXE' },
        { value: 'new', color: 'color-01', label: 'Novo', content: 'NOV' },
        { value: 'aguardando assinatura', color: 'color-02', label: 'Ag. Assinatura', content: 'AAS' },
        { value: 'aprovação opex', color: 'color-03', label: 'Aprovação de Opex', content: 'OPE' },
        { value: 'contratação', color: 'color-04', label: 'Contratação', content: 'CTR' },
        { value: 'viabilidade', color: 'color-05', label: 'Viabilidade', content: 'VAB' },
        { value: 'falha acesso terceiro', color: 'color-06', label: 'Ac Terceiro', content: 'TER' },
        { value: 'pendência cliente', color: 'color-07', label: 'Pendência Cliente', content: 'PCL' },
        { value: 'pendência U.N', color: 'color-08', label: 'Pendência U.N', content: 'PUN' },
        { value: 'sem atuação oemp', color: 'color-09', label: 'Sem atuação OEMP', content: 'SOP' },
        { value: 'completed', color: 'color-10', label: 'Concluído', content: 'OK' },
      ]
    },
    { property: 'oempCompany', label: 'Operadora' },
    { property: 'contractDate', label: 'Data Contratação', type: 'date', format: 'dd/MM/yyyy' },
    { property: 'deliveryPrediction', label: 'Prev. Entrega', type: 'date', format: 'dd/MM/yyyy' },

  ]



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
    this.statusFilterOptions = this.service.getStatus()
    this.respOptions = this.service.getResp()
    this.updateAdvancedFilters()

    this.loading = !this.loading
    try {

      this.service.filter().subscribe(
        (result: any) => {
          this.lastUpdate = (result.items[0].lastUpdate)
          this.items = result.items
          this.loading = !this.loading

        }
      ), (error: any) => this.notification.error(error)

      this.service.totalFilter().subscribe(
        (result: any) => {
          this.totalCounter = result.length

        }
      ), (error: any) => this.notification.error(error)

      let status = 'new'
      this.service.filterByStatus(status).subscribe(
        (results: any) => {
          this.newCounter = (results.items.length)
        }
      ), (error: any) => this.notification.error(error)

      status = 'execution'
      this.service.filterByStatus(status).subscribe(
        (result: any) => {
          this.executionCounter = (result.items.length).toString()

        }
      ), (error: any) => this.notification.error(error)

      status = 'completed'
      this.service.filterByStatus(status).subscribe(
        (result: any) => {
          if (result.items.length !== 0) {
            this.completedCounter = (result.items.length)
          } else this.completedCounter = '0'

        }
      ), (error: any) => this.notification.error(error)

      status = 'completedCounter'
      this.service.filterByStatus(status).subscribe(
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
      this.service.totalFilter().subscribe(
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

  private updateAdvancedFilters() {
    this.filters[0].options = this.statusFilterOptions
    this.filters[2].options = this.respOptions

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
    this.router.navigate(['/home/oemp/new-orders'])
  }

  openExec() {
    this.router.navigate(['/home/oemp/exec-orders'])
  }

  openCompleted() {
    this.router.navigate(['/home/oemp/completed-orders'])
  }

  closeModal() {
    this.poModal.close()
    this.ngOnInit()
  }


}
