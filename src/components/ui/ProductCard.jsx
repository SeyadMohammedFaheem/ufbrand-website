import React from 'react';
import Link from 'next/link';

export function ProductCard({ product }) {
  const { id, title, image, originalPrice, currentPrice, discount, size, isNew } = product;

  return (
    <Link href={`/products/${id}`} className="group flex flex-col cursor-pointer">
      {/* Image Container */}
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-zinc-100 mb-4">
        {/* New Badge */}
        {isNew && (
          <div className="absolute top-3 left-3 bg-[#FCE4EC] text-[#30323E] text-[10px] font-bold px-2 py-1 uppercase tracking-widest z-10">
            NEW
          </div>
        )}
        
        {/* Wishlist Icon */}
        <button className="absolute bottom-3 right-3 text-white hover:text-[#D4147A] transition-colors z-10" aria-label="Add to wishlist">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
          </svg>
        </button>

        {/* Product Image */}
        <img 
          src={`/api/image?url=${encodeURIComponent(image)}`} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col gap-1.5 px-1">
        <h3 className="text-[13px] md:text-sm text-zinc-800 line-clamp-1 font-light tracking-wide">
          {title}
        </h3>
        
        <div className="flex items-center gap-2.5">
          {originalPrice && (
            <span className="text-zinc-400 line-through text-xs md:text-[13px]">
              {originalPrice}
            </span>
          )}
          <span className="text-zinc-900 font-medium text-sm md:text-[15px]">
            {currentPrice}
          </span>
          {discount && (
            <span className="text-[#D4147A] text-xs md:text-[13px]">
              {discount}
            </span>
          )}
        </div>
        
        {size && (
          <span className="text-[11px] md:text-xs text-zinc-600 uppercase mt-0.5 tracking-wider">
            {size}
          </span>
        )}
      </div>
    </Link>
  );
}
