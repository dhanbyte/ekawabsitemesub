import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    console.log('Testing Supabase connection...');
    
    // Test connection
    const { data, error } = await supabaseAdmin
      .from('products')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ 
        success: false, 
        error: error.message 
      });
    }
    
    console.log('Supabase connection successful');
    
    return NextResponse.json({ 
      success: true, 
      message: 'Supabase connected successfully',
      data 
    });
    
  } catch (error) {
    console.error('Test error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
}