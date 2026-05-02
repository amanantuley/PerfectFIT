import { NextResponse } from 'next/server';
import { createOrder, getUserOrders } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, total, userId } = body;
    
    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Order must contain items' }, { status: 400 });
    }
    
    // In a real app, userId would come from the verified session token
    const effectiveUserId = userId || 'anonymous_user';
    
    const order = await createOrder({
      userId: effectiveUserId,
      items,
      total,
    });
    
    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || 'anonymous_user';
    
    const orders = await getUserOrders(userId);
    
    return NextResponse.json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
