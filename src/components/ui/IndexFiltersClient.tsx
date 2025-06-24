"use client"

import IndexFilters from './IndexFilters'

interface IndexFiltersClientProps {
  allCategories: string[]
  allStatuses: string[]
  allEras: string[]
}

export default function IndexFiltersClient(props: IndexFiltersClientProps) {
  return <IndexFilters {...props} />
} 