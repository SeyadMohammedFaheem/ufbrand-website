import React from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import { blogs } from '@/lib/blogs';

export function RecentEditorial() {
  const articles = blogs.slice(0, 3);

  return (
    <section className="w-full py-16 md:py-24 bg-[#FAF9F6]" aria-labelledby="journal-heading">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-12">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#D4147A] mb-3">Style Notes & Editorials</p>
            <h2
              id="journal-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-[#30323E] tracking-tight leading-none"
            >
              The Journal
            </h2>
          </div>
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#30323E] hover:text-[#D4147A] transition-colors pb-1 border-b border-black/10 hover:border-[#D4147A]/30"
          >
            Read All Articles
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Articles Container (Horizontal scroll on mobile, Grid on desktop) */}
        <div className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-3 gap-6 md:gap-8 lg:gap-12 pb-8 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {articles.length > 0 ? articles.map((article, i) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group flex flex-col cursor-pointer min-w-[85vw] md:min-w-0 snap-center md:snap-align-none"
            >
              {/* Image Container (Borderless) */}
              <div className="w-full aspect-[4/5] overflow-hidden bg-zinc-100 rounded-lg mb-6 relative">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[10s] ease-out"
                  loading="lazy"
                />
                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-grow">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4147A] mb-3">
                  {article.category}
                </span>
                <h3 className="text-xl lg:text-2xl font-serif font-bold text-[#30323E] mb-3 group-hover:text-[#D4147A] transition-colors leading-snug line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed font-light mb-6 line-clamp-2">
                  {article.excerpt}
                </p>
                <div className="mt-auto inline-flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-[#30323E] group-hover:text-[#D4147A] transition-colors gap-2">
                  Read Article <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          )) : (
            <div className="md:col-span-3 text-center py-20 bg-white rounded-2xl border border-zinc-100">
              <BookOpen size={32} className="mx-auto mb-4 text-zinc-300" />
              <p className="text-zinc-400 text-sm font-medium uppercase tracking-widest">Articles coming soon</p>
            </div>
          )}
        </div>

        {/* Brand Connectivity CTA */}
        <div className="mt-20 pt-12 border-t border-zinc-200 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <p className="text-[#30323E] font-serif font-black text-2xl lg:text-3xl mb-1">
              Join our community.
            </p>
            <p className="text-zinc-500 text-sm font-medium">Over 52,000+ women sharing their style moments.</p>
          </div>
          <a
            href="https://instagram.com/ufbrand_salwar"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-[#FAF9F6] border-2 border-[#30323E] text-[#30323E] px-8 py-4 text-[11px] font-black uppercase tracking-[0.15em] hover:bg-[#30323E] hover:text-white transition-all duration-300 rounded-none w-full md:w-auto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            Follow on Instagram
          </a>
        </div>

      </div>
    </section>
  );
}
