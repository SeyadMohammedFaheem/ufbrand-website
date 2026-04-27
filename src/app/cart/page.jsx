'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore, useAuthStore } from '@/lib/store';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, updateQty, clearCart, totalItems, totalPrice } = useCartStore();
  const { user } = useAuthStore();

  const total = items.reduce((sum, i) => {
    const price = parseFloat(String(i.currentPrice).replace(/[^0-9.]/g, '')) || 0;
    return sum + price * i.quantity;
  }, 0);

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;
    const lines = items.map(i => `• ${i.title} (${i.size}) x${i.quantity} — ${i.currentPrice}`).join('\n');
    const msg = `Hello! I'd like to place an order:\n\n${lines}\n\nTotal: ₹${total.toLocaleString('en-IN')}\n\nName: ${user?.name || 'Guest'}`;
    window.open(`https://wa.me/916379439162?text=${encodeURIComponent(msg)}`, '_blank');
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#FAF9F6] flex flex-col items-center justify-center px-6 py-20">
        <ShoppingBag size={64} strokeWidth={1} className="text-zinc-200 mb-6" />
        <h1 className="text-2xl font-serif font-bold text-[#30323E] mb-2">Your cart is empty</h1>
        <p className="text-zinc-500 text-sm mb-8">Add some beautiful pieces to get started.</p>
        <Link href="/products" className="bg-[#D4147A] text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#b01065] transition-all">
          Shop Now
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-10 lg:px-12 py-10 md:py-16">

        {/* Header */}
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <div>
            <h1 className="text-2xl md:text-4xl font-serif font-black text-[#30323E] tracking-tight">
              Your Cart
            </h1>
            <p className="text-zinc-500 text-sm mt-1">{itemCount} item{itemCount !== 1 ? 's' : ''}</p>
          </div>
          <button onClick={() => router.back()} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-[#D4147A] transition-colors">
            <ArrowLeft size={14} /> Continue Shopping
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

          {/* Items */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {items.map(item => (
              <div key={item._key} className="bg-white border border-zinc-100 p-4 md:p-6 flex gap-4">
                {/* Image */}
                <div className="w-20 h-24 md:w-28 md:h-36 flex-shrink-0 bg-zinc-100 overflow-hidden">
                  <img
                    src={`/api/image?url=${encodeURIComponent(item.image)}`}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="text-sm md:text-base font-medium text-[#30323E] line-clamp-2 leading-snug">{item.title}</h3>
                    <button onClick={() => removeItem(item._key)} className="text-zinc-300 hover:text-red-500 transition-colors flex-shrink-0 ml-2">
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {item.size && (
                    <span className="text-[11px] text-zinc-400 uppercase tracking-wider mt-1">Size: {item.size}</span>
                  )}

                  <div className="flex items-center justify-between mt-auto pt-3">
                    {/* Qty Controls */}
                    <div className="flex items-center border border-zinc-200">
                      <button onClick={() => updateQty(item._key, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:bg-zinc-50 transition-colors">
                        <Minus size={12} />
                      </button>
                      <span className="w-8 text-center text-sm font-bold text-zinc-800">{item.quantity}</span>
                      <button onClick={() => updateQty(item._key, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:bg-zinc-50 transition-colors">
                        <Plus size={12} />
                      </button>
                    </div>

                    <span className="text-base font-bold text-[#30323E]">{item.currentPrice}</span>
                  </div>
                </div>
              </div>
            ))}

            <button onClick={clearCart} className="text-[11px] text-zinc-400 hover:text-red-500 uppercase tracking-widest font-bold text-left transition-colors self-start mt-2">
              Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-zinc-100 p-6 md:p-8 sticky top-32">
              <h2 className="text-base font-bold uppercase tracking-widest text-[#30323E] mb-6 pb-4 border-b border-zinc-100">
                Order Summary
              </h2>

              <div className="flex flex-col gap-3 mb-6">
                {items.map(item => {
                  const price = parseFloat(String(item.currentPrice).replace(/[^0-9.]/g, '')) || 0;
                  return (
                    <div key={item._key} className="flex justify-between text-sm text-zinc-600">
                      <span className="line-clamp-1 flex-1 mr-2">{item.title} ×{item.quantity}</span>
                      <span className="font-medium text-[#30323E] flex-shrink-0">₹{(price * item.quantity).toLocaleString('en-IN')}</span>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-zinc-100 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Subtotal</span>
                  <span className="text-xl font-black text-[#30323E]">₹{total.toLocaleString('en-IN')}</span>
                </div>
                <p className="text-[11px] text-zinc-400 mt-1">Shipping calculated at checkout</p>
              </div>

              {/* WhatsApp Checkout */}
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
                Checkout via WhatsApp
              </button>

              {!user && (
                <p className="text-center text-xs text-zinc-400 mt-4">
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
