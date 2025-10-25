// Simple database test
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

console.log('URL:', supabaseUrl ? 'Found' : 'Missing')
console.log('Key:', supabaseKey ? 'Found' : 'Missing')

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Environment variables missing')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function testTables() {
  try {
    // Test categories
    const { data, error } = await supabase
      .from('categories')
      .select('*')
    
    if (error) {
      console.error('❌ Error:', error.message)
      return
    }
    
    console.log('✅ Database working! Categories found:', data.length)
    console.log('Categories:', data.map(c => c.name))
    
  } catch (err) {
    console.error('❌ Test failed:', err.message)
  }
}

testTables()