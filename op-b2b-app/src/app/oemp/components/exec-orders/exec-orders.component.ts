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

  private subscriptions$: Array<Subscription> = []

  columns: Array<PoTableColumn> = [
    { property: 'TempoVida', label: 'T. Vida', width: '70px' },
      { property: 'TempoPosto', label: 'T. Posto', width: '80px' },
      { property: 'geo', label: 'Regional', width: '80px' },
      { property: 'uf', label: 'UF', width: '50px' },
      { property: 'circuito', label: 'Circuito', width: '100px' },
      { property: 'protocolo', label: 'Protocolo', width: '110px' },
      { property: 'NomedoCliente', label: 'Cliente', width: '170px' },
      { property: 'pove', label: 'Gross', width: '65px' },
      { property: 'servico', label: 'Serviço', width: '75px', visible: false },
      { property: 'gestao', label: 'Gestão', width: '80px' },
      { property: 'operadora_Oemp', label: 'Operadora', width: '100px' },
      { property: 'data_Contratacao', label: 'Data Contratação', type: 'date', format: 'dd/MM/yyyy', width: '130px', visible: false },
      { property: 'previsao_Entrega', label: 'Prev. Entrega', type: 'date', format: 'dd/MM/yyyy', width: '120px' }
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

      let status = 'execução'
      this.service.filterByStatus(status, this.page).subscribe(
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
    this.restore()
    this.service.filterById(order._id).subscribe(
      (result: any) => {
        this.editItems = result
        this.openModal()
      }

    ), (error: any) => this.notification.error(error)

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

  openModal() {
    this.poModal.open()
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
        } else break

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
    if (this.editItems.data_Contratacao !== null && this.editItems.data_Contratacao !== undefined &&
      this.editItems.prazo_Operadora !== null && this.editItems.prazo_Operadora !== undefined) {
      let dateConvert = moment(this.editItems.data_Contratacao).add(this.editItems.prazo_Operadora, 'days').toDate()
      this.editItems.previsao_Entrega = dateConvert
    }
  }


  onShowMore() {
    this.isLoading = true
    this.showMoreDisabled = false
    setTimeout(() => {
      this.page++
      this.loadNewServiceOrders(this.page, 'execução')
      this.isLoading = false
    }, 1000)

  }

  private loadNewServiceOrders(page: number, status: string) {
    this.subscriptions$.push(this.service.loadOrdersByStatus(page, status).subscribe(
      result => this.items = this.items.concat(result.items)
    ))
  }

  onBack() {
    this.router.navigate(['/oemp'])
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

    }

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



}
