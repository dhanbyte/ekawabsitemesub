
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, email, fullName, phone } = body;

    if (!userId || !email || !fullName) {
      return NextResponse.json({ 
        success: false, 
        error: 'Missing required fields' 
      }, { status: 400 });
    }

    // Upsert user data in Supabase
    const { data: user, error } = await supabaseAdmin
      .from('users')
      .upsert({
        id: userId,
        email: email,
        full_name: fullName,
        phone: phone,
        coins: 5, // Welcome coins
        referral_code: Math.random().toString(36).substring(2, 10).toUpperCase()
      }, { onConflict: 'id' });

    if (error) {
      console.error('Error upserting user in Supabase:', error);
      throw new Error(error.message);
    }

    return NextResponse.json({ 
      success: true, 
      user: user,
      message: 'User registered/updated successfully' 
    });

  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to register user'
    }, { status: 500 });
  }
}
