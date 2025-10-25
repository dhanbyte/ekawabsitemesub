'use client'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Download, Print } from 'lucide-react'
import Link from 'next/link'

export default function InvoicePage({ params }: { params: { orderId: string } }) {
  const [order, setOrder] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchOrder()
  }, [])

  const fetchOrder = async () => {
    try {
      const mockOrders = {
        'alice': {
          orderId: params.orderId,
          userId: 'alice@example.com',
          status: 'delivered',
          total: 32998,
          createdAt: '2023-10-26',
          items: [
            { name: 'iPhone 15 Pro', quantity: 1, price: 29999, image: '/images/iphone.jpg' },
            { name: 'AirPods Pro', quantity: 1, price: 2999, image: '/images/airpods.jpg' }
          ],
          shippingAddress: {
            name: 'Alice Johnson',
            phone: '+91 9876543210',
            address: '123 MG Road, Sector 14',
            city: 'Gurgaon',
            state: 'Haryana',
            pincode: '122001'
          },
          paymentId: 'pay_alice123',
          paymentMethod: 'Prepaid'
        },
        'bob': {
          orderId: params.orderId,
          userId: 'bob@example.com',
          status: 'shipped',
          total: 12999,
          createdAt: '2023-10-25',
          items: [
            { name: 'Samsung Galaxy Watch', quantity: 1, price: 12999, image: '/images/watch.jpg' }
          ],
          shippingAddress: {
            name: 'Bob Williams',
            phone: '+91 9876543211',
            address: '456 Park Street',
            city: 'Delhi',
            state: 'Delhi',
            pincode: '110001'
          },
          paymentId: 'pay_bob456',
          paymentMethod: 'COD'
        }
      }
      
      const orderKey = params.orderId.includes('alice') ? 'alice' : 'bob'
      const mockOrder = mockOrders[orderKey] || mockOrders['alice']
      setOrder(mockOrder)
    } catch (error) {
      console.error('Error fetching order:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Get current vendor details - replace with actual vendor data from auth
  const getCurrentVendor = () => {
    const isVendor = window.location.pathname.includes('/vendor/')
    if (isVendor) {
      return {
        name: 'My Vendor Store', // Replace with actual vendor name
        address: 'Vendor Address, City, State - 123456',
        phone: '+91 9876543210',
        email: 'myvendor@example.com',
        gst: 'GST987654321'
      }
    }
    return {
      name: 'ShopWave Electronics',
      address: 'Plot 45, Cyber City, Gurgaon, Haryana - 122002',
      phone: '+91 1234567890',
      email: 'vendor@shopwave.com',
      gst: 'GST123456789'
    }
  }
  
  const vendorDetails = getCurrentVendor()

  const qrData = order ? `Order: ${order.orderId}, Customer: ${order.shippingAddress?.name}, Phone: ${order.shippingAddress?.phone}, Total: ₹${order.total}, Date: ${new Date(order.createdAt).toLocaleDateString()}, Vendor: ${vendorDetails.name}` : ''

  const handlePrint = () => {
    window.print()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Order Not Found</h2>
          <Link href="/admin/orders">
            <Button>Back to Orders</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6 print:hidden">
        <div className="flex justify-between items-center mb-6">
          <Link href="/admin/orders">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Orders
            </Button>
          </Link>
          <div className="flex gap-2">
            <Button onClick={handlePrint} variant="outline">
              <Print className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button onClick={handlePrint}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white shadow-lg print:shadow-none print:max-w-none">
        <div className="p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-blue-600 mb-2">SHOPWAVE</h1>
              <p className="text-gray-600">E-commerce Platform</p>
            </div>
            <div className="text-right">
              <h2 className="text-2xl font-bold mb-2">INVOICE</h2>
              <p className="text-gray-600">#{order.orderId}</p>
              <p className="text-sm text-gray-500">
                Date: {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-blue-600">Vendor Details</h3>
              <div className="space-y-1 text-sm">
                <p className="font-medium">{vendorDetails.name}</p>
                <p>{vendorDetails.address}</p>
                <p>Phone: {vendorDetails.phone}</p>
                <p>Email: {vendorDetails.email}</p>
                <p>GST: {vendorDetails.gst}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-blue-600">Customer Details</h3>
              <div className="space-y-1 text-sm">
                <p className="font-medium">{order.shippingAddress?.name}</p>
                <p>Phone: {order.shippingAddress?.phone}</p>
                <p>Email: {order.userId}</p>
                <p>{order.shippingAddress?.address}</p>
                <p>{order.shippingAddress?.city}, {order.shippingAddress?.state}</p>
                <p>Pincode: {order.shippingAddress?.pincode}</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-blue-600">Order Items</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-2 text-left">Item</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">Qty</th>
                    <th className="border border-gray-300 px-4 py-2 text-right">Price</th>
                    <th className="border border-gray-300 px-4 py-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items?.map((item: any, index: number) => (
                    <tr key={index}>
                      <td className="border border-gray-300 px-4 py-2">
                        <div className="flex items-center gap-3">
                          <img 
                            src={item.image || '/images/placeholder.jpg'} 
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <span className="font-medium">{item.name}</span>
                        </div>
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">{item.quantity}</td>
                      <td className="border border-gray-300 px-4 py-2 text-right">₹{item.price.toLocaleString()}</td>
                      <td className="border border-gray-300 px-4 py-2 text-right">₹{(item.price * item.quantity).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50 font-semibold">
                    <td colSpan={3} className="border border-gray-300 px-4 py-2 text-right">Total Amount:</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">₹{order.total.toLocaleString()}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-blue-600">Payment Details</h3>
              <div className="space-y-1 text-sm">
                <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                <p><strong>Payment ID:</strong> {order.paymentId}</p>
                <p><strong>Status:</strong> <span className="text-green-600 font-medium">Paid</span></p>
                <p><strong>Order Status:</strong> <span className="capitalize font-medium">{order.status}</span></p>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <h3 className="text-lg font-semibold mb-3 text-blue-600">Order QR Code</h3>
              <div className="bg-white p-4 border-2 border-gray-200 rounded-lg">
                <div className="w-32 h-32 bg-gray-100 flex items-center justify-center text-xs text-center">
                  QR Code<br/>
                  {order.orderId}<br/>
                  ₹{order.total}
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Scan for order details
              </p>
            </div>
          </div>

          <div className="border-t pt-6 text-center text-sm text-gray-500">
            <p className="mb-2">Thank you for shopping with ShopWave!</p>
            <p>For any queries, contact us at support@shopwave.com or +91 1234567890</p>
            <p className="mt-4 text-xs">This is a computer generated invoice and does not require signature.</p>
          </div>
        </div>
      </div>
    </div>
  )
}