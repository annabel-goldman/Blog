'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { ArchiveImage } from '@/types/content'

interface ImageGalleryProps {
  images: ArchiveImage[]
  className?: string
}

export default function ImageGallery({ images, className = '' }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const currentImage = images[currentIndex]

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToImage = (index: number) => {
    setCurrentIndex(index)
  }

  if (!images.length) return null

  return (
    <div className={cn('space-y-6', className)}>
      {/* Main Image */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-parchment-300 bg-parchment-100">
        <Image
          src={currentImage.src}
          alt={currentImage.alt}
          fill
          className="object-cover film-grain"
          priority={currentIndex === 0}
        />
        
        {/* Image caption overlay */}
        {currentImage.caption && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-parchment-50 p-4">
            <p className="text-body text-sm">{currentImage.caption}</p>
          </div>
        )}

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/30 text-parchment-50 rounded-full hover:bg-black/50 transition-colors"
              aria-label="Previous image"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/30 text-parchment-50 rounded-full hover:bg-black/50 transition-colors"
              aria-label="Next image"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Fullscreen button */}
        <button
          onClick={() => setIsFullscreen(true)}
          className="absolute top-4 right-4 p-2 bg-black/30 text-parchment-50 rounded-full hover:bg-black/50 transition-colors"
          aria-label="View fullscreen"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </button>

        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute top-4 left-4 px-2 py-1 bg-black/30 text-parchment-50 text-xs rounded">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => goToImage(index)}
              className={cn(
                "relative flex-shrink-0 w-20 h-20 overflow-hidden rounded border-2 transition-colors",
                index === currentIndex 
                  ? "border-charcoal-900" 
                  : "border-parchment-300 hover:border-parchment-400"
              )}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setIsFullscreen(false)}
        >
          <div className="relative max-w-7xl max-h-full p-4">
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              width={1200}
              height={800}
              className="max-w-full max-h-full object-contain film-grain"
            />
            
            {currentImage.caption && (
              <div className="absolute bottom-4 left-4 right-4 bg-black/60 text-parchment-50 p-4 rounded">
                <p className="text-body text-sm">{currentImage.caption}</p>
              </div>
            )}

            {/* Close button */}
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 p-2 bg-black/50 text-parchment-50 rounded-full hover:bg-black/70 transition-colors"
              aria-label="Close fullscreen"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Navigation in fullscreen */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 text-parchment-50 rounded-full hover:bg-black/70 transition-colors"
                  aria-label="Previous image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button
                  onClick={(e) => { e.stopPropagation(); goToNext(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 text-parchment-50 rounded-full hover:bg-black/70 transition-colors"
                  aria-label="Next image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
} 