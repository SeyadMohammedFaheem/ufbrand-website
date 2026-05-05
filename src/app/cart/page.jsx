'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore, useAuthStore } from '@/lib/store';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, ShieldCheck, Truck, Lock } from 'lucide-react';

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, updateQty, clearCart } = useCartStore();
  const { user } = useAuthStore();

  const total = items.reduce((sum, i) => {
    const price = parseFloat(String(i.currentPrice).replace(/[^0-9.]/g, '')) || 0;
    return sum + price * i.quantity;
  }, 0);

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const freeShippingThreshold = 2999;
  const remaining = Math.max(0, freeShippingThreshold - total);

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;
    const lines = items.map(i => `• ${i.title} (${i.size || 'Standard'}) ×${i.quantity} — ${i.currentPrice}`).join('\n');
    const msg = `Hello! I'd like to place an order:\n\n${lines}\n\nTotal: ₹${total.toLocaleString('en-IN')}\n\nName: ${user?.name || 'Guest'}\n\nPlease share payment details. Thank you!`;
    window.open(`https://wa.me/918122404928?text=${encodeURIComponent(msg)}`, '_blank');
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#FAF9F6]">
        {/* Top accent */}
        <div className="h-1 w-full bg-gradient-to-r from-[#D4147A] via-[#e8609a] to-[#D4147A]" />

        <div className="max-w-[680px] mx-auto px-6 py-20 flex flex-col items-center text-center">
          {/* Icon */}
          <div className="relative mb-8">
            <div className="w-24 h-24 rounded-full bg-[#FCE4EC] flex items-center justify-center">
              <ShoppingBag size={36} strokeWidth={1} className="text-[#D4147A]" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#D4147A] flex items-center justify-center">
              <span className="text-white text-[10px] font-black">0</span>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-serif font-black text-[#30323E] mb-3">
            Your cart is empty
          </h1>
          <p className="text-zinc-400 text-sm font-light leading-relaxed max-w-sm mb-10">
            Looks like you haven't added anything yet. Discover our handcrafted ethnic wear — new pieces added every week.
          </p>

          <Link
            href="/products"
            className="bg-[#D4147A] text-white px-10 py-4 text-xs font-black uppercase tracking-widest hover:bg-[#b01065] transition-all rounded-xl inline-flex items-center gap-2 hover:shadow-lg hover:shadow-[#D4147A]/25 hover:-translate-y-0.5 mb-4"
          >
            <ShoppingBag size={14} /> Shop the Collection
          </Link>
          <Link
            href="/products?search=new"
            className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest hover:text-[#D4147A] transition-colors"
          >
            View New Arrivals →
          </Link>

          {/* Reassurance */}
          <div className="mt-14 grid grid-cols-3 gap-6 w-full">
            {[
              { icon: '🔒', text: 'Secure checkout' },
              { icon: '🚚', text: 'Pan-India delivery' },
              { icon: '💬', text: 'WhatsApp support' },
            ].map(item => (
              <div key={item.text} className="flex flex-col items-center gap-2">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }


  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-10 lg:px-12 py-8 md:py-14">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-4xl font-serif font-black text-[#30323E] tracking-tight">
              Your Cart
            </h1>
            <p className="text-zinc-400 text-sm mt-1 font-medium">
              {itemCount} item{itemCount !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-zinc-400 hover:text-[#D4147A] transition-colors"
          >
            <ArrowLeft size={14} /> Continue Shopping
          </button>
        </div>

        {/* Free shipping progress */}
        {remaining > 0 ? (
          <div className="bg-white border border-zinc-100 rounded-xl px-5 py-4 mb-6 shadow-sm">
            <div className="flex justify-between text-[11px] font-bold mb-2">
              <span className="text-zinc-600 uppercase tracking-wider">Add ₹{remaining.toLocaleString('en-IN')} more for free shipping</span>
              <span className="text-[#D4147A]">₹{freeShippingThreshold.toLocaleString('en-IN')}</span>
            </div>
            <div className="w-full bg-zinc-100 rounded-full h-1.5">
              <div
                className="bg-[#D4147A] h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (total / freeShippingThreshold) * 100)}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="bg-green-50 border border-green-100 rounded-xl px-5 py-3.5 mb-6 flex items-center gap-2">
            <Truck size={14} className="text-green-600" />
            <span className="text-[11px] font-bold text-green-600 uppercase tracking-wider">You've unlocked free shipping! 🎉</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">

          {/* ── Cart Items ── */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            {items.map(item => (
              <div
                key={item._key}
                className="bg-white border border-zinc-100 rounded-xl p-4 md:p-5 flex gap-4 shadow-sm"
              >
                {/* Image */}
                <Link
                  href={`/products/${item.id}`}
                  className="w-20 h-24 md:w-24 md:h-32 flex-shrink-0 bg-zinc-100 overflow-hidden rounded-lg"
                >
                  <img
                    src={`/api/image?url=${encodeURIComponent(item.image)}`}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </Link>

                {/* Details */}
                <div className="flex-1 flex flex-col min-w-0">
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <Link
                      href={`/products/${item.id}`}
                      className="text-sm md:text-[15px] font-semibold text-[#30323E] leading-snug hover:text-[#D4147A] transition-colors line-clamp-2"
                    >
                      {item.title}
                    </Link>
                    <button
                      onClick={() => removeItem(item._key)}
                      className="text-zinc-300 hover:text-red-400 transition-colors flex-shrink-0 ml-2 p-1 rounded-full hover:bg-red-50"
                      aria-label={`Remove ${item.title} from cart`}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  {item.size && item.size !== 'Standard' && (
                    <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium mb-2">
                      Size: {item.size}
                    </span>
                  )}

                  <div className="flex items-center justify-between mt-auto pt-2">
                    {/* Qty Controls */}
                    <div className="flex items-center border border-zinc-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateQty(item._key, item.quantity - 1)}
                        className="w-9 h-9 flex items-center justify-center text-zinc-500 hover:bg-zinc-50 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-9 text-center text-sm font-bold text-zinc-800 bg-zinc-50 h-9 flex items-center justify-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQty(item._key, item.quantity + 1)}
                        className="w-9 h-9 flex items-center justify-center text-zinc-500 hover:bg-zinc-50 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <span className="text-base font-black text-[#30323E]">{item.currentPrice}</span>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={clearCart}
              className="text-[10px] text-zinc-300 hover:text-red-400 uppercase tracking-widest font-bold text-left transition-colors self-start mt-1 py-1"
            >
              Clear all items
            </button>
          </div>

          {/* ── Order Summary ── */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-zinc-100 rounded-2xl p-6 md:p-7 sticky top-32 shadow-sm">
              <h2 className="text-sm font-black uppercase tracking-widest text-[#30323E] mb-5 pb-4 border-b border-zinc-100">
                Order Summary
              </h2>

              <div className="flex flex-col gap-2.5 mb-5">
                {items.map(item => {
                  const price = parseFloat(String(item.currentPrice).replace(/[^0-9.]/g, '')) || 0;
                  return (
                    <div key={item._key} className="flex justify-between text-sm text-zinc-500">
                      <span className="line-clamp-1 flex-1 mr-3 font-medium">
                        {item.title} <span className="text-zinc-400">×{item.quantity}</span>
                      </span>
                      <span className="font-bold text-[#30323E] flex-shrink-0">
                        ₹{(price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-zinc-100 pt-4 mb-2">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">Subtotal</span>
                  <span className="text-2xl font-black text-[#30323E]">₹{total.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center mt-1.5">
                  <span className="text-[10px] font-medium text-zinc-400">Shipping</span>
                  <span className="text-[11px] font-bold text-green-600">
                    {total >= freeShippingThreshold ? 'FREE' : 'Calculated at checkout'}
                  </span>
                </div>
              </div>

              <p className="text-[10px] text-zinc-300 mb-5 font-medium">Tax included in price</p>

              {/* WhatsApp Checkout CTA */}
              <button
                id="checkout-btn"
                onClick={handleWhatsAppCheckout}
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-all rounded-xl hover:shadow-lg hover:shadow-green-200 hover:-translate-y-0.5"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
                Checkout via WhatsApp
              </button>

              {/* Trust signals at checkout */}
              <div className="mt-5 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[10px] text-zinc-400 font-medium">
                  <Lock size={11} className="text-zinc-300" />
                  <span>Your payment info is 100% secure</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-zinc-400 font-medium">
                  <ShieldCheck size={11} className="text-zinc-300" />
                  <span>9 years of trusted service</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-zinc-400 font-medium">
                  <Truck size={11} className="text-zinc-300" />
                  <span>Fast pan-India delivery</span>
                </div>
              </div>

              {!user && (
                <p className="text-center text-[10px] text-zinc-400 mt-4 pt-4 border-t border-zinc-100">
                  <Link href="/login" className="text-[#D4147A] font-bold hover:underline">Sign in</Link> to save your order history
                </p>
              )}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
