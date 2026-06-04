import { useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Filters from './components/Filters'
import PlotGrid from './components/PlotGrid'
import Features from './components/Features'
import Footer from './components/Footer'
import BookingModal from './components/BookingModal'
import { PLOTS } from './data/plots'

const DEFAULT_FILTERS = {
  query: '',
  location: 'All',
  size: 'All',
  sort: 'recommended',
}

export default function App() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [selected, setSelected] = useState(null)

  const visiblePlots = useMemo(() => {
    const q = filters.query.trim().toLowerCase()

    let list = PLOTS.filter((p) => {
      if (filters.location !== 'All' && p.location !== filters.location)
        return false
      if (filters.size !== 'All' && p.sizeCategory !== filters.size)
        return false
      if (q) {
        const haystack = `${p.title} ${p.area} ${p.location} ${p.id}`.toLowerCase()
        if (!haystack.includes(q)) return false
      }
      return true
    })

    const sorters = {
      'price-asc': (a, b) => a.totalPrice - b.totalPrice,
      'price-desc': (a, b) => b.totalPrice - a.totalPrice,
      'size-asc': (a, b) => a.sqft - b.sqft,
      'size-desc': (a, b) => b.sqft - a.sqft,
      // Recommended: available plots first, then by price.
      recommended: (a, b) =>
        (a.status === 'sold') - (b.status === 'sold') ||
        a.totalPrice - b.totalPrice,
    }
    return [...list].sort(sorters[filters.sort] || sorters.recommended)
  }, [filters])

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main>
        <Hero />

        <section id="plots" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 max-w-2xl">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Available plots
            </h2>
            <p className="mt-3 text-slate-500">
              Filter by location and plot size to find the perfect plot, then
              reserve it online in minutes.
            </p>
          </div>

          <Filters
            filters={filters}
            setFilters={setFilters}
            count={visiblePlots.length}
          />

          <PlotGrid plots={visiblePlots} onSelect={setSelected} />
        </section>

        <Features />
      </main>
      <Footer />

      {selected && (
        <BookingModal plot={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  )
}
