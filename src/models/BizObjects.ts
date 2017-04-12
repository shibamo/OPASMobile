import * as FlowDef from './FlowDefObjects';

export interface FlowDocumentData {
  currentUserGuid: string;
  guid: string; //DocumentId
  taskGuid: string;
  flowInstanceId: number;
  remarkOfAprrover: string;
  currentActivityGuid: string;
  // 以下部分由客户端自行生成
  selectedConnectionGuid: string;
  selectedPaticipantGuid: string;

  // 仅在前台操作中用于辅助流程操作的临时数据;不属于业务实体,无需传回
  sessionData: {
    flowTemplateDef: string;
    availableFlowConnections: FlowDef.AvailableFlowAction[];
    flowDocumentAttachFiles: FlowDocumentAttachFile[];
    // 以下部分由客户端自行生成使用
    potentialPaticipants: FlowDef.Paticipant[];
    needChoosePaticipant: boolean;
  }
}

export interface FlowDocumentAttachFile {
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
  id: number;
  guid: string;
  lineNo: number;
  itemTypeName: string;
  itemName: string;
  estimatedCost: number;
  description: string;
}

export interface PurchaseOrderData {
  flowDocumentData: FlowDocumentData;
  purchaseOrderId: number;
  documentNo: string;
  departmentName: string;
  departmentNameBelongTo: string;
  contactOfficePhone: string;
  contactMobile: string;
  costCenterName: string;
  orderDate: string;
  effectiveDate: string;
  reason: string;
  description: string;
  totalAmount: string;
  currencyTypeName: string;
  totalAmountInRMB: string;
  POTypeName: string;
  vendorName: string;
  transportTerm: string;
  paymentTerm: string;
  submitor: string;

  // 明细项子表部分
  details: PurchaseOrderDetailData[];
}

export interface PurchaseOrderDetailData {
  id: number;
  guid: string;
  lineNo: number;
  itemName: string;
  description: string;
  unitMeasure: string;
  price: number;
  quantity: number;
  amount: number;
  amountInRMB: number;
}