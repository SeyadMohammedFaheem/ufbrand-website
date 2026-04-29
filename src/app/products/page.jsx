import React from 'react';
import { ProductCard } from '@/components/ui/ProductCard';
import { getProducts } from '@/lib/sheets';

export const revalidate = 0; // Ensure fresh data on every request

export default async function ProductsPage({ searchParams }) {
  const query = searchParams?.search?.toLowerCase() || '';
  
  let products = [];
  try {
    const sheetData = await getProducts();
    products = sheetData.map((p) => ({
      id: p.id,
      title: p.name || 'Untitled Product',
      image: p.image || 'https://images.unsplash.com/photo-1610189013589-3286bf5c8ce6?q=80&w=1974&auto=format&fit=crop',
      originalPrice: `₹${(p.price * 1.5).toFixed(0)}`,
      currentPrice: `₹${p.price}`,
      discount: '33% off',
      size: 'ONESIZE',
      isNew: p.status === 'NEW',
      type: p.type
    }));

    if (query) {
      products = products.filter(p => 
        p.title.toLowerCase().includes(query) || 
        p.type?.toLowerCase().includes(query) ||
        p.id?.toLowerCase().includes(query)
      );
    }
  } catch (error) {
    console.error('Failed to fetch products:', error);
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-zinc-50 border-b border-zinc-100 pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-12 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-black text-[#30323E] uppercase tracking-tighter mb-4">
            {query ? `Search: ${query}` : 'All Collections'}
          </h1>
          <div className="w-20 h-1 bg-[#D4147A] mx-auto mb-6"></div>
          <p className="text-zinc-500 text-sm md:text-base font-light max-w-2xl mx-auto">
            {query 
              ? `Found ${products.length} exquisite pieces matching your search.` 
              : "Explore our curated collection of hand-woven silks and contemporary ethnic wear."
            }
          </p>
        </div>
      </div>

      {/* Product Section */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-12 py-16 md:py-24">
        {products.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-14">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center border-2 border-dashed border-zinc-100 rounded-3xl">
            <div className="bg-zinc-50 p-6 rounded-full mb-6">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-zinc-300">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
              </svg>
            </div>
            <h2 className="text-xl font-bold text-[#30323E] mb-2 uppercase tracking-widest">No products found</h2>
            <p className="text-zinc-400 text-sm font-light max-w-xs mx-auto">
              We couldn't find anything matching "{query}". Try a different term or browse our main collections.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
