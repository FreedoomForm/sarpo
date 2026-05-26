import { NextRequest, NextResponse } from 'next/server';
import { apiPost } from '@/lib/commerce-api';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const res = await apiPost('contact', body);
  const json = await res.json();
  return NextResponse.json(json, { status: res.status });
}
