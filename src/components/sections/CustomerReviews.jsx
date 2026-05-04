import React from 'react';
import Link from 'next/link';
import { Star, Quote } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    name: 'Priya S.',
    location: 'Mumbai',
    product: 'Banarasi Silk Suit',
    avatar: 'P',
    avatarBg: '#FCE4EC',
    avatarColor: '#D4147A',
    text: 'Absolutely stunning craftsmanship! The fabric quality is unmatched and the fit was perfect. I wore it to a family function and received so many compliments. Will definitely be ordering again!',
    rating: 5,
    verified: true,
  },
  {
    id: 2,
    name: 'Meera R.',
    location: 'Delhi',
    product: 'Chanderi Cotton Kurta Set',
    avatar: 'M',
    avatarBg: '#E8F5E9',
    avatarColor: '#2E7D32',
    text: 'I\'ve ordered multiple times and the quality is consistently excellent. The colors are exactly as shown in the photos, and shipping was fast. UF Brand is my go-to for festive wear!',
    rating: 5,
    verified: true,
  },
  {
    id: 3,
    name: 'Anjali K.',
    location: 'Bangalore',
    product: 'Silk Printed Saree',
    avatar: 'A',
    avatarBg: '#EDE7F6',
    avatarColor: '#6A1B9A',
    text: 'The saree is even more beautiful in person. The silk is so smooth and the print is vibrant. Customer service was very helpful when I had a query. Highly recommend UF Brand!',
    rating: 5,
    verified: true,
  },
];



export function CustomerReviews() {
  return (
    <section className="w-full py-12 md:py-16 bg-[#FAF9F6]" aria-labelledby="reviews-heading">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-12">

        {/* Section Header */}
        <div className="text-center mb-8 md:mb-10">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D4147A] mb-2">Social Proof</p>
          <h2
            id="reviews-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-serif font-black text-[#30323E] tracking-tight mb-4"
          >
            Loved by Thousands
          </h2>
          <div className="w-12 h-[3px] bg-[#D4147A] mx-auto mb-5 rounded-full" />

          {/* Aggregate Rating */}
          <div className="inline-flex items-center gap-2 bg-white border border-zinc-100 rounded-full px-5 py-2.5 shadow-sm">
            <div className="flex items-center gap-0.5">
              {[1,2,3,4,5].map(i => (
                <Star key={i} size={14} fill="#D4147A" strokeWidth={0} className="text-[#D4147A]" />
              ))}
            </div>
            <span className="text-sm font-bold text-[#30323E]">4.9 / 5</span>
            <span className="text-zinc-400 text-xs">·</span>
            <span className="text-xs text-zinc-500 font-medium">Based on 52,000+ reviews</span>
          </div>
        </div>



        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {REVIEWS.map((review) => (
            <article
              key={review.id}
              className="bg-white border border-zinc-100 rounded-2xl p-6 md:p-8 flex flex-col shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Quote icon */}
              <Quote size={24} className="text-[#FCE4EC] mb-4 flex-shrink-0" fill="currentColor" strokeWidth={0} />

              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={13} fill="#D4147A" strokeWidth={0} className="text-[#D4147A]" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-zinc-600 text-sm leading-relaxed font-light flex-grow mb-6">
                "{review.text}"
              </p>

              {/* Divider */}
              <div className="border-t border-zinc-100 pt-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: review.avatarBg }}
                  >
                    <span className="text-sm font-black" style={{ color: review.avatarColor }}>
                      {review.avatar}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#30323E]">{review.name}</p>
                    <p className="text-[10px] text-zinc-400 font-medium">{review.location}</p>
                  </div>
                </div>
                {review.verified && (
                  <span className="text-[9px] font-black uppercase tracking-wider text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
                    ✓ Verified
                  </span>
                )}
              </div>

              {/* Product name */}
              <p className="text-[9px] text-zinc-400 uppercase tracking-widest mt-3 font-bold">
                Purchased: {review.product}
              </p>
            </article>
          ))}
        </div>

        {/* Instagram Social Proof CTA */}
        <div className="mt-12 text-center">
          <a
            href="https://instagram.com/ufbrand_salwar"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-zinc-600 hover:text-[#D4147A] transition-colors border border-zinc-200 hover:border-[#D4147A] px-6 py-3 rounded-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            See 52K+ Customer Photos on Instagram
          </a>
        </div>

      </div>
    </section>
  );
}
