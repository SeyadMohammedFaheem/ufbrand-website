'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, ShoppingBag, User, Menu, X, Globe, ChevronDown, LogOut } from 'lucide-react'
import { useAuthStore, useCartStore } from '@/lib/store'

export function Navbar() {
  const router = useRouter()
  const { user, logout } = useAuthStore()
  const { items } = useCartStore()
  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll for sticky effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    'Everyday Steals', 
    '$50 Cashmere', 
    'New Arrivals', 
    'Best Sellers', 
    'Women', 
    'Men', 
    'Home', 
    'Baby & Kids', 
    'Travel', 
    'Bags & Accessories', 
    'Jewelry', 
    'Beauty & Wellness', 
    'Gifts', 
    'The Archive'
  ]

  return (
    <>
      <header className="w-full fixed top-0 left-0 z-[100] transition-all duration-300">
        {/* 1. ANNOUNCEMENT BAR */}
        <div className={`bg-[#30323E] px-4 text-center overflow-hidden transition-all duration-300 ${isScrolled ? 'max-h-0 py-0 opacity-0' : 'max-h-10 py-2 opacity-100'}`}>
          <p className="text-[10px] md:text-[11px] font-bold text-white uppercase tracking-[0.1em]">
            Free Shipping on all orders over ₹5,000 | Limited Time Offer
          </p>
        </div>

        {/* 2. MAIN NAVIGATION */}
        <div className={`w-full transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-white'}`}>
          <div className="max-w-[1440px] mx-auto px-4 md:px-10 h-16 md:h-20 flex items-center justify-between gap-4">
            
            {/* Left: Mobile Menu & Logo */}
            <div className="flex items-center gap-6 flex-shrink-0">
              <button 
                className="lg:hidden p-1.5 hover:bg-zinc-100 rounded-full transition-colors" 
                onClick={() => setIsMenuOpen(true)}
                aria-label="Open Menu"
              >
                <Menu size={24} strokeWidth={1.5} />
              </button>
              <Link href="/" className="flex items-center group">
                <span className="text-2xl md:text-3xl font-serif font-black tracking-tight text-black transition-transform duration-300 group-hover:scale-[1.02]">
                  Quince
                </span>
              </Link>
              
              {/* Desktop Quick Links */}
              <nav className="hidden lg:flex items-center gap-6 ml-8">
                 <Link href="/products" className="text-xs font-bold uppercase tracking-widest hover:text-[#D4147A] transition-colors">Shop</Link>
                 <Link href="/about" className="text-xs font-bold uppercase tracking-widest hover:text-[#D4147A] transition-colors">Our Story</Link>
                 <Link href="/blog" className="text-xs font-bold uppercase tracking-widest hover:text-[#D4147A] transition-colors">Journal</Link>
              </nav>
            </div>

            {/* Center: Search (Desktop Only) */}
            <div className="hidden lg:flex flex-grow max-w-xl mx-8">
              <div className="relative w-full group">
                <input 
                  type="text" 
                  placeholder="Search for cashmere, silk, jewelry..."
                  className="w-full bg-zinc-50 border border-zinc-200 px-5 py-2.5 text-sm outline-none rounded-full focus:bg-white focus:ring-1 focus:ring-[#30323E] transition-all"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-zinc-400 group-focus-within:text-black transition-colors">
                  <Search size={18} strokeWidth={2} />
                </button>
              </div>
            </div>

            {/* Right: Utilities */}
            <div className="flex items-center gap-2 md:gap-5 flex-shrink-0">
              {/* Mobile Search */}
              <button className="lg:hidden p-2 hover:bg-zinc-100 rounded-full transition-colors">
                <Search size={22} strokeWidth={1.5} />
              </button>

              {/* User — desktop */}
              {user ? (
                <div className="hidden md:flex items-center gap-2">
                  <span className="text-[11px] font-bold text-zinc-600 uppercase tracking-wider">{user.name.split(' ')[0]}</span>
                  <button
                    onClick={() => { logout(); router.push('/'); }}
                    className="p-2 hover:bg-zinc-100 rounded-full transition-colors text-zinc-500 hover:text-red-500"
                    title="Sign Out"
                  >
                    <LogOut size={18} strokeWidth={1.5} />
                  </button>
                </div>
              ) : (
                <Link href="/login" className="hidden md:flex items-center gap-2 px-3 py-2 hover:bg-zinc-100 rounded-full transition-colors">
                  <User size={20} strokeWidth={1.5} />
                  <span className="text-[11px] font-bold uppercase tracking-wider">Sign In</span>
                </Link>
              )}

              {/* Cart */}
              <Link href="/cart" className="p-2 hover:bg-zinc-100 rounded-full transition-colors relative group">
                <ShoppingBag size={22} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 bg-[#D4147A] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white group-hover:scale-110 transition-transform">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* 3. CATEGORY LINKS ROW (DESKTOP ONLY) */}
          <div className={`hidden lg:block border-t border-zinc-100 transition-all duration-300 ${isScrolled ? 'h-0 opacity-0 overflow-hidden' : 'h-auto opacity-100'}`}>
            <div className="max-w-[1440px] mx-auto px-10">
              <nav className="flex items-center justify-between py-4 overflow-x-auto no-scrollbar">
                {navLinks.map((link) => (
                  <Link 
                    key={link} 
                    href="/products" 
                    className={`text-[10px] font-bold uppercase tracking-[0.05em] hover:text-[#D4147A] transition-colors whitespace-nowrap ${link === 'Everyday Steals' ? 'text-[#D4147A]' : 'text-zinc-600'}`}
                  >
                    {link}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer to prevent content jump due to fixed header. Outside the fixed header to actually push content down. */}
      {/* Mobile: 32px (announcement) + 64px (nav) = 96px */}
      {/* Desktop: 32px + 80px + 44px (categories) = 156px */}
      <div className={`w-full transition-all duration-300 ${isScrolled ? 'h-16 md:h-20' : 'h-[96px] md:h-[156px]'}`} />

      {/* MOBILE DRAWER */}
      {isMenuOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-[110] backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-full max-w-[320px] bg-white z-[120] shadow-2xl animate-in slide-in-from-left duration-300">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center p-6 border-b border-zinc-100">
                <span className="text-2xl font-serif font-black tracking-tight">Quince</span>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>
              <div className="flex-grow overflow-y-auto no-scrollbar py-6">
                <div className="px-6 flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link}
                      href="/products"
                      className="py-3 text-[13px] font-bold uppercase tracking-widest text-zinc-800 hover:text-[#D4147A] transition-colors border-b border-zinc-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="p-6 border-t border-zinc-100 bg-zinc-50">
                <div className="flex flex-col gap-4">
                   <Link href="/login" className="flex items-center gap-3 text-sm font-bold uppercase tracking-wider" onClick={() => setIsMenuOpen(false)}>
                      <User size={20} /> Sign In
                   </Link>
                   <Link href="/region" className="flex items-center gap-3 text-sm font-bold uppercase tracking-wider" onClick={() => setIsMenuOpen(false)}>
                      <Globe size={20} /> Shipping to US
                   </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

