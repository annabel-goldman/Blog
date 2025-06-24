import { getArchivePosts, getGazetteArticles, getIndexItems } from '@/lib/content'
import SearchBar from '@/components/ui/SearchBar'
import PostCard from '@/components/ui/PostCard'
import { Metadata } from 'next'
import Link from 'next/link'
import { ArchivePost, GazetteArticle, IndexItem } from '@/types/content'

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams
  const query = q || ''
  
  return {
    title: query ? `Search: "${query}" | Diamond Street Collective` : 'Search | Diamond Street Collective',
    description: query ? `Search results for "${query}" in the Diamond Street Collective collection.` : 'Search the Diamond Street Collective collection.',
  }
}

// Helper function to extract searchable text from any content type
function getSearchableText(item: ArchivePost | GazetteArticle | IndexItem): string {
  const baseText = [item.title]

  if (item.type === 'archive') {
    return [
      ...baseText,
      ...(item.tags || []),
      item.caption,
      item.body,
      item.location,
      item.era
    ].join(' ')
  }

  if (item.type === 'gazette') {
    return [
      ...baseText,
      ...(item.tags || []),
      item.subtitle,
      item.body,
      item.author
    ].join(' ')
  }

  if (item.type === 'index') {
    return [
      ...baseText,
      item.short_description,
      item.full_description,
      item.provenance,
      item.status,
      item.era,
      item.category,
      item.owner,
      item.estimated_value,
      item.location
    ].join(' ')
  }

  return baseText.join(' ')
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams
  const query = q || ''

  // Get all content
  const archivePosts = await getArchivePosts()
  const gazetteArticles = await getGazetteArticles()
  const indexItems = await getIndexItems()

  // Search function
  const searchContent = (content: (ArchivePost | GazetteArticle | IndexItem)[], query: string) => {
    if (!query.trim()) return []
    
    const searchTerm = query.toLowerCase()
    return content.filter(item => {
      const searchableText = getSearchableText(item).toLowerCase()
      return searchableText.includes(searchTerm)
    })
  }

  // Perform search
  const archiveResults = searchContent(archivePosts, query)
  const gazetteResults = searchContent(gazetteArticles, query)
  const indexResults = searchContent(indexItems, query)

  const totalResults = archiveResults.length + gazetteResults.length + indexResults.length

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-display text-4xl font-semibold text-charcoal-900 mb-4">
            Search the Collection
          </h1>
          <p className="text-body text-lg text-charcoal-600 mb-8">
            Discover artifacts, articles, and archival materials from our aristocratic legacy.
          </p>
          
          {/* Search Bar */}
          <SearchBar 
            placeholder="Search for artifacts, articles, or archival materials..."
            variant="page"
            className="mb-8"
          />
        </div>

        {/* Search Results */}
        {query && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-display text-2xl font-semibold text-charcoal-900">
                Search Results
              </h2>
              <p className="text-body text-charcoal-600">
                {totalResults} result{totalResults !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
              </p>
            </div>

            {totalResults === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-display text-xl font-semibold text-charcoal-900 mb-2">
                  No results found
                </h3>
                <p className="text-body text-charcoal-600 mb-4">
                  We couldn&apos;t find any matches for &ldquo;{query}&rdquo;
                </p>
                <p className="text-body text-sm text-charcoal-500">
                  Try different keywords or browse our collections directly.
                </p>
              </div>
            ) : (
              <div className="space-y-12">
                {/* Archive Results */}
                {archiveResults.length > 0 && (
                  <section>
                    <h3 className="text-display text-xl font-semibold text-charcoal-900 mb-4">
                      Archive ({archiveResults.length})
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {archiveResults.map((post) => (
                        <PostCard key={post.id} post={post} variant="compact" />
                      ))}
                    </div>
                  </section>
                )}

                {/* Gazette Results */}
                {gazetteResults.length > 0 && (
                  <section>
                    <h3 className="text-display text-xl font-semibold text-charcoal-900 mb-4">
                      Gazette ({gazetteResults.length})
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {gazetteResults.map((article) => (
                        <PostCard key={article.id} post={article} variant="compact" />
                      ))}
                    </div>
                  </section>
                )}

                {/* Index Results */}
                {indexResults.length > 0 && (
                  <section>
                    <h3 className="text-display text-xl font-semibold text-charcoal-900 mb-4">
                      Index ({indexResults.length})
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {indexResults.map((item) => (
                        <PostCard key={item.id} post={item} variant="compact" />
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}
          </div>
        )}

        {/* Browse Collections */}
        {!query && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-parchment-100 border border-parchment-300 rounded-lg">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-display text-lg font-semibold text-charcoal-900 mb-2">
                Archive
              </h3>
              <p className="text-body text-sm text-charcoal-600 mb-4">
                Photographic essays and historical documentation
              </p>
              <Link 
                href="/archive" 
                className="inline-block px-4 py-2 bg-charcoal-900 text-parchment-50 text-sm font-medium rounded hover:bg-charcoal-800 transition-colors"
              >
                Browse Archive
              </Link>
            </div>

            <div className="text-center p-6 bg-parchment-100 border border-parchment-300 rounded-lg">
              <div className="text-4xl mb-4">📰</div>
              <h3 className="text-display text-lg font-semibold text-charcoal-900 mb-2">
                Gazette
              </h3>
              <p className="text-body text-sm text-charcoal-600 mb-4">
                Essays, reviews, and cultural commentary
              </p>
              <Link 
                href="/gazette" 
                className="inline-block px-4 py-2 bg-charcoal-900 text-parchment-50 text-sm font-medium rounded hover:bg-charcoal-800 transition-colors"
              >
                Browse Gazette
              </Link>
            </div>

            <div className="text-center p-6 bg-parchment-100 border border-parchment-300 rounded-lg">
              <div className="text-4xl mb-4">🏛️</div>
              <h3 className="text-display text-lg font-semibold text-charcoal-900 mb-2">
                Index
              </h3>
              <p className="text-body text-sm text-charcoal-600 mb-4">
                Catalog of artifacts and estate items
              </p>
              <Link 
                href="/index" 
                className="inline-block px-4 py-2 bg-charcoal-900 text-parchment-50 text-sm font-medium rounded hover:bg-charcoal-800 transition-colors"
              >
                Browse Index
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 