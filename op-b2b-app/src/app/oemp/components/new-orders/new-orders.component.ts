import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { PoDialogService, PoModalAction, PoModalComponent, PoNotificationService, PoPageAction, PoSelectComponent, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import * as moment from 'moment';

import { OempService } from 'src/app/oemp/services/oemp.service';

@Component({
  selector: 'app-new-orders',
  templateUrl: './new-orders.component.html',
  styleUrls: ['./new-orders.component.css']
})
export class NewOrdersComponent implements OnInit {

  @Output() execCounter!: any

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
    { property: 'TempoVida', label: 'Tempo Vida', width: '8%' },
    { property: 'TempoPosto', label: 'Tempo Posto', width: '8%' },
    { property: 'geo', label: 'Regional', width: '8%' },
    { property: 'uf', label: 'UF', width: '5%' },
    { property: 'circuito', label: 'Circuito', width: '8%' },
    { property: 'protocolo', label: 'Protocolo', width: '9%' },
    { property: 'NomedoCliente', label: 'Cliente' },
    { property: 'servico', label: 'Serviço', width: '8%' },
    { property: 'pove', label: 'Gross', width: '6%' },
    { property: 'gestao', label: 'Gestão', width: '6%' },

  ]


  actionsPage: Array<PoPageAction> = [
    { label: 'Voltar', action: this.onBack.bind(this) }
  ]


  @ViewChild(PoModalComponent, { static: true }) poModal!: PoModalComponent
  @ViewChild('date') dateFocus!: HTMLElement
  @ViewChild(PoSelectComponent) statusFocus!: PoSelectComponent

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

      let status = 'novo'
      this.service.filterByStatus(status, this.page).subscribe(
        (results: any) => {
          this.items = results.items
          this.loading = !this.loading
        }
      ), (error: any) => this.notification.error(error)

    } catch (error: any) {
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
        this.statusFoco()
        this.poDialog.alert({
          literals: { ok: 'Ok' },
          title: 'Aviso de Campos Obrigatórios',
          message: 'Para salvar a edição realizada, é necessário informar status atual.'
        })

        return
      case 'execução':
        if ((this.editItems.taxa_Instalacao === '' || this.editItems.taxa_Instalacao === undefined || this.editItems.taxa_Instalacao === null) ||
          (this.editItems.taxa_Mensal === '' || this.editItems.taxa_Mensal === undefined || this.editItems.taxa_Mensal === null) ||
          (this.editItems.data_Contratacao === '' || this.editItems.data_Contratacao === undefined || this.editItems.data_Contratacao === null) ||
          (this.editItems.codigo_Viabilidade === '' || this.editItems.codigo_Viabilidade === undefined || this.editItems.codigo_Viabilidade === null)) {
          this.dateFoco()
          this.poDialog.alert({
            literals: { ok: 'Ok' },
            title: 'Aviso de Campos Obrigatórios',
            message: 'Para status "Em Execução", é necessário informar os seguintes campos: data de contratação, taxa de instalação, taxa mensal e código de viabilidade.'
          })
          return
        }
        break
      case 'concluido':
        if ((this.editItems.designacao_Oemp === '' || this.editItems.designacao_Oemp === undefined || this.editItems.designacao_Oemp === null) ||
          (this.editItems.taxa_Instalacao === '' || this.editItems.taxa_Instalacao === undefined || this.editItems.taxa_Instalacao === null) ||
          (this.editItems.taxa_Mensal === '' || this.editItems.taxa_Mensal === undefined || this.editItems.taxa_Mensal === null) ||
          (this.editItems.data_Contratacao === '' || this.editItems.data_Contratacao === undefined || this.editItems.data_Contratacao === null) ||
          (this.editItems.operadora_Oemp === '' || this.editItems.operadora_Oemp === undefined || this.editItems.operadora_Oemp === null) ||
          (this.editItems.data_Instalacao === '' || this.editItems.data_Instalacao === undefined || this.editItems.data_Instalacao === null) ||
          (this.editItems.tempo_Contrato === '' || this.editItems.tempo_Contrato === undefined || this.editItems.tempo_Contrato === null)) {
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
    this.onUpdate(this.editItems)
  }



  private onUpdate(item: any) {
    const index = this.items.findIndex((elem: any) => elem._id === item._id)
    this.service.save(item).subscribe(result => {
      if (result.status === 'ok') {
        this.confirm.loading = true
        this.items.splice(index, 1)
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


  closeModal() {
    this.poModal.close()
    this.editItems = []

  }

  openModal() {
    this.poModal.open()
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
      this.loadNewServiceOrders(this.page, 'novo')
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
    this.editItems.observacao_Status = ''
    this.editItems.data_Contratacao = ''
    this.editItems.prazo_Operadora = ''
    this.editItems.previsao_Entrega = ''
    this.editItems.previsao_Atual = ''
    this.editItems.data_Instalacao = ''
    this.editItems.taxa_Instalacao = ''
  }

  onBack() {
    this.router.navigate(['/home/oemp'])
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
      this.editItems.status = 'concluido'

    } else {
      this.editItems.gestao = undefined
      this.editItems.operadora_Oemp = undefined
      this.oempCompanyOptions = this.service.getOempCompanyOptions()
      this.managementOptions = this.service.getManagementOptions()
    }
  }

}
