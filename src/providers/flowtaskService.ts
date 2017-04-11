import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Api } from './api';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Storage } from '@ionic/storage';

import { FlowTaskData } from '../models/BasicObjects';
import { UserService } from './userService';

@Injectable()
export class FlowTaskService {
  tasks: FlowTaskData[] = null;
  constructor(public http: Http, public api: Api, 
    public userService: UserService, public storage: Storage) {
  }

  getTasks(refresh: boolean): Observable<FlowTaskData[]>{
    if(!this.tasks  || refresh){
      let headers = new Headers({ 
        'Authentication-Info': this.userService._authenticationToken });
      let options = new RequestOptions({ headers: headers });

      return this.api.get('FlowTask', null, options).map(res => {
        this.tasks = res.json() as FlowTaskData[];
        return this.tasks;
      })
      .catch(error => {
        console.error(error);
        return Observable.of<FlowTaskData[]>(null);
      });
    } else{
      return Observable.of<FlowTaskData[]>(this.tasks);
    }
  }
}