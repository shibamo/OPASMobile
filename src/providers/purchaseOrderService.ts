import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Api } from './api';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Storage } from '@ionic/storage';

import { PurchaseOrderData } from '../models/BizObjects';
import { UserService } from './userService';

@Injectable()
export class PurchaseOrderService {
  bizObj: PurchaseOrderData = null;
  constructor(public http: Http, public api: Api, 
    public userService: UserService, public storage: Storage) {
  }

  getBizObjForExamine(
    id: string /*doc guid*/, flowTaskForUserId: number)
    : Observable<PurchaseOrderData>
  {
    let headers = new Headers({ 
      'Authentication-Info': this.userService._authenticationToken });
    let options = new RequestOptions({ headers: headers });

    return this.api.get(
      'PO/Examine/'+id+'/'+flowTaskForUserId.toString(), 
      null, 
      options)
    .map(res => {
      this.bizObj = res.json() as PurchaseOrderData;
      return this.bizObj;
    })
    .catch(error => {
      console.error(error);
      return Observable.of<PurchaseOrderData>(null);
    });
  }
}