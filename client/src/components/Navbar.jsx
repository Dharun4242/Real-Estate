import { useState } from 'react'
import { LeafIcon, MenuIcon, CloseIcon, PhoneIcon } from './icons'

const links = [
  { href: '#plots', label: 'Plots' },
  { href: '#why', label: 'Why Us' },
  { href: '#how', label: 'How it Works' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-700 text-white shadow-sm">
            <LeafIcon className="h-5 w-5" />
          </span>
          <span className="leading-tight">
            <span className="block text-base font-extrabold tracking-tight text-slate-900">
              PoesGarden
            </span>
            <span className="block text-[11px] font-medium uppercase tracking-[0.18em] text-brand-700">
              Real Estate · Chennai
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-slate-600 transition hover:text-brand-700"
            >
              {l.label}
            </a>
          ))}
          <a
            href="tel:+914400000000"
            className="inline-flex items-center gap-2 rounded-full bg-brand-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-800"
          >
            <PhoneIcon className="h-4 w-4" /> Call us
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-lg text-slate-700 hover:bg-slate-100 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
