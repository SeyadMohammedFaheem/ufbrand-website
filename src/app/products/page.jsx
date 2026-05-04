import React from 'react';
import { ProductCard } from '@/components/ui/ProductCard';
import { getProducts } from '@/lib/sheets';
import { SlidersHorizontal, Search, Lock, Truck, MessageCircle } from 'lucide-react';

export const revalidate = 0;

const CATEGORIES = ['All', 'Kurtas', 'Suits', 'Sarees', 'Fabric', 'Festive'];
const SORT_OPTIONS = ['Newest', 'Price: Low to High', 'Price: High to Low', 'Best Selling'];

export default async function ProductsPage({ searchParams }) {
  const query = (await searchParams)?.search?.toLowerCase() || '';

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
      type: p.type,
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
    <main className="min-h-screen bg-[#FAF9F6]" aria-label="Products">

      {/* ── Compact Page Header ── */}
      <div className="bg-white border-b border-zinc-100 pt-7 pb-7">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-12 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D4147A] mb-1">
              {query ? 'Search Results' : 'Our Collection'}
            </p>
            <h1 className="text-2xl md:text-3xl font-serif font-black text-[#30323E] tracking-tight">
              {query ? `"${query}"` : 'All Collections'}
            </h1>
          </div>
          <p className="text-zinc-400 text-sm font-light">
            {query
              ? `${products.length} piece${products.length !== 1 ? 's' : ''} found`
              : `${products.length} pieces · Updated weekly`}
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-12 py-6 md:py-8">

        {/* ── Sticky Filters & Sort Bar ── */}
        <div className="sticky top-[116px] z-30 bg-[#FAF9F6] py-3 mb-6 -mx-6 md:-mx-10 lg:-mx-12 px-6 md:px-10 lg:px-12 border-b border-zinc-200/60">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              {CATEGORIES.map((cat, i) => (
                <a
                  key={cat}
                  href={i === 0 ? '/products' : `/products?search=${cat.toLowerCase()}`}
                  className={`flex-shrink-0 text-[11px] font-bold uppercase tracking-widest px-4 py-2 rounded-full border transition-all ${
                    (i === 0 && !query) || query === cat.toLowerCase()
                      ? 'bg-[#30323E] text-white border-[#30323E]'
                      : 'border-zinc-200 bg-white text-zinc-500 hover:border-[#30323E] hover:text-[#30323E]'
                  }`}
                >
                  {cat}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <SlidersHorizontal size={13} className="text-zinc-400" />
              <select
                className="text-[11px] font-bold uppercase tracking-wider text-zinc-600 border border-zinc-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:border-[#D4147A] cursor-pointer"
                aria-label="Sort products"
              >
                {SORT_OPTIONS.map(opt => <option key={opt}>{opt}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* ── Products Grid ── */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-5 md:gap-y-10">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center mb-6">
              <Search size={24} className="text-zinc-300" />
            </div>
            <h2 className="text-xl font-serif font-bold text-[#30323E] mb-2">No products found</h2>
            <p className="text-zinc-400 text-sm font-light max-w-xs mx-auto mb-8">
              {query
                ? `We couldn't find anything matching "${query}". Try a different term.`
                : 'Check back soon — new arrivals every week!'}
            </p>
            <a
              href="/products"
              className="bg-[#D4147A] text-white px-8 py-3.5 text-xs font-black uppercase tracking-widest hover:bg-[#b01065] transition-all rounded-xl"
            >
              Browse All Collections
            </a>
          </div>
        )}

        {/* ── Trust Footer ── */}
        {products.length > 0 && (
          <div className="mt-16 pt-10 border-t border-zinc-200 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { Icon: Lock, title: 'Secure Checkout', sub: 'UPI, Cards, Net Banking accepted' },
              { Icon: Truck, title: 'Fast Shipping', sub: 'Pan-India delivery in 2–4 days' },
              { Icon: MessageCircle, title: 'WhatsApp Support', sub: '+91 9899990772' },
            ].map(({ Icon, title, sub }) => (
              <div key={title} className="flex flex-col items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-[#FCE4EC] flex items-center justify-center">
                  <Icon size={16} className="text-[#D4147A]" strokeWidth={1.5} />
                </div>
                <p className="text-[11px] font-black uppercase tracking-wider text-[#30323E]">{title}</p>
                <p className="text-[10px] text-zinc-400 font-medium">{sub}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
