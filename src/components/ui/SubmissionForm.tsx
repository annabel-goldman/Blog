'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { submitSalonEntry } from '@/lib/content'

interface SubmissionFormProps {
  className?: string
  onSuccess?: () => void
}

const prompts = [
  'Write a memory from a place that never existed',
  'Describe an object you remember but cannot find',
  'Share a story about someone you never met',
  'Recount an event that happened in a dream',
  'Tell us about a book you read that doesn\'t exist',
  'Describe a photograph that was never taken'
]

export default function SubmissionForm({ className = '', onSuccess }: SubmissionFormProps) {
  const [formData, setFormData] = useState({
    pseudonym: '',
    message: '',
    prompt: prompts[0]
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.message.trim()) {
      newErrors.message = 'Please share your story'
    } else if (formData.message.trim().length < 50) {
      newErrors.message = 'Please share at least 50 characters'
    }

    if (formData.message.trim().length > 2000) {
      newErrors.message = 'Please keep your story under 2000 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      await submitSalonEntry(formData)
      setSubmitStatus('success')
      setFormData({ pseudonym: '', message: '', prompt: prompts[0] })
      onSuccess?.()
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } catch (error) {
      setSubmitStatus('error')
      console.error('Submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={cn('space-y-6', className)}>
      <div className="text-center space-y-2">
        <h2 className="text-display text-2xl font-semibold text-charcoal-900">
          Submit to the Salon
        </h2>
        <p className="text-body text-charcoal-600">
          Share your memories, dreams, and imaginings with our community
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Pseudonym */}
        <div>
          <label htmlFor="pseudonym" className="block text-body text-sm font-medium text-charcoal-700 mb-2">
            Pseudonym (optional)
          </label>
          <input
            type="text"
            id="pseudonym"
            value={formData.pseudonym}
            onChange={(e) => handleInputChange('pseudonym', e.target.value)}
            placeholder="The Anonymous Wanderer"
            className="w-full px-4 py-3 border border-parchment-300 bg-parchment-50 text-charcoal-900 placeholder-charcoal-400 rounded-md focus:outline-none focus:ring-2 focus:ring-charcoal-300 focus:border-transparent transition-colors"
          />
        </div>

        {/* Prompt Selection */}
        <div>
          <label htmlFor="prompt" className="block text-body text-sm font-medium text-charcoal-700 mb-2">
            Choose a prompt
          </label>
          <select
            id="prompt"
            value={formData.prompt}
            onChange={(e) => handleInputChange('prompt', e.target.value)}
            className="w-full px-4 py-3 border border-parchment-300 bg-parchment-50 text-charcoal-900 rounded-md focus:outline-none focus:ring-2 focus:ring-charcoal-300 focus:border-transparent transition-colors"
          >
            {prompts.map((prompt) => (
              <option key={prompt} value={prompt}>
                {prompt}
              </option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-body text-sm font-medium text-charcoal-700 mb-2">
            Your story <span className="text-charcoal-500">*</span>
          </label>
          <textarea
            id="message"
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            placeholder="Begin your tale..."
            rows={8}
            className={cn(
              "w-full px-4 py-3 border bg-parchment-50 text-charcoal-900 placeholder-charcoal-400 rounded-md focus:outline-none focus:ring-2 focus:ring-charcoal-300 focus:border-transparent transition-colors resize-vertical",
              errors.message 
                ? "border-red-300 focus:ring-red-300" 
                : "border-parchment-300"
            )}
          />
          {errors.message && (
            <p className="mt-1 text-body text-sm text-red-600">{errors.message}</p>
          )}
          <p className="mt-1 text-body text-xs text-charcoal-500">
            {formData.message.length} / 2000 characters
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "w-full px-6 py-3 text-body font-medium rounded-md transition-colors",
            isSubmitting
              ? "bg-charcoal-300 text-charcoal-500 cursor-not-allowed"
              : "bg-charcoal-900 text-parchment-50 hover:bg-charcoal-800"
          )}
        >
          {isSubmitting ? 'Submitting...' : 'Submit to the Salon'}
        </button>
      </form>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-md">
          <p className="text-body text-sm text-green-800">
            Thank you for your submission! Your story has been received and will be reviewed by our curators.
          </p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-body text-sm text-red-800">
            There was an error submitting your story. Please try again.
          </p>
        </div>
      )}

      {/* Guidelines */}
      <div className="p-4 bg-parchment-100 border border-parchment-300 rounded-md">
        <h3 className="text-display text-sm font-semibold text-charcoal-900 mb-2">
          Submission Guidelines
        </h3>
        <ul className="text-body text-sm text-charcoal-600 space-y-1">
          <li>• All submissions are reviewed before publication</li>
          <li>• Keep your story under 2000 characters</li>
          <li>• You may remain anonymous or use a pseudonym</li>
          <li>• We welcome stories of imagination, memory, and dreams</li>
        </ul>
      </div>
    </div>
  )
} 