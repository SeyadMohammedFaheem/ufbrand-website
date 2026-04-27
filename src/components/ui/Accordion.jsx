'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export function Accordion({ title, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [height, setHeight] = useState(defaultOpen ? 'auto' : 0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div className="border-b border-zinc-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex items-center justify-between focus:outline-none group"
      >
        <span className="text-sm font-bold uppercase tracking-wider text-[#30323E]">
          {title}
        </span>
        <ChevronDown
          size={20}
          className={`text-zinc-400 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          } group-hover:text-[#30323E]`}
        />
      </button>
      <div
        className="overflow-hidden transition-[height] duration-300 ease-in-out"
        style={{ height }}
      >
        <div ref={contentRef} className="pb-5 pt-1 text-zinc-600 text-sm leading-relaxed font-light">
          {children}
        </div>
      </div>
    </div>
  );
}
