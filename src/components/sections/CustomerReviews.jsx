import React from 'react';
import { Star } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    name: 'Sarah M.',
    product: 'Premium Cashmere Sweater',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&auto=format&fit=crop',
    text: '"The quality of the cashmere is unbelievable for the price. It feels exactly like the designer sweaters I used to pay triple for. Definitely ordering more colors."',
    rating: 5,
  },
  {
    id: 2,
    name: 'Elena R.',
    product: 'Silk Slip Dress',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop',
    text: '"I wore this to a summer wedding and received endless compliments. The silk drapes beautifully and feels so luxurious against the skin. A wardrobe staple!"',
    rating: 5,
  },
  {
    id: 3,
    name: 'Jessica T.',
    product: 'Handwoven Linen Saree',
    image: 'https://images.unsplash.com/photo-1610189013589-3286bf5c8ce6?q=80&w=800&auto=format&fit=crop',
    text: '"Absolutely stunning craftsmanship. The attention to detail in the weave is evident, and the color is exactly as pictured. Fast shipping too!"',
    rating: 5,
  }
];

export function CustomerReviews() {
  return (
    <section className="w-full py-16 md:py-24 bg-[#FAF9F6]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-black text-[#30323E] tracking-tight mb-4">
            Loved by You
          </h2>
          <div className="w-16 h-0.5 bg-[#D4147A] mx-auto"></div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
          {REVIEWS.map((review) => (
            <div key={review.id} className="flex flex-col items-center text-center">
              
              {/* Product Image */}
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden mb-6 shadow-sm">
                <img 
                  src={review.image} 
                  alt={review.product}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Stars */}
              <div className="flex items-center gap-1 mb-4 text-[#D4147A]">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              
              {/* Review Text */}
              <p className="text-zinc-700 text-sm md:text-base leading-relaxed font-light italic mb-6">
                {review.text}
              </p>
              
              {/* Customer Info */}
              <div className="mt-auto">
                <span className="block text-xs font-bold uppercase tracking-widest text-[#30323E]">
                  {review.name}
                </span>
                <span className="block text-[10px] text-zinc-500 uppercase tracking-widest mt-1">
                  On {review.product}
                </span>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
