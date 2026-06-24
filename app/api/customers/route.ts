import { NextResponse } from 'next/server';
import customersData from '@/app/data/customers.json';

export async function GET() {
  try {
    return NextResponse.json(customersData);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch customers' },
      { status: 500 }
    );
  }
}
