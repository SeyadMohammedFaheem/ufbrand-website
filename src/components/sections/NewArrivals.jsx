import React from 'react';
import { ProductCard } from '@/components/ui/ProductCard';
import { getProducts } from '@/lib/sheets';

export async function NewArrivals() {
  let products = [];
  try {
    const sheetData = await getProducts();
    products = sheetData.map((p) => ({
      id: p.id,
      title: p.name || 'Untitled Product',
      image: p.image || 'https://images.unsplash.com/photo-1610189013589-3286bf5c8ce6?q=80&w=1974&auto=format&fit=crop', // Fallback image
      originalPrice: `₹${(p.price * 1.5).toFixed(0)}`, // Dummy original price calculation
      currentPrice: `₹${p.price}`,
      discount: '33% off', // Dummy discount
      size: 'ONESIZE',
      isNew: true,
    }));
  } catch (error) {
    console.error('Failed to fetch products from Google Sheets:', error);
    // You could fallback to dummy data here if the API fails
  }

  return (
    <section className="w-full py-16 md:py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-black text-[#30323E] tracking-tight mb-4">
            New Arrivals
          </h2>
          <div className="w-16 h-0.5 bg-[#D4147A] mx-auto"></div>
          <p className="mt-4 text-zinc-500 text-sm md:text-base max-w-xl font-light">
            Discover our latest collection of premium, handcrafted pieces designed for the modern wardrobe.
          </p>
        </div>

        {/* Product Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-14">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center text-zinc-500 py-10">
            No products found. Please check your Google Sheet.
          </div>
        )}
      </div>
    </section>
  );
}
