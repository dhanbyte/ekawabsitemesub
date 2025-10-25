import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// Receive products from VendorCentral
export async function POST(request: Request) {
  try {
    // Verify API key
    const apiKey = request.headers.get('Authorization')?.replace('Bearer ', '');
    if (apiKey !== process.env.VENDOR_SYNC_API_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const productData = await request.json();
    console.log('Received vendor product:', productData);

    // Insert product into Supabase
    const { data: product, error } = await supabaseAdmin
      .from('products')
      .insert({
        name: productData.name,
        description: productData.description,
        category: productData.category || 'General',
        subcategory: productData.subcategory,
        brand: productData.brand,
        price: productData.price,
        original_price: productData.originalPrice,
        image_url: productData.image,
        quantity: productData.quantity,
        in_stock: productData.quantity > 0,
        slug: productData.slug,
        is_new: true,
        vendor_id: productData.vendorId,
        vendor_name: productData.vendorName,
        is_vendor_product: true,
        vendor_commission: productData.vendorCommission || 10
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: 'Failed to sync product' }, { status: 500 });
    }

    console.log('Product synced to Shopwave:', product.id);
    
    return NextResponse.json({ 
      success: true, 
      productId: product.id,
      message: 'Product synced successfully' 
    });

  } catch (error) {
    console.error('Vendor sync error:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}