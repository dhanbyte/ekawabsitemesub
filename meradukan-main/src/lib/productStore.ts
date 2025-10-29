
'use client'
import { create } from 'zustand'
import type { Product } from './types'
import { HOME_PRODUCTS } from './data/home'
import { TECH_PRODUCTS } from './data/tech'
import { NEWARRIVALS_PRODUCTS } from './data/newarrivals'
import { CUSTOMIZABLE_PRODUCTS } from './data/customizable-products'



type ProductState = {
  products: Product[]
  isLoading: boolean
  initialized: boolean
  init: () => Promise<void>
  getProduct: (id: string) => Product | undefined
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Product>
  updateProduct: (id: string, updates: Partial<Product>) => Promise<Product | null>
  deleteProduct: (id: string) => Promise<boolean>
  searchProducts: (query: string) => Promise<Product[]>
  getProductsByCategory: (category: string) => Promise<Product[]>
  refetch: () => Promise<void>
}

export const useProductStore = create<ProductState>()((set, get) => ({
  products: [],
  isLoading: true,
  initialized: false,
  
  init: async () => {
    if (get().initialized) return;
    
    set({ isLoading: true });
    
    try {
      // Load JSON products first for instant display
      const jsonProducts = [
        ...TECH_PRODUCTS.slice(0, 20), 
        ...HOME_PRODUCTS.slice(0, 20), 
        ...NEWARRIVALS_PRODUCTS, // Load all New Arrivals products
        ...CUSTOMIZABLE_PRODUCTS.slice(0, 15)
      ];
      set({ products: jsonProducts, isLoading: false, initialized: true });
      
      // Load API products in background
      setTimeout(async () => {
        try {
          const response = await fetch('/api/products?limit=50');
          if (response.ok) {
            const data = await response.json();
            const apiProducts = Array.isArray(data.data) ? data.data : [];
            const allProducts = [
              ...jsonProducts, 
              ...apiProducts, 
              ...CUSTOMIZABLE_PRODUCTS
            ];
            set({ products: allProducts });
          }
        } catch (error) {
          console.error('Background API load failed:', error);
        }
      }, 100);
      
    } catch (error) {
      const fallbackProducts = [
        ...TECH_PRODUCTS.slice(0, 10), 
        ...HOME_PRODUCTS.slice(0, 10),
        ...CUSTOMIZABLE_PRODUCTS.slice(0, 10)
      ];
      set({ products: fallbackProducts, isLoading: false, initialized: true });
    }
  },

  getProduct: (id: string) => {
    return get().products.find(product => product.id === id);
  },

  addProduct: async (productData) => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || '';
      
      // Transform the data to match the API expected format
      const apiProductData = {
        name: productData.name,
        slug: productData.slug || productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        description: productData.description || '',
        price: {
          original: Number(productData.price_original) || 0,
          currency: productData.price_currency || '₹'
        },
        category: productData.category || 'Pooja',
        subcategory: productData.subcategory || 'Aasan and Mala',
        image: productData.extraImages?.[0] || '/images/placeholder.jpg',
        extraImages: productData.extraImages || [],
        features: productData.features || [],
        ratings: { 
          average: Number(productData.ratings_average) || 0, 
          count: Number(productData.ratings_count) || 0 
        },
        brand: productData.brand || '',
        quantity: Number(productData.quantity) || 0
      };

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiProductData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to add product');
      }

      const result = await response.json();
      const newProduct = result.data;
      
      if (newProduct) {
        // Update local state with the new product
        const currentProducts = get().products;
        const updatedProducts = [...currentProducts, newProduct];
        set({ products: updatedProducts });
      }
      
      return newProduct;
    } catch (error) {
      console.error("Error adding product:", error);
      throw error;
    }
  },

  updateProduct: async (id: string, updates: Partial<Product>) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update product');
      }
      
      const result = await response.json();
      const updatedProduct = result.data;
      
      if (updatedProduct) {
        const currentProducts = get().products;
        const updatedProducts = currentProducts.map(product => 
          product.id === id ? updatedProduct : product
        );
        set({ products: updatedProducts });
      }
      return updatedProduct;
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  },

  deleteProduct: async (id: string) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete product');
      }
      
      const currentProducts = get().products;
      const filteredProducts = currentProducts.filter(product => product.id !== id);
      set({ products: filteredProducts });
      return true;
    } catch (error) {
      console.error("Error deleting product:", error);
      return false;
    }
  },

  searchProducts: async (query: string) => {
    try {
      const response = await fetch(`/api/products?search=${encodeURIComponent(query)}`);
      if (response.ok) {
        const result = await response.json();
        return Array.isArray(result) ? result : [];
      }
      return [];
    } catch (error) {
      console.error("Error searching products:", error);
      return [];
    }
  },

  getProductsByCategory: async (category: string) => {
    try {
      const response = await fetch(`/api/products?category=${encodeURIComponent(category)}`);
      if (response.ok) {
        const result = await response.json();
        return Array.isArray(result) ? result : [];
      }
      return [];
    } catch (error) {
      console.error("Error fetching products by category:", error);
      return [];
    }
  },

  refetch: async () => {
    set({ isLoading: true, initialized: false });
    await get().init();
  },
}));

// Initialize the store immediately
useProductStore.getState().init();
