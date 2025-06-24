import { formatFictionalDate } from '@/lib/utils'

interface FakeDateRendererProps {
  date: string
  className?: string
  variant?: 'default' | 'small' | 'large' | 'italic'
}

export default function FakeDateRenderer({ 
  date, 
  className = '',
  variant = 'default' 
}: FakeDateRendererProps) {
  const formattedDate = formatFictionalDate(date)
  
  const variantStyles = {
    default: 'text-body text-sm text-charcoal-600',
    small: 'text-body text-xs text-charcoal-500',
    large: 'text-display text-lg text-charcoal-700',
    italic: 'text-body text-sm text-charcoal-600 italic'
  }
  
  return (
    <time 
      dateTime={date}
      className={`${variantStyles[variant]} ${className}`}
    >
      {formattedDate}
    </time>
  )
} 