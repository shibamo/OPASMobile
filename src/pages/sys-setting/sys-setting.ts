import { Component } from '@angular/core';
import {
  NavController, NavParams, LoadingController,
  AlertController, ToastController
} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { Http } from '@angular/http';
import { Api } from '../../providers/api';

@Component({
  selector: 'page-sys-setting',
  templateUrl: 'sys-setting.html'
})
export class SysSettingPage {
  private TEST_CONNECTION_API_PATH = "/User/TestConnection";
  public apiAddress: string;
  constructor(public navCtrl: NavController,
    public translateService: TranslateService,
    public loadingController: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public storage: Storage,
    public http: Http,
    public api: Api,
    public navParams: NavParams) { }

  ionViewWillEnter() {
    this.storage.keys()
      .then((_keys) => {
        if (_keys.indexOf("apiAddress") >= 0) {
          this.storage.get("apiAddress")
            .then((data) => {
              this.apiAddress = data.toString();
            });
        }
      });
  }

  storeSetting() {
    this.storage.set("apiAddress", this.apiAddress);
    this.api.setUrl(this.apiAddress);
  }

  testConnection() {
    let loading = this.loadingController.create({
      content: this.translateService.instant("PLEASE_WAIT")
    });
    loading.present();
    this.http.get(this.apiAddress + this.TEST_CONNECTION_API_PATH).toPromise()
      .then(value => {
        this.storeSetting(); //测试连接成功则自动更新到storage中
        loading.dismiss();
        let toast = this.toastCtrl.create({
          message: this.translateService.instant("SUCCESSFULLY_CONNECTED"),
          duration: 3000
        });
        toast.present();
      })
      .catch(reason => {
        let alert = this.alertCtrl.create({
          title: this.translateService.instant("OPERATION_FAILED"),
          subTitle: reason.toString(),
          buttons: ['OK']
        });
        alert.present();
        loading.dismiss();
      });
  }
}
