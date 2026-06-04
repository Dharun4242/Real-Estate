import PlotCard from './PlotCard'
import { SearchIcon } from './icons'

export default function PlotGrid({ plots, onSelect }) {
  if (plots.length === 0) {
    return (
      <div className="mt-10 grid place-items-center rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center">
        <SearchIcon className="h-10 w-10 text-slate-300" />
        <h3 className="mt-4 text-lg font-semibold text-slate-700">
          No plots match your filters
        </h3>
        <p className="mt-1 max-w-sm text-sm text-slate-500">
          Try a different location or plot size — or reset the filters to see
          everything we have across Tamil Nadu.
        </p>
      </div>
    )
  }

  return (
    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {plots.map((plot, i) => (
        <div
          key={plot.id}
          className="animate-fade-up"
          style={{ animationDelay: `${Math.min(i * 60, 360)}ms` }}
        >
          <PlotCard plot={plot} onSelect={onSelect} />
        </div>
      ))}
    </div>
  )
}
