'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, ShoppingBag, User, Menu, X, Heart, LogOut } from 'lucide-react'
import { useAuthStore, useCartStore } from '@/lib/store'

export function Navbar() {
  const router = useRouter()
  const { user, logout, checkIsAdmin } = useAuthStore()
  const { items } = useCartStore()
  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      setIsSearchOpen(false)
      setSearchQuery('')
    }
  }

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'New Arrivals', href: '/products', badge: 'New', badgeColor: 'bg-blue-100 text-blue-600' },
    { name: 'Best Sellers', href: '/products', badge: 'Hot', badgeColor: 'bg-red-100 text-red-600' },
    { name: 'Suits', href: '/products' },
    { name: 'Kurtas', href: '/products' },
    { name: 'Fabric', href: '/products' },
    { name: 'Journal', href: '/blog' },
    { name: 'Sale', href: '/products', badge: '20% OFF', badgeColor: 'bg-pink-100 text-[#D4147A]' },
  ]

  return (
    <>
      <header className={`w-full fixed top-0 left-0 z-[100] transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white border-b border-zinc-100'}`}>
        {/* Main Nav Container */}
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 h-16 md:h-24 flex items-center justify-between gap-4">
          
          {/* 1. Logo Section */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <button
              className="lg:hidden p-1.5 hover:bg-zinc-100 rounded-full transition-colors"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu size={24} strokeWidth={1.5} />
            </button>
            <Link href="/" className="flex items-center group">
              <img 
                src="/images/logo.png" 
                alt="UF BRAND" 
                className="h-18 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
          </div>

          {/* 2. Centered Navigation (Desktop) */}
          <nav className="hidden lg:flex items-center justify-center flex-grow gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="relative group flex items-center gap-2 py-2"
              >
                <span className="text-[13px] font-bold uppercase tracking-widest text-[#30323E] group-hover:text-[#D4147A] transition-colors">
                  {link.name}
                </span>
                {link.badge && (
                  <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-tighter ${link.badgeColor}`}>
                    {link.badge}
                  </span>
                )}
                {/* Underline effect */}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4147A] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* 3. Utilities Section */}
          <div className="flex items-center gap-1 md:gap-4 flex-shrink-0">
            {/* Search */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2.5 hover:bg-zinc-100 rounded-full transition-colors text-zinc-700"
            >
              <Search size={20} strokeWidth={1.5} />
            </button>

            {/* User */}
            <div className="hidden md:block">
              {mounted && user ? (
                <div className="flex items-center gap-1">
                  {checkIsAdmin() && (
                    <Link 
                      href="/admin" 
                      className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-[#D4147A] transition-colors mr-2 px-3 py-1 border border-zinc-200 rounded-full"
                    >
                      Admin
                    </Link>
                  )}
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#30323E]">Hi, {user.name.split(' ')[0]}</span>
                  <button
                    onClick={() => { logout(); router.push('/'); }}
                    className="p-2.5 hover:bg-zinc-100 rounded-full transition-colors text-zinc-700 group relative"
                    title="Sign Out"
                  >
                    <User size={20} strokeWidth={1.5} />
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-[#30323E] text-white text-[10px] px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Sign Out</span>
                  </button>
                </div>
              ) : (
                <Link href="/login" className="p-2.5 hover:bg-zinc-100 rounded-full transition-colors text-zinc-700">
                  <User size={20} strokeWidth={1.5} />
                </Link>
              )}
            </div>

            {/* Cart */}
            <Link href="/cart" className="p-2.5 hover:bg-zinc-100 rounded-full transition-colors text-zinc-700 relative group">
              <ShoppingBag size={20} strokeWidth={1.5} />
              {mounted && cartCount > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-[#D4147A] text-white text-[8px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center border border-white group-hover:scale-110 transition-transform">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[200] bg-white animate-in fade-in slide-in-from-top duration-500">
          <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 h-screen flex flex-col">
            <div className="flex justify-between items-center h-24">
              <img src="/images/logo.png" alt="UF BRAND" className="h-14 md:h-18 w-auto object-contain" />
              <button 
                type="button"
                onClick={(e) => { e.preventDefault(); setIsSearchOpen(false); }}
                className="p-3 hover:bg-zinc-100 rounded-full transition-colors relative z-[210]"
              >
                <X size={32} strokeWidth={1} />
              </button>
            </div>
            
            <div className="flex-grow flex flex-col items-center justify-center -mt-24">
              <form onSubmit={handleSearch} className="w-full max-w-4xl px-4">
                <div className="relative group">
                  <input
                    autoFocus
                    type="text"
                    placeholder="WHAT ARE YOU LOOKING FOR?"
                    className="w-full text-2xl md:text-5xl font-serif border-b-2 border-zinc-200 py-6 focus:outline-none focus:border-[#D4147A] transition-colors placeholder:text-zinc-300 uppercase tracking-tight"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button 
                    type="submit"
                    className="absolute right-0 bottom-6 text-zinc-400 group-focus-within:text-[#D4147A] transition-colors"
                  >
                    <Search size={32} strokeWidth={1.5} />
                  </button>
                </div>
                <div className="mt-8 flex flex-wrap gap-4 items-center">
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Popular:</span>
                  {['Kurtas', 'Silk Sarees', 'New Arrivals', 'Festive Edit'].map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => {
                        setSearchQuery(term);
                        router.push(`/products?search=${encodeURIComponent(term)}`);
                        setIsSearchOpen(false);
                      }}
                      className="text-[11px] font-bold uppercase tracking-widest text-zinc-600 hover:text-[#D4147A] transition-colors underline decoration-zinc-200 underline-offset-4"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Header Spacer */}
      <div className="h-16 md:h-24 w-full" />

      {/* Mobile Menu Drawer */}
      {isMenuOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-[110] backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-full max-w-[320px] bg-white z-[120] shadow-2xl animate-in slide-in-from-left duration-300">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center p-6 border-b border-zinc-100">
                <img src="/images/logo.png" alt="UF BRAND" className="h-10 w-auto object-contain" />
                <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>
              <div className="flex-grow overflow-y-auto py-6">
                <nav className="flex flex-col">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="px-6 py-4 flex items-center justify-between group border-b border-zinc-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="text-sm font-bold uppercase tracking-widest text-[#30323E] group-hover:text-[#D4147A] transition-colors">
                        {link.name}
                      </span>
                      {link.badge && (
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter ${link.badgeColor}`}>
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="p-6 border-t border-zinc-100 bg-zinc-50">
                <div className="flex flex-col gap-4">
                  {user ? (
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Hi, {user.name.split(' ')[0]}</span>
                      <button onClick={logout} className="text-xs font-bold text-red-500 uppercase tracking-widest">Sign Out</button>
                    </div>
                  ) : (
                    <Link href="/login" className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-zinc-800" onClick={() => setIsMenuOpen(false)}>
                      <User size={20} /> Sign In
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}


