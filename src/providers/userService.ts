import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Api } from './api';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Storage } from '@ionic/storage';

import { UserData } from '../models/BasicObjects';

@Injectable()
export class UserService {
  _user: UserData;
  _authenticationToken: string;

  constructor(
    public http: Http, 
    public api: Api, 
    public storage: Storage) 
  {
    storage.keys().then(
      (_keys) => {
        if (_keys.indexOf("authenticationToken") >= 0) {
          console.log("authenticationToken in storage");
          storage.get("authenticationToken").then((data) => {
            this._authenticationToken = data.toString();
            console.log(data);
          });
        }
        else {
          console.log("authenticationToken not in storage");
        }

        if (_keys.indexOf("user") >= 0) {
          console.log("user in storage");
          storage.get("user").then((data) => {
            this._user = data;
            console.log(data);
          });
        }
        else {
          console.log("user not in storage");
        }
      });
  }

  getStoredState(){
    this.storage.keys().then(
      (_keys) => {
        if (_keys.indexOf("authenticationToken") >= 0) {
          console.log("authenticationToken in storage");
          this.storage.get("authenticationToken").then((data) => {
            this._authenticationToken = data.toString();
            console.log(data);
          });
        }
        else {
          console.log("authenticationToken not in storage");
        }

        if (_keys.indexOf("user") >= 0) {
          console.log("user in storage");
          this.storage.get("user").then((data) => {
            this._user = data;
            console.log(data);
          });
        }
        else {
          console.log("user not in storage");
        }
      }
    );
  }

  login(accountInfo: any) {
    let seq = this.api.post('user/login', accountInfo).share();

    seq.map(res => res.json())
      .subscribe(res => {
        // If the API returned a successful response, mark the user as logged in
        console.log(res);
        if (res.status == 'success') {
          this._loggedIn(res);
        } else {
        }
      }, err => {
        console.error('ERROR', err);
      });

    return seq;
  }

  logout() {
    this._user = null;
    this._authenticationToken = null;
  }

  _loggedIn(resp) {
    this._user = resp.user;
    this._authenticationToken = this._user.authenticationToken;
    this.storage.set("authenticationToken", this._user.authenticationToken);
    this.storage.set("user", this._user);
  }
}
