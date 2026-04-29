'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Feather, Leaf, Truck, RefreshCcw, ShieldCheck, ArrowDown } from 'lucide-react';

const CATEGORIES = [
  { label: 'New Arrivals', href: '/collections/new-arrivals' },
  { label: 'Kurtas', href: '/collections/kurtas' },
  { label: 'Silk Sarees', href: '/collections/silks' },
  { label: 'Festive Edit', href: '/collections/festive' },
  { label: 'Co-ords', href: '/collections/coords' },
];

export function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="w-full relative h-[calc(100dvh-64px)] md:h-[calc(100dvh-96px)] bg-[#FAF9F6] overflow-hidden">

      {/* ── MAIN HERO ── */}
      <div className="w-full h-full relative overflow-hidden group">

        {/* Background image with slow Ken-Burns zoom */}
        <img
          src="/images/hero-brand.png"
          alt="Luxury ethnic fashion"
          className="absolute inset-0 w-full h-full object-cover object-[30%_40%] scale-105 group-hover:scale-110 transition-transform duration-[25s] ease-out"
        />

        {/* Multi-layer gradient: dark corners + strong bottom */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.35)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />

        {/* ── CONTENT ── */}
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-10 md:py-16 pb-[60px] md:pb-[70px]">

          {/* Headline */}
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-black text-white leading-[1.05] tracking-tight mb-4 md:mb-5 max-w-3xl"
            style={{
              textShadow: '0 2px 30px rgba(0,0,0,0.6)',
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(28px)',
              transition: 'opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s',
            }}
          >
            Modern<br />
            <span className="italic font-light text-white/90">Heritage.</span>
          </h1>

          {/* Sub-copy */}
          <p
            className="text-white/80 text-sm md:text-base max-w-md leading-relaxed font-light mb-8 md:mb-10"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease 0.55s, transform 0.8s ease 0.55s',
            }}
          >
            Hand-woven silks, embroidered kurtas &amp; festive ensembles — crafted for the modern Indian wardrobe.
          </p>

          {/* CTA row */}
          <div
            className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease 0.7s, transform 0.8s ease 0.7s',
            }}
          >
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-[#D4147A] hover:bg-[#b01065] text-white px-8 py-4 text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:shadow-xl hover:shadow-[#D4147A]/40 hover:-translate-y-0.5"
            >
              Shop Collection
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <Link
              href="/collections/silks"
              className="inline-flex items-center gap-2 bg-transparent text-white border border-white/60 px-8 py-4 text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:bg-white hover:text-[#30323E] backdrop-blur-sm"
            >
              Explore Silks
            </Link>
          </div>
        </div>

        {/* ── Scroll Indicator ── */}
        <div
          className="absolute bottom-24 right-6 md:bottom-28 md:right-10 flex flex-col items-center gap-2"
          style={{
            opacity: loaded ? 0.7 : 0,
            transition: 'opacity 1s ease 1.2s',
          }}
        >
          <span className="text-white text-[9px] uppercase tracking-[0.2em] font-bold rotate-90 origin-center translate-x-3 mb-4">Scroll</span>
          <div className="w-px h-10 bg-white/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full bg-white animate-[scroll-line_1.5s_ease-in-out_infinite]" style={{ height: '40%', animation: 'scrollLine 1.5s ease-in-out infinite' }} />
          </div>
          <ArrowDown size={14} className="text-white/60 animate-bounce" />
        </div>

        {/* ── Product Count badge ── */}
        <div
          className="absolute top-6 right-6 md:top-8 md:right-10 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 text-center"
          style={{
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.8s ease 1s',
          }}
        >
          <span className="block text-white text-xs font-black">NEW IN</span>
          <span className="block text-white/70 text-[10px] uppercase tracking-widest">This Week</span>
        </div>

        {/* ── MARQUEE STRIP (BOTTOM OVERLAY) ── */}
        <div className="absolute bottom-0 left-0 w-full bg-white/95 backdrop-blur-sm border-t border-zinc-200 h-[60px] md:h-[70px] flex items-center overflow-hidden z-10">
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
            {[0, 1].map((gi) => (
              <div key={gi} className="flex items-center gap-12 md:gap-20 lg:gap-24 px-6 md:px-10 lg:px-12">
                <div className="flex items-center gap-3 text-[#30323E] whitespace-nowrap">
                  <Feather size={18} strokeWidth={2} className="text-[#D4147A]" />
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">Premium Silks</span>
                </div>
                <div className="flex items-center gap-3 text-[#30323E] whitespace-nowrap">
                  <Leaf size={18} strokeWidth={2} className="text-[#D4147A]" />
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">Sustainable Materials</span>
                </div>
                <div className="flex items-center gap-3 text-[#30323E] whitespace-nowrap">
                  <ShieldCheck size={18} strokeWidth={2} className="text-[#D4147A]" />
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">Ethical Production</span>
                </div>
                <div className="flex items-center gap-3 text-[#30323E] whitespace-nowrap">
                  <Truck size={18} strokeWidth={2} className="text-[#D4147A]" />
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">Free Shipping</span>
                </div>
                <div className="flex items-center gap-3 text-[#30323E] whitespace-nowrap">
                  <RefreshCcw size={18} strokeWidth={2} className="text-[#D4147A]" />
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">365-Day Returns</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
