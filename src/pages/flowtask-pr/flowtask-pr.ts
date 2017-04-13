import { Component } from '@angular/core';
import {
  NavController, NavParams, LoadingController,
  AlertController, ToastController
} from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';

import { FlowTaskData } from '../../models/BasicObjects';
import { Paticipant } from '../../models/FlowDefObjects';
import { PurchaseReqData } from '../../models/BizObjects';


import { Api } from '../../providers/api';
import { AttachService } from '../../providers/attachService';
import { PurchaseReqService } from '../../providers/purchaseReqService';
import { FlowActionService } from '../../providers/flowActionService';

@Component({
  selector: 'page-flowtask-pr',
  templateUrl: 'flowtask-pr.html'
})
export class FlowtaskPrPage {
  task: FlowTaskData;
  purchaseReqData: PurchaseReqData;
  workArea: string;
  potentialPaticipants: Paticipant[];
  isValidForSubmitExamineFlowAction: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public api: Api,
    public translateService: TranslateService,
    public attachService: AttachService,
    public purchaseReqService: PurchaseReqService,
    public flowActionService: FlowActionService) {
  }

  ionViewDidLoad() {
    this.task = <FlowTaskData>this.navParams.get('item');

    let loading = this.loadingCtrl.create({
      content: this.translateService.instant("PLEASE_WAIT")
    });
    loading.present();

    this.purchaseReqService.getBizObjForExamine(this.task.bizDocumentGuid,
      this.task.flowTaskForUserId).toPromise()
      .then(value => {
        this.purchaseReqData = value;
        console.log(value);
        this.workArea = "form";
        loading.dismiss();
      });
  }

  selectedConnectionChanged($event) {
    if ($event) {
      let connections =
        this.purchaseReqData.flowDocumentData.sessionData.availableFlowConnections;
      let connection = connections.find(obj => obj.connection.guid == $event);
      if (connection.toNode.type == "st-autoActivity" || 
        connection.toNode.type == "st-end") {
        this.isValidForSubmitExamineFlowAction = true;
      } else {
        this.isValidForSubmitExamineFlowAction = false;
      }
      this.potentialPaticipants = connection.toNode.roles;
      this.purchaseReqData.flowDocumentData.selectedPaticipantGuid = "";
    }
  }

  selectedRoleChanged($event) {
    if ($event) {
      this.isValidForSubmitExamineFlowAction = true;
    }
  }

  onSubmitExamineFlowAction() {
    let submitData = {};
    Object.assign(submitData, this.purchaseReqData.flowDocumentData, { purchaseReqId: this.purchaseReqData.purchaseReqId });
    submitData["sessionData"] = undefined;

    this.onSubmitToBackEnd(submitData, this.api.PR_NEXT_FLOW_ACTION_PATH);
  }

  onAskSubmitRejectToStartFlowAction() {

    let submitData = {};
    Object.assign(submitData, this.purchaseReqData.flowDocumentData, { purchaseReqId: this.purchaseReqData.purchaseReqId });
    submitData["sessionData"] = undefined;

    this.onSubmitToBackEnd(submitData, this.api.PR_REJECT_TO_START_FLOW_ACTION_PATH);
  }

  onSubmitToBackEnd(data: any, path: string) {
    let loading = this.loadingCtrl.create({
      content: this.translateService.instant("PLEASE_WAIT")
    });
    loading.present();

    let submitData = {};
    Object.assign(
      submitData,
      this.purchaseReqData.flowDocumentData,
      { purchaseReqId: this.purchaseReqData.purchaseReqId });
    submitData["sessionData"] = undefined; // 删除前台临时使用的数据

    this.flowActionService.submitFlowAction(
      data, path)
      .then(value => {
        loading.dismiss();
        if (value[0]) { // 成功提交并处理
          let toast = this.toastCtrl.create({
            message: this.translateService.instant("SUCCESSFULLY_SUBMITTED"),
            duration: 3000
          });
          toast.present();
          // 退回到审批任务列表
          this.navCtrl.pop();
        } else { // 提交处理失败
          let alert = this.alertCtrl.create({
            title: this.translateService.instant("OPERATION_FAILED"),
            subTitle: value[1],
            buttons: ['OK']
          });
          alert.present();
        }
      });
  }
}
