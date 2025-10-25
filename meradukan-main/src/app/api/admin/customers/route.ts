import { NextResponse } from 'next/server'

import dbConnect from '../../../../lib/dbConnect'
import AdminUser from '../../../../models/AdminUser'
import mongoose from 'mongoose'

const CartSchema = new mongoose.Schema({ userId: String, items: Array });
const WishlistSchema = new mongoose.Schema({ userId: String, items: Array });

const Cart = mongoose.models.Cart || mongoose.model('Cart', CartSchema);
const Wishlist = mongoose.models.Wishlist || mongoose.model('Wishlist', WishlistSchema);

export async function GET() {
  try {
    let customers: any[] = []
    

    
    try {
      await dbConnect()
      const customerData = await AdminUser.find({}).lean()
      
      for (const customer of customerData) {
        try {
          const cart = await Cart.findOne({ userId: customer.userId })
          const wishlist = await Wishlist.findOne({ userId: customer.userId })
          
          customers.push({
            id: customer.userId,
            name: customer.fullName || customer.name,
            email: customer.email,
            phone: customer.phone || 'No phone',
            wishlistCount: wishlist?.items?.length || 0,
            cartCount: cart?.items?.length || 0,
            orders: customer.totalOrders || 0,
            totalSpent: customer.totalSpent || 0,
            status: customer.status || 'Active',
            joinedDate: customer.createdAt,
            lastActivity: customer.updatedAt
          })
        } catch (itemError) {
          customers.push({
            id: customer.userId,
            name: customer.fullName || customer.name,
            email: customer.email,
            phone: customer.phone || 'No phone',
            wishlistCount: 0,
            cartCount: 0,
            orders: customer.totalOrders || 0,
            totalSpent: customer.totalSpent || 0,
            status: customer.status || 'Active',
            joinedDate: customer.createdAt,
            lastActivity: customer.updatedAt
          })
        }
      }
      
    } catch (dbError) {
      console.warn('Could not fetch customers:', dbError)
    }

    return NextResponse.json({
      success: true,
      customers,
      total: customers.length
    })
    
  } catch (error) {
    console.error('Error fetching customers:', error)
    return NextResponse.json(
      { success: true, customers: [], total: 0 },
      { status: 200 }
    )
  }
}