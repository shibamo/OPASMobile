import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Api } from './api';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Storage } from '@ionic/storage';

import { PaymentData } from '../models/BizObjects';
import { UserService } from './userService';

@Injectable()
export class PaymentService {
  bizObj: PaymentData = null;
  constructor(public http: Http, public api: Api, 
    public userService: UserService, public storage: Storage) {
  }

  getBizObjForExamine(
    id: string , flowTaskForUserId: number)
    : Observable<PaymentData>
  {
    let headers = new Headers({ 
      'Authentication-Info': this.userService._authenticationToken });
    let options = new RequestOptions({ headers: headers });

    return this.api.get(
      'PM/Examine/'+id+'/'+flowTaskForUserId.toString(), 
      null, 
      options)
    .map(res => {
      this.bizObj = res.json() as PaymentData;
      return this.bizObj;
    })
    .catch(error => {
      console.error(error);
      return Observable.of<PaymentData>(null);
    });
  }
}