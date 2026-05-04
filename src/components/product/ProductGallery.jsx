'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

export function ProductGallery({ images }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  const validImages = images?.length > 0 ? images : ['/placeholder.png'];
  const mainImg = validImages[activeIdx];

  const prev = () => setActiveIdx(i => (i - 1 + validImages.length) % validImages.length);
  const next = () => setActiveIdx(i => (i + 1) % validImages.length);

  return (
    <div className="w-full flex flex-col gap-3">

      {/* Main Image */}
      <div
        className="relative w-full aspect-[3/4] bg-zinc-100 overflow-hidden rounded-xl cursor-zoom-in group"
        onClick={() => setZoomed(true)}
        role="img"
        aria-label={`Product image ${activeIdx + 1} of ${validImages.length}`}
      >
        <img
          src={`/api/image?url=${encodeURIComponent(mainImg)}`}
          alt={`Product view ${activeIdx + 1}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="eager"
        />

        {/* Image counter badge */}
        <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
          {activeIdx + 1} / {validImages.length}
        </div>

        {/* Zoom hint */}
        <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <ZoomIn size={14} className="text-zinc-600" />
        </div>

        {/* Nav arrows (only if multiple images) */}
        {validImages.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-all opacity-0 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft size={16} className="text-zinc-700" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-all opacity-0 group-hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight size={16} className="text-zinc-700" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {validImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {validImages.map((src, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`flex-shrink-0 w-16 h-20 md:w-20 md:h-24 rounded-lg overflow-hidden border-2 transition-all ${
                i === activeIdx
                  ? 'border-[#D4147A] opacity-100 shadow-md shadow-[#D4147A]/20'
                  : 'border-transparent opacity-60 hover:opacity-90 hover:border-zinc-200'
              }`}
              aria-label={`View image ${i + 1}`}
              aria-pressed={i === activeIdx}
            >
              <img
                src={`/api/image?url=${encodeURIComponent(src)}`}
                alt={`Thumbnail ${i + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}

      {/* Dot indicators (mobile) */}
      {validImages.length > 1 && (
        <div className="flex items-center justify-center gap-1.5 md:hidden mt-1">
          {validImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`rounded-full transition-all ${
                i === activeIdx ? 'w-4 h-1.5 bg-[#D4147A]' : 'w-1.5 h-1.5 bg-zinc-300'
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox */}
      {zoomed && (
        <div
          className="fixed inset-0 z-[300] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setZoomed(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Zoomed product image"
        >
          <button
            className="absolute top-5 right-5 text-white/70 hover:text-white p-2"
            onClick={() => setZoomed(false)}
            aria-label="Close zoom"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
          <img
            src={`/api/image?url=${encodeURIComponent(mainImg)}`}
            alt="Zoomed product"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          {validImages.length > 1 && (
            <div className="absolute bottom-6 flex gap-2">
              {validImages.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setActiveIdx(i); }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === activeIdx ? 'bg-white scale-125' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
