import { Component } from '@angular/core';
import {
  NavController, NavParams, LoadingController,
  AlertController, ToastController
} from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { TranslateService } from 'ng2-translate/ng2-translate';
import * as _ from 'lodash';

import { UserDTO } from '../../models/BasicObjects';
import { Api } from '../../providers/api';

import { UserService } from '../../providers/userService';

@Component({
  selector: 'page-internal-addressbook',
  templateUrl: 'internal-addressbook.html'
})
export class InternalAddressbookPage {
  Category: string = "Name";
  users: UserDTO[];
  sortedUserGroups = []; // : [{captial: string, users: UserDTO[]}]
  searchKeyword="";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public storage: Storage,    
    public api: Api,
    public translateService: TranslateService,
    public userService: UserService
  ) { }

  ionViewDidLoad() {
    this.userService.getAllUsers().toPromise()
      .then(value => {
        this.users = value;
        this.showAddressBook(null);
      });
  }

  showAddressBook($event) {
    this.sortedUserGroups = [];
    for (let i = 65; i < 65 + 26; i++) { //Ascii code 65 is letter A
      let currentLetter = String.fromCharCode(i);
      let _users = _.filter(this.users,
        function (o) { 
          return o.logonName && 
            (_.toUpper(o.logonName[0]) == currentLetter) ;
        }
      );
      var that = this;
      if(this.searchKeyword){
        _users = _.filter(_users,
          function (o) { 
            return that.includes(o.name,that.searchKeyword) ||  
              that.includes(o.logonName,that.searchKeyword) ||
              that.includes(o.defaultDepartmentName,that.searchKeyword);
          }
        );
      }
      if(_users.length>0){
        this.sortedUserGroups.push({captial: currentLetter, users: _users});
      }
    }
  }

  private includes(text: string, keyword:string): boolean{
    if(!keyword) return true;

    if(!text) return false;

    return text.toUpperCase().includes(keyword.toUpperCase());
  }
}
