import React from 'react';
import Link from 'next/link';
import { ProductCard } from '@/components/ui/ProductCard';
import { getProducts } from '@/lib/sheets';
import { ArrowRight, TrendingUp } from 'lucide-react';

export async function NewArrivals() {
  let products = [];
  try {
    const sheetData = await getProducts();
    products = sheetData.slice(0, 8).map((p) => ({
      id: p.id,
      title: p.name || 'Untitled Product',
      image: p.image || 'https://images.unsplash.com/photo-1610189013589-3286bf5c8ce6?q=80&w=1974&auto=format&fit=crop',
      originalPrice: `₹${(p.price * 1.5).toFixed(0)}`,
      currentPrice: `₹${p.price}`,
      discount: '33% off',
      size: 'ONESIZE',
      isNew: true,
      type: p.type,
    }));
  } catch (error) {
    console.error('Failed to fetch products from Google Sheets:', error);
  }

  return (
    <section className="w-full py-10 md:py-14 bg-white" aria-labelledby="new-arrivals-heading">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-12">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 md:mb-8 gap-3">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D4147A] mb-2">Fresh Drops</p>
            <h2
              id="new-arrivals-heading"
              className="text-3xl md:text-4xl lg:text-5xl font-serif font-black text-[#30323E] tracking-tight"
            >
              New Arrivals
            </h2>
            <div className="w-12 h-[3px] bg-[#D4147A] mt-3 rounded-full" />
          </div>
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[#30323E] hover:text-[#D4147A] transition-colors"
          >
            View All
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Sort/Filter strip */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto no-scrollbar">
          {['All', 'Kurta Sets', 'Silk Sarees', 'Festive', 'Fabric', 'Co-ords'].map((cat, i) => (
            <button
              key={cat}
              className={`flex-shrink-0 text-[11px] font-bold uppercase tracking-widest px-4 py-2 rounded-full border transition-all ${
                i === 0
                  ? 'bg-[#30323E] text-white border-[#30323E]'
                  : 'border-zinc-200 text-zinc-500 hover:border-[#30323E] hover:text-[#30323E]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-12">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center text-zinc-400 py-20 border-2 border-dashed border-zinc-100 rounded-2xl">
            <TrendingUp size={32} className="mx-auto mb-3 text-zinc-200" />
            <p className="text-sm font-medium">New arrivals coming soon</p>
          </div>
        )}

        {/* View All CTA */}
        {products.length > 0 && (
          <div className="mt-12 text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 border-2 border-[#30323E] text-[#30323E] hover:bg-[#30323E] hover:text-white px-10 py-4 text-xs font-black uppercase tracking-widest transition-all duration-300"
            >
              Shop All Collections
              <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
