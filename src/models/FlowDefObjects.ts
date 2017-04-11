import { UserDTO, RoleDTO, FlowDynamicUserDTO }
  from './BasicObjects';

export interface Paticipant {
  PaticipantType: string; // 'role' or 'user' or 'dynamic'
  PaticipantObj: RoleDTO | UserDTO | FlowDynamicUserDTO;
}

export interface ConditionRule {
  name: string;
  guid: string;
  isDefault: boolean;
  code: string; // C# code to evaluate
  connectionGuid: string;
  paticipants: Paticipant[];
}

export interface ActivityConnectionData { //节点间连线数据对象
  guid: string;
  fromGuid: string; //起始端节点数据对象的GUID
  toGuid: string; //结束端节点数据对象的GUID
  name?: string;
}

export interface ActivityNodeData { //节点数据对象
  type: string;
  guid: string;
  name: string;
  size: number[];
  position: number[];
  initData?: Object;
  linkForm?: Object;
  beforeActions?: any[];
  afterActions?: any[];
  roles?: Paticipant[];
  autoRules?: ConditionRule[];
}

// 由服务器传来的包含当前可用的连线对象和目标节点对象的可用Action
export interface AvailableFlowAction{ 
  connection : ActivityConnectionData;
  toNode: ActivityNodeData;
  isValidInDefinition: boolean;
}

export interface PersonShortInfo {
  name: string;
  guid: string;
}

export interface FlowBasicInfoData {
  name: string;
  version: string;
  guid: string;
  displayName: string;
  code: string;
  desc: string;
  creator: PersonShortInfo;
  createTime: string;
  lastUpdateTime: string;
}

export interface FlowAdvancedInfoData {
}

export interface FlowCustomInfoData {
}

export interface FlowData {
  basicInfo: FlowBasicInfoData;
  customData?: FlowCustomInfoData;
  advancedInfo?: FlowAdvancedInfoData;
  activityNodes: { nodes: ActivityNodeData[] };
  activityConnections: { connections: ActivityConnectionData[] };
}



