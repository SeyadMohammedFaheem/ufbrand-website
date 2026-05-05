'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Truck, RefreshCcw, Feather, ArrowRight, Star } from 'lucide-react';

const TRUST_ITEMS = [
  { icon: <ShieldCheck size={15} strokeWidth={2} className="text-[#D4147A]" />, text: '9 Years of Trust' },
  { icon: <Truck size={15} strokeWidth={2} className="text-[#D4147A]" />, text: 'Pan-India Shipping' },
  { icon: <Star size={15} strokeWidth={2} fill="currentColor" className="text-[#D4147A]" />, text: '52,000+ Happy Customers' },
  { icon: <Feather size={15} strokeWidth={2} className="text-[#D4147A]" />, text: 'Premium Handcrafted Fabrics' },
  { icon: <RefreshCcw size={15} strokeWidth={2} className="text-[#D4147A]" />, text: 'Prepaid Only · Secure Payment' },
];

const HERO_CATEGORIES = [
  { label: 'Suits', href: '/products?search=suits', accent: true },
  { label: 'Kurtis', href: '/products?search=kurtis' },
  { label: 'Sarees', href: '/products?search=sarees' },
  { label: 'Journal', href: '/blog' },
];

export function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  const animate = (delay) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? 'translateY(0)' : 'translateY(28px)',
    transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
  });

  return (
    <section className="w-full bg-white relative flex flex-col h-[calc(100vh-100px)] md:h-[calc(100vh-120px)] min-h-[540px] md:min-h-[600px] overflow-hidden">
      {/* ── STANDARD E-COMMERCE BANNER ── */}
      <div className="relative w-full flex-1 flex items-center min-h-0">
        
        {/* Full-bleed background */}
        <div className="absolute inset-0 bg-zinc-900 overflow-hidden">
          <img
             src="/images/hero-brand.png"
             alt="UF Brand luxury ethnic fashion"
             className="w-full h-full object-cover object-[70%_20%] md:object-[60%_30%] scale-105"
             fetchPriority="high"
          />
          {/* Linear gradient to protect left-aligned text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        </div>

        {/* Content Container - Aligned Left */}
        <div className="relative z-10 w-full max-w-7xl px-6 md:px-12 lg:px-20">
           <div className="max-w-xl">
              
              <div className="flex items-center gap-3 mb-4 md:mb-6" style={animate(0.1)}>
                 <span className="px-3 py-1.5 bg-[#D4147A] text-white text-[9px] md:text-[10px] font-black uppercase tracking-widest rounded-sm">New In</span>
                 <span className="text-white/90 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">Festive 2025</span>
              </div>

              <h1 
                className="text-4xl md:text-6xl lg:text-[72px] font-serif font-black text-white leading-[1.1] tracking-tight mb-4 md:mb-6"
                style={animate(0.2)}
              >
                Elevate Your <br className="hidden md:block" />Ethnic Style.
              </h1>

              <p 
                className="text-white/80 text-sm md:text-lg font-medium leading-relaxed mb-6 md:mb-8 max-w-xs md:max-w-md"
                style={animate(0.3)}
              >
                Discover our latest collection of premium hand-woven silks and festive ensembles.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4" style={animate(0.4)}>
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center bg-white text-[#30323E] px-6 md:px-8 py-3.5 md:py-4.5 text-[10px] md:text-[11px] font-black uppercase tracking-[0.15em] transition-all hover:bg-[#D4147A] hover:text-white"
                >
                  Shop Collection
                </Link>
                <Link
                  href="/products?search=sarees"
                  className="inline-flex items-center justify-center bg-transparent text-white border border-white/30 px-6 md:px-8 py-3.5 md:py-4.5 text-[10px] md:text-[11px] font-black uppercase tracking-[0.15em] transition-all hover:bg-white/10"
                >
                  View Sarees
                </Link>
              </div>

           </div>
        </div>
      </div>



      {/* ── TRUST PILLARS SCROLLER ── */}
      <div className="w-full bg-white border-b border-zinc-100 overflow-hidden relative group">
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
            display: flex;
            width: max-content;
          }
          .group:hover .animate-marquee {
            animation-play-state: paused;
          }
        ` }} />
        
        {/* Subtle gradient fades on edges for a premium look */}
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="py-4 md:py-5">
          <div className="animate-marquee gap-6 px-3">
            {[...Array(6)].map((_, arrayIndex) => (
              <React.Fragment key={arrayIndex}>
                {[
                  { icon: <ShieldCheck size={20} className="text-[#D4147A]" strokeWidth={1.5} />, title: 'Secure Payment', sub: 'UPI, Cards & Net Banking' },
                  { icon: <Feather size={20} className="text-[#D4147A]" strokeWidth={1.5} />, title: 'Customer Support', sub: 'WhatsApp: 8122404928' },
                  { icon: <RefreshCcw size={20} className="text-[#D4147A]" strokeWidth={1.5} />, title: 'Premium Quality', sub: 'Handcrafted with love' },
                ].map((item, i) => (
                  <div
                    key={`${arrayIndex}-${i}`}
                    className="trust-badge flex items-center gap-4 px-5 py-3.5 rounded-xl bg-[#FAF9F6] border border-zinc-100 min-w-[280px] md:min-w-[300px] cursor-default transition-colors hover:bg-zinc-100"
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    <div>
                      <p className="text-[11px] font-black text-[#30323E] uppercase tracking-wider">{item.title}</p>
                      <p className="text-[10px] text-zinc-500 font-medium mt-0.5">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
