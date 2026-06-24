/**
 * Refund API Endpoint
 * POST /api/refund
 * Accepts a customer ID and returns a refund decision
 */

import { NextRequest, NextResponse } from 'next/server';
import { processRefundRequest } from '@/lib/agent';
import { RefundRequest } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RefundRequest;
    const { customerId } = body;

    // Validate input
    if (!customerId || typeof customerId !== 'number') {
      return NextResponse.json(
        {
          error: 'Invalid request. customerId must be provided and be a number.',
        },
        { status: 400 },
      );
    }

    // Process refund request using the AI agent
    const decision = await processRefundRequest(customerId);

    return NextResponse.json(decision, { status: 200 });
  } catch (error) {
    console.error('Error processing refund request:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}

// Enable CORS for development
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
