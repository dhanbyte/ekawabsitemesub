import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'

// This function will be called at runtime, not during build time
async function getRelatedProducts(request) {
  // Skip database operations during build time
  if (process.env.NEXT_PHASE === 'phase-production-build' || 
      process.env.npm_lifecycle_event === 'build') {
    return NextResponse.json([]);
  }

  let client;
  const uri = process.env.MONGODB_URIS;
  
  // Return empty response if MongoDB is not configured
  if (!uri) {
    return NextResponse.json([]);
  }

  try {
    // Create a new connection for each request
    client = new MongoClient(uri, {
      retryWrites: true,
      w: 'majority',
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 15000,
      socketTimeoutMS: 15000,
    });

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || 'tech';
    const exclude = searchParams.get('exclude');
    const limit = parseInt(searchParams.get('limit') || '8');

    await client.connect();
    const db = client.db(process.env.MONGODB_DB_NAME || 'shopwave');
    const productsCollection = db.collection('products');
    const vendorsCollection = db.collection('vendors');

    // Get active vendors (not suspended)
    const activeVendors = await vendorsCollection
      .find({ status: { $ne: 'suspended' } })
      .project({ _id: 1 })
      .toArray()
    
    const activeVendorIds = activeVendors.map(v => v._id.toString())

    const query = { 
      category,
      $or: [
        { vendorId: { $exists: false } }, // Regular products
        { vendorId: { $in: activeVendorIds } } // Products from active vendors only
      ],
      ...(exclude && { _id: { $ne: exclude } })
    }

    const relatedProducts = await productsCollection
      .find(query)
      .limit(limit)
      .toArray()

    const formattedProducts = relatedProducts.map(product => ({
      id: product._id,
      name: product.name,
      brand: product.brand,
      slug: product.slug || product._id,
      image: product.images?.[0] || '/placeholder-product.jpg',
      price: {
        original: product.originalPrice || product.price,
        discounted: product.discountPrice || product.price
      },
      ratings: {
        average: 4.5,
        count: Math.floor(Math.random() * 100) + 10
      },
      quantity: product.stock || 0
    }))

    return NextResponse.json({ 
      success: true, 
      products: formattedProducts 
    });
  } catch (error) {
    console.error('Error fetching related products:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to fetch related products' 
    }, { status: 500 });
  } finally {
    if (client) {
      try {
        await client.close();
      } catch (e) {
        console.error('Error closing MongoDB connection:', e);
      }
    }
  }
}

// Export the GET handler
export async function GET(request) {
  return getRelatedProducts(request);
}

// Export the POST handler for build time
export async function POST() {
  return NextResponse.json({ success: true });
}