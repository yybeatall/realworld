export interface Visitor {
  id: number;
  name: string;
  phoneNumber: string;
  idCardNumber: string;
  visitTime: Date;
  visitFloor: string;
  isRegistered: boolean;
  receptionistId: string;
  createdAt: Date;
  updatedAt: Date;
  checkInTime?: Date | null;
  checkInStatus: 'PENDING' | 'CHECKED_IN' | 'REJECTED';
  verificationStatus: 'PENDING' | 'VERIFIED' | 'FAILED';
}

export interface VisitorConfig {
  id: number;
  key: string;
  value: string;
  description?: string | null;
  updatedAt: Date;
}

export interface CreateVisitorRequest {
  name: string;
  phoneNumber: string;
  idCardNumber: string;
  visitTime: string;
  visitFloor: string;
  receptionistId: string;
}

export interface UpdateVisitorRequest {
  name?: string;
  phoneNumber?: string;
  idCardNumber?: string;
  visitTime?: string;
  visitFloor?: string;
  isRegistered?: boolean;
  receptionistId?: string;
  checkInStatus?: 'PENDING' | 'CHECKED_IN' | 'REJECTED';
  verificationStatus?: 'PENDING' | 'VERIFIED' | 'FAILED';
}

export interface VisitorCheckInRequest {
  identifier: string; // phone number or id card number
  identifierType: 'PHONE' | 'ID_CARD';
}

export interface VisitorVerificationRequest {
  visitorId: number;
  verificationResult: boolean;
  verificationData?: Record<string, any>;
}

export interface VisitorResponse {
  visitor: Visitor;
  message?: string;
}

export interface VisitorListResponse {
  visitors: Visitor[];
  total: number;
  page: number;
  pageSize: number;
}

export interface VisitorConfigResponse {
  configs: VisitorConfig[];
}

export interface UpdateConfigRequest {
  key: string;
  value: string;
  description?: string;
}