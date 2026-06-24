/**
 * Core type definitions for the AI Customer Support Agent
 */

export interface Customer {
  id: number;
  name: string;
  email: string;
  product: string;
  orderDate: string;
  amount: number;
  damagedProduct: boolean;
  productType: 'physical' | 'digital';
}

export interface RefundPolicy {
  windowDays: number;
  requiresManagerApprovalAbove: number;
  allowDamagedProducts: boolean;
  allowDigitalProducts: boolean;
}

export interface ToolExecutionLog {
  tool: string;
  timestamp: string;
  result: boolean | string | object;
  details?: string;
}

export interface RefundDecision {
  decision: 'APPROVED' | 'DENIED' | 'PENDING_MANAGER_APPROVAL';
  reason: string;
  logs: ToolExecutionLog[];
  customerDetails?: Customer;
  requiresManagerApproval: boolean;
  refundAmount?: number;
}

export interface RefundRequest {
  customerId: number;
}
