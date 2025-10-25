
import { NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../../lib/supabase.js'
import { hashPassword } from '../../../../lib/auth.js'

export async function POST(request) {
  try {
    const { email, password, name, role = 'user', phone, storeName, category, address } = await request.json()

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password and name are required' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const { data: existingUser } = await supabaseAdmin
      .from('users')
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

    let userData = {
      email,
      password_hash: hashedPassword,
      role,
      name,
      phone,
      status: 'active',
    };

    if (role === 'vendor') {
      if (!storeName) {
        return NextResponse.json(
          { error: 'Store name is required for vendors' },
          { status: 400 }
        )
      }
      userData.status = 'pending';
      userData.vendor_details = {
        store_name: storeName,
        category,
        address,
        applied_at: new Date().toISOString()
      };
    }

    // Insert user
    const { data: newUser, error } = await supabaseAdmin
      .from('users')
      .insert(userData)
      .select()
      .single()

    if (error) {
      console.error('Registration error:', error)
      return NextResponse.json(
        { error: 'Registration failed' },
        { status: 500 }
      )
    }

    let message = 'Registration successful!';
    if (role === 'vendor') {
      message = 'Registration successful! Please wait for admin approval.';
    }

    return NextResponse.json({
      success: true,
      message,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        status: newUser.status
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
