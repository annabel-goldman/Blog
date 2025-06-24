import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import FakeDateRenderer from './FakeDateRenderer'
import TagList from './TagList'
import { ArchivePost, GazetteArticle, IndexItem } from '@/types/content'

interface PostCardProps {
  post: ArchivePost | GazetteArticle | IndexItem
  variant?: 'default' | 'compact' | 'featured'
  className?: string
}

export default function PostCard({ 
  post, 
  variant = 'default',
  className = ''
}: PostCardProps) {
  const getHref = () => {
    switch (post.type) {
      case 'archive':
        return `/archive/${post.slug}`
      case 'gazette':
        return `/gazette/${post.slug}`
      case 'index':
        return `/index/${post.slug}`
      default:
        return '#'
    }
  }

  const getImage = () => {
    switch (post.type) {
      case 'archive':
        return post.images[0]?.src
      case 'index':
        return post.image
      default:
        return null
    }
  }

  const getSubtitle = () => {
    switch (post.type) {
      case 'archive':
        return post.caption
      case 'gazette':
        return post.subtitle || `by ${post.author}`
      case 'index':
        return post.short_description
      default:
        return ''
    }
  }

  const getTags = () => {
    switch (post.type) {
      case 'archive':
      case 'gazette':
        return post.tags
      case 'index':
        return [post.category, post.status].filter(Boolean)
      default:
        return []
    }
  }

  const imageSrc = getImage()
  const href = getHref()
  const subtitle = getSubtitle()
  const tags = getTags()

  const variantStyles = {
    default: 'group p-6 border border-parchment-300 bg-parchment-50 hover:bg-parchment-100 transition-colors',
    compact: 'group p-4 border border-parchment-300 bg-parchment-50 hover:bg-parchment-100 transition-colors',
    featured: 'group p-8 border-2 border-charcoal-300 bg-parchment-100 hover:bg-parchment-200 transition-colors'
  }

  return (
    <Link href={href} className={cn(variantStyles[variant], className)}>
      <article className="space-y-4">
        {/* Image */}
        {imageSrc && (
          <div className="relative aspect-[4/3] overflow-hidden rounded border border-parchment-300">
            <Image
              src={imageSrc}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
          </div>
        )}

        {/* Content */}
        <div className="space-y-3">
          {/* Title */}
          <h3 className={cn(
            "text-display font-semibold text-charcoal-900 group-hover:text-charcoal-700 transition-colors",
            variant === 'featured' ? 'text-xl' : 'text-lg'
          )}>
            {post.title}
          </h3>

          {/* Subtitle */}
          {subtitle && (
            <p className={cn(
              "text-body text-charcoal-600",
              variant === 'compact' ? 'text-sm' : 'text-base'
            )}>
              {subtitle}
            </p>
          )}

          {/* Date */}
          <FakeDateRenderer 
            date={post.date_display} 
            variant={variant === 'compact' ? 'small' : 'default'}
          />

          {/* Tags */}
          {tags.length > 0 && (
            <TagList 
              tags={tags} 
              variant={variant === 'compact' ? 'compact' : 'default'}
            />
          )}

          {/* Special indicators */}
          {post.type === 'gazette' && (post as GazetteArticle).featured && (
            <div className="inline-flex items-center px-2 py-1 bg-charcoal-900 text-parchment-50 text-xs rounded">
              Featured
            </div>
          )}
          
          {post.type === 'index' && (
            <div className="inline-flex items-center px-2 py-1 bg-charcoal-900 text-parchment-50 text-xs rounded">
              {(post as IndexItem).status}
            </div>
          )}
        </div>
      </article>
    </Link>
  )
} 