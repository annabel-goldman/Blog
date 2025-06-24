"use client"

import { useState, useEffect, useRef, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, X } from 'lucide-react'

interface SearchBarProps {
  placeholder?: string
  className?: string
  variant?: 'header' | 'page'
}

export default function SearchBar({ 
  placeholder = "Search the collection...", 
  className = "",
  variant = "header"
}: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  // Mock suggestions - in a real app, this would come from an API
  const mockSuggestions = useMemo(() => [
    'crystal chandelier',
    'forgotten portrait',
    'clockwork bird',
    'lost garden',
    'diamond street',
    'lady eleanor',
    'regency era',
    'georgian art'
  ], [])

  useEffect(() => {
    const urlQuery = searchParams.get('q')
    if (urlQuery) {
      setQuery(urlQuery)
    }
  }, [searchParams])

  useEffect(() => {
    if (query.length > 2) {
      const filtered = mockSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(query.toLowerCase())
      )
      setSuggestions(filtered.slice(0, 5))
    } else {
      setSuggestions([])
    }
  }, [query, mockSuggestions])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      setIsExpanded(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    router.push(`/search?q=${encodeURIComponent(suggestion)}`)
    setIsExpanded(false)
  }

  const clearSearch = () => {
    setQuery('')
    setSuggestions([])
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  if (variant === 'header') {
    return (
      <div className={`relative ${className}`}>
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal-400 w-4 h-4" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              placeholder={placeholder}
              className="w-full pl-10 pr-10 py-2 bg-parchment-50 border border-parchment-300 rounded-lg text-body text-charcoal-900 placeholder-charcoal-400 focus:outline-none focus:ring-2 focus:ring-charcoal-900 focus:border-transparent transition-all duration-200"
            />
            {query && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-charcoal-400 hover:text-charcoal-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </form>

        {/* Suggestions Dropdown */}
        {isExpanded && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-parchment-50 border border-parchment-300 rounded-lg shadow-lg z-50">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full px-4 py-2 text-left text-body text-charcoal-700 hover:bg-parchment-100 transition-colors first:rounded-t-lg last:rounded-b-lg"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        {/* Click outside to close */}
        {isExpanded && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsExpanded(false)}
          />
        )}
      </div>
    )
  }

  // Page variant - larger, more prominent
  return (
    <div className={`max-w-2xl mx-auto ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-charcoal-400 w-5 h-5" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            placeholder={placeholder}
            className="w-full pl-12 pr-12 py-4 bg-parchment-50 border-2 border-parchment-300 rounded-lg text-body text-lg text-charcoal-900 placeholder-charcoal-400 focus:outline-none focus:ring-2 focus:ring-charcoal-900 focus:border-transparent transition-all duration-200"
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-charcoal-400 hover:text-charcoal-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </form>

      {/* Suggestions Dropdown */}
      {isExpanded && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-parchment-50 border border-parchment-300 rounded-lg shadow-lg z-50">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full px-4 py-3 text-left text-body text-charcoal-700 hover:bg-parchment-100 transition-colors first:rounded-t-lg last:rounded-b-lg"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {/* Click outside to close */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  )
} 