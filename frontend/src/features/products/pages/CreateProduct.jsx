import React, { useState, useRef, useCallback } from 'react'
import { useProduct } from '../hook/useProduct'
import { useNavigate } from 'react-router-dom'

const CURRENCIES = ['INR', 'USD', 'EUR', 'GBP', 'AED', 'JPY']
const MAX_IMAGES = 7

const CreateProduct = () => {
  const { handleCreateProduct } = useProduct()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    title: '',
    description: '',
    priceAmount: '',
    priceCurrency: 'INR',
  })
  const [images, setImages]     = useState([])
  const [previews, setPreviews] = useState([])
  const [isDragging, setIsDragging]     = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMsg, setSuccessMsg]     = useState('')
  const [errorMsg, setErrorMsg]         = useState('')

  const fileInputRef = useRef(null)

  /* ─── helpers ─────────────────────────────────────────────────── */

  const addFiles = useCallback((files) => {
    const slots    = MAX_IMAGES - images.length
    const incoming = Array.from(files).slice(0, slots)
    if (!incoming.length) return
    setImages((prev) => [...prev, ...incoming])
    incoming.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => setPreviews((prev) => [...prev, e.target.result])
      reader.readAsDataURL(file)
    })
  }, [images])

  const removeImage = (idx) => {
    setImages((prev)   => prev.filter((_, i) => i !== idx))
    setPreviews((prev) => prev.filter((_, i) => i !== idx))
  }

  /* ─── drag & drop ─────────────────────────────────────────────── */
  const onDragOver  = (e) => { e.preventDefault(); setIsDragging(true) }
  const onDragLeave = ()  => setIsDragging(false)
  const onDrop      = (e) => {
    e.preventDefault()
    setIsDragging(false)
    addFiles(e.dataTransfer.files)
  }

  /* ─── submit ──────────────────────────────────────────────────── */
  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('')
    setSuccessMsg('')

    if (!form.title.trim())                           return setErrorMsg('Product title is required.')
    if (!form.priceAmount || isNaN(form.priceAmount)) return setErrorMsg('Enter a valid price.')

    setIsSubmitting(true)
    try {
      const fd = new FormData()
      fd.append('title',         form.title)
      fd.append('description',   form.description)
      fd.append('priceAmount',   form.priceAmount)
      fd.append('priceCurrency', form.priceCurrency)
      images.forEach((img) => fd.append('images', img))

      await handleCreateProduct(fd)
      setSuccessMsg('Product created successfully!')
      setForm({ title: '', description: '', priceAmount: '', priceCurrency: 'INR' })
      setImages([])
      setPreviews([])
      navigate('/')
    } catch (err) {
      setErrorMsg(err?.message || 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  /* ─── shared input classes ────────────────────────────────────── */
  const inputCls = `
    w-full bg-[#F5F5F3] text-[#1A1A1A] placeholder-[#B5B5B0]
    px-4 py-3.5 rounded-lg text-sm leading-relaxed
    border border-[#E5E5E2]
    focus:outline-none focus:border-[#1E3A5F] focus:ring-2 focus:ring-[#1E3A5F18]
    transition-all duration-200
  `
  const labelCls = `block text-[11px] uppercase tracking-[0.14em] text-[#8A8A8A] font-semibold mb-2`

  /* ─── render ──────────────────────────────────────────────────── */
  return (
    <div
      className="flex min-h-screen bg-[#F8F8F6] font-['Inter',sans-serif]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >

      {/* ══════════════════════════════════════════════════════════
          LEFT PANEL — sticky aesthetic photo
      ══════════════════════════════════════════════════════════ */}
      <div className="hidden lg:flex w-[47%] shrink-0 sticky top-0 h-screen flex-col overflow-hidden">

        {/* Image fills the panel */}
        <div className="relative flex-1 overflow-hidden">
          <img
            src="/product_form_aesthetic.png"
            alt="Create product aesthetic"
            className="w-full h-full object-cover"
          />

          {/* Gradient overlay at top for brand text */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/30" />

          {/* Brand badge */}
          <div className="absolute top-8 left-8">
            <span className="text-white text-sm uppercase tracking-[0.22em] font-semibold
                             bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              Snitch Studio
            </span>
          </div>

          {/* Bottom quote */}
          <div className="absolute bottom-10 left-8 right-8">
            <p className="text-white/90 text-lg font-light leading-snug tracking-wide">
              "List your product.<br />
              <span className="font-semibold">Let it speak."</span>
            </p>
            <div className="mt-3 h-px w-10 bg-white/40" />
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          RIGHT PANEL — scrollable form
      ══════════════════════════════════════════════════════════ */}
      <div className="flex-1 overflow-y-auto bg-white px-8 py-14 lg:px-16 flex justify-center">
        <div className="w-full max-w-[580px]">

          {/* ── Heading ───────────────────────────────────────── */}
          <div className="mb-5">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#ADADAD] font-medium mb-3">
              Products &nbsp;/&nbsp; New
            </p>
            <h1 className="text-[2rem] font-bold text-[#1A1A1A] tracking-tight leading-none mb-3">
              Create Product
            </h1>
            <div className="h-[3px] w-12 rounded-full bg-[#1E3A5F]" />
          </div>

          {/* ── Form ──────────────────────────────────────────── */}
          <form
            onSubmit={handleSubmit}
            className="space-y-8"
          >

            {/* Banners */}
            {successMsg && (
              <div className="px-4 py-3 bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg text-[#1E3A5F] text-sm">
                ✓ &nbsp;{successMsg}
              </div>
            )}
            {errorMsg && (
              <div className="px-4 py-3 bg-[#FEF2F2] border border-[#FECACA] rounded-lg text-[#991B1B] text-sm">
                ⚠ &nbsp;{errorMsg}
              </div>
            )}

            {/* ── 1. Title ──────────────────────────────────── */}
            <div>
              <label htmlFor="title" className={labelCls}>
                Product Title <span className="text-[#1E3A5F] normal-case tracking-normal">*</span>
              </label>
              <input
                id="title"
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Relaxed-Fit Linen Shirt"
                className={inputCls}
              />
            </div>

            {/* ── 2. Description ────────────────────────────── */}
            <div>
              <label htmlFor="description" className={labelCls}>
                Description
              </label>
              <textarea
                id="description"
                rows={5}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Describe the product — materials, fit, sizing details…"
                className={`${inputCls} resize-none`}
              />
            </div>

            {/* ── 3. Price ──────────────────────────────────── */}
            <div>
              <label className={labelCls}>
                Price <span className="text-[#1E3A5F] normal-case tracking-normal">*</span>
              </label>
              <div className="flex gap-3">
                <input
                  id="priceAmount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.priceAmount}
                  onChange={(e) => setForm({ ...form, priceAmount: e.target.value })}
                  placeholder="0.00"
                  className={`
                    flex-1 bg-[#F5F5F3] text-[#1A1A1A] placeholder-[#B5B5B0]
                    px-4 py-3.5 rounded-lg text-sm border border-[#E5E5E2]
                    focus:outline-none focus:border-[#1E3A5F] focus:ring-2 focus:ring-[#1E3A5F18]
                    transition-all duration-200
                    [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none
                    [&::-webkit-inner-spin-button]:appearance-none
                  `}
                />
                <select
                  id="priceCurrency"
                  value={form.priceCurrency}
                  onChange={(e) => setForm({ ...form, priceCurrency: e.target.value })}
                  className="
                    w-28 bg-[#F5F5F3] text-[#1A1A1A] px-3 py-3.5 rounded-lg text-sm
                    border border-[#E5E5E2] cursor-pointer
                    focus:outline-none focus:border-[#1E3A5F] focus:ring-2 focus:ring-[#1E3A5F18]
                    transition-all duration-200
                  "
                >
                  {CURRENCIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* ── 4. Images ─────────────────────────────────── */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className={labelCls.replace('mb-2', '')}>Product Images</label>
                <span className={`text-[10px] uppercase tracking-[0.12em] font-semibold ${
                  images.length >= MAX_IMAGES ? 'text-[#1E3A5F]' : 'text-[#C8C8C4]'
                }`}>
                  {images.length} / {MAX_IMAGES}
                </span>
              </div>

              {/* Drop zone */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => images.length < MAX_IMAGES && fileInputRef.current?.click()}
                onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                className={`
                  flex flex-col items-center justify-center gap-3 px-6 py-10
                  rounded-xl border-2 border-dashed transition-all duration-200 select-none
                  ${isDragging
                    ? 'border-[#1E3A5F] bg-[#EFF6FF] cursor-copy'
                    : images.length >= MAX_IMAGES
                      ? 'border-[#E5E5E2] bg-[#FAFAFA] cursor-not-allowed opacity-50'
                      : 'border-[#D8D8D4] bg-[#FAFAF8] cursor-pointer hover:border-[#1E3A5F] hover:bg-[#F4F8FF]'
                  }
                `}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round"
                  className={`transition-colors duration-200 ${isDragging ? 'text-[#1E3A5F]' : 'text-[#B8B8B4]'}`}>
                  <polyline points="16 16 12 12 8 16" />
                  <line x1="12" y1="12" x2="12" y2="21" />
                  <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                </svg>
                <div className="text-center">
                  <p className="text-sm font-medium text-[#4A4A4A]">
                    {isDragging ? 'Release to upload' : 'Drag & drop images here'}
                  </p>
                  <p className="text-xs text-[#ADADAD] mt-1">
                    or{' '}
                    <span className="text-[#1E3A5F] font-semibold underline underline-offset-2">browse files</span>
                    {' '}— JPEG, PNG, WEBP · up to {MAX_IMAGES}
                  </p>
                </div>
              </div>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => addFiles(e.target.files)}
              />

              {/* 7-slot thumbnails */}
              <div className="grid grid-cols-7 gap-2 mt-4">
                {Array.from({ length: MAX_IMAGES }).map((_, i) => {
                  const filled = i < previews.length
                  return (
                    <div
                      key={i}
                      className={`
                        relative aspect-square rounded-lg overflow-hidden
                        flex items-center justify-center group
                        ${filled
                          ? 'border border-[#1E3A5F30] shadow-sm'
                          : 'border border-dashed border-[#D5D5D0] bg-[#F5F5F3]'
                        }
                      `}
                    >
                      {filled ? (
                        <>
                          <img
                            src={previews[i]}
                            alt={`Preview ${i + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(i)}
                            className="
                              absolute inset-0 bg-[#1A1A1ACC] opacity-0 group-hover:opacity-100
                              flex items-center justify-center transition-opacity duration-200
                            "
                          >
                            <svg xmlns="http://www.w3.org/2000/svg"
                              width="13" height="13" viewBox="0 0 24 24"
                              fill="none" stroke="white" strokeWidth="2.5"
                              strokeLinecap="round" strokeLinejoin="round">
                              <line x1="18" y1="6" x2="6" y2="18" />
                              <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                          </button>
                        </>
                      ) : (
                        <span className="text-[#C8C8C4] text-base font-light select-none">+</span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* ── Divider ───────────────────────────────────── */}
            <div className="border-t border-[#F0F0ED]" />

            {/* ── 5. Submit ─────────────────────────────────── */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="
                w-full bg-[#1E3A5F] text-white font-semibold text-sm uppercase
                tracking-[0.1em] py-4 rounded-xl
                hover:bg-[#16305A] hover:-translate-y-[1px]
                hover:shadow-[0_8px_24px_rgba(30,58,95,0.28)]
                active:translate-y-0 active:shadow-none
                disabled:opacity-50 disabled:cursor-not-allowed
                disabled:hover:translate-y-0 disabled:hover:shadow-none
                transition-all duration-200 ease-out
              "
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white opacity-70"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10"
                      stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Creating…
                </span>
              ) : (
                'Create Product'
              )}
            </button>

          </form>

          {/* ── Footer ────────────────────────────────────────── */}
          <p className="mt-6 text-center text-[11px] uppercase tracking-[0.12em] text-[#C0C0BB]">
            Fields marked <span className="text-[#1E3A5F] font-semibold">*</span> are required
          </p>

        </div>
      </div>

    </div>
  )
}

export default CreateProduct