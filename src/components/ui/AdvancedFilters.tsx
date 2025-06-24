"use client"

import { useState } from 'react'
import { ChevronDown, Filter, SortAsc, SortDesc } from 'lucide-react'

interface FilterOption {
  value: string
  label: string
  count?: number
}

interface AdvancedFiltersProps {
  eras: FilterOption[]
  categories: FilterOption[]
  statuses: FilterOption[]
  authors: FilterOption[]
  onFiltersChange: (filters: {
    era?: string
    category?: string
    status?: string
    author?: string
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
  }) => void
  className?: string
}

export default function AdvancedFilters({
  eras,
  categories,
  statuses,
  authors,
  onFiltersChange,
  className = ""
}: AdvancedFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [filters, setFilters] = useState({
    era: '',
    category: '',
    status: '',
    author: '',
    sortBy: 'date',
    sortOrder: 'desc' as 'asc' | 'desc'
  })

  const sortOptions = [
    { value: 'date', label: 'Date' },
    { value: 'title', label: 'Title' },
    { value: 'author', label: 'Author' },
    { value: 'category', label: 'Category' }
  ]

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const clearAllFilters = () => {
    const clearedFilters = {
      era: '',
      category: '',
      status: '',
      author: '',
      sortBy: 'date',
      sortOrder: 'desc' as 'asc' | 'desc'
    }
    setFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }

  const hasActiveFilters = filters.era || filters.category || filters.status || filters.author

  return (
    <div className={`bg-parchment-50 border border-parchment-300 rounded-lg ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-parchment-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-charcoal-600" />
            <h3 className="text-display text-sm font-semibold text-charcoal-900">
              Filters & Sorting
            </h3>
            {hasActiveFilters && (
              <span className="inline-flex items-center px-2 py-1 bg-charcoal-900 text-parchment-50 text-xs rounded-full">
                Active
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-charcoal-600 hover:text-charcoal-900 transition-colors"
              >
                Clear All
              </button>
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center space-x-1 text-charcoal-600 hover:text-charcoal-900 transition-colors"
            >
              <span className="text-xs">Advanced</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Basic Filters */}
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Sort By */}
          <div>
            <label className="block text-xs font-medium text-charcoal-700 mb-1">
              Sort By
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="w-full px-3 py-2 text-sm bg-parchment-100 border border-parchment-300 rounded-md text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-charcoal-900 focus:border-transparent"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Order */}
          <div>
            <label className="block text-xs font-medium text-charcoal-700 mb-1">
              Order
            </label>
            <button
              onClick={() => handleFilterChange('sortOrder', filters.sortOrder === 'asc' ? 'desc' : 'asc')}
              className="w-full px-3 py-2 text-sm bg-parchment-100 border border-parchment-300 rounded-md text-charcoal-900 hover:bg-parchment-200 transition-colors flex items-center justify-center space-x-1"
            >
              {filters.sortOrder === 'asc' ? (
                <>
                  <SortAsc className="w-3 h-3" />
                  <span>Ascending</span>
                </>
              ) : (
                <>
                  <SortDesc className="w-3 h-3" />
                  <span>Descending</span>
                </>
              )}
            </button>
          </div>

          {/* Era Filter */}
          {eras.length > 0 && (
            <div>
              <label className="block text-xs font-medium text-charcoal-700 mb-1">
                Era
              </label>
              <select
                value={filters.era}
                onChange={(e) => handleFilterChange('era', e.target.value)}
                className="w-full px-3 py-2 text-sm bg-parchment-100 border border-parchment-300 rounded-md text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-charcoal-900 focus:border-transparent"
              >
                <option value="">All Eras</option>
                {eras.map((era) => (
                  <option key={era.value} value={era.value}>
                    {era.label} {era.count && `(${era.count})`}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Category Filter */}
          {categories.length > 0 && (
            <div>
              <label className="block text-xs font-medium text-charcoal-700 mb-1">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full px-3 py-2 text-sm bg-parchment-100 border border-parchment-300 rounded-md text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-charcoal-900 focus:border-transparent"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label} {category.count && `(${category.count})`}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Advanced Filters */}
      {isExpanded && (
        <div className="p-4 border-t border-parchment-300 bg-parchment-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Status Filter */}
            {statuses.length > 0 && (
              <div>
                <label className="block text-xs font-medium text-charcoal-700 mb-1">
                  Status
                </label>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-parchment-50 border border-parchment-300 rounded-md text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-charcoal-900 focus:border-transparent"
                >
                  <option value="">All Statuses</option>
                  {statuses.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label} {status.count && `(${status.count})`}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Author Filter */}
            {authors.length > 0 && (
              <div>
                <label className="block text-xs font-medium text-charcoal-700 mb-1">
                  Author
                </label>
                <select
                  value={filters.author}
                  onChange={(e) => handleFilterChange('author', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-parchment-50 border border-parchment-300 rounded-md text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-charcoal-900 focus:border-transparent"
                >
                  <option value="">All Authors</option>
                  {authors.map((author) => (
                    <option key={author.value} value={author.value}>
                      {author.label} {author.count && `(${author.count})`}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
} 