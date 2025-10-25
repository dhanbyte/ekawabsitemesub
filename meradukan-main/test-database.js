// Test database connection and tables
import { supabaseAdmin } from './lib/supabase.js'

async function testDatabase() {
  try {
    console.log('🔍 Testing database connection...')
    
    // Test 1: Check admin_users table
    const { data: adminUsers, error: adminError } = await supabaseAdmin
      .from('admin_users')
      .select('*')
      .limit(1)
    
    if (adminError) {
      console.error('❌ Admin users table error:', adminError)
      return false
    }
    console.log('✅ Admin users table working:', adminUsers.length, 'records')
    
    // Test 2: Check products table
    const { data: products, error: productsError } = await supabaseAdmin
      .from('products')
      .select('*')
      .limit(1)
    
    if (productsError) {
      console.error('❌ Products table error:', productsError)
      return false
    }
    console.log('✅ Products table working:', products.length, 'records')
    
    // Test 3: Check categories table
    const { data: categories, error: categoriesError } = await supabaseAdmin
      .from('categories')
      .select('*')
    
    if (categoriesError) {
      console.error('❌ Categories table error:', categoriesError)
      return false
    }
    console.log('✅ Categories table working:', categories.length, 'records')
    
    // Test 4: Check orders table
    const { data: orders, error: ordersError } = await supabaseAdmin
      .from('orders')
      .select('*')
      .limit(1)
    
    if (ordersError) {
      console.error('❌ Orders table error:', ordersError)
      return false
    }
    console.log('✅ Orders table working:', orders.length, 'records')
    
    console.log('🎉 Database setup complete and working!')
    return true
    
  } catch (error) {
    console.error('❌ Database test failed:', error)
    return false
  }
}

testDatabase()