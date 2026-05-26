import { NextRequest, NextResponse } from 'next/server';
import { apiGet } from '@/lib/commerce-api';

export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;
  const extra: Record<string, string> = {};
  ['search', 'collection', 'isNew', 'category', 'priceMin', 'priceMax', 'sort', 'page', 'limit'].forEach((k) => {
    const v = sp.get(k);
    if (v) extra[k] = v;
  });

  const res = await apiGet('products', extra);
  const json = await res.json();
  return NextResponse.json(json, { status: res.status });
}
