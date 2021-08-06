import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { PoDatepickerRange, PoDatepickerRangeComponent, PoNotificationService, PoPageAction, PoTableColumn, PoDialogService } from '@po-ui/ng-components';

import { ExcelService } from 'src/app/services/excel-export.service';
import { OempService } from 'src/app/services/oemp.service';

@Component({
  selector: 'app-completed-orders',
  templateUrl: './completed-orders.component.html',
  styleUrls: ['./completed-orders.component.css']
})
export class CompletedOrdersComponent implements OnInit {
  dates: any = {}

  items: Array<any> = []

  page: number = 0

  isLoading: boolean = false

  loading: boolean = false

  showMoreDisabled: boolean = false

  closedOrdersByPeriod: any

  formDateToExport!: FormGroup



  private subscriptions$: Array<Subscription> = []



  columns: Array<PoTableColumn> = [
    { property: 'TempoVida', label: 'Tempo Vida' },
    { property: 'circuito', label: 'Circuito' },
    { property: 'geo', label: 'Regional' },
    { property: 'uf', label: 'UF' },
    { property: 'servico', label: 'Serviço' },
    { property: 'pove', label: 'Gross' },
    { property: 'operadora_Oemp', label: 'Operadora' },
    { property: 'designacao_Oemp', label: 'Desig. Operadora' },

  ]


  actionsPage: Array<PoPageAction> = [
    { label: 'Voltar', action: this.onBack.bind(this) }
  ]

  @ViewChild(PoDatepickerRangeComponent, { static: true }) poDatePicker!: PoDatepickerRangeComponent


  datepickerRange!: PoDatepickerRange

  constructor(
    private notification: PoNotificationService,
    private router: Router,
    private service: OempService,
    private excelService: ExcelService,
    private formBuilder: FormBuilder,
    private poDialog: PoDialogService


  ) { }

  get validateForm() {

    return !(
      this.formDateToExport.valid &&
      this.formDateToExport.get('datepickerRange')!.value.start &&
      this.formDateToExport.get('datepickerRange')!.value.end
    )
  }

  ngOnInit(): void {
    this.formDateToExport = this.formBuilder.group({
      datepickerRange: [undefined, Validators.required],

    })

    this.loading = !this.loading
    try {

      let status = 'concluído'
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

  onShowMore() {
    this.isLoading = true
    this.showMoreDisabled = false
    setTimeout(() => {
      this.page++
      this.loadNewServiceOrders(this.page, 'concluído')
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

  exportClosedToXlsx(): void {

    try {
      this.service.getClosedByDate(this.dates).subscribe(
        (result: any) => {
          if (result !== null && result !== undefined && result.length !== 0) {
            this.closedOrdersByPeriod = result
            this.excelService.exportAsExcelFile(this.closedOrdersByPeriod, 'fechadas')
          } else {
            this.poDatePicker.focus()
            this.poDialog.alert({
              literals: { ok: 'Ok' },
              title: 'Resultado da Busca',
              message: 'Não há ordens encerradas entre as datas informadas!'
            })
          }
        }
      ), (error: any) => this.notification.error(error)
    } catch (error) {
      this.notification.error(error)
    }
  }

  onChangeDate(dates: any) {
    this.dates = dates

  }

}
