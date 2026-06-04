import { ShieldIcon, RulerIcon, PinIcon, SparkIcon } from './icons'
import { formatINR, ADVANCE_AMOUNT } from '../data/plots'

const features = [
  {
    icon: ShieldIcon,
    title: 'Approved & clear title',
    desc: 'Every layout is DTCP / RERA approved with a clear, marketable title and ready for instant registration.',
  },
  {
    icon: RulerIcon,
    title: 'Plots for every need',
    desc: 'From compact home plots to spacious villa plots — differentiated clearly by size so you pick the right fit.',
  },
  {
    icon: PinIcon,
    title: 'Across Tamil Nadu',
    desc: 'Prime locations in Chennai, Coimbatore, Madurai, Trichy, Salem, Hosur and more growth corridors.',
  },
  {
    icon: SparkIcon,
    title: 'Book online instantly',
    desc: `Reserve any plot with a secure ${formatINR(ADVANCE_AMOUNT)} advance via Cashfree — fully refundable as per policy.`,
  },
]

const steps = [
  {
    n: '01',
    title: 'Filter & explore',
    desc: 'Pick your city and preferred plot size to shortlist the right plots.',
  },
  {
    n: '02',
    title: 'Reserve your plot',
    desc: `Choose a plot and pay a ${formatINR(ADVANCE_AMOUNT)} advance to block it in your name.`,
  },
  {
    n: '03',
    title: 'Site visit & register',
    desc: 'Our team arranges a site visit, paperwork and smooth registration.',
  },
]

export default function Features() {
  return (
    <>
      <section id="why" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Why families trust PoesGarden
          </h2>
          <p className="mt-3 text-slate-500">
            Two decades of building gated communities and layouts that families
            are proud to call home.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-brand-200 hover:shadow-md"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-700">
                <f.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-lg font-bold text-slate-900">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="how" className="bg-brand-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Booking is simple
            </h2>
            <p className="mt-3 text-brand-100/80">
              Reserve your dream plot in three easy steps.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="relative rounded-2xl border border-white/10 bg-white/5 p-7">
                <span className="text-4xl font-extrabold text-brand-400/40">
                  {s.n}
                </span>
                <h3 className="mt-3 text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-100/80">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
