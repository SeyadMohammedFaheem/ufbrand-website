import React from 'react';

export function ProductGallery({ images }) {
  return (
    <div className="w-full flex flex-col gap-2 md:gap-4">
      {images.map((imgSrc, index) => (
        <div key={index} className="w-full aspect-[3/4] md:aspect-[4/5] bg-zinc-100 overflow-hidden relative">
          <img 
            src={`/api/image?url=${encodeURIComponent(imgSrc)}`} 
            alt={`Product view ${index + 1}`} 
            className="w-full h-full object-cover"
            loading={index === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}
    </div>
  );
}
