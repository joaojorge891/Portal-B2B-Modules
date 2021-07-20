import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PoNotificationService } from '@po-ui/ng-components';
import { Md5 } from 'ts-md5';

import { Service } from './service';

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
    const options = this.getOptionsReq();
    if (options == null) {
      throw new Error('Usuário não autenticado!')

    } else
      return this.http.get(`${this.host}/api/users`, options)

  }

  mailValidate(mail: any): Observable<any> {
    const body = {
      email: mail
    }
    return this.http.post(`${this.host}/api/users/mailverify`, body)

  }

  userValidate(userLogin: any): Observable<any> {
    const body = {
      user: userLogin
    }
    return this.http.post(`${this.host}/api/users/userverify`, body)

  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.host}/api/users/${id}`, this.getOptionsReq())
  }

  save(user: any): Observable<any> {
    return this.http.post(`${this.host}/api/users`, this.postOptionsReq(user))
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
    return this.http.get(url, this.getOptionsReq())
  }


  find(page: number, filter: string): Observable<any> {
    return this.http.get(`${this.host}/api/users/${filter}?page=${page}`, this.getOptionsReq());
  }

  getObjectByValue(value: string): Observable<any> {
    return this.http.get(`${this.host}/api/users/${value}`);
  }


  filterSearch(filter: any): Observable<any> {
    return this.http.get(`${this.host}/api/users/search?user=${filter}`, this.getOptionsReq())
  }


  resetFilterSearch() {
    return this.filter()
  }

}
