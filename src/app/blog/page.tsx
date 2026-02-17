'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { blogPosts, BlogPost } from '@/lib/blog'

export default function BlogPage() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [hoveredPost, setHoveredPost] = useState<string | null>(null)

  const categories = ['All', ...Array.from(new Set(blogPosts.map(post => post.category)))]

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory)

  const navigateToPost = (slug: string) => {
    router.push(`/blog/${slug}`)
  }

  const navigateHome = () => {
    router.push('/')
  }

  return (
    <main className="bg-[#004638] text-white min-h-screen overflow-x-hidden selection:bg-[#0096FF] selection:text-white">
      {/* Grain Overlay */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`
        }}
      />

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
          
          <div className="flex items-center gap-4">
            <button 
              onClick={navigateHome}
              className="hidden sm:flex px-5 py-2 border border-white/20 rounded-full hover:bg-white hover:text-[#004638] transition-all duration-300 text-sm"
            >
              Back to Home
            </button>
            <button 
              onClick={navigateHome}
              className="sm:hidden w-10 h-10 flex items-center justify-center border border-white/20 rounded-full hover:bg-white hover:text-[#004638] transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-24 px-4 sm:px-6 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-[-20%] right-[-10%] w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] bg-[#0096FF]/10 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-[#FFBC41]/10 rounded-full blur-[60px] sm:blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#B8FCBF]/10 border border-[#B8FCBF]/20">
              <div className="w-2 h-2 rounded-full bg-[#B8FCBF] animate-pulse" />
              <span className="text-[#B8FCBF] text-xs font-medium tracking-widest uppercase">Insights & Research</span>
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extralight text-white leading-[1.1] tracking-tight">
            Measured Perspectives
          </h1>
          
          <p className="mt-6 sm:mt-8 text-lg sm:text-xl md:text-2xl text-gray-400 font-light max-w-3xl mx-auto">
            In-depth analysis on digital asset markets, portfolio construction, risk management, and regulatory developments.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-4 sm:px-6 mb-12 sm:mb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-[#0096FF] text-white shadow-[0_0_20px_rgba(0,150,255,0.3)]'
                    : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="px-4 sm:px-6 pb-20 sm:pb-32">
        <div className="max-w-7xl mx-auto">
          {/* Featured Post - Large */}
          <div className="mb-8 sm:mb-12">
            <div 
              className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden cursor-pointer hover:border-[#0096FF]/50 transition-all duration-500"
              onClick={() => navigateToPost(filteredPosts[0].slug)}
              onMouseEnter={() => setHoveredPost(filteredPosts[0].slug)}
              onMouseLeave={() => setHoveredPost(null)}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Image */}
                <div className="relative h-64 sm:h-80 lg:h-[400px] overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${filteredPosts[0].image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#004638] via-[#004638]/50 to-transparent lg:bg-gradient-to-r" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#004638] to-transparent lg:hidden" />
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-[#0096FF]/20 border border-[#0096FF]/30 rounded-full text-[#0096FF] text-xs font-medium">
                      Featured
                    </span>
                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-gray-400 text-xs">
                      {filteredPosts[0].category}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white mb-4 group-hover:text-[#0096FF] transition-colors duration-300">
                    {filteredPosts[0].title}
                  </h2>

                  <p className="text-gray-400 font-light text-sm sm:text-base mb-6 line-clamp-3">
                    {filteredPosts[0].excerpt}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-white-500">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0096FF] to-[#0096FF]/50 flex items-center justify-center text-white text-xs font-medium">
                        {filteredPosts[0].author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span>{filteredPosts[0].author}</span>
                    </div>
                    <span>•</span>
                    <span>{filteredPosts[0].readTime}</span>
                    <span>•</span>
                    <span>{new Date(filteredPosts[0].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>

                  <div className="mt-6 flex items-center gap-2 text-[#0096FF] group-hover:translate-x-2 transition-transform duration-300">
                    <span className="text-sm font-medium">Read Article</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Other Posts - Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPosts.slice(1).map((post) => (
              <BlogCard 
                key={post.id}
                post={post}
                onNavigate={navigateToPost}
                isHovered={hoveredPost === post.slug}
                onHover={setHoveredPost}
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto rounded-full bg-white/5 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-xl font-light text-white mb-2">No articles found</h3>
              <p className="text-gray-500">Try selecting a different category</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA 
      <section className="px-4 sm:px-6 pb-20 sm:pb-32">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 sm:p-12 md:p-16 overflow-hidden">
           
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#0096FF]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#FFBC41]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10 text-center">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extralight text-white mb-4">
                Stay Informed
              </h3>
              <p className="text-gray-400 font-light text-sm sm:text-base mb-8 max-w-xl mx-auto">
                Subscribe to receive our latest insights on digital asset markets, portfolio strategy, and regulatory developments.
              </p>
              <button 
                onClick={navigateHome}
                className="px-8 py-4 bg-[#0096FF] text-white font-medium rounded-full hover:bg-[#0096FF]/90 transition-all duration-300 shadow-[0_0_20px_rgba(0,150,255,0.3)] hover:shadow-[0_0_30px_rgba(0,150,255,0.5)]"
              >
                Subscribe to Insights
              </button>
            </div>
          </div>
        </div>
      </section>*/}

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

        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500 text-sm">
            © 2025 Sagebrush Wealth FZE. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}

// Blog Card Component
function BlogCard({ 
  post, 
  onNavigate, 
  isHovered,
  onHover 
}: { 
  post: BlogPost
  onNavigate: (slug: string) => void
  isHovered: boolean
  onHover: (slug: string | null) => void
}) {
  return (
    <div 
      className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-[#0096FF]/50 hover:bg-white/10 transition-all duration-500"
      onClick={() => onNavigate(post.slug)}
      onMouseEnter={() => onHover(post.slug)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${post.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#004638] to-transparent" />
        <div className="absolute bottom-4 left-4">
          <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-xs">
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg sm:text-xl font-medium text-white mb-3 group-hover:text-[#0096FF] transition-colors duration-300 line-clamp-2">
          {post.title}
        </h3>

        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between text-xs text-white-500">
          <span>{post.readTime}</span>
          <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {post.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="px-2 py-1 bg-white/5 rounded text-xs text-white-500">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
