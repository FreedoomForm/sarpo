import { NextRequest, NextResponse } from 'next/server';
import { apiGet } from '@/lib/commerce-api';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = await apiGet(`products/${id}`);
  const json = await res.json();
  return NextResponse.json(json, { status: res.status });
}
