import { getIndexItem, getIndexItems } from '@/lib/content'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import FakeDateRenderer from '@/components/ui/FakeDateRenderer'
import TagList from '@/components/ui/TagList'
import PostCard from '@/components/ui/PostCard'
import { Metadata } from 'next'

interface IndexDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: IndexDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const item = await getIndexItem(slug)
  
  if (!item) {
    return {
      title: 'Item Not Found | Diamond Street Collective',
    }
  }

  return {
    title: `${item.title} | Index | Diamond Street Collective`,
    description: item.short_description,
  }
}

export async function generateStaticParams() {
  const items = await getIndexItems()
  return items.map((item) => ({
    slug: item.slug,
  }))
}

export default async function IndexDetailPage({ params }: IndexDetailPageProps) {
  const { slug } = await params
  const item = await getIndexItem(slug)
  
  if (!item) {
    notFound()
  }

  // Get related items (excluding current item)
  const allItems = await getIndexItems()
  const relatedItems = allItems
    .filter(i => i.id !== item.id)
    .slice(0, 3)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Lost':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'Burned':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'Sold':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Gifted':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'In Collection':
        return 'bg-charcoal-100 text-charcoal-800 border-charcoal-200'
      case 'On Display':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'Misplaced':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default:
        return 'bg-parchment-100 text-charcoal-800 border-parchment-200'
    }
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-display text-4xl md:text-5xl font-semibold text-charcoal-900 mb-4">
            {item.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-body text-charcoal-600 mb-6">
            <FakeDateRenderer date={item.date_display} variant="large" />
            <span>•</span>
            <span className="text-sm">Category: {item.category}</span>
            <span>•</span>
            <span className="text-sm">Era: {item.era}</span>
          </div>

          <p className="text-body text-lg text-charcoal-700 italic">
            {item.short_description}
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Image and Description */}
          <div className="lg:col-span-2 space-y-8">
            {/* Item Image */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-parchment-300 bg-parchment-100">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover film-grain"
              />
            </div>

            {/* Full Description */}
            <div className="prose prose-charcoal max-w-none">
              <h2 className="text-display text-2xl font-semibold text-charcoal-900 mb-4">
                Description
              </h2>
              <div className="text-body text-charcoal-700 leading-relaxed whitespace-pre-wrap">
                {item.full_description}
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-display text-sm font-semibold text-charcoal-900 mb-3">
                Categories
              </h3>
              <TagList tags={[item.category, item.status, item.era]} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Status */}
            <div className="p-6 bg-parchment-100 border border-parchment-300 rounded-lg">
              <h3 className="text-display text-lg font-semibold text-charcoal-900 mb-3">
                Current Status
              </h3>
              <span className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(item.status)}`}>
                {item.status}
              </span>
            </div>

            {/* Provenance */}
            <div className="p-6 bg-parchment-50 border border-parchment-300 rounded-lg">
              <h3 className="text-display text-lg font-semibold text-charcoal-900 mb-3">
                Provenance
              </h3>
              <p className="text-body text-sm text-charcoal-700">
                {item.provenance}
              </p>
            </div>

            {/* Item Details */}
            <div className="p-6 bg-parchment-50 border border-parchment-300 rounded-lg">
              <h3 className="text-display text-lg font-semibold text-charcoal-900 mb-3">
                Item Details
              </h3>
              <dl className="text-body text-sm text-charcoal-700 space-y-2">
                <div>
                  <dt className="font-medium">Category:</dt>
                  <dd>{item.category}</dd>
                </div>
                <div>
                  <dt className="font-medium">Era:</dt>
                  <dd>{item.era}</dd>
                </div>
                {item.owner && (
                  <div>
                    <dt className="font-medium">Original Owner:</dt>
                    <dd>{item.owner}</dd>
                  </div>
                )}
                {item.estimated_value && (
                  <div>
                    <dt className="font-medium">Estimated Value:</dt>
                    <dd>{item.estimated_value}</dd>
                  </div>
                )}
                {item.location && (
                  <div>
                    <dt className="font-medium">Current Location:</dt>
                    <dd>{item.location}</dd>
                  </div>
                )}
                <div>
                  <dt className="font-medium">Date:</dt>
                  <dd><FakeDateRenderer date={item.date_display} variant="small" /></dd>
                </div>
              </dl>
            </div>

            {/* Random Item Button */}
            <div className="p-6 bg-parchment-100 border border-parchment-300 rounded-lg">
              <h3 className="text-display text-lg font-semibold text-charcoal-900 mb-3">
                Discover More
              </h3>
              <p className="text-body text-sm text-charcoal-700 mb-4">
                Explore another item from our collection at random.
              </p>
              <button className="w-full px-4 py-2 bg-charcoal-900 text-parchment-50 text-sm font-medium rounded hover:bg-charcoal-800 transition-colors">
                Random Artifact
              </button>
            </div>
          </div>
        </div>

        {/* Related Items */}
        {relatedItems.length > 0 && (
          <div className="mt-16">
            <h2 className="text-display text-2xl font-semibold text-charcoal-900 mb-8">
              Related Items
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedItems.map((relatedItem) => (
                <PostCard key={relatedItem.id} post={relatedItem} variant="compact" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 