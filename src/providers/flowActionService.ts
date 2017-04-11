import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Api } from './api';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Storage } from '@ionic/storage';

import { FlowDocumentData } from '../models/BizObjects';
import { UserService } from './userService';

@Injectable()
export class FlowActionService {

  constructor(public http: Http, public api: Api, 
    public userService: UserService, public storage: Storage) {
  }

  submitExamineFlowAction(data: FlowDocumentData, nextFlowActionPath :string) 
  : Promise<[boolean, string]>{
    let headers = new Headers({ 
        'Authentication-Info': this.userService._authenticationToken });
    let options = new RequestOptions({ headers: headers });

    return this.api.post(nextFlowActionPath, null, options).toPromise()
    .then(()=>{return [true,""];})
    .catch(reason=>{
      console.error(reason);
      return [false,reason.toString()];
    });
    
  }
}