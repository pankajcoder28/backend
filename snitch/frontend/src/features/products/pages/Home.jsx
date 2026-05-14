import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useProduct } from '../hook/useProduct'
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

/* ─── Navbar ────────────────────────────────────────────────────── */
const Navbar = ({ user, navigate }) => (
  <header className="bg-white border-b border-[#EFEFED] sticky top-0 z-50 px-10 h-16 flex items-center justify-between">
    {/* Logo */}
    <div className="flex items-center gap-2.5">
      <span className="text-[13px] font-extrabold tracking-[0.22em] uppercase text-[#1E3A5F]">
        Snitch
      </span>
      <span className="text-[#E0E0DC] text-lg">·</span>
      <span className="text-[11px] text-[#ADADAD] tracking-[0.14em] uppercase font-semibold">
        Store
      </span>
    </div>

    {/* Actions */}
    <div className="flex items-center gap-3">
      {user ? (
        <>
          {user.isSeller && (
            <button
              onClick={() => navigate('/seller/dashboard')}
              className="px-[18px] py-2 bg-transparent border border-[#1E3A5F] rounded-[10px] text-xs font-semibold tracking-[0.1em] uppercase text-[#1E3A5F] cursor-pointer transition-all duration-200 hover:bg-[#EFF6FF]"
            >
              Dashboard
            </button>
          )}
          <div className="w-[34px] h-[34px] rounded-full bg-[#1E3A5F] text-white flex items-center justify-center text-[13px] font-bold tracking-wide">
            {(user.name || user.email || 'U')[0].toUpperCase()}
          </div>
        </>
      ) : (
        <>
          <button
            onClick={() => navigate('/login')}
            className="px-[18px] py-2 bg-transparent border border-[#E0E0DC] rounded-[10px] text-xs font-semibold tracking-[0.1em] uppercase text-[#555] cursor-pointer transition-all duration-200 hover:border-[#1E3A5F] hover:text-[#1E3A5F]"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate('/register')}
            className="px-5 py-2 bg-[#1E3A5F] border-none rounded-[10px] text-xs font-semibold tracking-[0.1em] uppercase text-white cursor-pointer transition-all duration-200 hover:bg-[#16305A] hover:-translate-y-px"
          >
            Register
          </button>
        </>
      )}
    </div>
  </header>
)

/* ─── Hero Banner ───────────────────────────────────────────────── */
const Hero = () => (
  <section
    className="relative overflow-hidden py-[72px] px-10 text-center"
    style={{ background: 'linear-gradient(135deg, #0F2340 0%, #1E3A5F 55%, #2D5080 100%)' }}
  >
    {/* Decorative rings */}
    <div className="absolute -top-20 -right-20 w-[360px] h-[360px] rounded-full border border-white/[0.06] pointer-events-none" />
    <div className="absolute -bottom-[120px] -left-[60px] w-[440px] h-[440px] rounded-full border border-white/[0.04] pointer-events-none" />

    <p className="m-0 mb-[14px] text-[11px] font-bold tracking-[0.28em] uppercase text-white/45">
      New Collection · 2026
    </p>

    <h1 className="m-0 mb-[18px] text-[clamp(2rem,5vw,3.4rem)] font-extrabold text-white leading-[1.1] tracking-tight">
      Wear What You{' '}
      <span
        className="bg-clip-text"
        style={{
          background: 'linear-gradient(90deg,#93C5FD,#BFDBFE)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Mean.
      </span>
    </h1>

    <p className="m-0 mx-auto mb-8 max-w-[480px] text-[15px] text-white/55 leading-[1.7]">
      Curated fashion that speaks before you do. Explore the latest pieces from our catalogue.
    </p>

    <a
      href="#products"
      className="inline-block px-[34px] py-[13px] bg-white text-[#1E3A5F] rounded-xl text-[13px] font-bold tracking-[0.1em] uppercase no-underline transition-all duration-[250ms] shadow-[0_4px_24px_rgba(0,0,0,0.18)] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.22)]"
    >
      Shop Now ↓
    </a>
  </section>
)

/* ─── Product Card ──────────────────────────────────────────────── */
const ProductCard = ({ product }) => {
  const [activeImg, setActiveImg] = useState(0)
  const [hovered, setHovered] = useState(false)
  const navigate = useNavigate()
  const images = product.images || []
  const hasImages = images.length > 0

  return (
    <article
      onClick={() => navigate(`/product/${product._id}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`bg-white rounded-[20px] overflow-hidden border border-[#EFEFED] flex flex-col cursor-pointer transition-all duration-300 ease-out ${
        hovered
          ? 'shadow-[0_12px_40px_rgba(30,58,95,0.14)] -translate-y-1'
          : 'shadow-[0_2px_8px_rgba(0,0,0,0.04)] translate-y-0'
      }`}
    >
      {/* Image area */}
      <div className="relative aspect-[3/4] bg-[#F5F5F3] overflow-hidden">
        {hasImages ? (
          <>
            <img
              src={images[activeImg]?.url}
              alt={product.title}
              className={`w-full h-full object-cover transition-transform duration-500 ease-in-out ${
                hovered ? 'scale-[1.04]' : 'scale-100'
              }`}
            />

            {/* Dot navigation */}
            {images.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 items-center">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={e => { e.stopPropagation(); setActiveImg(i) }}
                    className={`h-1.5 rounded-full border-none cursor-pointer p-0 transition-all duration-300 ${
                      i === activeImg
                        ? 'w-4 bg-[#1E3A5F]'
                        : 'w-1.5 bg-white/75'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Count badge */}
            {images.length > 1 && (
              <div className="absolute top-3 right-3 bg-black/[0.42] text-white text-[10px] font-bold tracking-[0.05em] px-[9px] py-0.5 rounded-full backdrop-blur-md">
                {activeImg + 1}/{images.length}
              </div>
            )}

            {/* "New" badge */}
            {(() => {
              const isNew = (Date.now() - new Date(product.createdAt)) < 7 * 24 * 3600 * 1000
              return isNew ? (
                <div className="absolute top-3 left-3 bg-[#1E3A5F] text-white text-[9px] font-extrabold tracking-[0.14em] px-[10px] py-[3px] rounded-full uppercase">
                  New
                </div>
              ) : null
            })()}
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-[#C0C0BB]">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <span className="text-[11px] tracking-[0.08em]">No Image</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1.5 px-[18px] pt-4 pb-[18px] flex-1 ">
        <h3 className="m-0 text-sm font-bold text-[#1A1A1A] tracking-[-0.01em] leading-[1.3] overflow-hidden text-ellipsis whitespace-nowrap">
          {product.title}
        </h3>

        {product.description && (
          <p
            className="m-0 text-xs text-[#8A8A8A] leading-[1.6] overflow-hidden"
            style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
          >
            {product.description}
          </p>
        )}

        {/* Price + CTA */}
        <div className="mt-auto pt-3 border-t border-[#F0F0ED] flex items-center justify-between">
          <span className="text-base font-extrabold text-[#1E3A5F] tracking-[-0.02em]">
            {formatPrice(product.price?.amount, product.price?.currency)}
          </span>
          <button
            onClick={() => navigate(`/product/${product._id}`)}
            className={`px-[14px] py-1.5 border border-[#1E3A5F] rounded-lg text-[11px] font-bold tracking-[0.08em] uppercase cursor-pointer transition-all duration-200 ${
              hovered
                ? 'bg-[#1E3A5F] text-white'
                : 'bg-transparent text-[#1E3A5F]'
            }`}
          >
            View
          </button>
        </div>
      </div>
    </article>
  )
}

/* ─── Skeleton Card ─────────────────────────────────────────────── */
const SkeletonCard = () => (
  <div className="bg-white rounded-[20px] overflow-hidden border border-[#EFEFED]">
    <div className="aspect-[3/4] bg-[#F0F0EE] animate-pulse" />
    <div className="p-[16px_18px_18px] flex flex-col gap-2.5">
      <div className="h-[14px] rounded-md bg-[#F0F0ED] w-[65%]" />
      <div className="h-[11px] rounded-md bg-[#F5F5F3] w-[90%]" />
      <div className="h-[11px] rounded-md bg-[#F5F5F3] w-[55%]" />
      <div className="h-px bg-[#F0F0ED] my-1" />
      <div className="flex justify-between">
        <div className="h-4 rounded-md bg-[#EFF6FF] w-[30%]" />
        <div className="h-7 rounded-lg bg-[#F0F0ED] w-[20%]" />
      </div>
    </div>
  </div>
)

/* ─── Empty State ───────────────────────────────────────────────── */
const EmptyState = () => (
  <div className="col-span-full flex flex-col items-center justify-center py-20 px-6 gap-4 text-center">
    <div className="w-[72px] h-[72px] rounded-full bg-[#EFF6FF] flex items-center justify-center">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
        stroke="#1E3A5F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
    </div>
    <div>
      <p className="m-0 mb-1.5 text-base font-bold text-[#1A1A1A]">No products yet</p>
      <p className="m-0 text-[13px] text-[#ADADAD] leading-[1.6]">
        Check back soon — new drops are on their way.
      </p>
    </div>
  </div>
)

/* ─── Home Page ─────────────────────────────────────────────────── */
const Home = () => {
  const products = useSelector(state => state.product.products)
  const user = useSelector(state => state.auth.user)
  const { handleGetAllProducts } = useProduct()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('newest')

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try { await handleGetAllProducts() } finally { setLoading(false) }
    }
    load()
  }, [])

  /* Filter + sort */
  const filtered = (products || [])
    .filter(p =>
      p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt)
      if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt)
      if (sortBy === 'price_asc') return a.price?.amount - b.price?.amount
      if (sortBy === 'price_desc') return b.price?.amount - a.price?.amount
      return 0
    })

  return (
    <div className="min-h-screen bg-[#F8F8F6] font-['Inter',sans-serif]">
      {/* Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #F8F8F6; }
        ::-webkit-scrollbar-thumb { background: #D0D0CC; border-radius: 3px; }
      `}</style>

      <Navbar user={user} navigate={navigate} />
      <Hero />

      {/* ── Catalogue Section ─────────────────────────── */}
      <main id="products" className="max-w-[1280px] mx-auto px-10 pt-[60px] pb-20">

        {/* Section heading */}
        <div className="mb-9">
          <p className="m-0 mb-2.5 text-[11px] font-bold tracking-[0.22em] uppercase text-[#ADADAD]">
            All Products
          </p>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <h2 className="m-0 mb-2.5 text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-[#1A1A1A] tracking-[-0.02em] leading-none">
                Shop the Collection
              </h2>
              <div className="h-[3px] w-11 rounded-full bg-[#1E3A5F]" />
            </div>

            {/* Product count pill */}
            {!loading && (products || []).length > 0 && (
              <div className="flex items-center gap-1.5 bg-[#EFF6FF] border border-[#BFDBFE] rounded-full px-3.5 py-1.5">
                <div className="w-[7px] h-[7px] rounded-full bg-[#1E3A5F]" />
                <span className="text-xs text-[#1E3A5F] font-semibold">
                  {filtered.length} {filtered.length === 1 ? 'item' : 'items'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ── Toolbar: Search + Sort ──────────────────── */}
        {!loading && (products || []).length > 0 && (
          <div className="flex items-center gap-3 mb-8 flex-wrap">
            {/* Search */}
            <div className="relative flex-[1_1_260px] max-w-[360px]">
              <svg
                className="absolute left-[13px] top-1/2 -translate-y-1/2 text-[#B0B0AA] pointer-events-none"
                width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search products…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E5E5E2] rounded-xl text-[13px] text-[#1A1A1A] font-[inherit] outline-none transition-[border-color,box-shadow] duration-200 focus:border-[#1E3A5F] focus:shadow-[0_0_0_3px_rgba(30,58,95,0.08)]"
              />
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="py-2.5 pl-3.5 pr-9 bg-white border border-[#E5E5E2] rounded-xl text-xs text-[#555] font-[inherit] outline-none cursor-pointer appearance-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 12px center',
              }}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="price_asc">Price: Low → High</option>
              <option value="price_desc">Price: High → Low</option>
            </select>
          </div>
        )}

        {/* ── Product Grid ────────────────────────────── */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-6">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : filtered.length === 0
              ? <EmptyState />
              : filtered.map(product => (
                  <ProductCard key={product._id} product={product} />
                ))
          }
        </div>

        {/* No search results */}
        {!loading && (products || []).length > 0 && filtered.length === 0 && searchQuery && (
          <p className="text-center py-[60px] text-[13px] text-[#ADADAD]">
            No products match&nbsp;
            <strong className="text-[#1A1A1A]">"{searchQuery}"</strong>
          </p>
        )}
      </main>

      {/* ── Footer ─────────────────────────────────────── */}
      <footer className="border-t border-[#EFEFED] bg-white px-10 py-7 flex items-center justify-between flex-wrap gap-3">
        <span className="text-xs font-extrabold tracking-[0.2em] uppercase text-[#1E3A5F]">
          Snitch
        </span>
        <span className="text-[11px] text-[#ADADAD]">
          © {new Date().getFullYear()} Snitch. All rights reserved.
        </span>
      </footer>
    </div>
  )
}

export default Home
