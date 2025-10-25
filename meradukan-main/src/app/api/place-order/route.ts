
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, items, total, paymentMethod, paymentId, shippingAddress } = body;

    if (!userId || !items || !total) {
      return NextResponse.json({ 
        success: false, 
        error: 'Missing required fields' 
      }, { status: 400 });
    }

    // Generate order ID
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Create new order
    const { data: order, error: orderError } = await supabaseAdmin
        .from('orders')
        .insert({
            order_id: orderId,
            customer_clerk_id: userId,
            items: items,
            total_amount: total,
            payment_method: paymentMethod,
            payment_id: paymentId,
            shipping_address: shippingAddress,
            status: 'pending'
        })
        .select()
        .single();

    if (orderError) throw orderError;

    // Update user's purchase status
    const { data: user, error: userError } = await supabaseAdmin
      .rpc('add_coins', { 
        user_id_to_update: userId, 
        coins_to_add: Math.floor(total * 0.01) 
    });

    if (userError) {
      // Log the error but don't block the order from being placed
      console.error('Error updating user coins:', userError);
    }

    return NextResponse.json({ 
      success: true, 
      order,
      orderId,
      message: 'Order placed successfully' 
    });

  } catch (error) {
    console.error('Error placing order:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to place order' 
    }, { status: 500 });
  }
}
