import { NextResponse } from 'next/server';
import { apiGet } from '@/lib/commerce-api';

export async function GET() {
  const res = await apiGet('products/new');
  const json = await res.json();
  return NextResponse.json(json, { status: res.status });
}
