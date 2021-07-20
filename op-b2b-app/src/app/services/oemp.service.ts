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
    const options = this.getOptionsReq();
    if (options == null) {
      throw new Error('Usuário não autenticado!')

    } else
      return this.http.get(`${this.host}/api/oemp`, options)

  }

  totalFilter(): Observable<any> {
    const options = this.getOptionsReq();
    if (options == null) {
      throw new Error('Usuário não autenticado!')

    } else
      return this.http.get(`${this.host}/api/oemp/total-counter`, options)

  }

  filterByStatus(status: string): Observable<any> {
    return this.http.get(`${this.host}/api/oemp/filter?status=${status}`, this.getOptionsReq())
  }

  getClosedByDate(optionDate: string): Observable<any> {
    return this.http.post(`${this.host}/api/oemp/exportclosed`, this.postOptionsReq(optionDate))
  }

  filterById(id: any): Observable<any> {
    const url = `${this.host}/api/oemp/byid/${id}`
    return this.http.get(url, this.getOptionsReq())
  }

  newOrders(): Observable<any> {
    const options = this.getOptionsReq();
    if (options == null) {
      throw new Error('Usuário não autenticado!')

    } else
      return this.http.get(`${this.host}/api/oemp/new`, options)

  }

  // find(page: number): Observable<any> {
  //   return this.http.get(`${this.host}/api/oemp/filter?page=${page}`, this.getOptionsReq());
  // }

  loadAllByPage(page: number): Observable<any> {
    return this.http.get(`${this.host}/api/oemp/all?page=${page}`, this.getOptionsReq());
  }

  loadOrdersByStatus(page: number, status: string): Observable<any> {
    return this.http.get(`${this.host}/api/oemp/load?page=${page}?status=${status}`, this.getOptionsReq());
  }


  // resetFilterSearch(page: number) {
  //   return this.loadAllByPage(page)
  // }

  save(order: any): Observable<any> {

    return this.http.post(`${this.host}/api/oemp`, this.postOptionsReq(order))
  }

  quickSearchFilter(filter: any): Observable<any> {
    return this.http.get(`${this.host}/api/oemp/search?circuito=${filter}`, this.getOptionsReq())
  }

  advancedSearchFilter(filters: any): Observable<any> {
    
    return this.http.post(`${this.host}/api/oemp/advancedsearch`, this.postOptionsReq(filters))
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

}
