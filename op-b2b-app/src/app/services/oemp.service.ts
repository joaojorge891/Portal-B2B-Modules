import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PoNotificationService } from '@po-ui/ng-components';
import { Observable } from 'rxjs';
import { Service } from './service';

@Injectable({
  providedIn: 'root'
})
export class OempService extends Service {

  constructor(
    private http: HttpClient,
    private notification: PoNotificationService
  ) {
    super()
    this.notification.setDefaultDuration(4000)
  }

  filter(): Observable<any> {
    // const options = this.getOptionsReq();
    // if (options == null) {
    //   throw new Error('Usuário não autenticado!')

    // } else
    //   return this.http.get(`${this.host}/api/oemp`, options)
    return this.http.get(`${this.host}/api/oemp`)
  }

  getOpenOrdersToExport(): Observable<any> {
    // const options = this.getOptionsReq();
    // if (options == null) {
    //   throw new Error('Usuário não autenticado!')

    // } else
    //   return this.http.get(`${this.host}/api/oemp/total-counter`, options)
    return this.http.get(`${this.host}/api/oemp/exportopen`)
  }

  getCounters(): Observable<any> {
    // const options = this.getOptionsReq();
    // if (options == null) {
    //   throw new Error('Usuário não autenticado!')

    // } else
    //   return this.http.get(`${this.host}/api/oemp/total-counter`, options)
    return this.http.get(`${this.host}/api/oemp/counters`)
  }

  filterByStatus(status: string, page: number): Observable<any> {
    // return this.http.get(`${this.host}/api/oemp/filter?status=${status}`, this.getOptionsReq())
    return this.http.get(`${this.host}/api/oemp/filter?status=${status}&page=${page}`)
  }

  getClosedByDate(optionDate: string): Observable<any> {
    // return this.http.post(`${this.host}/api/oemp/exportclosed`, this.postOptionsReq(optionDate))
    return this.http.post(`${this.host}/api/oemp/exportclosed`, optionDate)
  }

  filterById(id: any): Observable<any> {
    // const url = `${this.host}/api/oemp/byid/${id}`
    // return this.http.get(url, this.getOptionsReq())
    const url = `${this.host}/api/oemp/byid/${id}`
    return this.http.get(url)
  }

  loadAllByPage(page: number): Observable<any> {
    // return this.http.get(`${this.host}/api/oemp/all?page=${page}`, this.getOptionsReq())
    return this.http.get(`${this.host}/api/oemp/allbypage?page=${page}`)
  }

  loadOrdersByStatus(page: number, status: string): Observable<any> {
    // return this.http.get(`${this.host}/api/oemp/load?page=${page}?status=${status}`, this.getOptionsReq())
    return this.http.get(`${this.host}/api/oemp/bystatus?page=${page}&status=${status}`)
  }


  save(order: any): Observable<any> {
    // return this.http.post(`${this.host}/api/oemp`, this.postOptionsReq(order))
    return this.http.post(`${this.host}/api/oemp`, order)
  }

  quickSearchFilter(filter: any): Observable<any> {
    // return this.http.get(`${this.host}/api/oemp/search?circuito=${filter}`, this.getOptionsReq())
    return this.http.get(`${this.host}/api/oemp/search?circuito=${filter}`)
  }

  advancedSearchFilter(filters: any): Observable<any> {
    // return this.http.post(`${this.host}/api/oemp/advancedsearch`, this.postOptionsReq(filters))
    return this.http.post(`${this.host}/api/oemp/advancedsearch`, filters)
  }

  getStatus() {
    return [

      { value: 'aguardando assinatura', label: 'Aguardando Assinatura' },
      { value: 'aprovação opex', label: 'Aprovação de OPEX' },
      { value: 'completed', label: 'Concluído' },
      { value: 'contratação', label: 'Em contratação' },
      { value: 'viabilidade', label: 'Em estudo viabilidade', },
      { value: 'execution', label: 'Em execução' },
      { value: 'falha acesso terceiro', label: 'Falha no Acesso Terceiro' },
      { value: 'pendência cliente', label: 'Pendência Cliente' },
      { value: 'pendência U.N', label: 'Pendência U.N' },
      { value: 'sem atuação oemp', label: 'Sem atuação OEMP' }
    ]
  }

  getResp() {
    return [

      { value: 'oi88813', label: 'Alexandre Rodrigues Pereira' },
      { value: 'oi309953', label: 'Marcio Rodrigo Funatsu' },
      { value: 'oi328091', label: 'David Marques Pires' },
      { value: 'oi320541', label: 'Camilo Edison Fracetti Da Silveira' }
    ]
  }

  getOempCompanyOptions() {
    return [
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
  }

  getStatusOptions() {
    return [
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
  }

  getOempDeadLineOptions() {
    return [

      { label: '30 dias', value: 30 },
      { label: '40 dias', value: 40 },
      { label: '45 dias', value: 45 },
      { label: '50 dias', value: 50 },
      { label: '60 dias', value: 60 },
      { label: '90 dias', value: 90 },
      { label: '120 dias', value: 120 },

    ]
  }

  getContractTimeOptions() {
    return [

      { label: '12 meses', value: 12 },
      { label: '24 meses', value: 24 },
      { label: '36 meses', value: 36 },
      { label: '48 meses', value: 48 },
      { label: '60 meses', value: 60 },

    ]
  }

  getAccountableOptions() {
    return [

      { label: 'Alexandre Rodrigues Pereira', value: 'oi88813' },
      { label: 'Camilo Edison Fracetti Da Silveira', value: 'oi320541' },
      { label: 'David Marques Pires', value: 'oi328091' },
      { label: 'Marcio Rodrigo Funatsu', value: 'oi309953' }

    ]
  }

  getColumns() {
    return [
      { property: 'TempoVida', label: 'T. Vida' },
      { property: 'TempoPosto', label: 'T. Posto' },
      { property: 'geo', label: 'Regional' },
      { property: 'uf', label: 'UF' },
      { property: 'circuito', label: 'Circuito' },
      { property: 'protocolo', label: 'Protocolo' },
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
  }

}
