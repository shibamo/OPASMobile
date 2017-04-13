import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { TranslateService } from 'ng2-translate/ng2-translate';

import { FlowTaskData } from '../../models/BasicObjects';
import { FlowTaskService } from '../../providers/flowtaskService';
import { FlowtaskPrPage } from '../flowtask-pr/flowtask-pr';
import { FlowtaskPoPage } from '../flowtask-po/flowtask-po';
import { FlowtaskGrPage } from '../flowtask-gr/flowtask-gr';
import { FlowtaskPmPage } from '../flowtask-pm/flowtask-pm';

@Component({
  selector: 'page-flowtasks',
  templateUrl: 'flowtasks.html'
})
export class FlowtasksPage {
  tasks: FlowTaskData[];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public translateService: TranslateService,
    public loadingController: LoadingController,
    public flowTaskService: FlowTaskService,) 
  {
  }

  //ionViewDidLoad() {
  ionViewWillEnter() { // Each time this page activated will be called
    let loading = this.loadingController.create({
      content: this.translateService.instant("PLEASE_WAIT")
    });
    loading.present();
    this.flowTaskService.getTasks(true).toPromise()
    .then(value=>{
      this.tasks = value;
      loading.dismiss();
    });
  }

  itemTapped(event, item) {
    switch(item.documentTypeName){
      case "PR":
        this.navCtrl.push(FlowtaskPrPage, {item: item});
        break;
      case "PO":
        this.navCtrl.push(FlowtaskPoPage, {item: item});
        break;
      case "GR":
        this.navCtrl.push(FlowtaskGrPage, {item: item});
        break;
      case "PM":
        this.navCtrl.push(FlowtaskPmPage, {item: item});
        break;      
      default:
      
    }
  }

}


