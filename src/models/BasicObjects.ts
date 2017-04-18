export interface DTO {
  guid: string;
  name: string;
  createTime: Date;
}

export interface UserDTO extends DTO {
  userId: number;
  name: string;
  displayName: string;
  englishName: string;
  code: string;
  indexNumber: string;
  email: string;
  accountInNT: string;
  logonName: string;
  officeTel: string;
  personalTel: string;
  personalMobile: string;
  isVisible: boolean;
  validTimeFrom?: Date;
  validTimeTo?: Date;
  departmentNames: string[];
  roleNames: string[];
}

export interface RoleDTO extends DTO {
  roleId: number;
  displayName: string;
  englishName: string;
  code: string;
  indexNumber: string;
  isVisible: boolean;
  users: UserDTO[];
}

export interface FlowDynamicUserDTO extends DTO {
  flowDynamicUserId: number;
  displayName: string;
  memo: string;
  isVisible?: boolean;
  isValidated?: boolean;
  isPublished?: boolean;
}

export interface UserData {
  authenticationToken: string;
  userId: number;
  userGuid: string;
  userLogonName: string;
  userDisplayName: string;
  authenticationTokenExpireTime: Date;
}

export interface FlowTaskData {
  bizDocumentGuid: string;
  flowTaskForUserId: number;
  flowTaskForUserGuid: string;
  taskType: number;
  taskState: number;
  documentTypeName: string;
  documentTypeCode: string;
  documentNo: string;
  documentSubject: string;
  departmentId: number;
  creatorUserId: number;
  creatorUserName: string;
  departmentName: string;
  taskOperationUserId: number;
  createTime: Date;
}

