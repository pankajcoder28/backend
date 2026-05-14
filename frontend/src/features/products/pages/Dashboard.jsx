import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useProduct } from '../hook/useProduct.js'
import { useNavigate } from 'react-router-dom'

/* ─── Helpers ──────────────────────────────────────────────────── */
const formatPrice = (amount, currency) => {
  try {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency || 'INR',
      maximumFractionDigits: 0,
    }).format(amount)
  } catch {
    return `${currency} ${amount}`
  }
}

const formatDate = (iso) => {
  const d = new Date(iso)
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

/* ─── Product Card ──────────────────────────────────────────────── */
const ProductCard = ({ product }) => {
  const [activeImg, setActiveImg] = useState(0)
  const images = product.images || []
  const hasImages = images.length > 0

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-[#EFEFED] shadow-sm
                    transition-all duration-300 ease-out hover:-translate-y-1
                    hover:shadow-[0_8px_32px_rgba(30,58,95,0.13)] flex flex-col">

      {/* ── Image area ─────────────────────────────────────── */}
      <div className="relative aspect-4/3 bg-[#F5F5F3] overflow-hidden">
        {hasImages ? (
          <>
            <img
              src={images[activeImg]?.url}
              alt={product.title}
              className="w-full h-full object-cover transition-opacity duration-300"
            />

            {/* Dot navigation */}
            {images.length > 1 && (
              <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`h-1.5 rounded-full border-none cursor-pointer transition-all duration-300
                      ${i === activeImg
                        ? 'w-4 bg-[#1E3A5F]'
                        : 'w-1.5 bg-white/70'
                      }`}
                  />
                ))}
              </div>
            )}

            {/* Count badge */}
            {images.length > 1 && (
              <div className="absolute top-2.5 right-2.5 bg-black/45 text-white text-[10px]
                              font-semibold tracking-wide px-2 py-0.5 rounded-full backdrop-blur-sm">
                {activeImg + 1}/{images.length}
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-[#C0C0BB]">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <span className="text-[11px] tracking-wider">No Images</span>
          </div>
        )}
      </div>

      {/* ── Content ────────────────────────────────────────── */}
      <div className="flex flex-col gap-2 px-5 py-[18px] flex-1">
        <h3 className="m-0 text-[15px] font-bold text-[#1A1A1A] tracking-tight leading-snug
                       truncate">
          {product.title}
        </h3>

        {product.description && (
          <p className="m-0 text-[12.5px] text-[#8A8A8A] leading-relaxed
                        line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Price + Date */}
        <div className="mt-auto pt-3 flex items-center justify-between border-t border-[#F0F0ED]">
          <span className="text-base font-bold text-[#1E3A5F] tracking-tight">
            {formatPrice(product.price?.amount, product.price?.currency)}
          </span>
          <span className="text-[10px] text-[#ADADAD] uppercase tracking-[0.06em] font-semibold">
            {formatDate(product.createdAt)}
          </span>
        </div>
      </div>
    </div>
  )
}

/* ─── Empty State ───────────────────────────────────────────────── */
const EmptyState = ({ onAdd }) => (
  <div className="col-span-full flex flex-col items-center justify-center py-24 gap-5 text-center">
    <div className="w-18 h-18 rounded-full bg-[#EFF6FF] flex items-center justify-center
                    w-[72px] h-[72px]">
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none"
        stroke="#1E3A5F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
    </div>
    <div>
      <p className="m-0 mb-1 text-base font-bold text-[#1A1A1A]">No products yet</p>
      <p className="m-0 text-[13px] text-[#ADADAD] leading-relaxed">
        Start building your catalogue by listing your first product.
      </p>
    </div>
    <button
      onClick={onAdd}
      className="mt-1 px-7 py-3 bg-[#1E3A5F] text-white border-none rounded-xl
                 text-[13px] font-semibold uppercase tracking-widest cursor-pointer
                 transition-all duration-200 hover:bg-[#16305A] hover:-translate-y-px"
    >
      + Add Product
    </button>
  </div>
)

/* ─── Skeleton Card ─────────────────────────────────────────────── */
const SkeletonCard = () => (
  <div className="bg-white rounded-2xl overflow-hidden border border-[#EFEFED]">
    <div className="aspect-[4/3] bg-gradient-to-r from-[#f0f0ee] via-[#e8e8e6] to-[#f0f0ee]
                    bg-[length:200%_100%] animate-[shimmer_1.4s_infinite]" />
    <div className="px-5 py-[18px] flex flex-col gap-2.5">
      <div className="h-4 rounded-md bg-[#F0F0ED] w-[70%]" />
      <div className="h-3 rounded-md bg-[#F5F5F3] w-[90%]" />
      <div className="h-3 rounded-md bg-[#F5F5F3] w-[60%]" />
      <div className="h-px bg-[#F0F0ED] my-1" />
      <div className="flex justify-between">
        <div className="h-[18px] rounded-md bg-[#EFF6FF] w-[35%]" />
        <div className="h-3 rounded-md bg-[#F0F0ED] w-[25%]" />
      </div>
    </div>
  </div>
)

/* ─── Dashboard ─────────────────────────────────────────────────── */
const Dashboard = () => {
  const { handleGetSellerProduct } = useProduct()
  const sellerProducts = useSelector(state => state.product.sellerProducts)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try { await handleGetSellerProduct() } finally { setLoading(false) }
    }
    load()
  }, [])

  const filtered = (sellerProducts || []).filter(p =>
    p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#F8F8F6] font-['Inter',sans-serif]">

      {/* Shimmer keyframe + Inter font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      {/* ── Top Nav ───────────────────────────────────────── */}
      <header className="bg-white border-b border-[#EFEFED] px-10 h-16 flex items-center
                         justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2.5">
          <span className="text-[13px] font-bold uppercase tracking-[0.22em] text-[#1E3A5F]">
            Snitch
          </span>
          <span className="text-[#E0E0DC] text-lg">·</span>
          <span className="text-[11px] text-[#ADADAD] uppercase tracking-[0.14em] font-semibold">
            Seller Studio
          </span>
        </div>

        <button
          onClick={() => navigate('/seller/create-product')}
          className="flex items-center gap-1.5 px-5 py-2.5 bg-[#1E3A5F] text-white border-none
                     rounded-lg text-[12px] font-semibold uppercase tracking-widest cursor-pointer
                     transition-all duration-200 hover:bg-[#16305A] hover:-translate-y-px"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          New Product
        </button>
      </header>

      {/* ── Page Body ─────────────────────────────────────── */}
      <main className="max-w-[1200px] mx-auto px-10 py-12">

        {/* ── Heading ─────────────────────────────────────── */}
        <div className="mb-9">
          <p className="m-0 mb-2.5 text-[11px] uppercase tracking-[0.2em] text-[#ADADAD] font-semibold">
            Seller&nbsp;/&nbsp;Dashboard
          </p>
          <div className="flex items-end justify-between flex-wrap gap-5">
            <div>
              <h1 className="m-0 mb-2.5 text-[2rem] font-bold text-[#1A1A1A]
                             tracking-tight leading-none">
                My Products
              </h1>
              <div className="h-[3px] w-11 rounded-full bg-[#1E3A5F]" />
            </div>

            {/* Stats pill */}
            {!loading && sellerProducts?.length > 0 && (
              <div className="flex items-center gap-1.5 bg-[#EFF6FF] border border-[#BFDBFE]
                              rounded-full px-3.5 py-1.5">
                <div className="w-2 h-2 rounded-full bg-[#1E3A5F]" />
                <span className="text-xs text-[#1E3A5F] font-semibold">
                  {sellerProducts.length} {sellerProducts.length === 1 ? 'product' : 'products'} listed
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ── Search ──────────────────────────────────────── */}
        {!loading && sellerProducts?.length > 0 && (
          <div className="mb-7 max-w-sm">
            <div className="relative">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#B0B0AA]"
                width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search products…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E5E5E2] rounded-xl
                           text-[13px] text-[#1A1A1A] placeholder-[#B5B5B0] outline-none
                           font-['Inter',sans-serif]
                           focus:border-[#1E3A5F] focus:ring-2 focus:ring-[#1E3A5F18]
                           transition-all duration-200"
              />
            </div>
          </div>
        )}

        {/* ── Product Grid ────────────────────────────────── */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            : filtered.length === 0 && !searchQuery
              ? <EmptyState onAdd={() => navigate('/seller/create-product')} />
              : filtered.map(product => (
                  <ProductCard key={product._id} product={product} />
                ))
          }
        </div>

        {/* ── No search results ───────────────────────────── */}
        {!loading && sellerProducts?.length > 0 && filtered.length === 0 && searchQuery && (
          <p className="text-center py-16 text-[13px] text-[#ADADAD]">
            No products match&nbsp;
            <strong className="text-[#1A1A1A]">"{searchQuery}"</strong>
          </p>
        )}

      </main>
    </div>
  )
}

export default Dashboard
