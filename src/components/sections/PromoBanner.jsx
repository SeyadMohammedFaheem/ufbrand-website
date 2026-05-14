import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function PromoBanner() {
  const categories = [
    {
      title: 'Kurta Sets',
      subtitle: 'Effortless everyday elegance',
      image: '/images/cat-kurta-sets.png',
      href: '/products?category=kurta',
      badge: 'Bestseller',
    },
    {
      title: 'Silk Sarees',
      subtitle: 'Heritage weaves, modern soul',
      image: '/images/cat-silk-sarees.png',
      href: '/products?category=saree',
      badge: 'New',
    },
    {
      title: 'Festive Wear',
      subtitle: 'Celebrate in style',
      image: '/images/cat-festive-wear.png',
      href: '/products?category=festive',
      badge: 'Trending',
    },
    {
      title: 'New Arrivals',
      subtitle: 'Fresh drops weekly',
      image: '/images/cat-new-arrivals.png',
      href: '/products',
      badge: 'New In',
    },
  ];

  return (
    <section className="w-full py-14 md:py-20 bg-white" aria-labelledby="categories-heading">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-12">

        {/* ── Section Header ── */}
      

        {/* ── Main Banner ── */}
        <div className="w-full h-[360px] md:h-[480px] relative overflow-hidden rounded-2xl mb-3 group">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-100 group-hover:scale-105 transition-transform duration-[20s] ease-out"
            style={{ backgroundImage: `url('/images/promo-banner-bg.png')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

          <div className="relative h-full flex items-center px-8 md:px-14 lg:px-16">
            <div className="flex flex-col items-start max-w-lg">
              <span className="text-[#D4147A] text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                ✦ The Collection
              </span>
              <h2
                className="text-5xl md:text-7xl font-serif font-black text-white mb-4 tracking-tight leading-[1]"
                style={{ textShadow: '2px 4px 20px rgba(0,0,0,0.3)' }}
              >
                ETHNIC<br />
                <span className="italic font-light">Elegance</span>
              </h2>
              <p className="text-white/80 text-sm font-light tracking-wide mb-8 max-w-sm">
                Handcrafted for the modern Indian wardrobe — where tradition meets contemporary design.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 bg-[#D4147A] hover:bg-[#b01065] text-white px-7 py-3.5 text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:shadow-xl hover:shadow-[#D4147A]/40 hover:-translate-y-0.5 w-full sm:w-auto"
                >
                  Shop Now <ArrowRight size={12} />
                </Link>

                <Link
                  href="/products?search=new"
                  className="inline-flex items-center justify-center gap-2 border border-white/50 text-white px-7 py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all backdrop-blur-sm w-full sm:w-auto"
                >
                  New Arrivals
                </Link>
              </div>
            </div>
          </div>

          {/* Urgency badge */}
          <div className="absolute top-5 right-5 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 text-right">
            <p className="text-white text-xs font-black">LIMITED STOCK</p>
            <p className="text-white/60 text-[10px] tracking-widest">Selling fast</p>
          </div>
        </div>

        {/* ── Category Grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="relative w-full aspect-[3/4] group overflow-hidden rounded-xl block"
              aria-label={`Shop ${cat.title}`}
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover img-zoom"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Badge */}
              <span className="absolute top-3 left-3 bg-white text-[#30323E] text-[9px] font-black px-2 py-0.5 uppercase tracking-widest rounded-full">
                {cat.badge}
              </span>

              {/* Text overlay */}
              <div className="absolute inset-x-0 bottom-0 p-4">
                <h3 className="text-white text-base md:text-xl font-serif font-black leading-tight mb-0.5">
                  {cat.title}
                </h3>
                <p className="text-white/60 text-[10px] font-medium mb-3">{cat.subtitle}</p>
                <span className="inline-flex items-center gap-1 text-white text-[10px] font-black uppercase tracking-widest group-hover:gap-2 transition-all">
                  Shop <ArrowRight size={10} />
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
