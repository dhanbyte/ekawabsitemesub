'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { BarChart3, Package, Users, ShoppingCart, ArrowLeft, Plus, Star, Gift, Settings, Menu, X } from 'lucide-react'

const menuSections = [
  {
    title: 'ShopWave Management',
    items: [
      { icon: BarChart3, label: 'Dashboard', href: '/admin', emoji: '📊' },
      { icon: ShoppingCart, label: 'Orders', href: '/admin/orders', emoji: '📦' },
      { icon: Users, label: 'Customers', href: '/admin/customers', emoji: '👥' },
      { icon: Package, label: 'Products', href: '/admin/products', emoji: '🛍️' },
      { icon: Plus, label: 'Add Product', href: '/admin/add-product', emoji: '➕' },
      { icon: Star, label: 'Reviews', href: '/admin/reviews', emoji: '⭐' },
      { icon: Gift, label: 'Referrals', href: '/admin/referrals', emoji: '🎁' },
      { icon: Settings, label: 'Home Page', href: '/admin/home-management', emoji: '🏠' },
    ]
  },
  {
    title: 'Vendor Management',
    items: [
      { icon: Users, label: 'All Vendors', href: '/admin/vendors', emoji: '🏢' },
      { icon: Package, label: 'Vendor Products', href: '/admin/vendor-products', emoji: '📦' },
      { icon: ShoppingCart, label: 'Vendor Orders', href: '/admin/vendor-orders', emoji: '💼' },
      { icon: BarChart3, label: 'Vendor Analytics', href: '/admin/vendor-analytics', emoji: '📈' },
    ]
  },
  {
    title: 'System Management',
    items: [
      { icon: BarChart3, label: 'Combined Analytics', href: '/admin/analytics', emoji: '📈' },
      { icon: Settings, label: 'Settings', href: '/admin/settings', emoji: '⚙️' },
    ]
  }
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const SidebarContent = () => (
    <>
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-800">Unified Admin</h2>
        <p className="text-xs text-gray-500 mt-1">ShopWave + Vendor Management</p>
      </div>
      
      <nav className="mt-4 pb-20">
        {menuSections.map((section, sectionIndex) => (
          <div key={section.title} className={sectionIndex > 0 ? 'mt-8' : ''}>
            <div className="px-6 py-3 border-b border-gray-100">
              <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                {section.title}
              </h3>
            </div>
            <div className="mt-2">
              {section.items.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-600 border-r-3 border-blue-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <span className="text-base mr-3">{item.emoji}</span>
                    <span className="flex-1">{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="absolute bottom-6 left-6 right-6">
        <Link
          href="/"
          className="flex items-center px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Website
        </Link>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
      >
        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 bg-white shadow-lg h-screen fixed left-0 top-0 z-40 overflow-y-auto">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <>
          <div 
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="md:hidden w-64 bg-white shadow-lg h-screen fixed left-0 top-0 z-50 overflow-y-auto">
            <SidebarContent />
          </div>
        </>
      )}
    </>
  )
}