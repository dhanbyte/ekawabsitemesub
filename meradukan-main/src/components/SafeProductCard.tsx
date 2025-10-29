'use client'
import ProductCard from './ProductCard'
import CustomizableProductCard from './CustomizableProductCard'
import type { Product } from '@/lib/types'

export default function SafeProductCard({ p, product }: { p?: Product; product?: Product }) {
  const productData = p || product;
  
  return productData?.isCustomizable ? (
    <CustomizableProductCard product={productData} />
  ) : (
    <ProductCard p={p} product={product} />
  )
}