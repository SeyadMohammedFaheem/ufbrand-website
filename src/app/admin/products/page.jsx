'use client'

import React, { useEffect, useState } from 'react'
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  ExternalLink,
  Edit,
  Trash2,
  Image as ImageIcon,
  X
} from 'lucide-react'

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingProduct, setEditingProduct] = useState(null)
  const [deletingProduct, setDeletingProduct] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  
  // Filter States
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All Categories')
  const [statusFilter, setStatusFilter] = useState('All Status')

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/products')
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setProducts(data)
    } catch (err) {
      console.error('Failed to fetch products:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleSave = async (e) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      const res = await fetch(`/api/admin/products/${editingProduct.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProduct)
      })
      if (!res.ok) throw new Error('Update failed')
      await fetchProducts()
      setEditingProduct(null)
      alert('Product updated successfully!')
    } catch (err) {
      console.error('Error saving:', err)
      alert('Failed to save changes.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deletingProduct) return
    setIsSaving(true)
    try {
      const res = await fetch(`/api/admin/products/${deletingProduct.id}`, {
        method: 'DELETE'
      })
      if (!res.ok) throw new Error('Delete failed')
      await fetchProducts()
      setDeletingProduct(null)
    } catch (err) {
      console.error('Error deleting:', err)
      alert('Failed to delete product.')
    } finally {
      setIsSaving(false)
    }
  }

  const resetFilters = () => {
    setSearchQuery('')
    setCategoryFilter('All Categories')
    setStatusFilter('All Status')
  }

  const isFiltered = searchQuery !== '' || categoryFilter !== 'All Categories' || statusFilter !== 'All Status'

  // Filtering Logic
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All Categories' || product.type === categoryFilter;
    const matchesStatus = statusFilter === 'All Status' || product.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  })

  return (
    <div className="flex flex-col gap-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif font-black text-[#30323E] uppercase tracking-tighter">Product Inventory</h2>
          <p className="text-zinc-400 text-sm font-medium tracking-wide">Manage your product catalog and inventory levels.</p>
        </div>
        <div className="flex items-center gap-3">
          <a 
            href={`https://docs.google.com/spreadsheets/d/${process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-4 py-2 bg-white border border-zinc-200 rounded-xl text-xs font-bold uppercase tracking-widest text-zinc-600 hover:bg-zinc-50 transition-colors flex items-center gap-2"
          >
            Edit in Google Sheets <ExternalLink size={14} />
          </a>
          <button className="px-4 py-2 bg-[#D4147A] rounded-xl text-xs font-bold uppercase tracking-widest text-white hover:bg-[#b01065] transition-all shadow-lg shadow-[#D4147A]/20 flex items-center gap-2">
            <Plus size={16} /> New Product
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl border border-zinc-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
          <input 
            type="text" 
            placeholder="Search products..." 
            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-[#D4147A]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {isFiltered && (
            <button 
              onClick={resetFilters}
              className="flex items-center gap-2 px-4 py-2 bg-zinc-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:bg-zinc-200 transition-colors"
            >
              <X size={14} /> Reset
            </button>
          )}
          <select 
            className="bg-zinc-50 border border-zinc-200 rounded-xl py-2 px-4 text-[10px] font-black uppercase tracking-widest text-zinc-600 focus:outline-none focus:border-[#D4147A]"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="All Categories">Category: All</option>
            <option value="KURTI">KURTI</option>
            <option value="SUIT">SUIT</option>
            <option value="FABRIC">FABRIC</option>
            <option value="SAREE">SAREE</option>
          </select>
          <select 
            className="bg-zinc-50 border border-zinc-200 rounded-xl py-2 px-4 text-[10px] font-black uppercase tracking-widest text-zinc-600 focus:outline-none focus:border-[#D4147A]"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All Status">Status: All</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-zinc-50/50">
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Product</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">SKU/ID</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Category</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Price</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Status</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-8 h-8 border-4 border-[#D4147A] border-t-transparent rounded-full animate-spin" />
                      <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">Loading Inventory...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-zinc-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-zinc-100 overflow-hidden border border-zinc-100">
                        {product.image ? (
                          <img 
                            src={`/api/image?url=${encodeURIComponent(product.image)}`} 
                            alt="" 
                            className="w-full h-full object-cover" 
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-zinc-300">
                            <ImageIcon size={20} />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-zinc-900 truncate max-w-[200px]">{product.name}</span>
                        <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-widest">{product.type}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-zinc-500">{product.id}</td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600 bg-zinc-100 px-2 py-1 rounded-md">
                      {product.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs font-black text-zinc-900">₹{product.price}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter ${
                      product.status === 'NEW' ? 'bg-emerald-100 text-emerald-700' :
                      product.status === 'OUT_OF_STOCK' ? 'bg-rose-100 text-rose-700' :
                      'bg-zinc-100 text-zinc-600'
                    }`}>
                      {product.status || 'Active'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setEditingProduct(product)}
                        className="p-2 text-zinc-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => setDeletingProduct(product)}
                        className="p-2 text-zinc-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredProducts.length === 0 && !loading && (
            <div className="px-6 py-20 text-center">
              <div className="flex flex-col items-center gap-2">
                <Search className="text-zinc-200" size={40} />
                <p className="text-sm font-bold uppercase tracking-widest text-zinc-400">No products found matching your search.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setEditingProduct(null)} />
          <div className="relative bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-zinc-100 flex items-center justify-between">
              <h3 className="text-xl font-serif font-black text-[#30323E] uppercase tracking-tighter">Edit Product Details</h3>
              <button onClick={() => setEditingProduct(null)} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-8 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Product Name</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#D4147A]"
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Price (₹)</label>
                  <input
                    type="number"
                    required
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#D4147A]"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Category / Type</label>
                  <select
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#D4147A]"
                    value={editingProduct.type}
                    onChange={(e) => setEditingProduct({ ...editingProduct, type: e.target.value })}
                  >
                    <option value="KURTI">KURTI</option>
                    <option value="SUIT">SUIT</option>
                    <option value="FABRIC">FABRIC</option>
                    <option value="SAREE">SAREE</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Description</label>
                  <textarea
                    rows={3}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#D4147A] resize-none"
                    value={editingProduct.description}
                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Image URLs (Comma separated)</label>
                  <input
                    type="text"
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#D4147A]"
                    placeholder="url1, url2, url3"
                    value={Array.isArray(editingProduct.images) ? editingProduct.images.join(', ') : editingProduct.image}
                    onChange={(e) => setEditingProduct({ ...editingProduct, images: e.target.value.split(',').map(s => s.trim()) })}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4">Promotional Tags</label>
                  <div className="flex flex-wrap gap-4">
                    <button
                      type="button"
                      onClick={() => setEditingProduct({ ...editingProduct, isNewArrival: !editingProduct.isNewArrival })}
                      className={`flex items-center gap-3 px-6 py-3 rounded-xl border text-xs font-bold uppercase tracking-widest transition-all ${
                        editingProduct.isNewArrival
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                          : 'bg-zinc-50 border-zinc-200 text-zinc-400'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        editingProduct.isNewArrival ? 'bg-emerald-500 border-emerald-500' : 'bg-white border-zinc-300'
                      }`}>
                        {editingProduct.isNewArrival && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      New Arrival
                    </button>

                    <button
                      type="button"
                      onClick={() => setEditingProduct({ ...editingProduct, isBestSeller: !editingProduct.isBestSeller })}
                      className={`flex items-center gap-3 px-6 py-3 rounded-xl border text-xs font-bold uppercase tracking-widest transition-all ${
                        editingProduct.isBestSeller
                          ? 'bg-amber-50 border-amber-200 text-amber-700'
                          : 'bg-zinc-50 border-zinc-200 text-zinc-400'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        editingProduct.isBestSeller ? 'bg-amber-500 border-amber-500' : 'bg-white border-zinc-300'
                      }`}>
                        {editingProduct.isBestSeller && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      Best Seller
                    </button>
                  </div>
                </div>
              </div>
            </form>

            <div className="p-8 bg-zinc-50 border-t border-zinc-100 flex items-center justify-end gap-4">
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-[#30323E] hover:bg-black text-white px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all disabled:opacity-50 flex items-center gap-2"
              >
                {isSaving ? 'Saving Changes...' : 'Save Product'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Delete Confirmation Modal */}
      {deletingProduct && (
        <div className="fixed inset-0 z-[1001] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDeletingProduct(null)} />
          <div className="relative bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 p-8">
            <div className="flex flex-col items-center text-center gap-6">
              <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center shadow-inner">
                <Trash2 size={32} />
              </div>
              <div>
                <h3 className="text-xl font-serif font-black text-[#30323E] uppercase tracking-tighter mb-2">Delete Product?</h3>
                <p className="text-zinc-500 text-sm font-medium">
                  Are you sure you want to delete <span className="text-zinc-900 font-bold">"{deletingProduct.name}"</span>? 
                  This action cannot be undone.
                </p>
              </div>
              <div className="flex flex-col w-full gap-3">
                <button
                  onClick={handleDelete}
                  disabled={isSaving}
                  className="w-full bg-rose-500 hover:bg-rose-600 text-white py-4 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all disabled:opacity-50"
                >
                  {isSaving ? 'Deleting...' : 'Yes, Delete Product'}
                </button>
                <button
                  onClick={() => setDeletingProduct(null)}
                  className="w-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

