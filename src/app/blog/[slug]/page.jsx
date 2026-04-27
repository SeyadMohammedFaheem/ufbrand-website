import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, Tag } from 'lucide-react';
import { getBlogBySlug, blogs } from '@/lib/blogs';

export async function generateStaticParams() {
  return blogs.map(b => ({ slug: b.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  if (!blog) return {};
  return {
    title: `${blog.title} | UFBrand Blog`,
    description: blog.metaDescription,
    keywords: blog.keywords,
    openGraph: {
      title: blog.title,
      description: blog.metaDescription,
      images: [{ url: blog.image }],
      type: 'article',
    },
  };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  if (!blog) notFound();

  const related = blogs.filter(b => b.slug !== blog.slug).slice(0, 3);

  return (
    <main className="w-full min-h-screen bg-white">

      {/* Hero Banner */}
      <div className="w-full h-[40vh] md:h-[55vh] relative overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-10 lg:px-12 pb-10 md:pb-16 max-w-[1440px] mx-auto">
          <span className="text-[#D4147A] text-[10px] font-bold uppercase tracking-widest mb-3">{blog.category}</span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-black text-white max-w-3xl leading-tight" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>
            {blog.title}
          </h1>
          <div className="flex items-center gap-4 mt-4">
            <span className="flex items-center gap-1.5 text-white/70 text-[11px]"><Tag size={12} />{blog.date}</span>
            <span className="flex items-center gap-1.5 text-white/70 text-[11px]"><Clock size={12} />{blog.readTime}</span>
          </div>
        </div>
      </div>

      {/* Article Body */}
      <div className="max-w-[800px] mx-auto px-6 md:px-8 py-12 md:py-20">

        {/* Back link */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-zinc-500 hover:text-[#D4147A] transition-colors mb-10">
          <ArrowLeft size={14} /> Back to Journal
        </Link>

        {/* Excerpt / Lead */}
        <p className="text-xl md:text-2xl text-zinc-700 font-light leading-relaxed mb-12 border-l-4 border-[#D4147A] pl-6">
          {blog.excerpt}
        </p>

        {/* Sections */}
        <div className="flex flex-col gap-12">
          {blog.content.map((section, idx) => (
            <div key={idx}>
              <h2 className="text-xl md:text-2xl font-serif font-bold text-[#30323E] mb-4">
                {section.heading}
              </h2>
              <div className="text-zinc-700 text-base leading-[1.9] font-light whitespace-pre-line">
                {section.body.split('\n').map((line, i) => {
                  if (line.startsWith('**') && line.endsWith('**')) {
                    return <p key={i} className="font-bold text-[#30323E] mt-4 mb-1">{line.replace(/\*\*/g, '')}</p>;
                  }
                  if (line.startsWith('- ')) {
                    return <li key={i} className="ml-4 list-disc text-zinc-700">{line.substring(2)}</li>;
                  }
                  if (line.trim() === '') return <br key={i} />;
                  return <p key={i}>{line}</p>;
                })}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 p-8 bg-[#30323E] text-center">
          <p className="text-white/80 text-sm mb-2 uppercase tracking-widest font-bold">Discover Our Collection</p>
          <h3 className="text-2xl md:text-3xl font-serif font-black text-white mb-6">Ready to elevate your wardrobe?</h3>
          <Link href="/products" className="inline-block bg-[#D4147A] hover:bg-[#b01065] text-white px-10 py-4 text-xs font-bold uppercase tracking-widest transition-all">
            Shop New Arrivals
          </Link>
        </div>

      </div>

      {/* Related Articles */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-12 pb-16 md:pb-24">
        <div className="flex items-center gap-4 mb-10">
          <div className="flex-1 h-px bg-zinc-200" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">You Might Also Like</span>
          <div className="flex-1 h-px bg-zinc-200" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {related.map(b => (
            <Link key={b.slug} href={`/blog/${b.slug}`} className="group flex flex-col">
              <div className="w-full aspect-[4/3] overflow-hidden bg-zinc-100 mb-4">
                <img src={b.image} alt={b.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              </div>
              <span className="text-[#D4147A] text-[9px] font-bold uppercase tracking-widest mb-1">{b.category}</span>
              <h4 className="text-base font-serif font-bold text-[#30323E] group-hover:text-[#D4147A] transition-colors line-clamp-2">{b.title}</h4>
            </Link>
          ))}
        </div>
      </div>

    </main>
  );
}
