import { NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../lib/supabase.js'
import { verifyToken } from '../../../lib/auth.js'

// GET - Fetch orders
export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const user = verifyToken(token)
    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    let query = supabaseAdmin
      .from('orders')
      .select(`
        *,
        admin_users!vendor_id (
          name,
          vendor_details
        )
      `)
      .order('created_at', { ascending: false })

    // Filter by vendor if not admin
    if (user.role === 'vendor') {
      query = query.eq('vendor_id', user.id)
    }

    const { data: orders, error } = await query

    if (error) {
      console.error('Orders fetch error:', error)
      return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      orders: orders || []
    })

  } catch (error) {
    console.error('Orders API error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// POST - Create order
export async function POST(request) {
  try {
    const orderData = await request.json()
    
    const orderId = 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5).toUpperCase()
    
    const { data: order, error } = await supabaseAdmin
      .from('orders')
      .insert({
        order_id: orderId,
        customer_clerk_id: orderData.customer_clerk_id,
        vendor_id: orderData.vendor_id,
        items: orderData.items,
        total_amount: orderData.total_amount,
        payment_method: orderData.payment_method,
        payment_id: orderData.payment_id,
        shipping_address: orderData.shipping_address,
        status: 'pending'
      })
      .select()
      .single()

    if (error) {
      console.error('Order creation error:', error)
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      order
    })

  } catch (error) {
    console.error('Order creation error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// PUT - Update order status
export async function PUT(request) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const user = verifyToken(token)
    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const { orderId, status, trackingId } = await request.json()
    
    let updateData = { status }
    if (trackingId) {
      updateData.tracking_id = trackingId
    }

    let query = supabaseAdmin
      .from('orders')
      .update(updateData)
      .eq('order_id', orderId)

    // Vendors can only update their own orders
    if (user.role === 'vendor') {
      query = query.eq('vendor_id', user.id)
    }

    const { data: order, error } = await query
      .select()
      .single()

    if (error) {
      console.error('Order update error:', error)
      return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      order
    })

  } catch (error) {
    console.error('Order update error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}