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

  getClient(): Observable<any> {
    // const options = this.getOptionsReq();
    // if (options == null) {
    //   throw new Error('Usuário não autenticado!')

    // } else
    //   return this.http.get(`${this.host}/api/oemp`, options)
    return this.http.get(`${this.host}/api/getClients`)
  }

  getOpenOrdersToExport(): Observable<any> {
    // const options = this.getOptionsReq();
    // if (options == null) {
    //   throw new Error('Usuário não autenticado!')

    // } else
    //   return this.http.get(`${this.host}/api/oemp/total-counter`, options)
    return this.http.get(`${this.host}/api/oemp/exportOpen`)
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
    const url = `${this.host}/api/oemp/byId/${id}`
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
    return this.http.post(`${this.host}/api/oemp/search`, filter)
  }



  advancedSearchFilter(filters: any): Observable<any> {
    // return this.http.post(`${this.host}/api/oemp/advancedsearch`, this.postOptionsReq(filters))
    return this.http.post(`${this.host}/api/oemp/advancedSearch`, filters)
  }

  getStatus() {
    return [

      { value: 'aguardando assinatura', label: 'Aguardando Assinatura' },
      { value: 'aprovação opex', label: 'Aprovação de OPEX' },
      { value: 'concluído', label: 'Concluído' },
      { value: 'contratação', label: 'Em contratação' },
      { value: 'viabilidade', label: 'Em estudo viabilidade', },
      { value: 'execução', label: 'Em execução' },
      { value: 'falha acesso terceiro', label: 'Falha no Acesso Terceiro' },
      { value: 'pendência cliente', label: 'Pendência Cliente' },
      { value: 'pendência U.N', label: 'Pendência U.N' }
    ]
  }

  getOempCompanyOptions() {
    return [
      { label: 'Algar', value: 'Algar' },
      { label: 'AltaRede', value: 'AltaRede' },
      { label: 'American Tower', value: 'American Tower' },
      { label: 'AmericaNet', value: 'AmericaNet' },
      { label: 'Arion', value: 'Arion' },
      { label: 'Ascenty', value: 'Ascenty' },
      { label: 'Ativa', value: 'Ativa' },
      { label: 'Avato', value: 'Avato' },
      { label: 'Boingo', value: 'Boingo' },
      { label: 'BR Digital', value: 'BR Digital' },
      { label: 'Brasil Telecom', value: 'Brasil Telecom' },
      { label: 'CenturyLink', value: 'CenturyLink' },
      { label: 'Conecta', value: 'Conecta' },
      { label: 'Copel', value: 'Copel' },
      { label: 'CPE', value: 'CPE' },
      { label: 'Embratel', value: 'Embratel' },
      { label: 'Equinix', value: 'Equinix' },
      { label: 'Escolas Conectadas', value: 'Escolas Conectadas' },
      { label: 'G8', value: 'G8' },
      { label: 'Gilat', value: 'Gilat' },
      { label: 'Hispamar', value: 'Hispamar' },
      { label: 'Hostfiber', value: 'Hostfiber' },
      { label: 'Hughes', value: 'Hughes' },
      { label: 'Internexa', value: 'Internexa' },
      { label: 'IT Tecnologia', value: 'IT Tecnologia' },
      { label: 'MicroTell', value: 'MicroTell' },
      { label: 'Mob Telecom', value: 'Mob Telecom' },
      { label: 'MTel', value: 'MTel' },
      { label: 'Nava', value: 'Nava' },
      { label: 'Nava (OEMP)', value: 'Nava(OEMP)' },
      { label: 'Neovia', value: 'Neovia' },
      { label: 'Net Turbo', value: 'Net Turbo' },
      { label: 'Netell', value: 'Netell' },
      { label: 'NetFacil', value: 'NetFacil' },
      { label: 'NewMaster', value: 'NewMaster' },
      { label: 'OnNeT', value: 'OnNeT' },
      { label: 'OSI Telecom', value: 'OSI Telecom' },
      { label: 'Rede Própria', value: 'Rede Propria' },
      { label: 'RIXBR27', value: 'RIXBR27' },
      { label: 'SAMM', value: 'SAMM' },
      { label: 'Sem Atuação OEMP', value: 'Sem Atuação OEMP' },
      { label: 'Sercomtel', value: 'Sercomtel' },
      { label: 'Siteltra', value: 'Siteltra' },
      { label: 'SpeedCast', value: 'SpeedCast' },
      { label: 'STIW', value: 'STIW' },
      { label: 'SumiCity', value: 'SumiCity' },
      { label: 'Telemar', value: 'Telemar' },
      { label: 'Telespazio', value: 'Telespazio' },
      { label: 'TIM', value: 'TIM' },
      { label: 'TIVIT', value: 'TIVIT' },
      { label: 'TIWS', value: 'TIWS' },
      { label: 'TUDDO', value: 'TUDDO' },
      { label: 'UMTelecom', value: 'UMTelecom' },
      { label: 'UOLDiveo', value: 'UOLDiveo' },
      { label: 'Velox R2', value: 'Velox R2' },
      { label: 'Vivax', value: 'Vivax' },
      { label: 'Vivo', value: 'Vivo' },
      { label: 'Vogel', value: 'Vogel' },
      { label: 'WCS Telecom', value: 'WCS Telecom' },
      { label: 'WebNet', value: 'WebNet' },
      { label: 'WireLink', value: 'WireLink' },
      { label: 'WKVE', value: 'WKVE' },
      { label: 'WT Tecnologia', value: 'WT Tecnologia' },
      { label: 'WT Telecom', value: 'WT Telecom' }

    ]
  }

  getOempOempCompanyOptions() {
    return [
      { label: 'Algar', value: 'Algar' },
      { label: 'AltaRede', value: 'AltaRede' },
      { label: 'American Tower', value: 'American Tower' },
      { label: 'AmericaNet', value: 'AmericaNet' },
      { label: 'Arion', value: 'Arion' },
      { label: 'Ascenty', value: 'Ascenty' },
      { label: 'Ativa', value: 'Ativa' },
      { label: 'Avato', value: 'Avato' },
      { label: 'Boingo', value: 'Boingo' },
      { label: 'BR Digital', value: 'BR Digital' },
      { label: 'CenturyLink', value: 'CenturyLink' },
      { label: 'Conecta', value: 'Conecta' },
      { label: 'Copel', value: 'Copel' },
      { label: 'Embratel', value: 'Embratel' },
      { label: 'Equinix', value: 'Equinix' },
      { label: 'G8', value: 'G8' },
      { label: 'Gilat', value: 'Gilat' },
      { label: 'Hostfiber', value: 'Hostfiber' },
      { label: 'Internexa', value: 'Internexa' },
      { label: 'IT Tecnologia', value: 'IT Tecnologia' },
      { label: 'MicroTell', value: 'MicroTell' },
      { label: 'Mob Telecom', value: 'Mob Telecom' },
      { label: 'MTel', value: 'MTel' },
      { label: 'Nava (OEMP)', value: 'Nava(OEMP)' },
      { label: 'Neovia', value: 'Neovia' },
      { label: 'Net Turbo', value: 'Net Turbo' },
      { label: 'Netell', value: 'Netell' },
      { label: 'NetFacil', value: 'NetFacil' },
      { label: 'NewMaster', value: 'NewMaster' },
      { label: 'OnNeT', value: 'OnNeT' },
      { label: 'OSI Telecom', value: 'OSI Telecom' },
      { label: 'RIXBR27', value: 'RIXBR27' },
      { label: 'SAMM', value: 'SAMM' },
      { label: 'Sercomtel', value: 'Sercomtel' },
      { label: 'Siteltra', value: 'Siteltra' },
      { label: 'STIW', value: 'STIW' },
      { label: 'SumiCity', value: 'SumiCity' },
      { label: 'TIM', value: 'TIM' },
      { label: 'TIVIT', value: 'TIVIT' },
      { label: 'TIWS', value: 'TIWS' },
      { label: 'TUDDO', value: 'TUDDO' },
      { label: 'UMTelecom', value: 'UMTelecom' },
      { label: 'UOLDiveo', value: 'UOLDiveo' },
      { label: 'Vivax', value: 'Vivax' },
      { label: 'Vivo', value: 'Vivo' },
      { label: 'Vogel', value: 'Vogel' },
      { label: 'WCS Telecom', value: 'WCS Telecom' },
      { label: 'WebNet', value: 'WebNet' },
      { label: 'WireLink', value: 'WireLink' },
      { label: 'WKVE', value: 'WKVE' },
      { label: 'WT Tecnologia', value: 'WT Tecnologia' },
      { label: 'WT Telecom', value: 'WT Telecom' }

    ]
  }

  getUNOempCompanyOptions() {
    return [
      { label: 'Escolas Conectadas', value: 'Escolas Conectadas' },
      { label: 'Gilat', value: 'Gilat' },
      { label: 'Hispamar', value: 'Hispamar' },
      { label: 'Hughes', value: 'Hughes' },
      { label: 'Nava', value: 'Nava' },
      { label: 'SpeedCast', value: 'SpeedCast' },
      { label: 'Telespazio', value: 'Telespazio' },
    ]
  }

  getIntercompanyOempCompanyOptions() {
    return [
      { label: 'Brasil Telecom', value: 'Brasil Telecom' },
      { label: 'Telemar', value: 'Telemar' },
      { label: 'Velox R2', value: 'Velox R2' },
    ]
  }

  getNAOempCompanyOptions() {
    return [
      { label: 'CPE', value: 'CPE' },
      { label: 'Rede Própria', value: 'Rede Propria' },

    ]
  }

  getStatusOptions() {
    return [
      { label: 'Aguardando Assinatura', value: 'aguardando assinatura' },
      { label: 'Aprovação de OPEX', value: 'aprovação opex' },
      { label: 'Concluído', value: 'concluído' },
      { label: 'Em contratação', value: 'contratação' },
      { label: 'Em estudo viabilidade', value: 'viabilidade' },
      { label: 'Em execução', value: 'execução' },
      { label: 'Falha no Acesso Terceiro', value: 'falha acesso terceiro' },
      { label: 'Pendência Cliente', value: 'pendência cliente' },
      { label: 'Pendência U.N', value: 'pendência U.N' },
      { label: 'Sem atuação OEMP', value: 'sem atuação oemp' }
    ]
  }

  getOempDeadLineOptions() {
    return [
      { label: '10 dias', value: 10 },
      { label: '15 dias', value: 15 },
      { label: '20 dias', value: 20 },
      { label: '25 dias', value: 25 },
      { label: '30 dias', value: 30 },
      { label: '35 dias', value: 35 },
      { label: '40 dias', value: 40 },
      { label: '45 dias', value: 45 },
      { label: '50 dias', value: 50 },
      { label: '55 dias', value: 55 },
      { label: '60 dias', value: 60 },
      { label: '65 dias', value: 65 },
      { label: '70 dias', value: 70 },
      { label: '75 dias', value: 75 },
      { label: '80 dias', value: 80 },
      { label: '85 dias', value: 85 },
      { label: '90 dias', value: 90 },
      { label: '120 dias', value: 120 },

    ]
  }

  getContractTimeOptions() {
    return [

      { label: '12 meses', value: 12 },
      { label: '24 meses', value: 24 },
      { label: '30 meses', value: 30 },
      { label: '36 meses', value: 36 },
      { label: '48 meses', value: 48 },
      { label: '60 meses', value: 60 },
      { label: 'Indeterminado', value: 'indeterminado' },

    ]
  }

  getAccountableOptions() {
    return [

      { label: 'Alexandre Rodrigues Pereira', value: 'oi88813' },
      { label: 'Camilo Edison Fracetti Da Silveira', value: 'oi320541' },
      { label: 'David Marques Pires', value: 'oi328091' },
      { label: 'Marcio Rodrigo Funatsu', value: 'oi309953' },
      { label: 'Thiago Barbosa Ferreira Kirschner', value: 'oi36129' },
      { label: 'Veronica Maria De Souza Leandro', value: 'oi147437' },
      { label: 'Atacado', value: 'Atacado' },
      { label: 'Intercompany', value: 'Intercompany' },
      { label: 'Não Atribuído', value: 'NA' },

    ]
  }

  getOempAccountableOptions() {
    return [

      { label: 'Alexandre Rodrigues Pereira', value: 'oi88813' },
      { label: 'Camilo Edison Fracetti Da Silveira', value: 'oi320541' },
      { label: 'David Marques Pires', value: 'oi328091' },
      { label: 'Marcio Rodrigo Funatsu', value: 'oi309953' }

    ]
  }

  getUnAccountableOptions() {
    return [

      { label: 'Thiago Barbosa Ferreira Kirschner', value: 'oi36129' },
      { label: 'Veronica Maria De Souza Leandro', value: 'oi147437' },
      { label: 'Atacado', value: 'Atacado' },
    ]
  }

  getIntercompanyAccountableOptions() {
    return [

      { label: 'Intercompany', value: 'Intercompany' },

    ]
  }

  getColumns() {
    return [
      { property: 'TempoVida', label: 'T. Vida' },
      { property: 'TempoPosto', label: 'T. Posto' },
      { property: 'geo', label: 'Regional' },
      { property: 'uf', label: 'UF' },
      { property: 'circuito', label: 'Circuito' },
      { property: 'NomedoCliente', label: 'Cliente' },
      { property: 'protocolo', label: 'Protocolo' },
      { property: 'pove', label: 'Gross' },
      { property: 'servico', label: 'Serviço' },
      {
        property: 'status',
        type: 'subtitle',
        subtitles: [
          { value: 'execução', color: 'color-11', label: 'Em execução', content: 'EXE' },
          { value: 'novo', color: 'color-01', label: 'Novo', content: 'NOV' },
          { value: 'aguardando assinatura', color: 'color-02', label: 'Ag. Assinatura', content: 'AAS' },
          { value: 'aprovação opex', color: 'color-03', label: 'Aprovação de Opex', content: 'OPE' },
          { value: 'contratação', color: 'color-04', label: 'Contratação', content: 'CTR' },
          { value: 'viabilidade', color: 'color-05', label: 'Viabilidade', content: 'VAB' },
          { value: 'falha acesso terceiro', color: 'color-06', label: 'Ac Terceiro', content: 'TER' },
          { value: 'pendência cliente', color: 'color-07', label: 'Pendência Cliente', content: 'PCL' },
          { value: 'pendência U.N', color: 'color-08', label: 'Pendência U.N', content: 'PUN' },
          { value: 'sem atuação oemp', color: 'color-09', label: 'Sem atuação OEMP', content: 'SOP' },
          { value: 'concluído', color: 'color-10', label: 'Concluído', content: 'OK' },
        ]
      },
      { property: 'operadora_Oemp', label: 'Operadora' },
      { property: 'gestao', label: 'Gestão' },
      { property: 'data_Contratacao', label: 'Data Contratação', type: 'date', format: 'dd/MM/yyyy' },
      { property: 'previsao_Entrega', label: 'Prev. Entrega', type: 'date', format: 'dd/MM/yyyy' },

    ]
  }

  getManagementOptions() {
    return [

      { label: 'OEMP', value: 'OEMP' },
      { label: 'Intercompany', value: 'Intercompany' },
      { label: 'Unidade de Negócios', value: 'UN' },
      { label: 'N/A', value: 'NA' }

    ]

  }


}
