'use client'

import React from 'react'
import Link from 'next/link'
import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  ExternalLink,
  RefreshCw
} from 'lucide-react'

const stats = [
  { label: 'Total Revenue', value: '₹1,24,500', icon: DollarSign, trend: '+12.5%', isUp: true, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'New Orders', value: '42', icon: ShoppingBag, trend: '+8.2%', isUp: true, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Total Customers', value: '856', icon: Users, trend: '-2.4%', isUp: false, color: 'text-orange-600', bg: 'bg-orange-50' },
  { label: 'Avg. Order Value', value: '₹2,964', icon: TrendingUp, trend: '+4.1%', isUp: true, color: 'text-purple-600', bg: 'bg-purple-50' },
]

const recentOrders = [
  { id: '#ORD-2481', customer: 'Ananya Sharma', product: 'Silk Kurti Set', date: '2 mins ago', amount: '₹4,200', status: 'Processing' },
  { id: '#ORD-2480', customer: 'Rahul Verma', product: 'Cotton Kurta', date: '15 mins ago', amount: '₹1,850', status: 'Shipped' },
  { id: '#ORD-2479', customer: 'Priya Patel', product: 'Embroidered Suit', date: '1 hour ago', amount: '₹6,500', status: 'Delivered' },
  { id: '#ORD-2478', customer: 'Sneha Kapur', product: 'Hand-woven Stole', date: '3 hours ago', amount: '₹1,200', status: 'Processing' },
]

export default function AdminDashboard() {
  const [products, setProducts] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/products')
        if (res.ok) {
          const data = await res.json()
          setProducts(data)
        }
      } catch (err) {
        console.error('Dashboard fetch error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const dynamicStats = [
    { label: 'Total Products', value: loading ? '...' : products.length.toString(), icon: ShoppingBag, trend: 'Live', isUp: true, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Avg. Inventory Value', value: loading ? '...' : `₹${Math.round(products.reduce((acc, p) => acc + (p.price || 0), 0) / (products.length || 1))}`, icon: TrendingUp, trend: 'Market', isUp: true, color: 'text-purple-600', bg: 'bg-purple-50' },
  ]

  const [isSyncing, setIsSyncing] = React.useState(false)

  const handleInstagramSync = async () => {
    setIsSyncing(true)
    try {
      const res = await fetch('/api/admin/scrape', { method: 'POST' })
      const data = await res.json()
      if (data.success) {
        alert(data.message)
      } else {
        throw new Error(data.error)
      }
    } catch (err) {
      console.error('Sync error:', err)
      alert('Failed to sync with Instagram.')
    } finally {
      setIsSyncing(false)
    }
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif font-black text-[#30323E] uppercase tracking-tighter">Dashboard Overview</h2>
          <p className="text-zinc-400 text-sm font-medium tracking-wide">Welcome back! Here's the latest from your inventory.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleInstagramSync}
            disabled={isSyncing}
            className="px-4 py-2 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] rounded-xl text-[10px] font-black uppercase tracking-widest text-white hover:opacity-90 transition-all flex items-center gap-2 shadow-lg disabled:opacity-50"
          >
            <RefreshCw size={14} className={isSyncing ? 'animate-spin' : ''} />
            {isSyncing ? 'Syncing...' : 'Sync Instagram'}
          </button>
          <button className="px-4 py-2 bg-white border border-zinc-200 rounded-xl text-xs font-bold uppercase tracking-widest text-zinc-600 hover:bg-zinc-50 transition-colors">
            Refresh Data
          </button>
          <Link href="/admin/products" className="px-4 py-2 bg-[#D4147A] rounded-xl text-xs font-bold uppercase tracking-widest text-white hover:bg-[#b01065] transition-all shadow-lg shadow-[#D4147A]/20">
            Manage Products
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dynamicStats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
                <stat.icon size={24} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${stat.isUp ? 'text-emerald-500' : 'text-rose-500'}`}>
                {stat.trend}
                {stat.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              </div>
            </div>
            <h3 className="text-zinc-400 text-xs font-black uppercase tracking-widest mb-1">{stat.label}</h3>
            <p className="text-2xl font-serif font-black text-[#30323E]">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activity Feed */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-zinc-100">
            <h3 className="text-sm font-black uppercase tracking-widest text-[#30323E]">System Activity</h3>
          </div>
          <div className="p-6 flex flex-col gap-6">
            {[
              { type: 'product', text: 'New inventory added to Silk Sarees.', time: '12 mins ago' },
              { type: 'order', text: 'Order #ORD-2481 flagged for priority.', time: '25 mins ago' },
              { type: 'user', text: 'Sneha Kapur updated her profile.', time: '1 hour ago' },
              { type: 'system', text: 'Weekly revenue report generated.', time: '4 hours ago' },
            ].map((activity, i) => (
              <div key={i} className="flex gap-4">
                <div className="relative">
                  <div className="w-2 h-2 rounded-full bg-[#D4147A] mt-1.5" />
                  {i !== 3 && <div className="absolute top-4 left-[3px] w-[2px] h-10 bg-zinc-100" />}
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-xs text-zinc-600 font-medium leading-relaxed">{activity.text}</p>
                  <div className="flex items-center gap-1 text-zinc-400">
                    <Clock size={10} />
                    <span className="text-[10px] uppercase font-bold tracking-widest">{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
