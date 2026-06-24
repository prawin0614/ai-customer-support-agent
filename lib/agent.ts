/**
 * AI Refund Agent
 * Orchestrates the refund decision-making process by evaluating all rules
 */

import { Customer, RefundDecision, ToolExecutionLog } from '@/types';
import {
  getCustomer,
  getRefundPolicy,
  checkRefundWindow,
  checkDamagedProduct,
  checkDigitalProduct,
  checkManagerApproval,
} from './tools';

/**
 * Main agent function that processes a refund request
 */
export async function processRefundRequest(customerId: number): Promise<RefundDecision> {
  const logs: ToolExecutionLog[] = [];
  let customer: Customer | null = null;

  // Step 1: Load customer data
  const { customer: foundCustomer, log: customerLog } = await getCustomer(customerId);
  logs.push(customerLog);
  customer = foundCustomer;

  // If customer not found, deny refund
  if (!customer) {
    return {
      decision: 'DENIED',
      reason: `Customer with ID ${customerId} not found in the system.`,
      logs,
      customerDetails: undefined,
      requiresManagerApproval: false,
    };
  }

  // Step 2: Load refund policy
  const { policy, log: policyLog } = await getRefundPolicy();
  logs.push(policyLog);

  // Step 3: Check refund window (30 days)
  const { isValid: windowValid, log: windowLog } = checkRefundWindow(customer.orderDate, policy);
  logs.push(windowLog);

  if (!windowValid) {
    return {
      decision: 'DENIED',
      reason: `Refund window expired. Refunds are only allowed within ${policy.windowDays} days of purchase.`,
      logs,
      customerDetails: customer,
      requiresManagerApproval: false,
    };
  }

  // Step 4: Check if product is damaged
  const { isValid: notDamaged, log: damageLog } = checkDamagedProduct(customer.damagedProduct, policy);
  logs.push(damageLog);

  if (!notDamaged) {
    return {
      decision: 'DENIED',
      reason: 'Damaged products are not eligible for refund. Please contact support for repair options.',
      logs,
      customerDetails: customer,
      requiresManagerApproval: false,
    };
  }

  // Step 5: Check if product is digital
  const { isValid: isPhysical, log: digitalLog } = checkDigitalProduct(customer.productType, policy);
  logs.push(digitalLog);

  if (!isPhysical) {
    return {
      decision: 'DENIED',
      reason: 'Digital products are not refundable as per company policy. Please review the terms of service.',
      logs,
      customerDetails: customer,
      requiresManagerApproval: false,
    };
  }

  // Step 6: Check if manager approval is required
  const { requiresApproval, log: approvalLog } = checkManagerApproval(customer.amount, policy);
  logs.push(approvalLog);

  // All checks passed - determine final decision
  if (requiresApproval) {
    return {
      decision: 'PENDING_MANAGER_APPROVAL',
      reason: `Refund amount (Rs.${customer.amount}) exceeds the automatic approval threshold (Rs.${policy.requiresManagerApprovalAbove}). This request requires manager review.`,
      logs,
      customerDetails: customer,
      requiresManagerApproval: true,
      refundAmount: customer.amount,
    };
  }

  // Automatic approval
  return {
    decision: 'APPROVED',
    reason: `Refund approved! All eligibility criteria met. Amount: Rs.${customer.amount} will be processed to ${customer.email}.`,
    logs,
    customerDetails: customer,
    requiresManagerApproval: false,
    refundAmount: customer.amount,
  };
}
