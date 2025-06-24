import { getGazetteArticles, getAllTags } from '@/lib/content'
import PostCard from '@/components/ui/PostCard'
import TagList from '@/components/ui/TagList'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gazette | Diamond Street Collective',
  description: 'Long-form written content, manifestos, and philosophical treatises from the Diamond Street Collective.',
}

export default async function GazettePage() {
  const articles = await getGazetteArticles()
  const allTags = await getAllTags()

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-display text-4xl font-semibold text-charcoal-900 mb-4">
            Gazette
          </h1>
          <p className="text-body text-lg text-charcoal-600 max-w-3xl mx-auto">
            Long-form written content, manifestos, and philosophical treatises 
            exploring the nature of collecting, memory, and imagination.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <h3 className="text-display text-sm font-semibold text-charcoal-900 mb-2">
            Filter by Tags
          </h3>
          <TagList tags={allTags} variant="filter" />
        </div>

        {/* Articles Grid */}
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <PostCard key={article.id} post={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-body text-charcoal-600">
              No articles found. Check back soon for new additions to our gazette.
            </p>
          </div>
        )}

        {/* Gazette Info */}
        <div className="mt-16 p-6 bg-parchment-100 border border-parchment-300 rounded-lg">
          <h2 className="text-display text-xl font-semibold text-charcoal-900 mb-4">
            About the Gazette
          </h2>
          <div className="text-body text-charcoal-700 space-y-3">
            <p>
              Our gazette serves as a platform for long-form writing that explores 
              the philosophical and aesthetic dimensions of collecting, preservation, 
              and the construction of historical narratives.
            </p>
            <p>
              Contributors include distinguished collectors, historians, and philosophers 
              who examine the boundaries between fact and fiction, memory and invention.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 