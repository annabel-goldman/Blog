import { getGazetteArticle, getGazetteArticles } from '@/lib/content'
import { notFound } from 'next/navigation'
import FakeDateRenderer from '@/components/ui/FakeDateRenderer'
import TagList from '@/components/ui/TagList'
import PostCard from '@/components/ui/PostCard'
import { Metadata } from 'next'
import Image from 'next/image'

interface GazetteDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: GazetteDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await getGazetteArticle(slug)
  
  if (!article) {
    return {
      title: 'Article Not Found | Diamond Street Collective',
    }
  }

  return {
    title: `${article.title} | Gazette | Diamond Street Collective`,
    description: article.subtitle || article.body.substring(0, 160),
  }
}

export async function generateStaticParams() {
  const articles = await getGazetteArticles()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export default async function GazetteDetailPage({ params }: GazetteDetailPageProps) {
  const { slug } = await params
  const article = await getGazetteArticle(slug)
  
  if (!article) {
    notFound()
  }

  // Get related articles (excluding current article)
  const allArticles = await getGazetteArticles()
  const relatedArticles = allArticles
    .filter(a => a.id !== article.id)
    .slice(0, 3)

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-display text-4xl md:text-5xl font-semibold text-charcoal-900 mb-4">
            {article.title}
          </h1>
          
          {article.subtitle && (
            <p className="text-body text-xl text-charcoal-600 mb-6 italic">
              {article.subtitle}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-center gap-4 text-body text-charcoal-600 mb-6">
            <span>by {article.author}</span>
            <span>•</span>
            <FakeDateRenderer date={article.date_display} variant="large" />
          </div>

          {/* Featured/Editor's Pick badges */}
          <div className="flex justify-center gap-2">
            {article.featured && (
              <span className="inline-flex items-center px-3 py-1 bg-charcoal-900 text-parchment-50 text-xs rounded-full">
                Featured
              </span>
            )}
            {article.editor_pick && (
              <span className="inline-flex items-center px-3 py-1 bg-charcoal-900 text-parchment-50 text-xs rounded-full">
                Editor&apos;s Pick
              </span>
            )}
          </div>
        </div>

        {/* Author Info */}
        {(article.author_bio || article.author_portrait) && (
          <div className="mb-12 p-6 bg-parchment-100 border border-parchment-300 rounded-lg">
            <div className="flex items-start gap-4">
              {article.author_portrait && (
                <div className="flex-shrink-0 w-16 h-16 rounded-full overflow-hidden border border-parchment-300">
                  <Image
                    src={article.author_portrait}
                    alt={article.author}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div>
                <h3 className="text-display text-lg font-semibold text-charcoal-900 mb-2">
                  {article.author}
                </h3>
                {article.author_bio && (
                  <p className="text-body text-sm text-charcoal-700">
                    {article.author_bio}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Article Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article className="prose prose-charcoal max-w-none">
              <div className="text-body text-charcoal-700 leading-relaxed whitespace-pre-wrap">
                {article.body}
              </div>
            </article>

            {/* Tags */}
            {article.tags.length > 0 && (
              <div className="mt-8">
                <h3 className="text-display text-sm font-semibold text-charcoal-900 mb-3">
                  Tags
                </h3>
                <TagList tags={article.tags} />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Article Metadata */}
            <div className="p-6 bg-parchment-50 border border-parchment-300 rounded-lg">
              <h3 className="text-display text-lg font-semibold text-charcoal-900 mb-3">
                Article Details
              </h3>
              <dl className="text-body text-sm text-charcoal-700 space-y-2">
                <div>
                  <dt className="font-medium">Author:</dt>
                  <dd>{article.author}</dd>
                </div>
                <div>
                  <dt className="font-medium">Published:</dt>
                  <dd><FakeDateRenderer date={article.date_display} variant="small" /></dd>
                </div>
                <div>
                  <dt className="font-medium">Word Count:</dt>
                  <dd>{article.body.split(' ').length} words</dd>
                </div>
                {article.featured && (
                  <div>
                    <dt className="font-medium">Status:</dt>
                    <dd>Featured Article</dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Reading Time Estimate */}
            <div className="p-6 bg-parchment-100 border border-parchment-300 rounded-lg">
              <h3 className="text-display text-lg font-semibold text-charcoal-900 mb-3">
                Reading Time
              </h3>
              <p className="text-body text-sm text-charcoal-700">
                Approximately {Math.ceil(article.body.split(' ').length / 200)} minutes
              </p>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-16">
            <h2 className="text-display text-2xl font-semibold text-charcoal-900 mb-8">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <PostCard key={relatedArticle.id} post={relatedArticle} variant="compact" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 