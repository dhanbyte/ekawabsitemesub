import { NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../../lib/supabase.js'
import { hashPassword } from '../../../../lib/auth.js'

export async function POST(request) {
  try {
    const { email, password, name, phone, storeName, category, address } = await request.json()

    if (!email || !password || !name || !storeName) {
      return NextResponse.json(
        { error: 'Required fields missing' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const { data: existingUser } = await supabaseAdmin
      .from('admin_users')
      .select('email')
      .eq('email', email)
      .single()

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create vendor details
    const vendorDetails = {
      store_name: storeName,
      category,
      phone,
      address,
      applied_at: new Date().toISOString()
    }

    // Insert vendor with pending status
    const { data: newVendor, error } = await supabaseAdmin
      .from('admin_users')
      .insert({
        email,
        password_hash: hashedPassword,
        role: 'vendor',
        name,
        phone,
        status: 'pending', // Admin approval required
        vendor_details: vendorDetails
      })
      .select()
      .single()

    if (error) {
      console.error('Registration error:', error)
      return NextResponse.json(
        { error: 'Registration failed' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Registration successful! Please wait for admin approval.',
      vendor: {
        id: newVendor.id,
        email: newVendor.email,
        name: newVendor.name,
        status: newVendor.status
      }
    })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    )
  }
}