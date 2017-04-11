import * as FlowDef from './FlowDefObjects';

export interface FlowDocumentData {
  currentUserGuid: string;
  guid: string; //DocumentId
  taskGuid: string;
  flowInstanceId: number;
  remarkOfAprrover: string,
  currentActivityGuid: string;
  // 以下部分由客户端自行生成
  selectedConnectionGuid: string;
  selectedPaticipantGuid: string;

  // 仅在前台操作中用于辅助流程操作的临时数据;不属于业务实体,无需传回
  sessionData: {
    flowTemplateDef: string;
    availableFlowConnections: FlowDef.AvailableFlowAction[];
    flowDocumentAttachFiles :FlowDocumentAttachFile[];
    // 以下部分由客户端自行生成
    NextFlowActionPath: string; // 普通流程审批结果提交路径
    RejectToStartFlowActionPath: string, // 退回到起始状态提交路径
    potentialPaticipants: FlowDef.Paticipant[];
    needChoosePaticipant: boolean;
  }
}

export interface FlowDocumentAttachFile{
  name: string;
  guid: string;
}

export interface PurchaseReqData {
  flowDocumentData: FlowDocumentData;
  purchaseReqId: number;
  documentNo: string;
  WBSNo: string;
  departmentName: string;
  departmentNameBelongTo: string;
  contactOfficePhone: string;
  contactMobile: string;
  contactOtherMedia: string;
  costCenterName: string
  expectReceiveBeginTime: Date;
  expectReceiveEndTime: Date;
  isFirstBuy: boolean;
  firstBuyDate: Date;
  isBidingRequired: boolean;
  noBiddingReason: string;
  reason: string;
  description: string;
  estimatedCostInRMB: number;
  averageBenchmark: number;
  benchmarkDescription: string;
  firstCostAmount: number;
  firstBuyDescription: string;
  otherVendorsNotInList: string;
  // 明细项子表部分
  details: PurchaseReqDetailData[];
}

export interface PurchaseReqDetailData {
  id: number,
  guid: string,
  lineNo: number,
  itemTypeName: string,
  itemName: string,
  estimatedCost: number,
  description: string,
}

