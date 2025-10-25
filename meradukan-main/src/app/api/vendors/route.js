import { NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../lib/supabase.js'
import { verifyToken } from '../../../lib/auth.js'

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

    if (user.role === 'vendor') {
      // Return customers for vendor
      const { data: orders, error } = await supabaseAdmin
        .from('orders')
        .select('customer_clerk_id, shipping_address, total_amount, created_at')
        .eq('vendor_id', user.id)

      if (error) {
        return NextResponse.json({ error: 'Failed to fetch customers' }, { status: 500 })
      }

      const customerMap = new Map()
      orders.forEach(order => {
        const customerId = order.customer_clerk_id
        if (!customerMap.has(customerId)) {
          customerMap.set(customerId, {
            id: customerId,
            name: order.shipping_address?.name || 'Customer',
            email: customerId,
            phone: order.shipping_address?.phone || '',
            status: 'active',
            orders: 0,
            spent: 0,
            joinDate: order.created_at
          })
        }
        const customer = customerMap.get(customerId)
        customer.orders += 1
        customer.spent += parseFloat(order.total_amount || 0)
      })

      return NextResponse.json({
        success: true,
        vendors: Array.from(customerMap.values())
      })
    } else {
      // Return vendors for admin
      const { data: vendors, error } = await supabaseAdmin
        .from('admin_users')
        .select('*')
        .eq('role', 'vendor')

      if (error) {
        return NextResponse.json({ error: 'Failed to fetch vendors' }, { status: 500 })
      }

      return NextResponse.json({
        success: true,
        vendors: vendors.map(v => ({
          id: v.id,
          name: v.vendor_details?.store_name || v.name,
          email: v.email,
          phone: v.phone,
          status: v.status,
          products: 0,
          revenue: 0,
          joinDate: v.created_at
        }))
      })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}