import { getSalonEntries } from '@/lib/content'
import SubmissionForm from '@/components/ui/SubmissionForm'
import FakeDateRenderer from '@/components/ui/FakeDateRenderer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Salon | Diamond Street Collective',
  description: 'User-generated submissions and letters from the Diamond Street Collective community.',
}

export default async function SalonPage() {
  const entries = await getSalonEntries()

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-display text-4xl font-semibold text-charcoal-900 mb-4">
            Salon
          </h1>
          <p className="text-body text-lg text-charcoal-600 max-w-3xl mx-auto">
            A gathering place for shared memories, dreams, and imaginings. 
            Submit your own story or read the contributions of our community.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Submission Form */}
          <div>
            <SubmissionForm />
          </div>

          {/* Submissions Feed */}
          <div>
            <h2 className="text-display text-2xl font-semibold text-charcoal-900 mb-8">
              Recent Submissions
            </h2>
            
            {entries.length > 0 ? (
              <div className="space-y-6">
                {entries.map((entry) => (
                  <div key={entry.id} className="p-6 border border-parchment-300 bg-parchment-50 rounded-lg">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-display text-lg font-semibold text-charcoal-900 mb-1">
                          {entry.pseudonym}
                        </h3>
                        <FakeDateRenderer date={entry.date_display} variant="small" />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-body text-sm font-medium text-charcoal-700 mb-2">
                        Prompt: {entry.prompt}
                      </h4>
                    </div>
                    
                    <div className="text-body text-charcoal-700 leading-relaxed whitespace-pre-wrap">
                      {entry.message}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-body text-charcoal-600 mb-4">
                  No submissions yet. Be the first to share your story!
                </p>
                <p className="text-body text-sm text-charcoal-500">
                  All submissions are reviewed before publication.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Salon Info */}
        <div className="mt-16 p-6 bg-parchment-100 border border-parchment-300 rounded-lg">
          <h2 className="text-display text-xl font-semibold text-charcoal-900 mb-4">
            About the Salon
          </h2>
          <div className="text-body text-charcoal-700 space-y-3">
            <p>
              The Salon serves as our community gathering place, where visitors 
              can share their own memories, dreams, and imaginings. We believe 
              that the most valuable artifacts are those that exist in the realm 
              of shared imagination.
            </p>
            <p>
              Each submission is carefully reviewed by our curators before 
              publication, ensuring that our collection maintains its quality 
              and thematic coherence while welcoming diverse perspectives and 
              creative interpretations.
            </p>
            <p className="italic text-charcoal-600">
              &ldquo;In the salon, we discover that the boundaries between individual 
              and collective memory are as fluid as the stories we tell.&rdquo; 
              — Lady Eleanor Blackwood, 1847
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 