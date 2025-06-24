import Link from 'next/link'
import { getFeaturedGazetteArticles, getArchivePosts } from '@/lib/content'

export default async function Home() {
  // Fetch some featured content for the homepage
  const featuredArticles = await getFeaturedGazetteArticles()
  const recentArchive = await getArchivePosts()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <h1 className="text-display text-4xl md:text-6xl font-semibold text-charcoal-900 mb-6">
            Diamond Street Collective
          </h1>
          <p className="text-body text-xl text-charcoal-600 italic mb-8">
            est. 1809 (allegedly)
          </p>
          <p className="text-body text-lg text-charcoal-700 max-w-3xl mx-auto mb-12 leading-relaxed">
            A curated archive of the imagined and the forgotten, preserving the artifacts 
            of a history that never was. Through our collections, we explore the boundaries 
            between memory and invention, fact and fiction.
          </p>
          
          {/* Quick Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <Link 
              href="/archive"
              className="group p-4 border border-parchment-300 bg-parchment-100 hover:bg-parchment-200 transition-colors"
            >
              <div className="text-display text-sm font-semibold text-charcoal-900 group-hover:text-charcoal-700">
                Archive
              </div>
              <div className="text-body text-xs text-charcoal-600 mt-1">
                Photo essays
              </div>
            </Link>
            
            <Link 
              href="/gazette"
              className="group p-4 border border-parchment-300 bg-parchment-100 hover:bg-parchment-200 transition-colors"
            >
              <div className="text-display text-sm font-semibold text-charcoal-900 group-hover:text-charcoal-700">
                Gazette
              </div>
              <div className="text-body text-xs text-charcoal-600 mt-1">
                Articles & letters
              </div>
            </Link>
            
            <Link 
              href="/salon"
              className="group p-4 border border-parchment-300 bg-parchment-100 hover:bg-parchment-200 transition-colors"
            >
              <div className="text-display text-sm font-semibold text-charcoal-900 group-hover:text-charcoal-700">
                Salon
              </div>
              <div className="text-body text-xs text-charcoal-600 mt-1">
                Submissions
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-parchment-100">
        <div className="container mx-auto">
          <h2 className="text-display text-3xl font-semibold text-charcoal-900 mb-12 text-center">
            Featured Collections
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Featured Articles */}
            <div className="space-y-4">
              <h3 className="text-display text-lg font-semibold text-charcoal-900">
                From the Gazette
              </h3>
              {featuredArticles.slice(0, 2).map((article) => (
                <div key={article.id} className="p-4 bg-parchment-50 border border-parchment-300">
                  <Link href={`/gazette/${article.slug}`} className="group">
                    <h4 className="text-display text-sm font-semibold text-charcoal-900 group-hover:text-charcoal-700 transition-colors">
                      {article.title}
                    </h4>
                    <p className="text-body text-xs text-charcoal-600 mt-1">
                      by {article.author}
                    </p>
                    <p className="text-body text-xs text-charcoal-500 mt-1">
                      {article.date_display}
                    </p>
                  </Link>
                </div>
              ))}
            </div>

            {/* Recent Archive */}
            <div className="space-y-4">
              <h3 className="text-display text-lg font-semibold text-charcoal-900">
                From the Archive
              </h3>
              {recentArchive.slice(0, 2).map((post) => (
                <div key={post.id} className="p-4 bg-parchment-50 border border-parchment-300">
                  <Link href={`/archive/${post.slug}`} className="group">
                    <h4 className="text-display text-sm font-semibold text-charcoal-900 group-hover:text-charcoal-700 transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-body text-xs text-charcoal-600 mt-1">
                      {post.caption}
                    </p>
                    <p className="text-body text-xs text-charcoal-500 mt-1">
                      {post.date_display}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center space-y-6">
            <h2 className="text-display text-3xl font-semibold text-charcoal-900">
              About Our Collection
            </h2>
            <div className="text-body text-charcoal-700 space-y-4 leading-relaxed">
              <p>
                The Diamond Street Collective was purportedly founded in 1809 by the eccentric 
                Duke of Diamond Street, who began collecting artifacts that existed only in 
                the realm of imagination and whispered rumors.
              </p>
              <p>
                Today, our archive continues this tradition of preserving the ephemeral and 
                the invented. Through our four main collections—the Archive, the Gazette, 
                the Index, and the Salon—we invite visitors to explore the boundaries between 
                memory and invention, fact and fiction.
              </p>
              <p className="italic text-charcoal-600">
                &ldquo;The most valuable artifacts are those that never existed, for they contain 
                the purest form of human imagination.&rdquo; — Lady Eleanor Blackwood, 1847
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
