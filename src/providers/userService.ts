import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

import { Api } from './api';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/of';
import { Storage } from '@ionic/storage';

import { UserData,UserDTO } from '../models/BasicObjects';

@Injectable()
export class UserService {
  _user: UserData;
  _authenticationToken: string;
  _allUsers: UserDTO[];

  constructor(
    public http: Http, 
    public api: Api, 
    public storage: Storage) 
  {
    this.getStoredState();
  }

  getStoredState(){
    this.storage.keys().then(
      (_keys) => {
        if (_keys.indexOf("authenticationToken") >= 0) {
          this.storage.get("authenticationToken").then((data) => {
            this._authenticationToken = data.toString();
          });
        }
        else {
          console.debug("authenticationToken not in storage");
        }

        if (_keys.indexOf("user") >= 0) {
          this.storage.get("user").then((data) => {
            this._user = data;
          });
        }
        else {
          console.debug("user not in storage");
        }

        if (_keys.indexOf("allUsers") >= 0) {
          this.storage.get("allUsers").then((data) => {
            this._allUsers = data;
          });
        }
        else {
          console.debug("allUsers not in storage");
        }        
      }
    );
  }

  login(accountInfo: any) {
    let seq = this.api.post('user/login', accountInfo).share();

    seq.map(res => res.json())
      .subscribe(res => {
        // If the API returned a successful response, mark the user as logged in
        // console.debug(res);
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
    this.storage.remove("authenticationToken");
    this.storage.remove("user");
  }

  _loggedIn(resp) {
    this._user = resp.user;
    this._authenticationToken = this._user.authenticationToken;
    this.storage.set("authenticationToken", this._user.authenticationToken);
    this.storage.set("user", this._user);
  }

  getAllUsers(reload = false) : Observable<UserDTO[]>
  {
    if(!reload && this._allUsers) {
      return Observable.of(this._allUsers);
    }
    let headers = new Headers({ 
      'Authentication-Info': this._authenticationToken });
    let options = new RequestOptions({ headers: headers });

    return this.api.get(
      'UserApi', 
      null, 
      options)
    .map(res => {
      this._allUsers = res.json() as UserDTO[];
      this.storage.set("allUsers", this._allUsers);
      return this._allUsers;
    })
    .catch(error => {
      console.error(error);
      return Observable.of<UserDTO[]>([]);
    });
  }
}
