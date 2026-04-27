import React from 'react';
import { notFound } from 'next/navigation';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductInfo } from '@/components/product/ProductInfo';
import { getProducts } from '@/lib/sheets';

export const revalidate = 300 // 5 minutes

export default async function ProductDetail({ params }) {
  // Await the params object (required in recent Next.js versions)
  const { id } = await params;

  // Fetch all products from Google Sheets
  const products = await getProducts();

  // Find the specific product by ID
  const sheetProduct = products.find((p) => String(p.id) === String(id));

  // If the product doesn't exist in the sheet, show 404
  if (!sheetProduct) {
    notFound();
  }

  // Map the sheet data to the format expected by our components
  const product = {
    id: sheetProduct.id,
    title: sheetProduct.name,
    originalPrice: `₹${(sheetProduct.price * 1.5).toFixed(0)}`, // Dummy calculation
    currentPrice: `₹${sheetProduct.price}`,
    discount: '33% off',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'ONESIZE'],
    description: sheetProduct.description || 'Premium quality product tailored for everyday luxury.',
    features: [
      'Fabric: Premium Blend',
      'Care: Dry Clean Only',
      'Ethically sourced'
    ],
    material: '100% Premium Blend',
    images: [
      sheetProduct.image || 'https://images.unsplash.com/photo-1610189013589-3286bf5c8ce6?q=80&w=1974&auto=format&fit=crop'
    ]
  };

  return (
    <main className="w-full bg-white min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">

          {/* Left Column: Image Gallery (1-Column Stack) */}
          <div className="w-full lg:w-[60%] flex-shrink-0">
            <ProductGallery images={product.images} />
          </div>

          {/* Right Column: Sticky Product Info */}
          <div className="w-full lg:w-[40%] lg:sticky lg:top-32 pb-16">
            <ProductInfo product={product} />
          </div>

        </div>
      </div>
    </main>
  );
}
