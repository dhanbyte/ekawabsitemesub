import { NextResponse } from 'next/server'
import { verifyToken } from '../../../lib/auth.js'
import { supabaseAdmin } from '../../../lib/supabase.js'

export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'No token provided' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)
    const decoded = verifyToken(token)

    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    // Get fresh user data from database
    const { data: user, error } = await supabaseAdmin
      .from('admin_users')
      .select('id, email, name, role, vendor_details, status')
      .eq('id', decoded.id)
      .eq('status', 'active')
      .single()

    if (error || !user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      user
    })

  } catch (error) {
    console.error('Auth check error:', error)
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    )
  }
}