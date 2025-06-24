import { getArchivePosts, getAllTags, getAllEras } from '@/lib/content'
import PostCard from '@/components/ui/PostCard'
import TagList from '@/components/ui/TagList'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Archive | Diamond Street Collective',
  description: 'Photo essays styled as historical records from the Diamond Street Collective archive.',
}

export default async function ArchivePage() {
  const posts = await getArchivePosts()
  const allTags = await getAllTags()
  const allEras = await getAllEras()

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-display text-4xl font-semibold text-charcoal-900 mb-4">
            Archive
          </h1>
          <p className="text-body text-lg text-charcoal-600 max-w-3xl mx-auto">
            Photo essays styled as historical records, documenting the ephemeral 
            and the imagined through the lens of our curators.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div>
            <h3 className="text-display text-sm font-semibold text-charcoal-900 mb-2">
              Filter by Tags
            </h3>
            <TagList tags={allTags} variant="filter" />
          </div>
          
          {allEras.length > 0 && (
            <div>
              <h3 className="text-display text-sm font-semibold text-charcoal-900 mb-2">
                Filter by Era
              </h3>
              <TagList tags={allEras} variant="filter" />
            </div>
          )}
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-body text-charcoal-600">
              No archive posts found. Check back soon for new additions to our collection.
            </p>
          </div>
        )}

        {/* Archive Info */}
        <div className="mt-16 p-6 bg-parchment-100 border border-parchment-300 rounded-lg">
          <h2 className="text-display text-xl font-semibold text-charcoal-900 mb-4">
            About the Archive
          </h2>
          <div className="text-body text-charcoal-700 space-y-3">
            <p>
              Our archive contains photographic essays that blur the boundaries between 
              historical documentation and artistic imagination. Each entry is carefully 
              curated to preserve moments that exist somewhere between memory and invention.
            </p>
            <p>
              The images are presented with detailed captions and archivist notes, 
              providing context for these carefully constructed historical fictions.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 