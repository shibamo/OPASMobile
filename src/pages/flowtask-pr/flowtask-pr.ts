import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';
//import * as _ from 'lodash';

import { FlowTaskData } from '../../models/BasicObjects';
// import { UserDTO, RoleDTO, FlowDynamicUserDTO }  from '../models/BasicObjects';
import { Paticipant }  from '../../models/FlowDefObjects';
import { PurchaseReqData }  from '../../models/BizObjects';

import { AttachService } from '../../providers/attachService';
import { PurchaseReqService } from '../../providers/purchaseReqService';
import { FlowActionService } from '../../providers/flowActionService';

@Component({
  selector: 'page-flowtask-pr',
  templateUrl: 'flowtask-pr.html'
})
export class FlowtaskPrPage {
  task : FlowTaskData;
  purchaseReqData: PurchaseReqData;
  workArea: string;
  potentialPaticipants: Paticipant[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public loadingController: LoadingController,
    public translateService: TranslateService,
    public attachService: AttachService,
    public purchaseReqService: PurchaseReqService,
    public flowActionService: FlowActionService) 
  {
    //purchaseReqService.getBizObj()
  }

  ionViewDidLoad() {
    this.task = <FlowTaskData>this.navParams.get('item');

    let loading = this.loadingController.create({
      content: 'Please wait...'
    });
    loading.present();

    this.purchaseReqService.getBizObjForExamine(this.task.bizDocumentGuid,
    this.task.flowTaskForUserId).toPromise()
    .then(value=>{
      this.purchaseReqData = value;
      console.log(value);
      this.workArea = "form";
      loading.dismiss();
    });
  }

  selectedConnectionChanged($event){
    console.log($event);
    let connections = 
      this.purchaseReqData.flowDocumentData.sessionData.availableFlowConnections;
    let connection = connections.find(obj=>obj.connection.guid==$event);
    this.potentialPaticipants = connection.toNode.roles;
  }

  onSubmitExamineFlowAction(){
    this.flowActionService.submitExamineFlowAction(this.purchaseReqData.flowDocumentData, this.purchaseReqData.flowDocumentData.sessionData.NextFlowActionPath);
  }

  onAskSubmitRejectToStartFlowAction(){

  }
}
