'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, ShoppingBag, User, Menu, X, Heart, ChevronDown } from 'lucide-react'
import { useAuthStore, useCartStore } from '@/lib/store'

const ANNOUNCEMENTS = [
  '✦ Free Shipping on Orders Over ₹2,999',
  '✦ New Arrivals Every Week — Shop Fresh Collections',
  '✦ Prepaid Only · Secure & Trusted Since 2016',
]

export function Navbar() {
  const router = useRouter()
  const { user, logout, checkIsAdmin, init } = useAuthStore()
  const { items } = useCartStore()
  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [announcementIdx, setAnnouncementIdx] = useState(0)

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      setIsSearchOpen(false)
      setSearchQuery('')
    }
  }

  useEffect(() => {
    init()
    setMounted(true)
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    const timer = setInterval(() => {
      setAnnouncementIdx(i => (i + 1) % ANNOUNCEMENTS.length)
    }, 3500)
    return () => { window.removeEventListener('scroll', handleScroll); clearInterval(timer) }
  }, [])

  const navLinks = [
    { name: 'Suits', href: '/products?search=suits' },
    { name: 'Kurtis', href: '/products?search=kurtis' },
    { name: 'Sarees', href: '/products?search=sarees' },
    { name: 'Journal', href: '/blog' },
  ]

  return (
    <>
      {/* ── Announcement Bar ── */}
      <div className="w-full bg-[#30323E] text-white text-center h-9 flex items-center justify-center overflow-hidden relative z-[101]">
        <div className="relative h-full flex items-center px-4">
          <span
            key={announcementIdx}
            className="text-[11px] font-semibold tracking-wider"
            style={{ animation: 'fadeUp 0.4s ease forwards' }}
          >
            {ANNOUNCEMENTS[announcementIdx]}
          </span>
        </div>
      </div>

      {/* ── Main Header ── */}
      <header className={`w-full sticky top-0 z-[100] transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-md shadow-black/5'
          : 'bg-white border-b border-zinc-100'
      }`}>
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 h-16 md:h-20 flex items-center justify-between gap-4">

          {/* 1. Mobile Menu + Logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              className="lg:hidden p-2 hover:bg-zinc-100 rounded-full transition-colors"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>
            <Link href="/" className="flex items-center group" aria-label="UF Brand — Home">
              <img
                src="/images/logo.png"
                alt="UF BRAND"
                className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
          </div>

          {/* 2. Centered Desktop Nav */}
          <nav className="hidden lg:flex items-center justify-center flex-grow gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative group flex items-center gap-1.5 py-2"
              >
                <span className="text-[12px] font-bold uppercase tracking-widest text-[#30323E] group-hover:text-[#D4147A] transition-colors">
                  {link.name}
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#D4147A] transition-all duration-300 group-hover:w-full rounded-full" />
              </Link>
            ))}
          </nav>

          {/* 3. Actions */}
          <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
            {/* Desktop Search Bar */}
            <form onSubmit={handleSearch} className="hidden lg:flex relative w-64 xl:w-80">
              <input
                type="text"
                placeholder="Search products.."
                className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-2 text-[13px] font-medium text-zinc-700 placeholder:text-zinc-400 focus:outline-none focus:border-[#D4147A] transition-all pr-10 shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-[#30323E]">
                <Search size={16} strokeWidth={2} />
              </button>
            </form>

            {/* Mobile Search Toggle */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="lg:hidden p-2.5 hover:bg-zinc-100 rounded-full transition-colors text-zinc-700"
              aria-label="Open search"
            >
              <Search size={20} strokeWidth={1.5} />
            </button>

            {/* User */}
            <div className="hidden md:block">
              {mounted && user ? (
                <div className="flex items-center gap-2">
                  {checkIsAdmin() && (
                    <Link
                      href="/admin"
                      className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-[#D4147A] transition-colors px-3 py-1 border border-zinc-200 rounded-full"
                    >
                      Admin
                    </Link>
                  )}
                  <div className="flex items-center gap-1 cursor-pointer group relative">
                    <User size={18} strokeWidth={1.5} className="text-zinc-700" />
                    <span className="text-[11px] font-bold text-[#30323E]">{user.name.split(' ')[0]}</span>
                    <div className="absolute right-0 top-8 hidden group-hover:block bg-white border border-zinc-100 shadow-xl rounded-xl py-2 min-w-[140px] z-10">
                      <button
                        onClick={() => { logout(); router.push('/') }}
                        className="w-full text-left px-4 py-2 text-[11px] font-bold text-red-500 uppercase tracking-wider hover:bg-red-50 transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="p-2.5 hover:bg-zinc-100 rounded-full transition-colors text-zinc-700"
                  aria-label="Sign in"
                >
                  <User size={20} strokeWidth={1.5} />
                </Link>
              )}
            </div>

            {/* Cart */}
            <Link
              href="/cart"
              className="p-2.5 hover:bg-zinc-100 rounded-full transition-colors text-zinc-700 relative"
              aria-label={`Cart, ${cartCount} items`}
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {mounted && cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#D4147A] text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* ── Search Overlay ── */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 z-[200] bg-white/98 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Search"
          style={{ animation: 'fadeUp 0.25s ease forwards' }}
        >
          <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 h-full flex flex-col">
            <div className="flex justify-between items-center h-24 border-b border-zinc-100">
              <img src="/images/logo.png" alt="UF BRAND" className="h-10 w-auto object-contain" />
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="p-3 hover:bg-zinc-100 rounded-full transition-colors"
                aria-label="Close search"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-grow flex flex-col items-center justify-center -mt-16">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-6">Search the Collection</p>
              <form onSubmit={handleSearch} className="w-full max-w-3xl px-4">
                <div className="relative group border-b-2 border-zinc-200 focus-within:border-[#D4147A] transition-colors pb-2">
                  <Search size={24} className="absolute left-0 bottom-4 text-zinc-300" strokeWidth={1.5} />
                  <input
                    autoFocus
                    type="text"
                    id="search-input"
                    placeholder="Kurtis, Silks, Festive..."
                    className="w-full pl-10 text-2xl md:text-4xl font-light text-zinc-800 focus:outline-none placeholder:text-zinc-200 bg-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="absolute right-0 bottom-3 text-zinc-400 hover:text-[#D4147A] transition-colors"
                    aria-label="Submit search"
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </button>
                </div>

                <div className="mt-8 flex flex-wrap gap-3 items-center">
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300">Trending:</span>
                  {['Kurta Sets', 'Silk Sarees', 'Festive Edit', 'Co-ord Sets', 'Cotton Suits'].map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => {
                        router.push(`/products?search=${encodeURIComponent(term)}`)
                        setIsSearchOpen(false)
                      }}
                      className="text-[11px] font-semibold text-zinc-500 hover:text-[#D4147A] transition-colors border border-zinc-200 hover:border-[#D4147A] px-3 py-1.5 rounded-full"
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



      {/* ── Mobile Menu Drawer ── */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-[110] backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
          <nav
            id="mobile-menu"
            className="fixed inset-y-0 left-0 w-full max-w-[300px] bg-white z-[120] shadow-2xl"
            style={{ animation: 'fadeUp 0.25s ease forwards' }}
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center p-5 border-b border-zinc-100">
                <img src="/images/logo.png" alt="UF BRAND" className="h-9 w-auto object-contain" />
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 hover:bg-zinc-100 rounded-full transition-colors"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto">
                <div className="px-5 py-3 bg-[#FAF9F6] border-b border-zinc-100">
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400">Collections</p>
                </div>
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="px-5 py-3.5 flex items-center justify-between group border-b border-zinc-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className={`text-sm font-semibold tracking-wide transition-colors ${
                      link.name === 'Sale' ? 'text-[#D4147A]' : 'text-[#30323E] group-hover:text-[#D4147A]'
                    }`}>
                      {link.name}
                    </span>
                    {link.badge && (
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase ${link.badgeColor}`}>
                        {link.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>

              <div className="p-5 border-t border-zinc-100">
                {user ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#FCE4EC] flex items-center justify-center">
                        <span className="text-xs font-black text-[#D4147A]">{user.name[0]}</span>
                      </div>
                      <span className="text-sm font-bold text-zinc-900">{user.name.split(' ')[0]}</span>
                    </div>
                    <button
                      onClick={() => { logout(); setIsMenuOpen(false) }}
                      className="text-[11px] font-bold text-red-500 uppercase tracking-widest"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center gap-3 text-sm font-bold text-zinc-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User size={18} /> Sign In / Register
                  </Link>
                )}
                <div className="mt-4 pt-4 border-t border-zinc-100 flex flex-col gap-1">
                  <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400 mb-1">Policies</p>
                  <a href="#" className="text-[11px] text-zinc-500 font-medium">Shipping & Delivery</a>
                  <a href="#" className="text-[11px] text-zinc-500 font-medium">Return Policy</a>
                  <a href="#" className="text-[11px] text-zinc-500 font-medium">Contact Us</a>
                </div>
              </div>
            </div>
          </nav>
        </>
      )}
    </>
  )
}
