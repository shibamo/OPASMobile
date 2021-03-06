import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { TranslateService } from 'ng2-translate/ng2-translate';

//import { Page1 } from '../page1/page1';
import { InternalAddressbookPage } from '../../pages/internal-addressbook/internal-addressbook';
import { UserService } from '../../providers/userService';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: {username: string, password: string} = {
    username: 'li4',
    password: '111111'
  };

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
              public user: UserService,
              public toastCtrl: ToastController,
              public translateService: TranslateService) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }

  // Attempt to login in through our User service
  doLogin() {
    this.user.login(this.account).subscribe((resp) => {

      this.navCtrl.push(InternalAddressbookPage);
      this.navCtrl.remove(0);
    }, (err) => {
      this.navCtrl.push(InternalAddressbookPage);
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
}
