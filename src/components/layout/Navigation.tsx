'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import SearchBar from '@/components/ui/SearchBar'
import { Suspense } from 'react'

const navigation = [
  { name: 'Archive', href: '/archive', description: 'Photo essays styled as historical records' },
  { name: 'Gazette', href: '/gazette', description: 'Long-form written content and manifestos' },
  { name: 'Salon', href: '/salon', description: 'User-generated submissions and letters' },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-parchment-300 bg-parchment-50/95 backdrop-blur supports-[backdrop-filter]:bg-parchment-50/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="text-display text-xl font-semibold text-charcoal-900">
                Diamond Street Collective
              </div>
              <div className="text-body text-sm text-charcoal-600 italic">
                est. 1809 (allegedly)
              </div>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center mx-8 flex-1 max-w-md">
            <Suspense fallback={<div className="w-full h-10 bg-parchment-200 rounded-lg animate-pulse" />}>
              <SearchBar placeholder="Search the collection..." variant="header" />
            </Suspense>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-body text-sm font-medium transition-colors hover:text-charcoal-900 relative group",
                    isActive 
                      ? "text-charcoal-900" 
                      : "text-charcoal-600"
                  )}
                >
                  {item.name}
                  
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-charcoal-900" />
                  )}
                  
                  {/* Hover tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 text-xs text-white bg-charcoal-900 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    {item.description}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-charcoal-900"></div>
                  </div>
                </Link>
              )
            })}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-charcoal-600 hover:text-charcoal-900"
              aria-label="Open menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation with search */}
      <div className="md:hidden border-t border-parchment-300 bg-parchment-50">
        <div className="container mx-auto px-4 py-2">
          {/* Mobile Search */}
          <div className="mb-3">
            <Suspense fallback={<div className="w-full h-10 bg-parchment-200 rounded-lg animate-pulse" />}>
              <SearchBar placeholder="Search..." variant="header" />
            </Suspense>
          </div>
          
          <nav className="flex space-x-6 overflow-x-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-body text-sm font-medium whitespace-nowrap",
                    isActive 
                      ? "text-charcoal-900 border-b-2 border-charcoal-900" 
                      : "text-charcoal-600"
                  )}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </header>
  )
} 