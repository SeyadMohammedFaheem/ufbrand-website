'use client';

import React from 'react';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="w-full bg-white relative flex flex-col h-[calc(100vh-100px)] md:h-[calc(100vh-120px)] min-h-[600px] md:min-h-[750px] overflow-hidden">
      
      {/* ── CINEMATIC BACKGROUND ── */}
      <div className="absolute inset-0 bg-zinc-900">
        <div className="relative w-full h-full overflow-hidden">
          <img
             src="/images/hero-brand.png"
             alt="UF Brand luxury ethnic fashion"
             width={1920}
             height={1080}
             className="w-full h-full object-cover object-[80%_20%] md:object-[60%_30%] scale-110 animate-ken-burns"
             fetchPriority="high"
             decoding="async"
          />
          {/* Layered Overlays for Depth */}
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent md:bg-gradient-to-r md:from-black/80 md:via-black/30 md:to-transparent" />
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 flex-1 flex items-end md:items-center px-6 md:px-12 lg:px-24 pb-20 md:pb-0">
        <div className="max-w-4xl w-full">
          
          {/* Tagline Section */}
        

          {/* Headline with Layered Typography */}
          <div className="relative mb-8 md:mb-12">
            <h1 className="text-5xl md:text-8xl lg:text-[110px] font-serif italic text-white leading-[0.9] tracking-tighter animate-fadeUp [animation-delay:400ms] opacity-0">
              Timeless <br /> 
              <span className="text-[#D4147A] not-italic font-black tracking-tight">Elegance.</span>
            </h1>
            <p className="mt-6 md:mt-8 max-w-md text-white/70 text-sm md:text-lg font-medium leading-relaxed animate-fadeUp [animation-delay:600ms] opacity-0">
              Discover the artistry of hand-woven silks and festive silhouettes, 
              designed for the modern woman who cherishes her roots.
            </p>
          </div>

          {/* Action Group */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 animate-fadeUp [animation-delay:800ms] opacity-0">
            <Link
              href="/products"
              className="group relative overflow-hidden bg-white text-[#30323E] px-10 py-5 text-[11px] font-black uppercase tracking-[0.2em] transition-all"
            >
              <div className="absolute inset-0 w-0 bg-[#D4147A] transition-all group-hover:w-full" />
              <span className="relative z-10 transition-colors group-hover:text-white">Shop Collection</span>
            </Link>
            
            <Link
              href="/products?search=kurtis"
              className="text-white/80 hover:text-white text-[11px] font-black uppercase tracking-[0.2em] py-5 px-4 flex items-center gap-3 group transition-colors"
            >
              Explore Kurtis
              <span className="w-8 h-[1px] bg-white/30 transition-all group-hover:w-12 group-hover:bg-[#D4147A]" />
            </Link>
          </div>
        </div>

        {/* Vertical Scroll Indicator (Desktop Only) */}
        <div className="hidden lg:flex absolute right-12 bottom-12 flex-col items-center gap-6">
          <span className="text-white/30 text-[9px] font-black uppercase tracking-[0.4em] rotate-90 origin-right whitespace-nowrap mb-8">
            Scroll to Discover
          </span>
          <div className="w-[1px] h-20 bg-gradient-to-b from-white/40 to-transparent relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-[#D4147A] animate-scrollLine" />
          </div>
        </div>
      </div>

      {/* ── REFINED TRUST RIBBON ── */}
      <div className="w-full bg-white border-y border-zinc-100 overflow-hidden relative">
        <div className="py-4 md:py-6">
          <div className="animate-marquee gap-12 px-6">
            {[...Array(6)].map((_, arrayIndex) => (
              <React.Fragment key={arrayIndex}>
                {[
                  { label: 'Secure Payment', sub: 'UPI, Cards & Net Banking' },
                  { label: 'WhatsApp Support', sub: '+91 8122404928' },
                  { label: 'Premium Quality', sub: 'Handcrafted with Love' },
                ].map((item, i) => (
                  <div
                    key={`${arrayIndex}-${i}`}
                    className="flex items-center gap-6 min-w-[300px] group cursor-default"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D4147A] opacity-30 group-hover:opacity-100 transition-opacity" />
                    <div>
                      <p className="text-[10px] font-black text-[#30323E] uppercase tracking-[0.2em]">{item.label}</p>
                      <p className="text-[9px] text-zinc-400 font-bold tracking-wider mt-0.5">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Animations defined in globals.css via @theme keyframes */}
    </section>
  );
}
