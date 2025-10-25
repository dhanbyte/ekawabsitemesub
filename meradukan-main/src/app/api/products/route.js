import { NextResponse } from 'next/server'
import { TABLES } from '../../../lib/supabase'
import { getCurrentUser, supabaseAdmin } from '../../../lib/supabase'
import { getRecordById, getAllRecords, createRecord, updateRecord, deleteRecord } from '../../../lib/db-utils'

// GET - Fetch products
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const vendorId = searchParams.get('vendorId')
    const productId = searchParams.get('id')
    
    // Get single product by ID if ID is provided
    if (productId) {
      const product = await getRecordById(TABLES.PRODUCTS, productId)
      if (!product) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 })
      }
      return NextResponse.json({ success: true, product })
    }
    
    // Get all products with optional vendor filter
    const filters = { status: 'active' }
    if (vendorId) {
      filters.vendor_id = vendorId
    }
    
    const products = await getAllRecords(TABLES.PRODUCTS, filters)
    
    // Get vendor details for each product
    const productsWithVendors = await Promise.all(products.map(async (product) => {
      if (product.vendor_id) {
        const { data: vendor } = await supabaseAdmin
          .from('admin_users')
          .select('name, vendor_details')
          .eq('id', product.vendor_id)
          .single()
        
        return { ...product, vendor }
      }
      return product
    }))

    return NextResponse.json({
      success: true,
      products: productsWithVendors || []
    })
    
  } catch (error) {
    console.error('Products API error:', error)
    return NextResponse.json(
      { error: error.message || 'Server error' }, 
      { status: error.status || 500 }
    )
  }
}

// POST - Create product
export async function POST(request) {
  try {
    // Verify user is authenticated
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // Only vendors and admins can create products
    if (user.role !== 'vendor' && user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    
    const productData = await request.json()
    
    // Add vendor ID if user is a vendor
    if (user.role === 'vendor') {
      productData.vendor_id = user.id
    }
    
    // Create the product
    const newProduct = await createRecord(TABLES.PRODUCTS, {
      ...productData,
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    
    return NextResponse.json({
      success: true,
      product: newProduct
    })
    
  } catch (error) {
    console.error('Create product error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create product' },
      { status: error.status || 500 }
    )
  }
}

// PUT - Update product
export async function PUT(request) {
  try {
    // Verify user is authenticated
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const { id, ...updates } = await request.json()
    
    if (!id) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 })
    }
    
    // Get the existing product to check permissions
    const existingProduct = await getRecordById(TABLES.PRODUCTS, id)
    if (!existingProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }
    
    // Only the vendor who owns the product or an admin can update it
    if (user.role !== 'admin' && existingProduct.vendor_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    
    // Update the product
    const updatedProduct = await updateRecord(TABLES.PRODUCTS, id, {
      ...updates,
      updated_at: new Date().toISOString()
    })
    
    return NextResponse.json({
      success: true,
      product: updatedProduct
    })
    
  } catch (error) {
    console.error('Update product error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update product' },
      { status: error.status || 500 }
    )
  }
}

// DELETE - Delete product
export async function DELETE(request) {
  try {
    // Verify user is authenticated
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 })
    }
    
    // Get the existing product to check permissions
    const existingProduct = await getRecordById(TABLES.PRODUCTS, id)
    if (!existingProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }
    
    // Only the vendor who owns the product or an admin can delete it
    if (user.role !== 'admin' && existingProduct.vendor_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    
    // Soft delete by updating status
    await updateRecord(TABLES.PRODUCTS, id, {
      status: 'deleted',
      deleted_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    
    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully'
    })
    
  } catch (error) {
    console.error('Delete product error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to delete product' },
      { status: error.status || 500 }
    )
  }
}
        price_discounted: productData.price_discounted,
        quantity: productData.quantity,
        images: productData.images || [],
        main_image: productData.main_image,
        vendor_id: user.id,
        status: user.role === 'admin' ? 'active' : 'pending'
      })
      .select()
      .single()

    if (error) {
      console.error('Product creation error:', error)
      return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      product
    })

  } catch (error) {
    console.error('Product creation error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// PUT - Update product
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

    const { id, ...updateData } = await request.json()
    
    let query = supabaseAdmin
      .from('products')
      .update(updateData)
      .eq('id', id)

    // Vendors can only update their own products
    if (user.role === 'vendor') {
      query = query.eq('vendor_id', user.id)
    }

    const { data: product, error } = await query
      .select()
      .single()

    if (error) {
      console.error('Product update error:', error)
      return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      product
    })

  } catch (error) {
    console.error('Product update error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}