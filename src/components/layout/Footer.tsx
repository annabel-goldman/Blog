import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-parchment-300 bg-parchment-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="text-display text-lg font-semibold text-charcoal-900">
              Diamond Street Collective
            </div>
            <div className="text-body text-sm text-charcoal-600 italic">
              est. 1809 (allegedly)
            </div>
            <p className="text-body text-sm text-charcoal-600">
              A curated archive of the imagined and the forgotten, 
              preserving the artifacts of a history that never was.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-display text-sm font-semibold text-charcoal-900 uppercase tracking-wide">
              Collections
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/archive" className="text-body text-sm text-charcoal-600 hover:text-charcoal-900 transition-colors">
                  Archive
                </Link>
              </li>
              <li>
                <Link href="/gazette" className="text-body text-sm text-charcoal-600 hover:text-charcoal-900 transition-colors">
                  Gazette
                </Link>
              </li>
              <li>
                <Link href="/salon" className="text-body text-sm text-charcoal-600 hover:text-charcoal-900 transition-colors">
                  Salon
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-display text-sm font-semibold text-charcoal-900 uppercase tracking-wide">
              Correspondence
            </h3>
            <div className="text-body text-sm text-charcoal-600 space-y-1">
              <p>For inquiries regarding our collections</p>
              <p>or to submit to the Salon:</p>
              <p className="mt-2 italic">
                inquiries@diamondstreetcollective.com
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-parchment-300">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-body text-xs text-charcoal-500">
              © 2024 Diamond Street Collective. All rights reserved.
            </div>
            <div className="text-body text-xs text-charcoal-500">
              A work of fiction and imagination.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 