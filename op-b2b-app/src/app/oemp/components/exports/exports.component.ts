import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { PoCheckboxGroupOption, PoModalAction, PoModalComponent, PoNotificationService, PoDialogService, PoDatepickerComponent, PoDatepickerRangeComponent } from '@po-ui/ng-components';

import { OempService } from '../dashboard/services/oemp.service';
import { ExportBaseService } from 'src/app/services/exportBase.service';

@Component({
  selector: 'app-exports',
  templateUrl: './exports.component.html',
  styleUrls: ['./exports.component.css']
})
export class ExportsComponent implements OnInit {

  statusOptions: Array<PoCheckboxGroupOption> = this.service.getExportStatusOptions()
  options: any
  openedOrders: any
  selectedDates: any
  startDate: any
  active!: boolean
  helpText: any
  validateDate!: boolean
  showErrorDate!: string
  tabLabel!: string
  closedOrdersByPeriod: any


  @ViewChild(PoModalComponent, { static: true }) poModal!: PoModalComponent
  @ViewChild(PoDatepickerRangeComponent, { static: true }) poDatePicker!: PoDatepickerRangeComponent

  confirm: PoModalAction = {
    action: () => {
      this.proccessExport()
    },
    label: 'Exportar',
    disabled: true

  }

  close: PoModalAction = {
    action: () => {
      this.poModal.close()
      this.router.navigate(['/home/oemp'])
    },
    label: 'Fechar',
    danger: true
  }

  constructor(
    private service: OempService,
    private router: Router,
    private notification: PoNotificationService,
    private exportBaseService: ExportBaseService,
    private poDialog: PoDialogService
  ) { }

  ngOnInit(): void {
    this.poModal.open()
    this.active = true
    this.tabLabel = 'Em Andamento'
    this.confirm.disabled = true
    for (let property in this.options) {
      this.options[property] = false
    }

    // Object.assign(this.selectedDates, {start:"", end: new Date()} )
    // moment(this.selectedDates).format('YYYY-MM-DD')
  }

  OnChangeOptions(e: any) {
    let counter = 0
    for (let property in this.options) {
      if (this.options[property] === true) {
        counter = 1
      }
      if (property !== 'todos' && e.todos === true) {
        this.options[property] = false
      }
    }
    if (counter > 0) {
      this.confirm.disabled = false
    } else this.confirm.disabled = true
  }


  private proccessExport() {
    if (this.tabLabel === 'Em Andamento') {
      this.exportOpenedToExcel()
    } else {
      this.exportClosedToXlsx()
    }
  }

  onChangeDates() {
    this.validateDate = false
    this.showErrorDate = ""
    const start = new Date(this.selectedDates.start)
    const end = new Date(this.selectedDates.end)
    const dateRange = (end.getTime() - start.getTime()) / (1000 * 3600 * 24)
    if ((this.selectedDates.start !== "" && this.selectedDates.end !== "") &&
      (dateRange > 90)) {
      this.validateDate = true
      this.showErrorDate = ""
      this.showErrorDate = "! Por favor Informe um intervalo inferior ou igual a 90 dias."
      return
    }
    if ((this.selectedDates.start === "" && this.selectedDates.end === "") ||
      (this.selectedDates.start !== "" && this.selectedDates.end === "") ||
      (this.selectedDates.start === "" && this.selectedDates.end !== "") ||
      (this.selectedDates.start !== "" && this.selectedDates.end !== "" && start > end)) {
      this.confirm.disabled = true
    } else if (this.selectedDates.start !== "" && this.selectedDates.end !== "" && (new Date(this.selectedDates.end) > (new Date()))) {
      this.validateDate = true
      this.showErrorDate = ""
      this.showErrorDate = "! Intervalo superior a data atual."
      this.confirm.disabled = true
    } else this.confirm.disabled = false


  }

  onclickTab(e: any) {
    this.tabLabel = e.label
    if (e.label === "Em Andamento") {
      this.confirm.disabled = true
      for (let property in this.options) {
        this.options[property] = false
      }
    } else {
      this.confirm.disabled = true
      this.selectedDates = undefined
      this.validateDate = false
      this.showErrorDate = ""
    }
  }

  private exportClosedToXlsx(): void {
    try {
      this.service.getClosedByDate(this.selectedDates).subscribe(
        (result: any) => {
          if (result.length !== 0) {
            this.closedOrdersByPeriod = result
            this.exportBaseService.exportAsExcelFile(this.closedOrdersByPeriod, 'fechadas')
          } else {
            this.focusDatePicker()
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

  private exportOpenedToExcel(): void {
    let filter: any = []
    for (let property in this.options) {
      if (this.options[property] === true) {
        filter.push(property)
      }
    }

    this.confirm.loading = true
    try {
      this.service.exportBase(filter).subscribe(
        (result: any) => {
          this.openedOrders = result
          this.exportBaseService.exportAsExcelFile(this.openedOrders, 'abertas')
          this.confirm.loading = false
        }
      ), (error: any) => this.notification.error(error)
    } catch (error) {
      this.notification.error(error)
    }
  }

  private focusDatePicker() {
    this.poDatePicker.focus()
  }

}


