import React from 'react';
import Link from 'next/link';

export function PromoBanner() {
  const categories = [
    {
      title: "KURTA SETS",
      image: "/images/cat-kurta-sets.png"
    },
    {
      title: "SILK SAREES",
      image: "/images/cat-silk-sarees.png"
    },
    {
      title: "FESTIVE WEAR",
      image: "/images/cat-festive-wear.png"
    },
    {
      title: "NEW ARRIVALS",
      image: "/images/cat-new-arrivals.png"
    }
  ];

  const BANNER_BG = "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2000&auto=format&fit=crop";

  return (
    <section className="w-full my-8 md:my-16 flex flex-col gap-1">

      {/* 1. Main Banner Area */}
      <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] relative overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
          backgroundImage: `url('/images/promo-banner-bg.png')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent"></div>
        </div>

        {/* Content Container */}
        <div className="relative h-full max-w-[1440px] mx-auto px-8 md:px-16 lg:px-24 flex items-center">
          <div className="flex flex-col items-start max-w-lg">

            <span className="text-[#D4147A] text-[10px] font-bold uppercase tracking-[0.3em] mb-3">
              The Collection
            </span>

            <h2
              className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-3 md:mb-5 tracking-tight leading-[1]"
              style={{
                textShadow: '2px 4px 20px rgba(0,0,0,0.4)',
                fontFamily: 'var(--font-serif, "Playfair Display", serif)'
              }}
            >
              ETHNIC<br />ELEGANCE
            </h2>

            <p className="text-white/90 text-xs md:text-sm font-light tracking-[0.2em] mb-6 md:mb-8">
              Handcrafted for the modern Indian wardrobe
            </p>

            <Link
              href="/products"
              className="border-2 border-white text-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-[#30323E] transition-colors duration-300 backdrop-blur-sm bg-white/10"
            >
              Shop Now →
            </Link>

          </div>
        </div>
      </div>

      {/* 2. Sub-categories Grid */}
      <div className="w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
          {categories.map((cat, idx) => {
            const words = cat.title.split(' ');
            return (
              <div key={idx} className="relative w-full aspect-[4/5] group overflow-hidden block">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90"></div>

                {/* Text overlay */}
                <div className="absolute inset-x-0 bottom-6 md:bottom-8 flex flex-col items-center justify-center gap-1">
                  <h3 className="text-white text-center text-lg md:text-2xl lg:text-3xl font-black uppercase tracking-wide leading-[1.1]">
                    {words[0]}<br />{words[1]}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
