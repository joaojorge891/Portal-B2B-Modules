import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PoDialogService, PoModalAction, PoModalComponent, PoNotificationService, PoPageAction, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { OempService } from 'src/app/services/oemp.service';

@Component({
  selector: 'app-exec-orders',
  templateUrl: './exec-orders.component.html',
  styleUrls: ['./exec-orders.component.css']
})
export class ExecOrdersComponent implements OnInit {

  items: Array<any> = []

  page: number = 0

  isLoading: boolean = false

  loading: boolean = false

  showMoreDisabled: boolean = false

  editItems: any = {}

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

  oempCompanyOptions: Array<any> = [

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
    { label: 'Velox R2', value: 'Velox R2' },
    { label: 'Vivax', value: 'Vivax' },
    { label: 'Vivo', value: 'Vivo' },
    { label: 'Vogel', value: 'Vogel' },
    { label: 'WCS Telecom', value: 'WCS Telecom' },
    { label: 'WKVE', value: 'WKVE' },
    { label: 'WT Telecom', value: 'WT Telecom' }

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

  private subscriptions$: Array<Subscription> = []

  columns: Array<PoTableColumn> = [
    { property: 'TempoVida', label: 'Tempo Vida' },
    { property: 'TempoPosto', label: 'Tempo Posto' },
    { property: 'geo', label: 'Regional' },
    { property: 'uf', label: 'UF' },
    { property: 'circuito', label: 'Circuito' },
    { property: 'servico', label: 'Serviço' },
    { property: 'pove', label: 'Gross' },
    { property: 'oempCompany', label: 'Operadora' },
    { property: 'oempDesignation', label: 'Desig. Operadora' },
    { property: 'contractDate', label: 'Data Contratação', type: 'date', format: 'dd/MM/yyyy' },
    { property: 'deliveryPrediction', label: 'Previsão Entrega', type: 'date', format: 'dd/MM/yyyy' }
  ]


  actionsPage: Array<PoPageAction> = [
    { label: 'Voltar', action: this.onBack.bind(this) }
  ]


  @ViewChild(PoModalComponent, { static: true }) poModal!: PoModalComponent

  @ViewChild('validate') inputValidate!: HTMLElement
  @ViewChild('date') dateFocus!: HTMLElement
  @ViewChild('status') statusFocus!: HTMLElement

  actions: Array<PoTableAction> = [
    { action: this.onForm.bind(this), icon: 'po-icon-edit', label: '' }

  ]

  constructor(
    private notification: PoNotificationService,
    private router: Router,
    private service: OempService,
    private poDialog: PoDialogService

  ) { }


  ngOnInit(): void {
    this.loading = !this.loading
    try {

      let status = 'execution'
      this.service.filterByStatus(status).subscribe(
        (results: any) => {
          this.items = results.items
          this.loading = !this.loading
        }
      ), (error: any) => this.notification.error(error)

    } catch (error) {
      this.notification.error(error)

    }


  }

  private onForm(order: any) {
    this.poModal.open()
    this.restore()
    this.service.filterById(order._id).subscribe(
      (result: any) => {
        this.editItems = result
      }

    ), (error: any) => this.notification.error(error)
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
  closeModal() {
    this.poModal.close()
    this.ngOnInit()
  }

  delivPredCalc() {
    if (this.editItems.contractDate !== null && this.editItems.contractDate !== undefined &&
      this.editItems.oempDeadLine !== null && this.editItems.oempDeadLine !== undefined) {
      let dateConvert = moment(this.editItems.contractDate).add(this.editItems.oempDeadLine, 'days').toDate()
      this.editItems.deliveryPrediction = dateConvert
    }
  }


  onShowMore() {
    this.isLoading = true
    this.showMoreDisabled = false
    setTimeout(() => {
      this.page++
      this.loadNewServiceOrders(this.page, 'new')
      this.isLoading = false
    }, 1000)

  }

  private loadNewServiceOrders(page: number, status: string) {
    this.subscriptions$.push(this.service.loadOrdersByStatus(page, status).subscribe(
      result => this.items = this.items.concat(result.items)
    ))
  }
  restore() {
    this.editItems.circuito = ''
    this.editItems.status = ''
    this.editItems.obsStatus = ''
    this.editItems.contractDate = ''
    this.editItems.oempDeadLine = ''
    this.editItems.deliveryPrediction = ''
    this.editItems.currentPrediction = ''
    this.editItems.installationDate = ''
    this.editItems.installationFee = ''
  }

  onBack() {
    this.router.navigate(['/home/oemp'])
  }

}
