import { Injectable } from '@angular/core';
import { Globals } from '../globals';

@Injectable()
export class Service {
    host: string = Globals.host;

    protected getParameters(parameters: Array<Parameters>): string {
        let urlParameters = '?';
        parameters.forEach(element => {
            urlParameters += `${element.name}=${element.value}&`;
        });
        return urlParameters;
    }

    protected getCurrentUser() {
        const currentUser = localStorage.getItem('current_user')
        return JSON.parse(currentUser!)
        //   return currentUser != null ? JSON.parse(currentUser) : null
    }

    protected getOptionsReq() {
        const userObject = this.getCurrentUser();
        let options = {}
        if (userObject != null) {
            options = {
                headers: {
                    'access_token': userObject.token,
                    'username': userObject.userId
                }
            }
        }
        return options
    }

    protected postOptionsReq(body: any) {
        const userObject = this.getCurrentUser();
        if (userObject != null) {
            body['access_token'] = userObject.token;
            body['username'] = userObject.userId;

        }
        return body;
    }
}
export class Parameters {
    name!: string
    value!: string
}