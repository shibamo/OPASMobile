import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

@Injectable()
export class Api {
  url: string = 'http://localhost:24544/api';
  public PR_NEXT_FLOW_ACTION_PATH = "/PR/ExamineFlowAction/" ;
  public PR_REJECT_TO_START_FLOW_ACTION_PATH = "/PR/RejectToStartFlowAction/" ;

  public PO_NEXT_FLOW_ACTION_PATH = "/PO/ExamineFlowAction/" ;
  public PO_REJECT_TO_START_FLOW_ACTION_PATH = "/PO/RejectToStartFlowAction/" ;

  public GR_NEXT_FLOW_ACTION_PATH = "/GR/ExamineFlowAction/" ;
  public GR_REJECT_TO_START_FLOW_ACTION_PATH = "/GR/RejectToStartFlowAction/" ;

  public PM_NEXT_FLOW_ACTION_PATH = "/PM/ExamineFlowAction/" ;
  public PM_REJECT_TO_START_FLOW_ACTION_PATH = "/PM/RejectToStartFlowAction/" ;

  constructor(public http: Http,public storage: Storage) {
  }

  get(endpoint: string, params?: any, options?: RequestOptions) {
    if (!options) {
      options = new RequestOptions();
    }

    // Support easy query params for GET requests
    if (params) {
      let p = new URLSearchParams();
      for(let k in params) {
        p.set(k, params[k]);
      }
      // Set the search field if we have params and don't already have
      // a search field set in options.
      options.search = !options.search && p || options.search;
    }

    return this.http.get(this.url + '/' + endpoint, options);
  }

  post(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.post(this.url + '/' + endpoint, body, options);
  }

  put(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.put(this.url + '/' + endpoint, body, options);
  }

  delete(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.post(this.url + '/' + endpoint, body, options);
  }

  patch(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.put(this.url + '/' + endpoint, body, options);
  }
}
