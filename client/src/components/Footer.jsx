import { LeafIcon, PhoneIcon, MailIcon, PinIcon } from './icons'

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-700 text-white">
              <LeafIcon className="h-5 w-5" />
            </span>
            <span className="leading-tight">
              <span className="block text-base font-extrabold text-slate-900">
                PoesGarden
              </span>
              <span className="block text-[11px] font-medium uppercase tracking-[0.18em] text-brand-700">
                Real Estate · Chennai
              </span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
            Premium DTCP & RERA approved plots across Tamil Nadu. Building
            trusted communities since 2004.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            Reach us
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li className="flex items-center gap-2.5">
              <PinIcon className="h-4 w-4 text-brand-600" />
              No. 12, Poes Garden, Chennai – 600086
            </li>
            <li className="flex items-center gap-2.5">
              <PhoneIcon className="h-4 w-4 text-brand-600" />
              <a href="tel:+914400000000" className="hover:text-brand-700">
                +91 44 0000 0000
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <MailIcon className="h-4 w-4 text-brand-600" />
              <a
                href="mailto:sales@poesgarden.com"
                className="hover:text-brand-700"
              >
                sales@poesgarden.com
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            Quick links
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
            <li><a href="#plots" className="hover:text-brand-700">Browse plots</a></li>
            <li><a href="#why" className="hover:text-brand-700">Why choose us</a></li>
            <li><a href="#how" className="hover:text-brand-700">How booking works</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-100">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-slate-400 sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} PoesGarden Real Estate. All rights reserved.</p>
          <p>Payments secured by Cashfree · Plots subject to availability.</p>
        </div>
      </div>
    </footer>
  )
}
