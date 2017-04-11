import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs';

import { FlowTaskData } from '../../models/BasicObjects';
import { FlowTaskService } from '../../providers/flowtaskService';
import { FlowtaskPrPage } from '../flowtask-pr/flowtask-pr';

@Component({
  selector: 'page-flowtasks',
  templateUrl: 'flowtasks.html'
})
export class FlowtasksPage {
  tasks: FlowTaskData[];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingController: LoadingController,
    public flowTaskService: FlowTaskService,) 
  {
  }

  //ionViewDidLoad() {
  ionViewWillEnter(){
    let loading = this.loadingController.create({
      content: 'Please wait...'
    });
    loading.present();
    this.flowTaskService.getTasks(true).toPromise()
    .then(value=>{
      this.tasks = value;
      loading.dismiss();
    });
  }

  itemTapped(event, item) {
    this.navCtrl.push(FlowtaskPrPage, {item: item});
  }

}


