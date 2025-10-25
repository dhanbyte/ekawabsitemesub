import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://lfryvohudzqbzmbeeukr.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxmcnl2b2h1ZHpxYnptYmVldWtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyMjU2NTAsImV4cCI6MjA3NjgwMTY1MH0.0BV4yK5xgiYYjj_3Jlu66A4KwrMF7YGfUrPpVrPWvik'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxmcnl2b2h1ZHpxYnptYmVldWtyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTIyNTY1MCwiZXhwIjoyMDc2ODAxNjUwfQ.mpvLSZQoGlFfoPJUmTXo5xkDqcIeyaTD3pfb1ntzBzM'

// Client for frontend (with RLS)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client for backend (bypasses RLS)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

// Database types
export interface Product {
  id: string
  name: string
  description?: string
  category: string
  subcategory?: string
  brand?: string
  price: number
  original_price?: number
  image_url?: string
  extra_images?: string[]
  quantity: number
  in_stock: boolean
  slug?: string
  is_new: boolean
  vendor_id?: string
  vendor_name?: string
  is_vendor_product: boolean
  vendor_commission?: number
  created_at: string
  updated_at: string
}

export interface Vendor {
  id: string
  name: string
  email: string
  phone: string
  business_address: string
  business_info?: string
  commission_rate: number
  payment_details?: any
  status: string
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  product_id: string
  vendor_id?: string
  customer_name: string
  customer_email: string
  customer_phone?: string
  shipping_address: string
  quantity: number
  total_amount: number
  payment_status: string
  order_status: string
  is_vendor_order: boolean
  created_at: string
  updated_at: string
}