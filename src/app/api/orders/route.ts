import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customerName, phone, address, paymentMethod, items } = body;

    if (!customerName || !phone || !address) {
      return NextResponse.json(
        { error: 'Заполните все обязательные поля' },
        { status: 400 }
      );
    }

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Корзина пуста' },
        { status: 400 }
      );
    }

    const total = items.reduce(
      (sum: number, item: { price: number; quantity: number }) =>
        sum + item.price * item.quantity,
      0
    );

    const order = await db.order.create({
      data: {
        customerName,
        phone,
        address,
        paymentMethod: paymentMethod || 'payme',
        total,
        status: 'оформлен',
        items: {
          create: items.map(
            (item: { productId: string; name: string; price: number; quantity: number; image: string }) => ({
              productId: item.productId,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              image: item.image,
            })
          ),
        },
      },
      include: { items: true },
    });

    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { error: 'Ошибка при создании заказа' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const orders = await db.order.findMany({
      include: { items: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ orders });
  } catch (error) {
    console.error('Orders fetch error:', error);
    return NextResponse.json(
      { error: 'Ошибка при получении заказов' },
      { status: 500 }
    );
  }
}
