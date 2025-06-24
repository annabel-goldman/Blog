import { NotFoundMessage } from '@/components/ui/ErrorBoundary'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Not Found | Diamond Street Collective',
  description: 'The requested page could not be found in our collection.',
}

export default function NotFound() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center">
          {/* Decorative elements */}
          <div className="mb-8">
            <div className="text-8xl mb-4">🏛️</div>
            <div className="text-display text-6xl font-semibold text-charcoal-900 mb-2">
              404
            </div>
            <div className="text-display text-2xl font-semibold text-charcoal-700 mb-6">
              Page Not Found
            </div>
          </div>

          <NotFoundMessage 
            title="The page you seek has vanished"
            message="Like many artifacts in our collection, this page appears to have been lost to time. Perhaps it was never cataloged, or perhaps it has been moved to another wing of our digital estate."
          />

          {/* Navigation suggestions */}
          <div className="mt-12">
            <h3 className="text-display text-lg font-semibold text-charcoal-900 mb-6">
              Explore Our Collections
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link
                href="/archive"
                className="p-6 bg-parchment-100 border border-parchment-300 rounded-lg hover:bg-parchment-200 transition-colors text-center"
              >
                <div className="text-3xl mb-2">📚</div>
                <h4 className="text-display font-semibold text-charcoal-900 mb-1">Archive</h4>
                <p className="text-body text-sm text-charcoal-600">
                  Photographic essays and historical documentation
                </p>
              </Link>

              <Link
                href="/gazette"
                className="p-6 bg-parchment-100 border border-parchment-300 rounded-lg hover:bg-parchment-200 transition-colors text-center"
              >
                <div className="text-3xl mb-2">📰</div>
                <h4 className="text-display font-semibold text-charcoal-900 mb-1">Gazette</h4>
                <p className="text-body text-sm text-charcoal-600">
                  Essays, reviews, and cultural commentary
                </p>
              </Link>

              <Link
                href="/index"
                className="p-6 bg-parchment-100 border border-parchment-300 rounded-lg hover:bg-parchment-200 transition-colors text-center"
              >
                <div className="text-3xl mb-2">🏛️</div>
                <h4 className="text-display font-semibold text-charcoal-900 mb-1">Index</h4>
                <p className="text-body text-sm text-charcoal-600">
                  Catalog of artifacts and estate items
                </p>
              </Link>
            </div>
          </div>

          {/* Search suggestion */}
          <div className="mt-12 p-6 bg-parchment-50 border border-parchment-300 rounded-lg">
            <h3 className="text-display text-lg font-semibold text-charcoal-900 mb-3">
              Can&apos;t find what you&apos;re looking for?
            </h3>
            <p className="text-body text-charcoal-600 mb-4">
              Try searching our collection for the content you seek.
            </p>
            <Link
              href="/search"
              className="inline-flex items-center px-4 py-2 bg-charcoal-900 text-parchment-50 text-sm font-medium rounded hover:bg-charcoal-800 transition-colors"
            >
              Search the Collection
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 