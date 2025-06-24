"use client"

import TagList from './TagList'

interface IndexFiltersProps {
  allCategories: string[]
  allStatuses: string[]
  allEras: string[]
}

export default function IndexFilters({ allCategories, allStatuses, allEras }: IndexFiltersProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-display text-sm font-semibold text-charcoal-900 mb-2">
          Filter by Category
        </h3>
        <TagList tags={allCategories} variant="filter" />
      </div>
      <div>
        <h3 className="text-display text-sm font-semibold text-charcoal-900 mb-2">
          Filter by Status
        </h3>
        <TagList tags={allStatuses} variant="filter" />
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
  )
} 