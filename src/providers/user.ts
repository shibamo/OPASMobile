import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Api } from './api';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Storage } from '@ionic/storage';

@Injectable()
export class User {
  _user: any;
  _authenticationToken: any;

  constructor(public http: Http, public api: Api, public storage: Storage) {

    storage.keys()
    .then((_keys)=>{
      if(_keys.indexOf("authenticationToken")<0){
        console.log("authenticationToken not in storage");
      }
      else
      {
        console.log("authenticationToken in storage");
        storage.get("authenticationToken").
        then((data)=>{
          this._authenticationToken = data.toString();
          console.log(data);
        });
      }

      if(_keys.indexOf("user")<0){
        console.log("user not in storage");
      }
      else
      {
        console.log("user in storage");
        storage.get("user").
        then((data)=>{
          this._user = data;
          console.log(data);
        });
      }
    });
  }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any) {
    let seq = this.api.post('user/login', accountInfo).share();

    seq
      .map(res => res.json())
      .subscribe(res => {
        // If the API returned a successful response, mark the user as logged in
        console.log(res);
        if(res.status == 'success') {
          this._loggedIn(res);
        } else {
        }
      }, err => {
        console.error('ERROR', err);
      });

    return seq;
  }

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this._user = null;
    this._authenticationToken = null;
  }

  /**
   * Process a login/signup response to store user data:
   * {authenticationToken,userId,userGuid,userLogonName,
   *  userDisplayName,authenticationTokenExpireTime}
   */
  _loggedIn(resp) {
    this._user = resp.user;
    this._authenticationToken = this._user.authenticationToken;
    this.storage.set("authenticationToken",this._user.authenticationToken);
    this.storage.set("user",this._user);
  }
}
