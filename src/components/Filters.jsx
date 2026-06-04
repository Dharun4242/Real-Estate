import { SearchIcon, PinIcon, RulerIcon } from './icons'
import { LOCATIONS, SIZE_CATEGORIES } from '../data/plots'

function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={
        'whitespace-nowrap rounded-full border px-4 py-1.5 text-sm font-medium transition ' +
        (active
          ? 'border-brand-600 bg-brand-600 text-white shadow-sm'
          : 'border-slate-200 bg-white text-slate-600 hover:border-brand-300 hover:text-brand-700')
      }
    >
      {children}
    </button>
  )
}

export default function Filters({ filters, setFilters, count }) {
  const update = (patch) => setFilters((f) => ({ ...f, ...patch }))

  const reset = () =>
    setFilters({ query: '', location: 'All', size: 'All', sort: 'recommended' })

  const isDefault =
    !filters.query &&
    filters.location === 'All' &&
    filters.size === 'All' &&
    filters.sort === 'recommended'

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      {/* Search + sort row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            value={filters.query}
            onChange={(e) => update({ query: e.target.value })}
            placeholder="Search by title, area or plot code…"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-100"
          />
        </div>
        <select
          value={filters.sort}
          onChange={(e) => update({ sort: e.target.value })}
          className="rounded-xl border border-slate-200 bg-slate-50 py-3 pl-4 pr-9 text-sm font-medium text-slate-700 outline-none transition focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-100"
        >
          <option value="recommended">Recommended</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="size-asc">Size: Small to Large</option>
          <option value="size-desc">Size: Large to Small</option>
        </select>
      </div>

      {/* Location chips */}
      <div className="mt-5">
        <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
          <PinIcon className="h-4 w-4" /> Location
        </div>
        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
          <Chip
            active={filters.location === 'All'}
            onClick={() => update({ location: 'All' })}
          >
            All Tamil Nadu
          </Chip>
          {LOCATIONS.map((loc) => (
            <Chip
              key={loc}
              active={filters.location === loc}
              onClick={() => update({ location: loc })}
            >
              {loc}
            </Chip>
          ))}
        </div>
      </div>

      {/* Size chips */}
      <div className="mt-4">
        <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
          <RulerIcon className="h-4 w-4" /> Plot Size
        </div>
        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
          <Chip
            active={filters.size === 'All'}
            onClick={() => update({ size: 'All' })}
          >
            All Sizes
          </Chip>
          {SIZE_CATEGORIES.map((s) => (
            <Chip
              key={s.key}
              active={filters.size === s.key}
              onClick={() => update({ size: s.key })}
            >
              {s.label}
              <span className="ml-1.5 hidden text-xs opacity-70 sm:inline">
                · {s.range}
              </span>
            </Chip>
          ))}
        </div>
      </div>

      {/* Footer: count + reset */}
      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
        <p className="text-sm text-slate-500">
          <span className="font-semibold text-slate-800">{count}</span>{' '}
          {count === 1 ? 'plot' : 'plots'} found
        </p>
        {!isDefault && (
          <button
            onClick={reset}
            className="text-sm font-semibold text-brand-700 hover:text-brand-800"
          >
            Reset filters
          </button>
        )}
      </div>
    </div>
  )
}
