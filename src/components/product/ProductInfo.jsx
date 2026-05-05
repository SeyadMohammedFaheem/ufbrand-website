'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Truck, ShieldCheck, Share2, CheckCircle, Heart, Star, AlertCircle } from 'lucide-react';
import { Accordion } from '@/components/ui/Accordion';
import { useCartStore } from '@/lib/store';

export function ProductInfo({ product }) {
  const [added, setAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeError, setSizeError] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const { addItem } = useCartStore();
  const [showSticky, setShowSticky] = useState(false);
  const actionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show sticky when the action buttons scroll above the viewport (top < 0)
        // and are not visible
        setShowSticky(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0 }
    );
    if (actionRef.current) observer.observe(actionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleAddToCart = () => {
    if (product.sizes?.length > 0 && !selectedSize) {
      setSizeError(true);
      // Scroll to size selector
      document.getElementById('size-selector')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => setSizeError(false), 3000);
      return;
    }
    setSizeError(false);
    addItem(product, selectedSize || 'Standard');
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: product.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const whatsappUrl = (() => {
    const sizeInfo = selectedSize ? `\n📏 Size: ${selectedSize}` : '';
    const msg =
      `Hello! I'd like to order this item from UFBrand:\n\n` +
      `🛍️ *${product.title}*\n` +
      `💰 Price: ${product.currentPrice}${sizeInfo}\n` +
      `🖼️ Image: ${product.images?.[0] || ''}\n\n` +
      `Please confirm availability and share payment details. Thank you!`;
    const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '918122404928';
    return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  })();

  return (
    <div className="flex flex-col w-full">

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-[10px] text-zinc-400 uppercase tracking-widest mb-5" aria-label="Breadcrumb">
        <a href="/" className="hover:text-[#D4147A] transition-colors">Home</a>
        <span>/</span>
        <a href="/products" className="hover:text-[#D4147A] transition-colors">Collections</a>
        {product.type && (
          <>
            <span>/</span>
            <span className="text-zinc-400">{product.type}</span>
          </>
        )}
      </nav>

      {/* Product Type */}
      {product.type && (
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D4147A] mb-2">
          {product.type}
        </span>
      )}

      {/* Title + Actions */}
      <div className="flex justify-between items-start gap-4 mb-3">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif font-black text-[#30323E] leading-[1.2] tracking-tight">
          {product.title}
        </h1>
        <div className="flex items-center gap-1 flex-shrink-0 mt-1">
          <button
            onClick={() => setWishlisted(w => !w)}
            className="p-2 rounded-full hover:bg-zinc-100 transition-colors"
            aria-label={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
          >
            <Heart
              size={18}
              strokeWidth={1.5}
              className={`transition-colors ${wishlisted ? 'fill-[#D4147A] text-[#D4147A]' : 'text-zinc-400'}`}
            />
          </button>
          <button
            onClick={handleShare}
            className="p-2 rounded-full hover:bg-zinc-100 transition-colors text-zinc-400"
            aria-label="Share product"
          >
            <Share2 size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Rating (placeholder for social proof) */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map(i => (
            <Star key={i} size={11} fill={i <= 4 ? '#D4147A' : 'none'} strokeWidth={1.5} className="text-[#D4147A]" />
          ))}
        </div>
        <span className="text-[11px] font-bold text-zinc-500">4.8</span>
        <span className="text-zinc-300 text-[11px]">·</span>
        <span className="text-[11px] text-zinc-400 font-medium">128 reviews</span>
      </div>

      {/* Price */}
      <div className="flex items-center gap-3 mb-2">
        {product.originalPrice && (
          <span className="text-zinc-400 line-through text-base md:text-lg">{product.originalPrice}</span>
        )}
        <span className="text-2xl md:text-3xl font-black text-[#30323E]">{product.currentPrice}</span>
        {product.discount && (
          <span className="text-[#D4147A] font-black text-sm bg-[#FCE4EC] px-2.5 py-1 rounded-md">
            {product.discount}
          </span>
        )}
      </div>
      <p className="text-[11px] text-zinc-400 font-medium mb-1">Inclusive of all taxes</p>

      {/* Stock indicator */}
      <div className="flex items-center gap-1.5 mb-7">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-[11px] font-bold text-green-600 uppercase tracking-wider">In Stock</span>
      </div>

      {/* Size Selector */}
      {product.sizes && product.sizes.length > 0 && (
        <div className="mb-7" id="size-selector">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[11px] font-black uppercase tracking-widest text-[#30323E]">
              {product.sizeLabel || 'Select Size'}
              {selectedSize && <span className="ml-2 text-[#D4147A]">— {selectedSize}</span>}
            </span>
            {product.type !== 'FABRIC' && (
              <button className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-[#D4147A] transition-colors underline underline-offset-2">
                Size Guide
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => { setSelectedSize(size); setSizeError(false); }}
                className={`min-w-[48px] h-11 px-4 flex items-center justify-center border text-[12px] font-black tracking-wider transition-all rounded-lg ${selectedSize === size
                    ? 'border-[#30323E] bg-[#30323E] text-white shadow-md'
                    : sizeError
                      ? 'border-red-300 text-zinc-700 hover:border-[#30323E]'
                      : 'border-zinc-200 text-zinc-700 hover:border-[#30323E]'
                  } ${product.isFabric ? 'px-6' : ''}`}
                aria-pressed={selectedSize === size}
                aria-label={`Size ${size}`}
              >
                {size}
              </button>
            ))}
          </div>
          {sizeError && (
            <div className="flex items-center gap-1.5 mt-2" role="alert" aria-live="polite">
              <AlertCircle size={13} className="text-red-500" />
              <span className="text-[11px] text-red-500 font-medium">Please select a size before adding to cart</span>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div ref={actionRef} className="flex flex-col gap-2.5 mb-8">
        <button
          id="add-to-cart-btn"
          onClick={handleAddToCart}
          className={`w-full py-4 font-black uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-2 rounded-xl ${added
              ? 'bg-green-500 text-white'
              : 'bg-[#D4147A] hover:bg-[#b01065] text-white hover:shadow-lg hover:shadow-[#D4147A]/25 hover:-translate-y-0.5'
            }`}
          aria-live="polite"
        >
          {added ? (
            <><CheckCircle size={16} /> Added to Cart!</>
          ) : 'Add To Cart'}
        </button>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-all rounded-xl"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
          </svg>
          Order on WhatsApp
        </a>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-2 gap-3 bg-[#FAF9F6] rounded-xl p-4 mb-8">
        <div className="flex flex-col items-center justify-center text-center gap-1.5 border-r border-zinc-200">
          <ShieldCheck size={20} strokeWidth={1.5} className="text-[#30323E]" />
          <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-600 leading-tight">Secure<br />Payment</span>
        </div>
        <div className="flex flex-col items-center justify-center text-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#30323E]"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
          <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-600 leading-tight">Genuine<br />Quality</span>
        </div>
      </div>

      {/* Accordion Details */}
      <div className="flex flex-col border-t border-zinc-100">
        <Accordion title="Product Description" defaultOpen={true}>
          <p className="mb-4 text-sm leading-relaxed text-zinc-600">{product.description}</p>
          <ul className="space-y-2">
            {product.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-zinc-600">
                <CheckCircle size={14} className="text-[#D4147A] mt-0.5 flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </Accordion>

        <Accordion title="Material & Care">
          <ul className="space-y-2">
            {[
              product.material,
              'Dry clean recommended',
              'Do not bleach',
              'Store in a cool, dry place'
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-zinc-600">
                <span className="text-[#D4147A] font-bold mt-0.5">·</span>
                {item}
              </li>
            ))}
          </ul>
        </Accordion>

        <Accordion title="Shipping & Delivery">
          <div className="space-y-3 text-sm text-zinc-600">
            <div className="flex items-start gap-2">
              <ShieldCheck size={14} className="text-zinc-400 mt-0.5 flex-shrink-0" />
              <p><strong>Prepaid only</strong> — UPI, Cards, Net Banking. COD not available.</p>
            </div>
            <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg text-[11px] font-medium text-amber-700">
              ⚠️ No returns/exchanges. Please check size chart before ordering.
            </div>
          </div>
        </Accordion>

        {product.shortCode && (
          <Accordion title="View on Instagram">
            <div className="w-full overflow-hidden rounded-xl border border-zinc-100 bg-zinc-50">
              <iframe
                src={`https://www.instagram.com/p/${product.shortCode}/embed`}
                width="100%"
                height="420"
                frameBorder="0"
                scrolling="no"
                allowTransparency="true"
                className="w-full"
                title="Instagram post"
              />
            </div>
          </Accordion>
        )}
      </div>

      {/* Policy reassurance */}
      <div className="mt-6 p-4 bg-zinc-50 rounded-xl border border-zinc-100 mb-20 md:mb-0">
        <p className="text-[10px] text-zinc-400 font-medium leading-relaxed">
          <strong className="text-zinc-600">9 years of trust.</strong> UF Brand has been delivering premium ethnic wear since 2016.
          Have questions? WhatsApp us at <a href="https://wa.me/918122404928" className="text-[#D4147A] font-bold">+91 8122404928</a>.
        </p>
      </div>

      {/* Sticky Bottom CTA for Mobile */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-[60] bg-white border-t border-zinc-100 p-3 shadow-[0_-12px_24px_rgba(0,0,0,0.08)] flex gap-2 transition-transform duration-300 md:hidden ${showSticky ? 'translate-y-0' : 'translate-y-[150%]'
          }`}
      >
        <button
          onClick={handleAddToCart}
          className={`flex-1 py-3.5 font-black uppercase tracking-widest text-[11px] transition-all flex items-center justify-center gap-2 rounded-xl ${added
              ? 'bg-green-500 text-white'
              : 'bg-[#D4147A] text-white shadow-md shadow-[#D4147A]/20'
            }`}
        >
          {added ? 'Added!' : 'Add To Cart'}
        </button>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-[#25D366] text-white py-3.5 font-bold uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 transition-all rounded-xl shadow-md shadow-green-500/20"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}
