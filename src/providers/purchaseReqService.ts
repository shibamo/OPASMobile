import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Api } from './api';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Storage } from '@ionic/storage';

import { FlowDocumentData, PurchaseReqData, PurchaseReqDetailData } from '../models/BizObjects';
import { UserService } from './userService';

@Injectable()
export class PurchaseReqService {
  bizObj: PurchaseReqData = null;
  constructor(public http: Http, public api: Api, 
    public userService: UserService, public storage: Storage) {
  }

  getBizObjForExamine(
    id: string /*doc guid*/, flowTaskForUserId: number)
    : Observable<PurchaseReqData>
  {
    let headers = new Headers({ 
      'Authentication-Info': this.userService._authenticationToken });
    let options = new RequestOptions({ headers: headers });

    return this.api.get(
      'PR/Examine/'+id+'/'+flowTaskForUserId.toString(), 
      null, 
      options)
    .map(res => {
      this.bizObj = res.json() as PurchaseReqData;
      return this.bizObj;
    })
    .catch(error => {
      console.error(error);
      return Observable.of<PurchaseReqData>(null);
    });
  }

  submitExamineAction(){

  }

}