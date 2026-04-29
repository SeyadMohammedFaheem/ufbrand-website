'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  Settings, 
  LogOut, 
  ChevronRight,
  Bell,
  Search,
  Plus
} from 'lucide-react'
import { useAuthStore } from '@/lib/store'

export default function AdminLayout({ children }) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout, checkIsAdmin } = useAuthStore()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [authorized, setAuthorized] = useState(false)

  React.useEffect(() => {
    if (!checkIsAdmin()) {
      router.push('/')
    } else {
      setAuthorized(true)
    }
  }, [checkIsAdmin, router])

  if (!authorized) return null // Hide content while checking auth

  const menuItems = [
    { name: 'Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: ShoppingBag },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex">
      {/* Sidebar */}
      <aside className={`bg-white border-r border-zinc-200 transition-all duration-300 flex flex-col ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
          {isSidebarOpen && (
            <img src="/images/logo.png" alt="UF BRAND" className="h-8 w-auto" />
          )}
          {!isSidebarOpen && <span className="text-xl font-serif font-black text-[#D4147A]">UF</span>}
        </div>

        <nav className="flex-grow py-6 px-4 flex flex-col gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  pathname === item.href 
                    ? 'bg-[#D4147A] text-white shadow-lg shadow-[#D4147A]/20' 
                    : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900'
                }`}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                {isSidebarOpen && <span className="text-sm font-bold uppercase tracking-widest">{item.name}</span>}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 mt-auto border-t border-zinc-100">
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span className="text-sm font-bold uppercase tracking-widest">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col min-w-0">
        {/* Admin Header */}
        <header className="bg-white border-b border-zinc-200 h-20 flex items-center justify-between px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-serif font-black text-[#30323E] uppercase tracking-tighter">
              Admin Portal
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-zinc-50 border border-zinc-200 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-[#D4147A] w-64"
              />
            </div>
            <button className="relative p-2 text-zinc-400 hover:text-[#D4147A] transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-zinc-100">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-black uppercase tracking-widest text-zinc-900">{user?.name || 'Admin User'}</p>
                <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold">Store Manager</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center border border-zinc-200 overflow-hidden text-[#D4147A] font-black italic">
                {user?.name?.[0] || 'A'}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
