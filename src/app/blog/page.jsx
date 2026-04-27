import React from 'react';
import Link from 'next/link';
import { blogs } from '@/lib/blogs';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Blog — Indian Women\'s Fashion, Style & Ethnic Wear | UFBrand',
  description: 'Explore styling tips, trend reports, fabric guides and festive outfit ideas for Indian women. Your go-to resource for everything Indian ethnic wear.',
  keywords: 'Indian women fashion blog, ethnic wear styling tips, salwar kameez guide, kurta trends India, Indian clothing blog',
};

export default function BlogPage() {
  const [featured, ...rest] = blogs;

  return (
    <main className="w-full min-h-screen bg-[#FAF9F6]">
      {/* Page Header */}
      <div className="w-full bg-[#30323E] py-16 md:py-24 px-6">
        <div className="max-w-[1440px] mx-auto text-center">
          <span className="text-[#D4147A] text-[10px] font-bold uppercase tracking-[0.3em]">From Us, For You</span>
          <h1 className="text-4xl md:text-6xl font-serif font-black text-white mt-3 mb-4 tracking-tight">
            The Journal
          </h1>
          <p className="text-zinc-400 text-sm md:text-base font-light max-w-xl mx-auto">
            Style guides, trend reports, and everything you need to know about Indian women's fashion.
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-12 py-16 md:py-24">

        {/* Featured Article */}
        <Link href={`/blog/${featured.slug}`} className="group block mb-16 md:mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="w-full aspect-[4/3] overflow-hidden bg-zinc-200">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[#D4147A] text-[10px] font-bold uppercase tracking-widest mb-3">{featured.category} &nbsp;·&nbsp; {featured.date}</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-black text-[#30323E] leading-tight mb-4 group-hover:text-[#D4147A] transition-colors">
                {featured.title}
              </h2>
              <p className="text-zinc-600 text-base leading-relaxed font-light mb-6">
                {featured.excerpt}
              </p>
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#30323E] group-hover:text-[#D4147A] transition-colors">
                Read Article <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </Link>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-12">
          <div className="flex-1 h-px bg-zinc-200"></div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">More Articles</span>
          <div className="flex-1 h-px bg-zinc-200"></div>
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {rest.map((blog) => (
            <Link key={blog.slug} href={`/blog/${blog.slug}`} className="group flex flex-col">
              <div className="w-full aspect-[4/3] overflow-hidden bg-zinc-200 mb-4">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <span className="text-[#D4147A] text-[9px] font-bold uppercase tracking-widest mb-2">{blog.category}</span>
              <h3 className="text-base md:text-lg font-serif font-bold text-[#30323E] leading-snug mb-2 group-hover:text-[#D4147A] transition-colors line-clamp-2">
                {blog.title}
              </h3>
              <p className="text-zinc-500 text-xs leading-relaxed font-light mb-3 line-clamp-2 flex-grow">
                {blog.excerpt}
              </p>
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-zinc-100">
                <span className="text-[10px] text-zinc-400">{blog.date}</span>
                <span className="text-[10px] text-zinc-400">{blog.readTime}</span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}
