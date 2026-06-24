/**
 * Tool functions for the refund agent
 * Each function validates a specific rule from the refund policy
 */

import { Customer, ToolExecutionLog, RefundPolicy } from '@/types';

const today = new Date();

/**
 * Loads customer data by ID from the mock database
 */
export async function getCustomer(customerId: number): Promise<{ customer: Customer | null; log: ToolExecutionLog }> {
  const log: ToolExecutionLog = {
    tool: 'getCustomer',
    timestamp: new Date().toISOString(),
    result: false,
  };

  try {
    const customers = await import('@/app/data/customers.json');
    const foundCustomer = (customers.default as any[]).find((c: any) => c.id === customerId);

    if (foundCustomer) {
      const customer: Customer = {
        id: foundCustomer.id,
        name: foundCustomer.name,
        email: foundCustomer.email,
        product: foundCustomer.product,
        orderDate: foundCustomer.orderDate,
        amount: foundCustomer.amount,
        damagedProduct: foundCustomer.damagedProduct,
        productType: foundCustomer.productType as 'physical' | 'digital',
      };
      log.result = true;
      log.details = `Customer found: ${customer.name}`;
      return { customer, log };
    }

    log.details = `Customer with ID ${customerId} not found`;
    return { customer: null, log };
  } catch (error) {
    log.result = false;
    log.details = `Error fetching customer: ${error instanceof Error ? error.message : 'Unknown error'}`;
    return { customer: null, log };
  }
}

/**
 * Loads refund policy from the policy file
 */
export async function getRefundPolicy(): Promise<{ policy: RefundPolicy; log: ToolExecutionLog }> {
  const log: ToolExecutionLog = {
    tool: 'getRefundPolicy',
    timestamp: new Date().toISOString(),
    result: true,
  };

  const policy: RefundPolicy = {
    windowDays: 30,
    requiresManagerApprovalAbove: 10000,
    allowDamagedProducts: false,
    allowDigitalProducts: false,
  };

  log.details = `Policy loaded: 30-day window, manager approval above Rs.10000, no damaged/digital products`;
  return { policy, log };
}

/**
 * Checks if the refund request is within the 30-day window
 */
export function checkRefundWindow(
  orderDate: string,
  policy: RefundPolicy,
): { isValid: boolean; log: ToolExecutionLog } {
  const log: ToolExecutionLog = {
    tool: 'checkRefundWindow',
    timestamp: new Date().toISOString(),
    result: false,
  };

  try {
    const order = new Date(orderDate);
    const daysSinceOrder = Math.floor((today.getTime() - order.getTime()) / (1000 * 60 * 60 * 24));

    const isValid = daysSinceOrder <= policy.windowDays;

    log.result = isValid;
    log.details = `Order placed on ${orderDate}. Days since order: ${daysSinceOrder}. Valid: ${isValid}`;

    return { isValid, log };
  } catch (error) {
    log.details = `Error checking refund window: ${error instanceof Error ? error.message : 'Unknown error'}`;
    return { isValid: false, log };
  }
}

/**
 * Checks if the product is damaged (refunds not allowed for damaged products)
 */
export function checkDamagedProduct(
  damagedProduct: boolean,
  policy: RefundPolicy,
): { isValid: boolean; log: ToolExecutionLog } {
  const log: ToolExecutionLog = {
    tool: 'checkDamagedProduct',
    timestamp: new Date().toISOString(),
    result: !damagedProduct,
  };

  const isValid = !damagedProduct;

  if (!policy.allowDamagedProducts && damagedProduct) {
    log.details = 'Product is damaged. Damaged products are not refundable.';
    log.result = false;
  } else if (!damagedProduct) {
    log.details = 'Product is not damaged. Eligible for refund.';
    log.result = true;
  } else {
    log.details = 'Product is damaged but policy allows damaged product refunds.';
    log.result = true;
  }

  return { isValid, log };
}

/**
 * Checks if the product is digital (refunds not allowed for digital products)
 */
export function checkDigitalProduct(
  productType: 'physical' | 'digital',
  policy: RefundPolicy,
): { isValid: boolean; log: ToolExecutionLog } {
  const log: ToolExecutionLog = {
    tool: 'checkDigitalProduct',
    timestamp: new Date().toISOString(),
    result: productType === 'physical',
  };

  const isValid = productType === 'physical';

  if (!policy.allowDigitalProducts && productType === 'digital') {
    log.details = 'Product is digital. Digital products are not refundable.';
    log.result = false;
  } else if (productType === 'physical') {
    log.details = 'Product is physical. Eligible for refund.';
    log.result = true;
  } else {
    log.details = 'Product is digital but policy allows digital product refunds.';
    log.result = true;
  }

  return { isValid, log };
}

/**
 * Checks if manager approval is required based on refund amount
 */
export function checkManagerApproval(
  amount: number,
  policy: RefundPolicy,
): { requiresApproval: boolean; log: ToolExecutionLog } {
  const log: ToolExecutionLog = {
    tool: 'checkManagerApproval',
    timestamp: new Date().toISOString(),
    result: false,
  };

  const requiresApproval = amount > policy.requiresManagerApprovalAbove;

  log.result = requiresApproval;
  log.details = `Refund amount: Rs.${amount}. Manager approval threshold: Rs.${policy.requiresManagerApprovalAbove}. Requires approval: ${requiresApproval}`;

  return { requiresApproval, log };
}
