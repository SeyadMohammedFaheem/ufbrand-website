import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { blogs } from '@/lib/blogs';

export function RecentEditorial() {
  // Use the first two blogs for the homepage preview
  const articles = blogs.slice(0, 2);

  return (
    <section className="w-full py-16 md:py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-black text-[#30323E] tracking-tight mb-4">
              The Journal
            </h2>
            <div className="w-16 h-0.5 bg-[#D4147A]"></div>
          </div>
          <Link 
            href="/blog" 
            className="text-xs font-bold uppercase tracking-widest text-[#30323E] hover:text-[#D4147A] transition-colors border-b border-transparent hover:border-[#D4147A] pb-1 inline-block"
          >
            Read All Articles
          </Link>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {articles.map((article) => (
            <Link key={article.slug} href={`/blog/${article.slug}`} className="group flex flex-col">
              {/* Image Container */}
              <div className="w-full aspect-[4/3] overflow-hidden bg-zinc-100 mb-6">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              
              {/* Content */}
              <div className="flex flex-col flex-grow">
                <span className="text-[10px] md:text-xs font-bold text-[#D4147A] uppercase tracking-widest mb-3">
                  {article.category}
                </span>
                
                <h3 className="text-xl md:text-2xl lg:text-3xl font-serif font-bold text-[#30323E] mb-3 group-hover:text-[#D4147A] transition-colors leading-tight">
                  {article.title}
                </h3>
                
                <p className="text-zinc-600 text-sm leading-relaxed font-light mb-5 line-clamp-2">
                  {article.excerpt}
                </p>
                
                <div className="mt-auto flex items-center text-xs font-bold uppercase tracking-widest text-[#30323E] group-hover:text-[#D4147A] transition-colors gap-2">
                  Read Article <ArrowRight size={14} strokeWidth={2} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

