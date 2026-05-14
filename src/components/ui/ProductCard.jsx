'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/lib/store';

export function ProductCard({ product }) {
  const { id, title, image, originalPrice, currentPrice, discount, size, isNew, type } = product;
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem } = useCartStore();

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ ...product, sizes: [], images: [image] }, 'Standard');
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlisted(w => !w);
  };

  return (
    <Link href={`/products/${id}`} className="group flex flex-col cursor-pointer" aria-label={`View ${title}`}>
      {/* Image Container */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#F8F8F8]">
        
        {/* Sale Badge (Top Left) */}
        {discount && (
          <div className="absolute top-0 left-0 z-10">
            <span className="bg-[#E57373] text-white text-[9px] font-black px-3 py-1.5 uppercase tracking-widest">
              Sale
            </span>
          </div>
        )}

        {/* Wishlist Button (Top Right) */}
        <button
          className="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95"
          onClick={handleWishlist}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            size={14}
            strokeWidth={2}
            className={`transition-colors ${wishlisted ? 'fill-[#D4147A] text-[#D4147A]' : 'text-[#30323E]'}`}
          />
        </button>

        {/* Product Image */}
        <img
          src={`/api/image?url=${encodeURIComponent(image)}`}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Bottom Bar: View Icon (Static in image bottom right) */}
        <div className="absolute bottom-3 right-3 z-10 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#30323E]">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
          </svg>
        </div>

        {/* Quick Add Overlay (Bottom) */}
        <div className="absolute bottom-0 left-0 right-0 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <button
            onClick={handleQuickAdd}
            className={`w-full py-3.5 text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${
              added
                ? 'bg-green-500 text-white'
                : 'bg-[#30323E] hover:bg-[#252731] text-white'
            }`}
          >
            <ShoppingBag size={12} className="stroke-[3]" />
            {added ? 'Added!' : 'Quick Add'}
          </button>
        </div>
      </div>

      {/* Details Section */}
      <div className="flex flex-col gap-1 px-0.5 mt-4">
        {type && (
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D4147A]">
            {type}
          </span>
        )}
        <h3 className="text-[13px] md:text-sm text-[#30323E] line-clamp-1 font-bold leading-tight group-hover:text-[#D4147A] transition-colors">
          {title}
        </h3>
        <div className="flex items-center gap-3">
          <span className="text-[#30323E] font-black text-sm md:text-base">
            {currentPrice}
          </span>
          {originalPrice && (
            <span className="text-zinc-400 line-through text-[11px] md:text-xs font-medium">
              {originalPrice}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
