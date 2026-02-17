'use client'

import { useEffect, useRef, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getBlogPost, getRelatedPosts, BlogPost } from '@/lib/blog'

export default function BlogPostPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  
  const post = getBlogPost(slug)
  const relatedPosts = post ? getRelatedPosts(slug, 3) : []
  
  const progressBarRef = useRef<HTMLDivElement>(null)
  const [readingProgress, setReadingProgress] = useState(0)

  useEffect(() => {
    // Reading progress
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      setReadingProgress(Math.min(progress, 100))
    }

    window.addEventListener('scroll', updateProgress)
    return () => {
      window.removeEventListener('scroll', updateProgress)
    }
  }, [slug])

  if (!post) {
    return (
      <main className="bg-[#004638] text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-light text-white mb-4">Article Not Found</h1>
          <p className="text-gray-400 mb-8">The article you&apos;re looking for doesn&apos;t exist.</p>
          <button 
            onClick={() => router.push('/blog')}
            className="px-6 py-3 bg-[#0096FF] text-white rounded-full hover:bg-[#0096FF]/90 transition-all"
          >
            Back to Blog
          </button>
        </div>
      </main>
    )
  }

  const sections = extractSections(post.content)
  const contentBlocks = parseContent(post.content)

  // Get the full URL for sharing
  const pageUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareText = `Check out this article: ${post.title}`

  // Share URLs
  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(pageUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + pageUrl)}`
  }

  const handleShare = (platform: 'twitter' | 'linkedin' | 'whatsapp') => {
    window.open(shareUrls[platform], '_blank', 'width=600,height=400')
  }

  const navigateToBlog = () => router.push('/blog')
  const navigateToPost = (postSlug: string) => router.push(`/blog/${postSlug}`)
  const navigateHome = () => router.push('/')

  return (
    <main className="bg-[#004638] text-white min-h-screen overflow-x-hidden selection:bg-[#0096FF] selection:text-white">
      {/* Grain Overlay */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`
        }}
      />

      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-white/10 z-[60]">
        <div 
          ref={progressBarRef} 
          className="h-full bg-gradient-to-r from-[#0096FF] via-[#B8FCBF] to-[#FFBC41] transition-all duration-150" 
          style={{ width: `${readingProgress}%` }} 
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-[#004638]/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex justify-between items-center">
          <button onClick={navigateHome} className="font-semibold text-xl tracking-tight text-white flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img 
              src="https://raw.githubusercontent.com/DannyYo696/svillage/b01dd224e847135fc6b636c8cd74e60c397d6a59/Sagebrush%20white.png" 
              alt="Sagebrush Wealth" 
              className="w-[120px] sm:w-[150px] md:w-[190px]"
            />
          </button>
          
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-400">
              <span>{Math.round(readingProgress)}% read</span>
            </div>
            <button 
              onClick={navigateToBlog}
              className="flex items-center gap-2 px-4 sm:px-5 py-2 border border-white/20 rounded-full hover:bg-white hover:text-[#004638] transition-all duration-300 text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="hidden sm:inline">All Articles</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[70vh] sm:min-h-[80vh] flex items-end overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${post.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#004638] via-[#004638]/70 to-[#004638]/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#004638]/50 via-transparent to-[#004638]/50" />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-[#0096FF]/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 left-10 w-48 h-48 bg-[#B8FCBF]/20 rounded-full blur-[80px]" />

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-6 sm:mb-8">
            <button onClick={navigateHome} className="hover:text-white transition-colors">Home</button>
            <span>/</span>
            <button onClick={navigateToBlog} className="hover:text-white transition-colors">Insights</button>
            <span>/</span>
            <span className="text-[#0096FF]">{post.category}</span>
          </div>

          <div className="max-w-4xl">
            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6">
              <span className="px-4 py-1.5 bg-[#0096FF] text-white text-xs font-medium rounded-full">
                {post.category}
              </span>
              {post.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full text-gray-300 text-xs">
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight text-white leading-tight mb-6 sm:mb-8">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0096FF] to-[#0096FF]/50 flex items-center justify-center text-white font-medium">
                  {post.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="text-white font-medium">{post.author}</div>
                  <div className="text-gray-500 text-sm">{post.authorRole}</div>
                </div>
              </div>
              
              <div className="hidden sm:block w-px h-10 bg-white/10" />
              
              <div className="flex items-center gap-4 text-gray-400 text-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{post.readTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Takeaways - Floating Card */}
      <section className="relative -mt-8 sm:-mt-12 z-20 px-4 sm:px-6 mb-16 sm:mb-24">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 relative overflow-hidden">
            {/* Decorative accent */}
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#0096FF] via-[#B8FCBF] to-[#FFBC41]" />
            
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#0096FF]/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-[#0096FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-medium text-white mb-1">Key Takeaways</h3>
                <p className="text-gray-500 text-sm">Quick summary of this article</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {generateKeyTakeaways(post).map((takeaway, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/5">
                  <div className="w-6 h-6 rounded-full bg-[#0096FF]/20 flex items-center justify-center flex-shrink-0 text-[#0096FF] text-xs font-medium">
                    {index + 1}
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{takeaway}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="px-4 sm:px-6 pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 xl:gap-16">
            {/* Main Content Column */}
            <div className="xl:col-span-8">
              {/* Introduction */}
              <div className="mb-12 sm:mb-16">
                <p className="text-xl sm:text-2xl text-gray-300 font-light leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              {/* Content Blocks */}
              {contentBlocks.map((block, index) => (
                <ContentBlock 
                  key={index} 
                  block={block} 
                  index={index}
                />
              ))}

              {/* Conclusion */}
              <div className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-white/10">
                <div className="bg-gradient-to-br from-[#B8FCBF]/10 to-transparent rounded-2xl p-6 sm:p-8 border border-[#B8FCBF]/20">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#B8FCBF]/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-[#B8FCBF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-white mb-2">Conclusion</h4>
                      <p className="text-gray-400 leading-relaxed">
                        Understanding these concepts is essential for informed digital asset participation. 
                        Our research team continues to provide measured perspectives to help investors navigate this evolving landscape.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="xl:col-span-4">
              <div className="xl:sticky xl:top-28 space-y-6 sm:space-y-8">
                {/* Table of Contents */}
                {sections.length > 0 && (
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                    <h4 className="text-sm text-gray-500 uppercase tracking-wider mb-4">Table of Contents</h4>
                    <div className="space-y-2">
                      {sections.map((section, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            const el = document.getElementById(`section-${index}`)
                            el?.scrollIntoView({ behavior: 'smooth' })
                          }}
                          className="w-full text-left px-4 py-2 rounded-lg text-sm text-gray-400 hover:bg-white/5 hover:text-white transition-all duration-300"
                        >
                          {section}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Author Card *
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <h4 className="text-sm text-gray-500 uppercase tracking-wider mb-4">Written By</h4>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0096FF] to-[#0096FF]/50 flex items-center justify-center text-white text-lg font-medium">
                      {post.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="text-white font-medium">{post.author}</div>
                      <div className="text-[#0096FF] text-sm">{post.authorRole}</div>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Our research team provides measured perspectives on digital asset markets, portfolio construction, and regulatory developments.
                  </p>
                </div>/}

                {/* Share Card */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <h4 className="text-sm text-white-500 uppercase tracking-wider mb-4">Share This Article</h4>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => handleShare('twitter')}
                      className="flex-1 py-3 bg-white/5 border border-white/10 rounded-xl text-white-400 hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2] transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                      <span className="text-sm">Twitter</span>
                    </button>
                    <button 
                      onClick={() => handleShare('linkedin')}
                      className="flex-1 py-3 bg-white/5 border border-white/10 rounded-xl text-white-400 hover:bg-[#0077B5] hover:text-white hover:border-[#0077B5] transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                      <span className="text-sm">LinkedIn</span>
                    </button>
                  </div>
                  <button 
                    onClick={() => handleShare('whatsapp')}
                    className="w-full mt-3 py-3 bg-white/5 border border-white/10 rounded-xl text-white-400 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    <span className="text-sm">Share on WhatsApp</span>
                  </button>
                </div>

                {/* Tags */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <h4 className="text-sm text-white-500 uppercase tracking-wider mb-4">Related Topics</h4>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white-400 text-sm hover:bg-white/10 hover:text-white transition-colors cursor-pointer">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="px-4 sm:px-6 py-16 sm:py-24 bg-[#002820]/50">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 sm:mb-14">
              <div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extralight text-white mb-2">Continue Reading</h3>
                <p className="text-gray-500">More insights from our research team</p>
              </div>
              <button 
                onClick={navigateToBlog}
                className="flex items-center gap-2 text-[#0096FF] hover:text-white transition-colors text-sm"
              >
                View All Articles
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {relatedPosts.map((relatedPost, index) => (
                <div 
                  key={relatedPost.id}
                  className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-[#0096FF]/50 transition-all duration-500"
                  onClick={() => navigateToPost(relatedPost.slug)}
                >
                  {/* Number Badge */}
                  <div className="absolute top-4 left-4 z-10 w-8 h-8 rounded-full bg-[#004638]/90 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white text-sm font-medium">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${relatedPost.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#002820] to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[#0096FF] text-xs font-medium">{relatedPost.category}</span>
                      <span className="text-gray-600 text-xs">•</span>
                      <span className="text-gray-500 text-xs">{relatedPost.readTime}</span>
                    </div>
                    <h4 className="text-lg font-medium text-white mb-3 group-hover:text-[#0096FF] transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h4>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                      {relatedPost.excerpt}
                    </p>
                    
                    <div className="flex items-center gap-2 text-[#0096FF] group-hover:translate-x-2 transition-transform duration-300">
                      <span className="text-sm font-medium">Read Article</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-[#002820] pt-12 pb-8 px-4 sm:px-6 border-t border-white/5">
        {/* Risk Notice - Prominent & Clear */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="bg-[#FB5A30]/10 border-2 border-[#FB5A30]/30 rounded-2xl p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#FB5A30]/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#FB5A30]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h4 className="text-[#FB5A30] font-semibold text-base sm:text-lg mb-2">Risk Notice</h4>
                <p className="text-gray-200 font-light text-sm sm:text-base leading-relaxed">
                  Digital assets are volatile and may experience substantial price fluctuations. 
                  Investing in virtual assets involves <strong className="text-white font-medium">market, liquidity, operational, counterparty, and protocol risks</strong>. 
                  Capital preservation is not guaranteed. Products and services are subject to eligibility, regulatory approval, 
                  and suitability assessment.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2025 Sagebrush Wealth FZE. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <button onClick={navigateHome} className="text-gray-500 hover:text-white text-sm transition-colors">Home</button>
            <button onClick={navigateToBlog} className="text-gray-500 hover:text-white text-sm transition-colors">Insights</button>
          </div>
        </div>
      </footer>
    </main>
  )
}

// Helper function to extract section headings
function extractSections(content: string): string[] {
  const sections: string[] = []
  const lines = content.split('\n')
  
  lines.forEach(line => {
    if (line.startsWith('## ')) {
      sections.push(line.replace('## ', '').trim())
    }
  })
  
  return sections
}

// Helper function to parse content into blocks
function parseContent(content: string): ContentBlockType[] {
  const blocks: ContentBlockType[] = []
  const lines = content.split('\n')
  let currentBlock: ContentBlockType | null = null
  let currentContent: string[] = []

  lines.forEach((line) => {
    const trimmedLine = line.trim()
    
    // Section heading
    if (trimmedLine.startsWith('## ')) {
      if (currentBlock) {
        currentBlock.content = currentContent.join('\n')
        blocks.push(currentBlock)
      }
      currentBlock = { type: 'section', title: trimmedLine.replace('## ', '').trim(), content: '' }
      currentContent = []
    }
    // Subheading
    else if (trimmedLine.startsWith('### ')) {
      if (currentBlock && currentContent.length > 0) {
        currentBlock.content = currentContent.join('\n')
        blocks.push(currentBlock)
        currentBlock = { type: 'section', title: currentBlock.title, content: '' }
        currentContent = []
      }
      blocks.push({ type: 'subheading', title: trimmedLine.replace('### ', '').trim(), content: '' })
    }
    // List items
    else if (trimmedLine.startsWith('- ')) {
      if (currentBlock && currentBlock.type !== 'list') {
        currentBlock.content = currentContent.join('\n')
        blocks.push(currentBlock)
        currentBlock = { type: 'list', items: [], content: '' }
        currentContent = []
      } else if (!currentBlock) {
        currentBlock = { type: 'list', items: [], content: '' }
      }
      if (currentBlock && currentBlock.type === 'list') {
        currentBlock.items!.push(trimmedLine.replace('- ', '').trim())
      }
    }
    // Regular paragraph
    else if (trimmedLine.length > 0 && !trimmedLine.startsWith('#')) {
      if (currentBlock && currentBlock.type === 'list') {
        blocks.push(currentBlock)
        currentBlock = null
      }
      currentContent.push(trimmedLine)
    }
    // Empty line - end of block
    else if (trimmedLine.length === 0 && currentContent.length > 0) {
      if (currentBlock) {
        currentBlock.content = currentContent.join('\n\n')
        blocks.push(currentBlock)
        currentBlock = null
      } else {
        blocks.push({ type: 'paragraph', content: currentContent.join('\n\n') })
      }
      currentContent = []
    }
  })

  // Handle remaining content
  if (currentContent.length > 0 || (currentBlock && currentBlock.items && currentBlock.items.length > 0)) {
    if (currentBlock) {
      currentBlock.content = currentContent.join('\n')
      blocks.push(currentBlock)
    } else {
      blocks.push({ type: 'paragraph', content: currentContent.join('\n') })
    }
  }

  return blocks.filter(block => {
    if (block.type === 'list') return block.items && block.items.length > 0
    return block.content || block.title
  })
}

// Generate key takeaways based on post content
function generateKeyTakeaways(post: BlogPost): string[] {
  const takeaways: Record<string, string[]> = {
    'digital-asset-market-structure-2026': [
      'Digital asset markets differ fundamentally from traditional capital markets',
      'Liquidity fragmentation and custody models require careful consideration',
      'Regulation has become a defining variable in market structure',
      'Structural awareness is foundational before allocating capital'
    ],
    'exchanges-custodians-asset-managers-ecosystem': [
      'The ecosystem has three distinct layers: exchanges, custodians, and asset managers',
      'Each layer performs a different function with different risk profiles',
      'Regulated managers focus on portfolio construction and suitability',
      'Understanding these distinctions is central to portfolio integrity'
    ],
    'liquidity-volatility-fragmentation': [
      'Liquidity in digital assets is not centralised across venues',
      'Volatility responds rapidly to global conditions and announcements',
      'Disciplined portfolio construction helps manage structural risks',
      'These are embedded features requiring structured engagement'
    ],
    'wealth-management-principles-digital-assets': [
      'Portfolio construction must be grounded in wealth management principles',
      'Defined allocation bands and risk ceilings are structural guardrails',
      'Diversification within digital assets is essential for risk management',
      'Governance oversight supports disciplined participation'
    ],
    'allocation-bands-risk-ceilings': [
      'Allocation bands define acceptable exposure ranges for portfolios',
      'Risk ceilings establish maximum thresholds based on volatility tolerance',
      'These tools convert subjective judgment into structured parameters',
      'Structured allocation maintains alignment between opportunity and oversight'
    ],
    'dollar-cost-averaging-digital-assets': [
      'DCA offers a structured alternative to timing decisions',
      'It is a behavioural and structural discipline tool, not performance enhancement',
      'Should operate within documented allocation bands and risk ceilings',
      'Addresses behavioural risk by introducing predictability'
    ],
    'understanding-risk-digital-assets': [
      'Risk extends beyond price volatility to multiple dimensions',
      'Custody and operational risk require secure controls and protocols',
      'Protocol-specific risks distinguish digital assets from traditional securities',
      'A structured approach integrates all dimensions into a coherent framework'
    ],
    'capital-preservation-digital-assets': [
      'Capital preservation refers to volatility awareness and allocation discipline',
      'Conservative strategies introduce structural parameters limiting exposure',
      'Structured rebalancing is important in volatile markets',
      'Preservation extends beyond price exposure to operational integrity'
    ],
    'counterparty-custody-risk': [
      'Digital assets are bearer instruments requiring cryptographic key management',
      'Counterparty risk and operational resilience are equally significant',
      'Institutional-grade infrastructure provides segregation and controls',
      'Infrastructure matters because operational failure can compound market loss'
    ],
    'dubai-regulatory-framework': [
      'Dubai has positioned itself as a structured regulatory jurisdiction',
      'Suitability alignment formalises engagement and reinforces governance',
      'Operational controls become a regulatory necessity, not just advantage',
      'Regulatory alignment provides accountability and defined standards'
    ],
    'why-regulation-matters': [
      'Regulation directly shapes how investment strategies are designed',
      'Suitability assessment establishes guardrails before capital allocation',
      'Marketing communications require balanced risk explanation',
      'Discipline is foundational in a volatile asset class'
    ],
    'suitability-investor-protection': [
      'Suitability begins with client categorisation before exposure is constructed',
      'Defined allocation bands ensure suitability-aligned exposure',
      'Investor protection encompasses operational integrity, not just price risk',
      'Participation should be intentional with structured engagement'
    ]
  }
  
  return takeaways[post.slug] || [
    'Understanding market fundamentals is essential',
    'Risk management should be multi-dimensional',
    'Governance and documentation provide structure',
    'Long-term perspective supports better outcomes'
  ]
}

// Content Block Component
interface ContentBlockType {
  type: 'section' | 'subheading' | 'paragraph' | 'list' | 'quote'
  title?: string
  content: string
  items?: string[]
}

function ContentBlock({ block, index }: { block: ContentBlockType; index: number }) {
  // Generate random accent color for visual interest
  const accentColors = ['#0096FF', '#B8FCBF', '#FFBC41', '#FB5A30']
  const accentColor = accentColors[index % accentColors.length]

  if (block.type === 'section') {
    return (
      <div className="mb-8 sm:mb-12" id={`section-${index}`}>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-medium text-lg" style={{ backgroundColor: `${accentColor}20`, border: `1px solid ${accentColor}30` }}>
            {String(index + 1).padStart(2, '0')}
          </div>
          <h2 className="text-2xl sm:text-3xl font-light text-white">{block.title}</h2>
        </div>
        {block.content && (
          <div className="pl-0 sm:pl-16">
            <p className="text-gray-300 leading-relaxed text-base sm:text-lg">{block.content}</p>
          </div>
        )}
      </div>
    )
  }

  if (block.type === 'subheading') {
    return (
      <div className="mb-6">
        <h3 className="text-xl sm:text-2xl font-light text-[#0096FF]">{block.title}</h3>
      </div>
    )
  }

  if (block.type === 'list') {
    return (
      <div className="mb-8 sm:mb-12">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8">
          <div className="grid gap-4">
            {block.items?.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 group">
                <div className="w-6 h-6 rounded-full bg-[#0096FF]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-[#0096FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Pull quote for highlighted text
  /*if (block.content.length > 150 && index % 3 === 0) {
    const sentences = block.content.split('. ').slice(0, 2).join('. ')
    return (
      <div className="mb-8 sm:mb-12">
       
        <div className="relative mb-8 py-6 px-8 bg-gradient-to-r from-[#0096FF]/10 to-transparent border-l-2 border-[#0096FF]">
          <p className="text-xl sm:text-2xl text-white font-light italic leading-relaxed">
            &ldquo;{sentences}.&rdquo;
          </p>
        </div>
        <p className="text-gray-300 leading-relaxed">{block.content}</p>
      </div>
    )
  }*/

  // Regular paragraph
  return (
    <div className="mb-6 sm:mb-8">
      <p className="text-gray-300 leading-relaxed text-base sm:text-lg">{block.content}</p>
    </div>
  )
}
