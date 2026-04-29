'use client'

import React, { useState } from 'react'
import { 
  User, 
  Store, 
  Database, 
  Bell, 
  Shield, 
  Save,
  Globe,
  Mail,
  Phone,
  CheckCircle2
} from 'lucide-react'

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('general')
  const [isSaving, setIsSaving] = useState(false)

  const tabs = [
    { id: 'general', name: 'General', icon: Store },
    { id: 'security', name: 'Access Control', icon: Shield },
    { id: 'data', name: 'Data Source', icon: Database },
    { id: 'notifications', name: 'Notifications', icon: Bell },
  ]

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      alert('Settings saved successfully!')
    }, 1000)
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif font-black text-[#30323E] uppercase tracking-tighter">System Settings</h2>
          <p className="text-zinc-400 text-sm font-medium tracking-wide">Configure your store's backend and administrative preferences.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-3 bg-[#30323E] text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-black transition-all flex items-center gap-2 shadow-lg shadow-zinc-200"
        >
          {isSaving ? 'Saving...' : <><Save size={16} /> Save Changes</>}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Settings Navigation */}
        <aside className="lg:w-64 flex flex-col gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition-all ${
                  activeTab === tab.id 
                    ? 'bg-white text-[#D4147A] shadow-sm border border-zinc-100' 
                    : 'text-zinc-400 hover:text-zinc-600 hover:bg-zinc-50'
                }`}
              >
                <Icon size={18} />
                {tab.name}
              </button>
            )
          })}
        </aside>

        {/* Settings Content */}
        <div className="flex-grow bg-white rounded-3xl border border-zinc-100 shadow-sm p-8">
          {activeTab === 'general' && (
            <div className="flex flex-col gap-8 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <h3 className="text-sm font-black uppercase tracking-widest text-[#30323E] mb-6">Store Profile</h3>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Store Name</label>
                  <input type="text" defaultValue="UF BRAND" className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#D4147A]" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Store URL</label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-300" size={16} />
                    <input type="text" defaultValue="ufbrand.com" className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-[#D4147A]" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Support Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-300" size={16} />
                    <input type="email" defaultValue="hello@ufbrand.com" className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-[#D4147A]" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Support Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-300" size={16} />
                    <input type="tel" defaultValue="+91 98765 43210" className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-[#D4147A]" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="flex flex-col gap-8 animate-in fade-in duration-300">
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-[#30323E] mb-2">Administrator Whitelist</h3>
                <p className="text-xs text-zinc-400 mb-6">These users have full access to the admin portal.</p>
                <div className="flex flex-col gap-3">
                  {[
                    'admin@ufbrand.com',
                    'faheem@ufbrand.com',
                    'faheemseyadmd@gmail.com'
                  ].map((email) => (
                    <div key={email} className="flex items-center justify-between p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                          <CheckCircle2 size={16} />
                        </div>
                        <span className="text-xs font-bold text-zinc-700">{email}</span>
                      </div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Authorized</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'data' && (
            <div className="flex flex-col gap-8 animate-in fade-in duration-300">
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-[#30323E] mb-6">Google Sheets Integration</h3>
                <div className="p-6 bg-blue-50 border border-blue-100 rounded-2xl mb-8">
                  <div className="flex gap-4">
                    <Database className="text-blue-500 shrink-0" size={24} />
                    <div>
                      <p className="text-xs font-bold text-blue-900 uppercase tracking-widest mb-1">Active Connection</p>
                      <p className="text-xs text-blue-700 leading-relaxed">
                        Your store is currently pulling data from the production spreadsheet. Modifications to the sheet structure may affect site stability.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-6">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Spreadsheet ID</label>
                    <input type="text" defaultValue="1xY...z9w" readOnly className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-3 px-4 text-sm text-zinc-500 font-mono" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Range Config</label>
                    <input type="text" defaultValue="Sheet1!A2:G1000" readOnly className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-3 px-4 text-sm text-zinc-500 font-mono" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-300">
              <div className="bg-zinc-50 p-6 rounded-full mb-6">
                <Bell size={40} className="text-zinc-300" strokeWidth={1} />
              </div>
              <h3 className="text-sm font-black uppercase tracking-widest text-[#30323E] mb-2">Alert Configuration</h3>
              <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                Notification preferences are currently being managed by the system administrator.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
