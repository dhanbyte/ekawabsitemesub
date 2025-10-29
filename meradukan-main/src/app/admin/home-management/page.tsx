'use client'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Eye, Edit, Trash2, Plus, Save, X } from 'lucide-react'

export default function HomeManagementPage() {
  const [banners, setBanners] = useState([])
  const [categories, setCategories] = useState([])
  const [offers, setOffers] = useState([])
  const [navMenus, setNavMenus] = useState([])
  const [editingItem, setEditingItem] = useState(null)
  const [editType, setEditType] = useState('')

  useEffect(() => {
    fetchHomeData()
  }, [])

  const fetchHomeData = () => {
    // Mock home page data
    setBanners([
      { id: 1, title: 'Summer Sale', subtitle: 'Up to 50% Off', image: '/banner1.jpg', link: '/sale', active: true },
      { id: 2, title: 'New Arrivals', subtitle: 'Latest Products', image: '/banner2.jpg', link: '/new-arrivals', active: true },
      { id: 3, title: 'Electronics Deal', subtitle: 'Best Prices', image: '/banner3.jpg', link: '/electronics', active: false }
    ])

    setNavMenus([
      { id: 1, name: 'Tech', link: '/search?category=Tech', order: 1, active: true },
      { id: 2, name: 'Tech Accessories', link: '/search?category=Tech&sub=accessories', order: 2, active: true },
      { id: 3, name: 'Home', link: '/search?category=Home', order: 3, active: true },
      { id: 4, name: 'Home & Kitchen', link: '/search?category=Home&sub=kitchen', order: 4, active: true },
      { id: 5, name: 'New Arrivals', link: '/new-arrivals', order: 5, active: true },
      { id: 6, name: 'Top Offers', link: '/offers', order: 6, active: true },
      { id: 7, name: 'Shop by Category', link: '/categories', order: 7, active: false }
    ])

    setCategories([
      { id: 1, name: 'Electronics', image: '/cat1.jpg', productCount: 145, active: true },
      { id: 2, name: 'Fashion', image: '/cat2.jpg', productCount: 89, active: true },
      { id: 3, name: 'Home & Garden', image: '/cat3.jpg', productCount: 67, active: true },
      { id: 4, name: 'Sports', image: '/cat4.jpg', productCount: 34, active: false }
    ])

    setOffers([
      { id: 1, title: 'Flash Sale', description: '24 Hour Deal', discount: '60%', code: 'FLASH60', active: true },
      { id: 2, title: 'First Order', description: 'New Customer Offer', discount: '25%', code: 'NEW25', active: true },
      { id: 3, title: 'Weekend Special', description: 'Saturday Sunday Only', discount: '40%', code: 'WEEKEND40', active: false }
    ])
  }

  const handleEdit = (item, type) => {
    setEditingItem({ ...item })
    setEditType(type)
  }

  const handleSave = () => {
    if (editType === 'banner') {
      setBanners(banners.map(b => b.id === editingItem.id ? editingItem : b))
    } else if (editType === 'category') {
      setCategories(categories.map(c => c.id === editingItem.id ? editingItem : c))
    } else if (editType === 'offer') {
      setOffers(offers.map(o => o.id === editingItem.id ? editingItem : o))
    } else if (editType === 'menu') {
      if (navMenus.find(m => m.id === editingItem.id)) {
        setNavMenus(navMenus.map(m => m.id === editingItem.id ? editingItem : m))
      } else {
        setNavMenus([...navMenus, editingItem])
      }
    }
    setEditingItem(null)
    setEditType('')
  }

  const handleDelete = (id, type) => {
    if (confirm('Are you sure you want to delete this item?')) {
      if (type === 'banner') {
        setBanners(banners.filter(b => b.id !== id))
      } else if (type === 'category') {
        setCategories(categories.filter(c => c.id !== id))
      } else if (type === 'offer') {
        setOffers(offers.filter(o => o.id !== id))
      } else if (type === 'menu') {
        setNavMenus(navMenus.filter(m => m.id !== id))
      }
    }
  }

  const toggleActive = (id, type) => {
    if (type === 'banner') {
      setBanners(banners.map(b => b.id === id ? { ...b, active: !b.active } : b))
    } else if (type === 'category') {
      setCategories(categories.map(c => c.id === id ? { ...c, active: !c.active } : c))
    } else if (type === 'offer') {
      setOffers(offers.map(o => o.id === id ? { ...o, active: !o.active } : o))
    } else if (type === 'menu') {
      setNavMenus(navMenus.map(m => m.id === id ? { ...m, active: !m.active } : m))
    }
  }

  return (
    <div className="flex">
      {/* Left Sidebar */}
      <div className="w-64 bg-white shadow-lg h-screen fixed left-64 top-0 z-30 border-r">
        <div className="p-4">
          <h3 className="font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <Button className="w-full justify-start" onClick={() => handleEdit({id: Date.now(), title: '', subtitle: '', image: '', link: '', active: true}, 'banner')}>
              <Plus className="h-4 w-4 mr-2" />
              Add Banner
            </Button>
            <Button className="w-full justify-start" onClick={() => handleEdit({id: Date.now(), name: '', image: '', productCount: 0, active: true}, 'category')}>
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
            <Button className="w-full justify-start" onClick={() => handleEdit({id: Date.now(), title: '', description: '', discount: '', code: '', active: true}, 'offer')}>
              <Plus className="h-4 w-4 mr-2" />
              Add Offer
            </Button>
            <Button className="w-full justify-start" onClick={() => handleEdit({id: Date.now(), name: '', link: '', order: navMenus.length + 1, active: true}, 'menu')}>
              <Plus className="h-4 w-4 mr-2" />
              Add Menu Item
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => window.open('/', '_blank')}>
              <Eye className="h-4 w-4 mr-2" />
              Preview Site
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={fetchHomeData}>
              <Save className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Home Page Management</h1>
          <p className="text-gray-600">Manage banners, categories, and offers on homepage</p>
        </div>

        {/* Banners Section */}
        <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Hero Banners

          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="text-left p-3">Banner</th>
                  <th className="text-left p-3">Content</th>
                  <th className="text-left p-3">Link</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {banners.map((banner) => (
                  <tr key={banner.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <img src={banner.image} alt={banner.title} className="w-16 h-10 object-cover rounded" />
                        <div>
                          <div className="font-medium">{banner.title}</div>
                          <div className="text-sm text-gray-500">{banner.subtitle}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="text-sm">
                        <div>Title: {banner.title}</div>
                        <div>Subtitle: {banner.subtitle}</div>
                      </div>
                    </td>
                    <td className="p-3 text-sm">{banner.link}</td>
                    <td className="p-3">
                      <button
                        onClick={() => toggleActive(banner.id, 'banner')}
                        className={`px-2 py-1 rounded text-xs ${
                          banner.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {banner.active ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(banner, 'banner')}>
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(banner.id, 'banner')}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

        {/* Categories Section */}
        <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Featured Categories

          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <div key={category.id} className="border rounded-lg p-4">
                <img src={category.image} alt={category.name} className="w-full h-24 object-cover rounded mb-3" />
                <div className="text-center">
                  <h3 className="font-medium">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.productCount} products</p>
                  <div className="flex justify-center gap-1 mt-2">
                    <button
                      onClick={() => toggleActive(category.id, 'category')}
                      className={`px-2 py-1 rounded text-xs ${
                        category.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {category.active ? 'Active' : 'Inactive'}
                    </button>
                  </div>
                  <div className="flex justify-center gap-1 mt-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(category, 'category')}>
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(category.id, 'category')}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

        {/* Navigation Menu Section */}
        <Card>
          <CardHeader>
            <CardTitle>Navigation Menu Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr>
                    <th className="text-left p-3">Order</th>
                    <th className="text-left p-3">Menu Name</th>
                    <th className="text-left p-3">Link</th>
                    <th className="text-left p-3">Status</th>
                    <th className="text-left p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {navMenus.sort((a, b) => a.order - b.order).map((menu) => (
                    <tr key={menu.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                          #{menu.order}
                        </span>
                      </td>
                      <td className="p-3 font-medium">{menu.name}</td>
                      <td className="p-3 text-sm text-gray-600">{menu.link}</td>
                      <td className="p-3">
                        <button
                          onClick={() => toggleActive(menu.id, 'menu')}
                          className={`px-2 py-1 rounded text-xs ${
                            menu.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {menu.active ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td className="p-3">
                        <div className="flex gap-1">
                          <Button variant="outline" size="sm" onClick={() => handleEdit(menu, 'menu')}>
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDelete(menu.id, 'menu')}>
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Offers Section */}
        <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Special Offers

          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {offers.map((offer) => (
              <div key={offer.id} className="border rounded-lg p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{offer.discount} OFF</div>
                  <h3 className="font-medium mt-2">{offer.title}</h3>
                  <p className="text-sm text-gray-500">{offer.description}</p>
                  <div className="bg-gray-100 px-3 py-1 rounded mt-2 text-sm font-mono">
                    {offer.code}
                  </div>
                  <div className="flex justify-center gap-1 mt-3">
                    <button
                      onClick={() => toggleActive(offer.id, 'offer')}
                      className={`px-2 py-1 rounded text-xs ${
                        offer.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {offer.active ? 'Active' : 'Inactive'}
                    </button>
                  </div>
                  <div className="flex justify-center gap-1 mt-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(offer, 'offer')}>
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(offer.id, 'offer')}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

        {/* Edit Modal */}
        {editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Edit {editType}</h3>
              <Button variant="outline" size="sm" onClick={() => setEditingItem(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              {editType === 'banner' && (
                <>
                  <Input
                    placeholder="Title"
                    value={editingItem.title}
                    onChange={(e) => setEditingItem({...editingItem, title: e.target.value})}
                  />
                  <Input
                    placeholder="Subtitle"
                    value={editingItem.subtitle}
                    onChange={(e) => setEditingItem({...editingItem, subtitle: e.target.value})}
                  />
                  <Input
                    placeholder="Image URL"
                    value={editingItem.image}
                    onChange={(e) => setEditingItem({...editingItem, image: e.target.value})}
                  />
                  <Input
                    placeholder="Link"
                    value={editingItem.link}
                    onChange={(e) => setEditingItem({...editingItem, link: e.target.value})}
                  />
                </>
              )}
              
              {editType === 'category' && (
                <>
                  <Input
                    placeholder="Category Name"
                    value={editingItem.name}
                    onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
                  />
                  <Input
                    placeholder="Image URL"
                    value={editingItem.image}
                    onChange={(e) => setEditingItem({...editingItem, image: e.target.value})}
                  />
                  <Input
                    type="number"
                    placeholder="Product Count"
                    value={editingItem.productCount}
                    onChange={(e) => setEditingItem({...editingItem, productCount: parseInt(e.target.value)})}
                  />
                </>
              )}
              
              {editType === 'offer' && (
                <>
                  <Input
                    placeholder="Offer Title"
                    value={editingItem.title}
                    onChange={(e) => setEditingItem({...editingItem, title: e.target.value})}
                  />
                  <Input
                    placeholder="Description"
                    value={editingItem.description}
                    onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                  />
                  <Input
                    placeholder="Discount (e.g., 50%)"
                    value={editingItem.discount}
                    onChange={(e) => setEditingItem({...editingItem, discount: e.target.value})}
                  />
                  <Input
                    placeholder="Coupon Code"
                    value={editingItem.code}
                    onChange={(e) => setEditingItem({...editingItem, code: e.target.value})}
                  />
                </>
              )}
              
              {editType === 'menu' && (
                <>
                  <Input
                    placeholder="Menu Name"
                    value={editingItem.name}
                    onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
                  />
                  <Input
                    placeholder="Link (e.g., /search?category=Tech)"
                    value={editingItem.link}
                    onChange={(e) => setEditingItem({...editingItem, link: e.target.value})}
                  />
                  <Input
                    type="number"
                    placeholder="Display Order"
                    value={editingItem.order}
                    onChange={(e) => setEditingItem({...editingItem, order: parseInt(e.target.value)})}
                  />
                </>
              )}
            </div>
            
            <div className="flex gap-2 mt-6">
              <Button onClick={handleSave} className="flex-1">
                <Save className="h-4 w-4 mr-1" />
                Save Changes
              </Button>
              <Button variant="outline" onClick={() => setEditingItem(null)}>
                Cancel
              </Button>
            </div>
          </div>
          </div>
        )}
      </div>
    </div>
  )
}