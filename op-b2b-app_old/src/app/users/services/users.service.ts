import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PoNotificationService } from '@po-ui/ng-components';
import { Md5 } from 'ts-md5';

import { Service } from '../../services/service';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends Service {


  constructor(
    private http: HttpClient,
    private notification: PoNotificationService

  ) {
    super();
    this.notification.setDefaultDuration(4000)
  }

  filter(): Observable<any> {
    // const options = this.getOptionsReq();
    // if (options == null) {
    //   throw new Error('Usuário não autenticado!')

    // } else
    //   return this.http.get(`${this.host}/api/users`, options)
    return this.http.get(`${this.host}/api/users`)

  }

  mailValidate(mail: any): Observable<any> {
    const body = {
      email: mail
    }
    return this.http.post(`${this.host}/api/users/mailVerify`, body)

  }

  pwdRecovery(mail: any): Observable<any> {
    const body = {
      email: mail
    }
    return this.http.post(`${this.host}/api/users/resetPwd`, body)
  }

  userValidate(userId: any): Observable<any> {
    return this.http.get(`${this.host}/api/users/userIdVerify?userId=${userId}`)

  }

  delete(id: any): Observable<any> {
    // return this.http.delete(`${this.host}/api/users/${id}`, this.getOptionsReq())
    return this.http.delete(`${this.host}/api/users/${id}`)
  }

  save(user: any): Observable<any> {
    // return this.http.post(`${this.host}/api/users`, this.postOptionsReq(user))
    return this.http.post(`${this.host}/api/users`, user)
  }

  saveNoValidateUser(user: any): Observable<any> {
    return this.http.post(`${this.host}/api/no-validate`, user)
  }

  filterByIdNoValidate(id: any): Observable<any> {
    const url = `${this.host}/api/no-validate/${id}`
    return this.http.get(url)
  }

  changePwd(id: any, pwd: any, requester: any): Observable<any> {
    const body = {
      _id: id,
      password: Md5.hashStr(pwd),
      requester: requester
    }
    return this.http.post(`${this.host}/api/users/changePwd`, body)
  }

  saveNewRegister(user: any): Observable<any> {
    return this.http.post(`${this.host}/api/users/new-register`, user)
  }

  filterById(id: any): Observable<any> {
    const url = `${this.host}/api/users/${id}`
    //return this.http.get(url, this.getOptionsReq())
    return this.http.get(url)
  }


  find(page: number): Observable<any> {
    // return this.http.get(`${this.host}/api/users/${filter}?page=${page}`, this.getOptionsReq())
    return this.http.get(`${this.host}/api/users?page=${page}`)
  }

  quickSearchFilter(filter: any): Observable<any> {
    // return this.http.get(`${this.host}/api/oemp/search?circuito=${filter}`, this.getOptionsReq())
    return this.http.post(`${this.host}/api/users/search`, filter)
  }

  resetFilterSearch() {
    return this.filter()
  }


getColumns() {
  return [
    { property: 'userId', label: 'Matrícula', width: '90px' },
    { property: 'name', label: 'Nome', width: '210px' },
    { property: 'company', label: 'Empresa', width: '90px' },
    { property: 'department', label: 'Área', width: '90px' },
    { property: 'typeUser', label: 'Perfil', width: '70px' },
    { property: 'uf', label: 'UF', width: '60px' },
    { property: 'creationDate', label: 'Data de Criação', type: 'date', format: 'dd/MM/yyyy', width: '100px' },
    { property: 'lastLogin', label: 'Último Acesso', type: 'date', format: 'dd/MM/yyyy hh:mm', width: '100px' },
    { property: 'status', label: 'Status', width: '100px' }
  ]
}

}
