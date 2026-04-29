'use client';

import React, { useState } from 'react';
import { Truck, RefreshCcw, ShieldCheck, Share2, CheckCircle } from 'lucide-react';
import { Accordion } from '@/components/ui/Accordion';
import { useCartStore } from '@/lib/store';

export function ProductInfo({ product }) {
  const [added, setAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    if (product.sizes?.length > 0 && !selectedSize) {
      alert('Please select a size first.');
      return;
    }
    addItem(product, selectedSize || 'Standard');
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex flex-col w-full">
      {/* ... (Breadcrumbs, Header, Price, etc. omitted for brevity in diff) */}
      <nav className="flex items-center gap-2 text-[10px] md:text-xs text-zinc-500 uppercase tracking-widest mb-6">
        <a href="/" className="hover:text-[#D4147A] transition-colors">Home</a>
        <span>/</span>
        <a href="/collections/new-arrivals" className="hover:text-[#D4147A] transition-colors">New Arrivals</a>
        <span>/</span>
        <span className="text-zinc-900 font-bold line-clamp-1">{product.title}</span>
      </nav>

      <div className="flex justify-between items-start gap-4 mb-4">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif font-black text-[#30323E] leading-[1.2] tracking-tight">
          {product.title}
        </h1>
        <button className="p-2 text-zinc-400 hover:text-[#D4147A] transition-colors flex-shrink-0 mt-1 rounded-full hover:bg-zinc-100">
          <Share2 size={20} strokeWidth={1.5} />
        </button>
      </div>

      <div className="flex items-center gap-3 mb-6">
        {product.originalPrice && (
          <span className="text-zinc-400 line-through text-base md:text-lg">
            {product.originalPrice}
          </span>
        )}
        <span className="text-2xl md:text-3xl font-bold text-[#30323E]">
          {product.currentPrice}
        </span>
        {product.discount && (
          <span className="text-[#D4147A] font-bold text-sm md:text-base ml-2 bg-[#FCE4EC] px-2 py-1">
            {product.discount}
          </span>
        )}
      </div>

      <p className="text-xs text-zinc-500 font-light mb-8">Inclusive of all taxes</p>

      {/* Sizing Section */}
      {product.sizes && product.sizes.length > 0 && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#30323E]">
              {product.sizeLabel || 'Select Size'}
            </span>
            {product.type !== 'FABRIC' && (
              <button className="text-[10px] font-black uppercase tracking-widest text-[#D4147A] hover:underline">
                Size Guide
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`min-w-[48px] h-12 flex items-center justify-center border text-xs font-black transition-all ${
                  selectedSize === size
                    ? 'border-[#30323E] bg-[#30323E] text-white shadow-lg'
                    : 'border-zinc-200 text-zinc-900 hover:border-[#30323E]'
                } ${product.isFabric ? 'px-6' : ''}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 mb-10">
        <button
          onClick={handleAddToCart}
          className={`w-full py-4 font-bold uppercase tracking-widest text-sm transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 ${
            added
              ? 'bg-green-500 text-white'
              : 'bg-[#D4147A] hover:bg-[#b01065] text-white hover:shadow-lg hover:shadow-[#D4147A]/20'
          }`}
        >
          {added ? (
            <><CheckCircle size={16} /> Added to Cart!</>
          ) : 'Add To Cart'}
        </button>
        <a 
          href={(() => {
            const sizeInfo = selectedSize ? `\n📏 Size: ${selectedSize}` : '';
            const msg =
              `Hello! I'd like to order this item from UFBrand:\n\n` +
              `🛍️ *${product.title}*\n` +
              `💰 Price: ${product.currentPrice}${sizeInfo}\n` +
              `🖼️ Image: ${product.images?.[0] || ''}\n\n` +
              `Please confirm availability and share payment details. Thank you!`;
            return `https://wa.me/916379439162?text=${encodeURIComponent(msg)}`;
          })()}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-all shadow-sm rounded-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
          Order on WhatsApp
        </a>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-3 gap-4 border-y border-zinc-200 py-6 mb-8">
        <div className="flex flex-col items-center justify-center text-center gap-2">
          <Truck size={24} strokeWidth={1.5} className="text-[#30323E]" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-600">Free Shipping</span>
        </div>
        <div className="flex flex-col items-center justify-center text-center gap-2">
          <RefreshCcw size={24} strokeWidth={1.5} className="text-[#30323E]" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-600">Easy Returns</span>
        </div>
        <div className="flex flex-col items-center justify-center text-center gap-2">
          <ShieldCheck size={24} strokeWidth={1.5} className="text-[#30323E]" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-600">Secure Pay</span>
        </div>
      </div>

      {/* Accordions */}
      <div className="flex flex-col">
        <Accordion title="Product Description" defaultOpen={true}>
          <p className="mb-4">{product.description}</p>
          <ul className="list-disc pl-5 space-y-1">
            {product.features.map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>
        </Accordion>

        <Accordion title="Material & Care">
          <ul className="list-disc pl-5 space-y-1">
            <li>{product.material}</li>
            <li>Dry clean only</li>
            <li>Do not bleach</li>
          </ul>
        </Accordion>
        <Accordion title="Shipping & Returns">
          <p className="mb-2">Free shipping on all orders over ₹5,000.</p>
          <p>We offer a 365-day return policy for unused and unworn items with tags attached.</p>
        </Accordion>
      </div>
    </div>
  );
}
