import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PoNotificationService } from '@po-ui/ng-components';
import {Md5} from 'ts-md5/dist/md5'

import { Service } from './service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends Service {

  constructor(
    private http: HttpClient,
    private notification: PoNotificationService
  ) {
    super()
  }

  auth(login: string, pwd: string, lastAccess: Date): Observable<any> {
    let pwdCrypt = Md5.hashStr(pwd)
    const body = {
      user: login,
      password: pwdCrypt,
      lastAccess: lastAccess

    }
    return this.http.post(`${this.host}/api/auth`, body)

  }

}