import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Api } from './api';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Storage } from '@ionic/storage';

import { GoodsReceivingData } from '../models/BizObjects';
import { UserService } from './userService';

@Injectable()
export class GoodsReceivingService {
  bizObj: GoodsReceivingData = null;
  constructor(public http: Http, public api: Api, 
    public userService: UserService, public storage: Storage) {
  }

  getBizObjForExamine(
    id: string , flowTaskForUserId: number)
    : Observable<GoodsReceivingData>
  {
    let headers = new Headers({ 
      'Authentication-Info': this.userService._authenticationToken });
    let options = new RequestOptions({ headers: headers });

    return this.api.get(
      'GR/Examine/'+id+'/'+flowTaskForUserId.toString(), 
      null, 
      options)
    .map(res => {
      this.bizObj = res.json() as GoodsReceivingData;
      return this.bizObj;
    })
    .catch(error => {
      console.error(error);
      return Observable.of<GoodsReceivingData>(null);
    });
  }
}