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
      {/* Image */}
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-zinc-100 mb-3">

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1.5">
          {isNew && (
            <span className="bg-[#30323E] text-white text-[9px] font-black px-2 py-0.5 uppercase tracking-widest">
              NEW
            </span>
          )}
          {discount && (
            <span className="bg-[#D4147A] text-white text-[9px] font-black px-2 py-0.5 uppercase tracking-widest">
              {discount}
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          className="absolute top-2.5 right-2.5 z-10 w-8 h-8 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full shadow-sm transition-all hover:scale-110"
          onClick={handleWishlist}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            size={14}
            strokeWidth={2}
            className={`transition-colors ${wishlisted ? 'fill-[#D4147A] text-[#D4147A]' : 'text-zinc-500'}`}
          />
        </button>

        {/* Product Image */}
        <img
          src={`/api/image?url=${encodeURIComponent(image)}`}
          alt={title}
          className="w-full h-full object-cover img-zoom"
          loading="lazy"
        />

        <div className="product-card-atc absolute bottom-0 left-0 right-0 z-10 overflow-hidden">
          <button
            onClick={handleQuickAdd}
            className={`relative w-full py-3 text-[11px] font-black uppercase tracking-widest transition-all overflow-hidden flex items-center justify-center gap-2 group/btn ${
              added
                ? 'bg-green-500 text-white'
                : 'bg-[#30323E] hover:bg-[#D4147A] text-white'
            }`}
          >
            {/* Shimmer overlay */}
            {!added && (
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover/btn:animate-[shimmer_1.5s_infinite]" />
            )}
            <ShoppingBag size={12} className="relative z-10" />
            <span className="relative z-10">{added ? 'Added!' : 'Quick Add'}</span>
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-col gap-1 px-0.5">
        {type && (
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#D4147A]">
            {type}
          </span>
        )}
        <h3 className="text-[13px] md:text-sm text-zinc-800 line-clamp-2 font-medium leading-snug group-hover:text-[#D4147A] transition-colors">
          {title}
        </h3>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-zinc-800 font-bold text-sm md:text-[15px]">
            {currentPrice}
          </span>
          {originalPrice && (
            <span className="text-zinc-400 line-through text-xs md:text-[13px]">
              {originalPrice}
            </span>
          )}
        </div>
        {size && size !== 'ONESIZE' && (
          <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-medium">
            Size: {size}
          </span>
        )}
      </div>
    </Link>
  );
}
