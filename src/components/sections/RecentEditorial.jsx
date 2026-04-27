import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const ARTICLES = [
  {
    id: 1,
    category: 'STYLE GUIDE',
    title: 'The Art of Layering: Transitioning to Fall',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop',
    excerpt: 'Discover our expert tips on combining textures, weights, and silhouettes to create effortless transitional looks.',
    link: '/editorial/art-of-layering'
  },
  {
    id: 2,
    category: 'BEHIND THE BRAND',
    title: 'Meet the Artisans: Our Silk Weavers',
    image: 'https://images.unsplash.com/photo-1605763240000-7e93b172d754?q=80&w=1974&auto=format&fit=crop',
    excerpt: 'Take a journey to the heart of our production process and meet the master craftspeople behind our signature silk pieces.',
    link: '/editorial/meet-the-artisans'
  }
];

export function RecentEditorial() {
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
            href="/editorial" 
            className="text-xs font-bold uppercase tracking-widest text-[#30323E] hover:text-[#D4147A] transition-colors border-b border-transparent hover:border-[#D4147A] pb-1 inline-block"
          >
            Read All Articles
          </Link>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {ARTICLES.map((article) => (
            <Link key={article.id} href={article.link} className="group flex flex-col">
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
