import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';

@Component({
  selector: 'page-sys-setting',
  templateUrl: 'sys-setting.html'
})
export class SysSettingPage {

  constructor(public navCtrl: NavController, 
    public translateService: TranslateService,
    public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SysSettingPage');
  }

}
