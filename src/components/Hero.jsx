import { ShieldIcon, PinIcon, SparkIcon } from './icons'
import { ADVANCE_AMOUNT, formatINR } from '../data/plots'

const stats = [
  { value: '8+', label: 'Cities in Tamil Nadu' },
  { value: '500+', label: 'Plots delivered' },
  { value: '100%', label: 'Clear-title & approved' },
]

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-brand-950 text-white"
    >
      {/* Background image + gradient */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=70"
          alt=""
          className="h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-950 via-brand-900/90 to-brand-950" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="max-w-2xl animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-200">
            <SparkIcon className="h-4 w-4" /> DTCP & RERA Approved Layouts
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Own a piece of{' '}
            <span className="text-brand-300">Tamil Nadu</span> you'll be
            proud of.
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-brand-100/90">
            Premium, ready-to-register plots across Chennai, Coimbatore,
            Madurai and beyond. Filter by location and plot size, then
            reserve your plot online with just a{' '}
            <span className="font-semibold text-white">
              {formatINR(ADVANCE_AMOUNT)} advance
            </span>
            .
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#plots"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-800 shadow-lg transition hover:bg-brand-50"
            >
              <PinIcon className="h-4 w-4" /> Browse Plots
            </a>
            <a
              href="#how"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              How booking works
            </a>
          </div>

          <div className="mt-12 grid max-w-lg grid-cols-3 gap-6">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-extrabold sm:text-3xl">
                  {s.value}
                </div>
                <div className="mt-1 text-xs text-brand-200/80">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust strip */}
      <div className="relative border-t border-white/10 bg-brand-950/60">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-4 py-4 text-sm text-brand-100/80 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2">
            <ShieldIcon className="h-4 w-4 text-brand-300" /> Bank loan
            assistance
          </span>
          <span className="inline-flex items-center gap-2">
            <ShieldIcon className="h-4 w-4 text-brand-300" /> Clear & marketable
            title
          </span>
          <span className="inline-flex items-center gap-2">
            <ShieldIcon className="h-4 w-4 text-brand-300" /> Secure online
            payments
          </span>
        </div>
      </div>
    </section>
  )
}
