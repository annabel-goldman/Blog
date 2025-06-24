'use client'

import { cn } from '@/lib/utils'

interface TagListProps {
  tags: string[]
  selectedTags?: string[]
  onTagClick?: (tag: string) => void
  variant?: 'default' | 'compact' | 'filter'
  className?: string
}

export default function TagList({ 
  tags, 
  selectedTags = [], 
  onTagClick,
  variant = 'default',
  className = ''
}: TagListProps) {
  const variantStyles = {
    default: 'text-body text-xs px-2 py-1 rounded border',
    compact: 'text-body text-xs px-1.5 py-0.5 rounded-sm border',
    filter: 'text-body text-sm px-3 py-1.5 rounded-md border cursor-pointer transition-colors'
  }
  
  const baseStyles = 'bg-parchment-50 border-parchment-300 text-charcoal-700'
  const selectedStyles = 'bg-charcoal-900 border-charcoal-900 text-parchment-50'
  const hoverStyles = 'hover:bg-parchment-100 hover:border-parchment-400'
  
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {tags.map((tag) => {
        const isSelected = selectedTags.includes(tag)
        
        return (
          <span
            key={tag}
            className={cn(
              variantStyles[variant],
              baseStyles,
              isSelected && selectedStyles,
              onTagClick && hoverStyles,
              onTagClick && 'cursor-pointer'
            )}
            onClick={() => onTagClick?.(tag)}
          >
            {tag}
          </span>
        )
      })}
    </div>
  )
} 