import { useEffect, useState } from 'react'
import {
  CloseIcon,
  PinIcon,
  RulerIcon,
  CompassIcon,
  ShieldIcon,
  CheckIcon,
} from './icons'
import { ADVANCE_AMOUNT, formatINR } from '../data/plots'
import { startBooking, verifyBooking } from '../lib/cashfree'

const EMPTY = { name: '', email: '', phone: '' }

function validate({ name, email, phone }) {
  const errors = {}
  if (!name.trim()) errors.name = 'Please enter your name'
  if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = 'Enter a valid email'
  if (!/^[6-9]\d{9}$/.test(phone.replace(/\s/g, '')))
    errors.phone = 'Enter a valid 10-digit mobile number'
  return errors
}

export default function BookingModal({ plot, onClose }) {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  // status: 'form' | 'processing' | 'success' | 'failed'
  const [status, setStatus] = useState('form')
  const [message, setMessage] = useState('')

  // Lock body scroll while the modal is open.
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  // Close on Escape (but not mid-payment).
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && status !== 'processing') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [status, onClose])

  if (!plot) return null

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    setErrors((er) => ({ ...er, [key]: undefined }))
  }

  async function handlePay(e) {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }

    setStatus('processing')
    setMessage('')
    try {
      const { orderId } = await startBooking({ plot, customer: form })
      // Checkout window has closed — confirm the real status with our backend.
      const result = await verifyBooking(orderId)
      if (result.status === 'PAID') {
        setStatus('success')
      } else {
        setStatus('failed')
        setMessage(
          'Your payment was not completed. No advance has been charged — please try again.',
        )
      }
    } catch (err) {
      setStatus('failed')
      setMessage(err.message || 'Something went wrong. Please try again.')
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={() => status !== 'processing' && onClose()}
    >
      <div
        className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => status !== 'processing' && onClose()}
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-slate-600 shadow-sm backdrop-blur transition hover:bg-white disabled:opacity-40"
          disabled={status === 'processing'}
          aria-label="Close"
        >
          <CloseIcon className="h-5 w-5" />
        </button>

        {/* ---- Left: plot summary ---- */}
        <div className="relative md:w-2/5">
          <img
            src={plot.image}
            alt={plot.title}
            className="h-44 w-full object-cover md:h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
          <div className="absolute bottom-0 p-5 text-white">
            <span className="rounded-full bg-white/20 px-2.5 py-1 text-xs font-semibold backdrop-blur">
              {plot.sizeCategory} · {plot.approval}
            </span>
            <h3 className="mt-2 text-xl font-bold">{plot.title}</h3>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-white/90">
              <PinIcon className="h-4 w-4" />
              {plot.area}, {plot.location}
            </p>
            <div className="mt-3 flex gap-4 text-sm">
              <span className="flex items-center gap-1.5">
                <RulerIcon className="h-4 w-4" /> {plot.sqft.toLocaleString('en-IN')} sq.ft
              </span>
              <span className="flex items-center gap-1.5">
                <CompassIcon className="h-4 w-4" /> {plot.facing}
              </span>
            </div>
          </div>
        </div>

        {/* ---- Right: form / status ---- */}
        <div className="flex flex-1 flex-col overflow-y-auto p-6 sm:p-8">
          {status === 'success' ? (
            <SuccessState plot={plot} customer={form} onClose={onClose} />
          ) : (
            <>
              <div className="flex items-baseline justify-between">
                <h2 className="text-2xl font-extrabold text-slate-900">
                  Reserve this plot
                </h2>
                <span className="text-sm text-slate-400 line-through">
                  {plot.priceLabel}
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-500">
                Block <span className="font-semibold text-slate-700">{plot.id}</span> in
                your name by paying a refundable advance.
              </p>

              {/* Advance highlight */}
              <div className="mt-5 flex items-center justify-between rounded-2xl border border-brand-200 bg-brand-50 px-5 py-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-brand-700">
                    Advance to pay now
                  </div>
                  <div className="text-3xl font-extrabold text-brand-800">
                    {formatINR(ADVANCE_AMOUNT)}
                  </div>
                </div>
                <ShieldIcon className="h-9 w-9 text-brand-600" />
              </div>

              {status === 'failed' && (
                <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {message}
                </div>
              )}

              <form onSubmit={handlePay} className="mt-5 space-y-4">
                <Field
                  label="Full name"
                  value={form.name}
                  onChange={set('name')}
                  error={errors.name}
                  placeholder="e.g. Karthik Raja"
                  disabled={status === 'processing'}
                />
                <Field
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={set('email')}
                  error={errors.email}
                  placeholder="you@example.com"
                  disabled={status === 'processing'}
                />
                <Field
                  label="Mobile number"
                  type="tel"
                  value={form.phone}
                  onChange={set('phone')}
                  error={errors.phone}
                  placeholder="10-digit mobile"
                  disabled={status === 'processing'}
                />

                <button
                  type="submit"
                  disabled={status === 'processing'}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-700 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === 'processing' ? (
                    <>
                      <Spinner /> Processing payment…
                    </>
                  ) : (
                    <>Pay {formatINR(ADVANCE_AMOUNT)} & Reserve</>
                  )}
                </button>

                <p className="flex items-center justify-center gap-1.5 text-center text-xs text-slate-400">
                  <ShieldIcon className="h-3.5 w-3.5" />
                  Secured by Cashfree · 100% encrypted payment
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function Field({ label, error, ...props }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </span>
      <input
        {...props}
        className={
          'w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:bg-white focus:ring-2 ' +
          (error
            ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
            : 'border-slate-200 focus:border-brand-500 focus:ring-brand-100')
        }
      />
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  )
}

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="4" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

function SuccessState({ plot, customer, onClose }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center py-6 text-center">
      <span className="grid h-16 w-16 place-items-center rounded-full bg-brand-100 text-brand-700">
        <CheckIcon className="h-8 w-8" />
      </span>
      <h2 className="mt-5 text-2xl font-extrabold text-slate-900">
        Plot reserved! 🎉
      </h2>
      <p className="mt-2 max-w-sm text-sm text-slate-500">
        Thank you, <span className="font-semibold text-slate-700">{customer.name}</span>.
        Your advance of {formatINR(ADVANCE_AMOUNT)} for{' '}
        <span className="font-semibold text-slate-700">{plot.title}</span> ({plot.id})
        is confirmed. Our team will call you on{' '}
        <span className="font-semibold text-slate-700">{customer.phone}</span> shortly to
        arrange a site visit.
      </p>
      <button
        onClick={onClose}
        className="mt-7 rounded-xl bg-brand-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-800"
      >
        Done
      </button>
    </div>
  )
}
