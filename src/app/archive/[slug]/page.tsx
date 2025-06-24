import { getArchivePost, getArchivePosts } from '@/lib/content'
import { notFound } from 'next/navigation'
import ImageGallery from '@/components/ui/ImageGallery'
import FakeDateRenderer from '@/components/ui/FakeDateRenderer'
import TagList from '@/components/ui/TagList'
import PostCard from '@/components/ui/PostCard'
import { Metadata } from 'next'

interface ArchiveDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ArchiveDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getArchivePost(slug)
  
  if (!post) {
    return {
      title: 'Post Not Found | Diamond Street Collective',
    }
  }

  return {
    title: `${post.title} | Archive | Diamond Street Collective`,
    description: post.caption,
  }
}

export async function generateStaticParams() {
  const posts = await getArchivePosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function ArchiveDetailPage({ params }: ArchiveDetailPageProps) {
  const { slug } = await params
  const post = await getArchivePost(slug)
  
  if (!post) {
    notFound()
  }

  // Get related posts (excluding current post)
  const allPosts = await getArchivePosts()
  const relatedPosts = allPosts
    .filter(p => p.id !== post.id)
    .slice(0, 3)

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-display text-4xl md:text-5xl font-semibold text-charcoal-900 mb-4">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-body text-charcoal-600 mb-6">
            <FakeDateRenderer date={post.date_display} variant="large" />
            {post.location && (
              <span className="text-sm">📍 {post.location}</span>
            )}
            {post.era && (
              <span className="text-sm">🏛️ {post.era}</span>
            )}
          </div>

          <p className="text-body text-lg text-charcoal-700 italic">
            {post.caption}
          </p>
        </div>

        {/* Image Gallery */}
        <div className="mb-12">
          <ImageGallery images={post.images} />
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="prose prose-charcoal max-w-none">
              <div className="text-body text-charcoal-700 leading-relaxed whitespace-pre-wrap">
                {post.body}
              </div>
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="mt-8">
                <h3 className="text-display text-sm font-semibold text-charcoal-900 mb-3">
                  Tags
                </h3>
                <TagList tags={post.tags} />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Archivist Notes */}
            {post.archivist_notes && (
              <div className="p-6 bg-parchment-100 border border-parchment-300 rounded-lg">
                <h3 className="text-display text-lg font-semibold text-charcoal-900 mb-3">
                  Archivist Notes
                </h3>
                <p className="text-body text-sm text-charcoal-700">
                  {post.archivist_notes}
                </p>
              </div>
            )}

            {/* Metadata */}
            <div className="p-6 bg-parchment-50 border border-parchment-300 rounded-lg">
              <h3 className="text-display text-lg font-semibold text-charcoal-900 mb-3">
                Details
              </h3>
              <dl className="text-body text-sm text-charcoal-700 space-y-2">
                {post.location && (
                  <div>
                    <dt className="font-medium">Location:</dt>
                    <dd>{post.location}</dd>
                  </div>
                )}
                {post.era && (
                  <div>
                    <dt className="font-medium">Era:</dt>
                    <dd>{post.era}</dd>
                  </div>
                )}
                <div>
                  <dt className="font-medium">Images:</dt>
                  <dd>{post.images.length} photograph{post.images.length !== 1 ? 's' : ''}</dd>
                </div>
                <div>
                  <dt className="font-medium">Date:</dt>
                  <dd><FakeDateRenderer date={post.date_display} variant="small" /></dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-display text-2xl font-semibold text-charcoal-900 mb-8">
              Related Entries
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <PostCard key={relatedPost.id} post={relatedPost} variant="compact" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 