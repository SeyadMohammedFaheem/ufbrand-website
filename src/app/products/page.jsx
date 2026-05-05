import React from 'react';
import { ProductCard } from '@/components/ui/ProductCard';
import { getProducts } from '@/lib/sheets';
import { Search, ChevronDown } from 'lucide-react';

export const revalidate = 0;

const FILTER_GROUPS = [
  { name: 'CATEGORY', count: 1 },
  { name: 'PRICE' },
  { name: 'SIZE' },
];

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

  const categories = [
    { name: 'All', href: '/products' },
    { name: 'Suits', href: '/products?search=suits' },
    { name: 'Kurtis', href: '/products?search=kurtis' },
    { name: 'Sarees', href: '/products?search=sarees' },
  ];

  return (
    <main className="min-h-screen bg-white pb-20" aria-label="Products">
      
      {/* ── Editorial Header ── */}
      <div className="bg-[#FAF9F6] border-b border-zinc-100 mb-12">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-16 md:py-24 text-center">
          <nav className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 mb-6">
            <a href="/" className="hover:text-[#30323E] transition-colors">Home</a>
            <span className="opacity-30">/</span>
            <span className="text-[#30323E]">Collections</span>
          </nav>
          
          <h1 className="text-4xl md:text-6xl font-serif italic text-[#30323E] mb-6 tracking-tight">
            {query ? query.charAt(0).toUpperCase() + query.slice(1) : 'The Collection'}
          </h1>
          
          <p className="max-w-2xl mx-auto text-zinc-500 text-sm md:text-base font-medium leading-relaxed">
            Curated pieces that blend traditional craftsmanship with contemporary elegance. 
            Discover our latest arrivals in premium handcrafted ethnic wear.
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
        {/* ── Top Bar: Quick Categories + Sort ── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12 pb-8 border-b border-zinc-100">
          
          {/* Quick Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar w-full md:w-auto">
            {categories.map((cat) => (
              <a
                key={cat.name}
                href={cat.href}
                className={`px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                  (query === cat.name.toLowerCase()) || (cat.name === 'All' && !query)
                    ? 'bg-[#30323E] text-white shadow-lg shadow-black/10'
                    : 'bg-white border border-zinc-200 text-zinc-500 hover:border-[#30323E] hover:text-[#30323E]'
                }`}
              >
                {cat.name}
              </a>
            ))}
          </div>

          <div className="flex items-center justify-between w-full md:w-auto gap-6">
            <span className="text-[11px] text-zinc-400 font-bold uppercase tracking-widest">
              Showing {products.length} Items
            </span>

            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Sort By:</span>
              <div className="relative">
                <select className="appearance-none bg-white border border-zinc-200 rounded-xl px-4 py-2.5 pr-10 text-[10px] font-black uppercase tracking-widest text-[#30323E] focus:outline-none focus:border-[#30323E] cursor-pointer shadow-sm hover:border-zinc-300 transition-colors">
                  <option>Popular</option>
                  <option>Newest Arrivals</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
                <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* ── Product Grid ── */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-16">
            {products.map((product) => (
              <div key={product.id} className="fade-in">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mb-6">
              <Search size={32} className="text-zinc-200" />
            </div>
            <h3 className="text-xl font-bold text-[#30323E]">No pieces found</h3>
            <p className="text-zinc-400 text-sm mt-2 max-w-xs mx-auto">
              We couldn't find any products matching your selection. Try exploring another category.
            </p>
            <a 
              href="/products" 
              className="mt-8 px-8 py-3 bg-[#30323E] text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-[#D4147A] transition-all"
            >
              View All Collections
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
