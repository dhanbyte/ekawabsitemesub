
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { verifyToken } from '@/lib/auth';

interface User {
    id: string;
    role: string;
}

// GET - Fetch products
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const vendorId = searchParams.get('vendorId');
        const productId = searchParams.get('id');

        // Get single product by ID if ID is provided
        if (productId) {
            const { data: product, error } = await supabaseAdmin
                .from('products')
                .select('*')
                .eq('id', productId)
                .single();

            if (error) throw error;
            if (!product) {
                return NextResponse.json({ error: 'Product not found' }, { status: 404 });
            }
            return NextResponse.json({ success: true, product });
        }

        // Get all products with optional vendor filter
        let query = supabaseAdmin
            .from('products')
            .select(`
                *,
                vendors(name, commission_rate)
            `)
            .eq('status', 'active');

        if (vendorId) {
            query = query.eq('vendor_id', vendorId);
        }

        const { data: products, error } = await query;

        if (error) throw error;

        return NextResponse.json({
            success: true,
            products: products || []
        });

    } catch (error: any) {
        console.error('Products API error:', error);
        return NextResponse.json(
            { error: error.message || 'Server error' },
            { status: error.status || 500 }
        );
    }
}

// POST - Create product
export async function POST(request: NextRequest) {
    try {
        const authHeader = request.headers.get('authorization');
        if (!authHeader) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const token = authHeader.substring(7);
        const user = verifyToken(token) as User | null;
        if (!user) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
        }

        if (user.role !== 'vendor' && user.role !== 'admin') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const productData = await request.json();

        if (user.role === 'vendor') {
            productData.vendor_id = user.id;
        }

        const { data: newProduct, error } = await supabaseAdmin
            .from('products')
            .insert({
                ...productData,
                status: 'active',
            })
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json({ success: true, product: newProduct });

    } catch (error: any) {
        console.error('Create product error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to create product' },
            { status: error.status || 500 }
        );
    }
}

// PUT - Update product
export async function PUT(request: NextRequest) {
    try {
        const authHeader = request.headers.get('authorization');
        if (!authHeader) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const token = authHeader.substring(7);
        const user = verifyToken(token) as User | null;
        if (!user) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
        }

        const { id, ...updates } = await request.json();

        if (!id) {
            return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
        }

        const { data: existingProduct, error: fetchError } = await supabaseAdmin
            .from('products')
            .select('vendor_id')
            .eq('id', id)
            .single();

        if (fetchError) throw fetchError;
        if (!existingProduct) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        if (user.role !== 'admin' && existingProduct.vendor_id !== user.id) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const { data: updatedProduct, error: updateError } = await supabaseAdmin
            .from('products')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (updateError) throw updateError;

        return NextResponse.json({ success: true, product: updatedProduct });

    } catch (error: any) {
        console.error('Update product error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to update product' },
            { status: error.status || 500 }
        );
    }
}

// DELETE - Delete product
export async function DELETE(request: NextRequest) {
    try {
        const authHeader = request.headers.get('authorization');
        if (!authHeader) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const token = authHeader.substring(7);
        const user = verifyToken(token) as User | null;
        if (!user) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
        }

        const { data: existingProduct, error: fetchError } = await supabaseAdmin
            .from('products')
            .select('vendor_id')
            .eq('id', id)
            .single();

        if (fetchError) throw fetchError;
        if (!existingProduct) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        if (user.role !== 'admin' && existingProduct.vendor_id !== user.id) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const { error: deleteError } = await supabaseAdmin
            .from('products')
            .update({ status: 'deleted', deleted_at: new Date().toISOString() })
            .eq('id', id);

        if (deleteError) throw deleteError;

        return NextResponse.json({ success: true, message: 'Product deleted successfully' });

    } catch (error: any) {
        console.error('Delete product error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to delete product' },
            { status: error.status || 500 }
        );
    }
}
