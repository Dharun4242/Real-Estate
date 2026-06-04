import { PinIcon, RulerIcon, CompassIcon } from './icons'
import { formatINR } from '../data/plots'

const categoryStyle = {
  Compact: 'bg-sky-100 text-sky-700',
  Standard: 'bg-brand-100 text-brand-700',
  Premium: 'bg-amber-100 text-amber-700',
  Villa: 'bg-purple-100 text-purple-700',
}

export default function PlotCard({ plot, onSelect }) {
  const sold = plot.status === 'sold'

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-48 overflow-hidden">
        <img
          src={plot.image}
          alt={plot.title}
          loading="lazy"
          className={
            'h-full w-full object-cover transition duration-500 group-hover:scale-105 ' +
            (sold ? 'grayscale' : '')
          }
        />
        <div className="absolute left-3 top-3 flex gap-2">
          <span
            className={
              'rounded-full px-2.5 py-1 text-xs font-semibold ' +
              categoryStyle[plot.sizeCategory]
            }
          >
            {plot.sizeCategory}
          </span>
        </div>
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-slate-700 backdrop-blur">
          {plot.approval}
        </span>
        {sold && (
          <div className="absolute inset-0 grid place-items-center bg-slate-900/40">
            <span className="rotate-[-8deg] rounded-lg bg-red-600 px-4 py-1.5 text-sm font-bold uppercase tracking-wider text-white shadow-lg">
              Sold Out
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-bold leading-tight text-slate-900">
            {plot.title}
          </h3>
          <span className="shrink-0 rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500">
            {plot.id}
          </span>
        </div>

        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-slate-500">
          <PinIcon className="h-4 w-4 text-brand-600" />
          {plot.area}, {plot.location}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
            <RulerIcon className="h-4 w-4 text-slate-400" />
            <span className="font-semibold text-slate-700">
              {plot.sqft.toLocaleString('en-IN')} sq.ft
            </span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
            <CompassIcon className="h-4 w-4 text-slate-400" />
            <span className="font-semibold text-slate-700">
              {plot.facing} facing
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-end justify-between border-t border-slate-100 pt-4">
          <div>
            <div className="text-xl font-extrabold text-slate-900">
              {plot.priceLabel}
            </div>
            <div className="text-xs text-slate-400">
              ₹{plot.pricePerSqft.toLocaleString('en-IN')} / sq.ft
            </div>
          </div>
          <button
            onClick={() => onSelect(plot)}
            disabled={sold}
            className={
              'rounded-full px-4 py-2 text-sm font-semibold transition ' +
              (sold
                ? 'cursor-not-allowed bg-slate-100 text-slate-400'
                : 'bg-brand-700 text-white shadow-sm hover:bg-brand-800')
            }
          >
            {sold ? 'Unavailable' : 'View & Book'}
          </button>
        </div>
      </div>
    </article>
  )
}
