'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { blogPosts } from '@/lib/blog'

export default function Home() {
  const router = useRouter()
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [subscribeOpen, setSubscribeOpen] = useState(false)
  const [consultationOpen, setConsultationOpen] = useState(false)
  const [subscribeEmail, setSubscribeEmail] = useState('')
  const [subscribeSubmitted, setSubscribeSubmitted] = useState(false)
  const [consultationSubmitted, setConsultationSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    investorType: '',
    message: ''
  })

  // Menu state - prevent body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const handleSubscribeSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (subscribeEmail) {
      setSubscribeSubmitted(true)
      setTimeout(() => {
        setSubscribeOpen(false)
        setSubscribeSubmitted(false)
        setSubscribeEmail('')
      }, 2000)
    }
  }

  const handleConsultationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.email) {
      setConsultationSubmitted(true)
      setTimeout(() => {
        setConsultationOpen(false)
        setConsultationSubmitted(false)
        setFormData({ name: '', email: '', phone: '', company: '', investorType: '', message: '' })
      }, 2000)
    }
  }

  // Direct scroll function for desktop nav
  const scrollToSectionDirect = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Mobile menu scroll - close menu first, then scroll immediately
  const scrollToSectionMobile = (id: string) => {
    setMobileMenuOpen(false)
    // Small delay for visual feedback, then scroll
    setTimeout(() => {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }, 150)
  }

  return (
    <main className="bg-[#004638] text-white overflow-x-hidden selection:bg-[#0096FF] selection:text-white">
      {/* Grain Overlay */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`
        }}
      />

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[100] md:hidden transition-all duration-300 ease-out ${mobileMenuOpen ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible'}`}
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#002820] via-[#004638] to-[#002820]">
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
          {/* Glowing orbs */}
          <div className="absolute top-[20%] left-[10%] w-32 h-32 rounded-full bg-[#0096FF]/20 blur-3xl" />
          <div className="absolute top-[60%] right-[15%] w-40 h-40 rounded-full bg-[#FFBC41]/20 blur-3xl" />
          <div className="absolute bottom-[30%] left-[30%] w-24 h-24 rounded-full bg-[#B8FCBF]/20 blur-3xl" />
        </div>

        {/* Menu Items - instant visibility */}
        <div className="relative h-full flex flex-col items-center justify-center px-8">
          <div className="w-full max-w-md space-y-1">
            {[
              { id: 'why', label: 'Why Us', number: '01' },
              { id: 'solutions', label: 'Solutions', number: '02' },
              { id: 'approach', label: 'Approach', number: '03' },
              { id: 'platform', label: 'Platform', number: '04' },
              { id: 'insights', label: 'Insights', number: '05' },
              { id: 'faq', label: 'FAQ', number: '06' },
            ].map((item, index) => (
              <div 
                key={item.id}
                className="transition-transform duration-200"
                style={{ 
                  transitionDelay: mobileMenuOpen ? `${index * 30}ms` : '0ms',
                  transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(-20px)'
                }}
              >
                <button
                  onClick={() => scrollToSectionMobile(item.id)}
                  className="group w-full text-left py-4 flex items-center justify-between border-b border-white/10 hover:border-[#0096FF]/50 transition-all duration-200"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-[#0096FF] font-mono text-sm opacity-50 group-hover:opacity-100 transition-opacity">
                      {item.number}
                    </span>
                    <span className="text-3xl sm:text-4xl font-extralight text-white group-hover:text-[#0096FF] transition-colors duration-200">
                      {item.label}
                    </span>
                  </div>
                  <svg className="w-5 h-5 text-[#0096FF] opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            ))}

            {/* CTA Button */}
            <div 
              className="pt-6 transition-transform duration-200"
              style={{ 
                transitionDelay: mobileMenuOpen ? '180ms' : '0ms',
                transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(-20px)'
              }}
            >
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  setTimeout(() => setConsultationOpen(true), 200)
                }}
                className="w-full py-4 bg-gradient-to-r from-[#0096FF] to-[#0096FF]/70 text-white font-medium rounded-full hover:from-[#0096FF]/90 hover:to-[#0096FF]/50 transition-all duration-200 shadow-[0_0_30px_rgba(0,150,255,0.3)] text-lg"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-[110] backdrop-blur-xl bg-[#004638]/80 border-b border-white/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex justify-between items-center">
          <a href="#" className="font-semibold text-xl tracking-tight text-white flex items-center gap-3">
            <img 
              src="https://raw.githubusercontent.com/DannyYo696/svillage/b01dd224e847135fc6b636c8cd74e60c397d6a59/Sagebrush%20white.png" 
              alt="Sagebrush Wealth" 
              className="w-[120px] sm:w-[150px] md:w-[190px]"
            />
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 text-sm font-light tracking-wide text-gray-300">
            <button onClick={() => scrollToSectionDirect('why')} className="hover:text-[#0096FF] transition-colors duration-300">Why Us</button>
            <button onClick={() => scrollToSectionDirect('solutions')} className="hover:text-[#0096FF] transition-colors duration-300">Solutions</button>
            <button onClick={() => scrollToSectionDirect('approach')} className="hover:text-[#0096FF] transition-colors duration-300">Approach</button>
            <button onClick={() => scrollToSectionDirect('platform')} className="hover:text-[#0096FF] transition-colors duration-300">Platform</button>
            <button onClick={() => scrollToSectionDirect('insights')} className="hover:text-[#0096FF] transition-colors duration-300">Insights</button>
            <button onClick={() => scrollToSectionDirect('faq')} className="hover:text-[#0096FF] transition-colors duration-300">FAQ</button>
            <button 
              onClick={() => setConsultationOpen(true)}
              className="px-6 py-2.5 border border-white/20 rounded-full hover:bg-white hover:text-[#004638] transition-all duration-300"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button - Single transforming button */}
          <button 
            className={`md:hidden relative w-12 h-12 flex items-center justify-center z-[120] transition-all duration-300 ${mobileMenuOpen ? 'rotate-180' : 'rotate-0'}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <div className="relative w-6 h-6">
              {/* X icon - only visible when menu is open */}
              <svg 
                className={`absolute inset-0 w-6 h-6 text-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-50'}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              
              {/* Hamburger icon - only visible when menu is closed */}
              <div className={`flex flex-col justify-between h-4 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0 -rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`}>
                <span className="w-6 h-0.5 bg-white rounded-full" />
                <span className="w-6 h-0.5 bg-white rounded-full" />
                <span className="w-4 h-0.5 bg-white rounded-full" />
              </div>
            </div>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[100vh] flex items-center px-4 sm:px-6 pt-20 sm:pt-24 pb-12 overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] bg-[#0096FF]/10 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-[#FFBC41]/10 rounded-full blur-[60px] sm:blur-[100px] pointer-events-none animate-pulse" style={{animationDelay: '1s'}} />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center">
            <div className="text-center lg:text-left">
              <div className="overflow-hidden">
                <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extralight leading-[1.2] tracking-tight text-white">
                  Digital assets,<br />
                  <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                    managed like wealth.
                  </span>
                </h1>
              </div>

              <div className="mt-6 sm:mt-8 md:mt-12 max-w-2xl mx-auto lg:mx-0 overflow-hidden">
                <p className="text-sm sm:text-base md:text-xl font-light text-gray-300 leading-relaxed">
                  Sagebrush Wealth is a Dubai-based regulated digital asset wealth management firm 
                  delivering structured, governance-led exposure to digital assets.
                </p>
              </div>

              <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start">
                <button 
                  onClick={() => scrollToSectionDirect('solutions')}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-[#0096FF] text-white font-medium rounded-full hover:bg-[#0096FF]/90 transition-all duration-300 shadow-[0_0_20px_rgba(0,150,255,0.3)] hover:shadow-[0_0_30px_rgba(0,150,255,0.5)] text-sm sm:text-base"
                >
                  Explore Solutions
                </button>
                <button 
                  onClick={() => setConsultationOpen(true)}
                  className="px-6 sm:px-8 py-3 sm:py-4 border border-white/20 text-white font-light rounded-full hover:bg-white/5 transition-all duration-300 text-sm sm:text-base"
                >
                  Request a Private Consultation
                </button>
              </div>
            </div>

            {/* 3D Vault Animation */}
            <div className="relative flex justify-center lg:justify-end h-[300px] sm:h-[400px] md:h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#FFBC41]/5 via-transparent to-[#0096FF]/10 rounded-full blur-3xl opacity-50" />

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-[#FFBC41] to-[#FB5A30] z-10"
                style={{
                  boxShadow: '0 0 60px rgba(255,188,65,0.3)',
                  animation: 'pulse-core 4s infinite ease-in-out, float-card 6s ease-in-out infinite'
                }}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-tl from-black/40 to-transparent" />
              </div>

              <div className="absolute inset-0 z-20" style={{animation: 'orbit-slow 20s linear infinite'}}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-36 sm:w-32 sm:h-44 md:w-40 md:h-56 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl flex flex-col p-3 sm:p-4 border-l-2 border-l-[#0096FF]/50"
                  style={{transform: 'translateZ(80px)', boxShadow: '0 10px 40px rgba(0,0,0,0.2)'}}>
                  <div className="flex justify-between items-start mb-2 sm:mb-4">
                    <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-white/5 border border-white/10" />
                    <div className="text-[8px] sm:text-[10px] text-[#0096FF] font-bold tracking-widest">BTC</div>
                  </div>
                  <div className="mt-auto">
                    <div className="text-[10px] sm:text-xs text-gray-400 mb-1">Allocation</div>
                    <div className="text-base sm:text-xl font-light text-white">45%</div>
                  </div>
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-36 sm:w-32 sm:h-44 md:w-40 md:h-56 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl flex flex-col p-3 sm:p-4 border-l-2 border-l-[#B8FCBF]/50"
                  style={{transform: 'rotateY(120deg) translateZ(80px)', boxShadow: '0 10px 40px rgba(0,0,0,0.2)'}}>
                  <div className="flex justify-between items-start mb-2 sm:mb-4">
                    <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-white/5 border border-white/10" />
                    <div className="text-[8px] sm:text-[10px] text-[#B8FCBF] font-bold tracking-widest">ETH</div>
                  </div>
                  <div className="mt-auto">
                    <div className="text-[10px] sm:text-xs text-gray-400 mb-1">Allocation</div>
                    <div className="text-base sm:text-xl font-light text-white">30%</div>
                  </div>
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-36 sm:w-32 sm:h-44 md:w-40 md:h-56 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl flex flex-col p-3 sm:p-4 border-l-2 border-l-[#FFBC41]/50"
                  style={{transform: 'rotateY(240deg) translateZ(80px)', boxShadow: '0 10px 40px rgba(0,0,0,0.2)'}}>
                  <div className="flex justify-between items-start mb-2 sm:mb-4">
                    <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-white/5 border border-white/10" />
                    <div className="text-[8px] sm:text-[10px] text-[#FFBC41] font-bold tracking-widest">USDT</div>
                  </div>
                  <div className="mt-auto">
                    <div className="text-[10px] sm:text-xs text-gray-400 mb-1">Stable</div>
                    <div className="text-base sm:text-xl font-light text-white">25%</div>
                  </div>
                </div>
              </div>

              <div className="absolute w-full h-full pointer-events-none">
                <div className="absolute top-[20%] right-[30%] w-2 h-2 bg-[#0096FF] rounded-full opacity-60 animate-pulse" />
                <div className="absolute bottom-[30%] left-[20%] w-1.5 h-1.5 bg-[#FFBC41] rounded-full opacity-60 animate-pulse" style={{animationDelay: '0.5s'}} />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
          <span className="text-[10px] uppercase tracking-widest text-white/70">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* What We Are Section */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-[#002820] relative">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
            <div className="text-center md:text-left">
              <h2 className="text-xl sm:text-2xl md:text-4xl font-extralight text-white mb-6 sm:mb-8 leading-tight">
                We are not a trading venue.
              </h2>
              <p className="text-gray-400 font-light text-sm sm:text-base md:text-lg leading-relaxed mb-6">
                We do not offer leverage, margin trading, or speculative tools.
              </p>
              <h3 className="text-lg sm:text-xl md:text-2xl font-light text-[#0096FF] mb-4">
                We design and manage portfolios.
              </h3>
              <p className="text-gray-400 font-light text-sm sm:text-base md:text-lg leading-relaxed">
                Our approach applies formal wealth management architecture to an emerging asset class, 
                combining disciplined portfolio construction, institutional-grade infrastructure, 
                and compliance-first operations.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0096FF]/10 via-transparent to-[#B8FCBF]/10 rounded-full blur-3xl" />
              <div className="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 sm:p-8 md:p-10">
                <p className="text-lg sm:text-xl md:text-2xl font-light text-white italic text-center">
                  &ldquo;For investors who value structure over speculation.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* A Structured Approach Section */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-[#004638] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] h-[300px] sm:h-[400px] bg-[#0096FF]/5 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extralight text-white mb-6 sm:mb-8">
              A structured approach to digital assets
            </h2>
            <p className="text-gray-300 font-light text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
              Digital assets are volatile. Responsible participation requires allocation discipline, 
              risk awareness, and governance aligned with regulatory expectations.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 sm:p-8 md:p-12">
            <p className="text-gray-300 font-light text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8">
              Sagebrush Wealth constructs exposure within defined allocation bands, documented frameworks, 
              and structured rebalancing processes. Each mandate is aligned to suitability, objectives, 
              and transparent reporting standards.
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-[#0096FF]" />
                <span className="text-white font-medium text-sm sm:text-base">Clarity</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-[#B8FCBF]" />
                <span className="text-white font-medium text-sm sm:text-base">Structure</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-[#FFBC41]" />
                <span className="text-white font-medium text-sm sm:text-base">Oversight</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Sagebrush Wealth Section */}
      <section id="why" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-[#002820]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-[#0096FF] text-xs sm:text-sm font-semibold tracking-widest uppercase mb-4">Why Sagebrush Wealth</h2>
            <h3 className="text-2xl sm:text-3xl md:text-5xl font-extralight text-white">
              Built on principle, not promise.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="animate-card group bg-[#004638] p-6 sm:p-8 md:p-10 border border-white/5 rounded-lg hover:bg-white/5 relative overflow-hidden transition-all duration-500">
              <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-[#0096FF]/10 rounded-full blur-3xl -mr-12 sm:-mr-16 -mt-12 sm:-mt-16 transition-all group-hover:bg-[#0096FF]/20" />
              <div className="relative z-10">
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full border border-[#0096FF]/30 flex items-center justify-center text-[#0096FF] mb-4 sm:mb-6">
                  <svg className="w-5 sm:w-6 h-5 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h4 className="text-lg sm:text-xl md:text-2xl font-medium text-white mb-3 sm:mb-4">Structure over speculation</h4>
                <p className="text-gray-400 font-light leading-relaxed text-xs sm:text-sm md:text-base">
                  Exposure is built through defined allocation frameworks rather than reactive trading decisions.
                </p>
              </div>
            </div>

            <div className="animate-card group bg-[#004638] p-6 sm:p-8 md:p-10 border border-white/5 rounded-lg hover:bg-white/5 relative overflow-hidden transition-all duration-500">
              <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-[#B8FCBF]/10 rounded-full blur-3xl -mr-12 sm:-mr-16 -mt-12 sm:-mt-16 transition-all group-hover:bg-[#B8FCBF]/20" />
              <div className="relative z-10">
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full border border-[#B8FCBF]/30 flex items-center justify-center text-[#B8FCBF] mb-4 sm:mb-6">
                  <svg className="w-5 sm:w-6 h-5 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h4 className="text-lg sm:text-xl md:text-2xl font-medium text-white mb-3 sm:mb-4">Risk-aware by design</h4>
                <p className="text-gray-400 font-light leading-relaxed text-xs sm:text-sm md:text-base">
                  Portfolio-level risk profiling, volatility awareness, and structured rebalancing are embedded across all solutions.
                </p>
              </div>
            </div>

            <div className="animate-card group bg-[#004638] p-6 sm:p-8 md:p-10 border border-white/5 rounded-lg hover:bg-white/5 relative overflow-hidden transition-all duration-500">
              <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-[#FFBC41]/10 rounded-full blur-3xl -mr-12 sm:-mr-16 -mt-12 sm:-mt-16 transition-all group-hover:bg-[#FFBC41]/20" />
              <div className="relative z-10">
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full border border-[#FFBC41]/30 flex items-center justify-center text-[#FFBC41] mb-4 sm:mb-6">
                  <svg className="w-5 sm:w-6 h-5 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h4 className="text-lg sm:text-xl md:text-2xl font-medium text-white mb-3 sm:mb-4">Institutional architecture</h4>
                <p className="text-gray-400 font-light leading-relaxed text-xs sm:text-sm md:text-base">
                  Secure custody workflows, segregation of client assets, and audit-ready controls underpin every relationship.
                </p>
              </div>
            </div>

            <div className="animate-card group bg-[#004638] p-6 sm:p-8 md:p-10 border border-white/5 rounded-lg hover:bg-white/5 relative overflow-hidden transition-all duration-500">
              <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-[#FB5A30]/10 rounded-full blur-3xl -mr-12 sm:-mr-16 -mt-12 sm:-mt-16 transition-all group-hover:bg-[#FB5A30]/20" />
              <div className="relative z-10">
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full border border-[#FB5A30]/30 flex items-center justify-center text-[#FB5A30] mb-4 sm:mb-6">
                  <svg className="w-5 sm:w-6 h-5 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h4 className="text-lg sm:text-xl md:text-2xl font-medium text-white mb-3 sm:mb-4">Governance-first operations</h4>
                <p className="text-gray-400 font-light leading-relaxed text-xs sm:text-sm md:text-base">
                  Compliance-led product design and documented oversight processes shape onboarding, management, and reporting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-[#004638] relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-[#0096FF] text-xs sm:text-sm font-semibold tracking-widest uppercase mb-4">Solutions</h2>
            <h3 className="text-2xl sm:text-3xl md:text-5xl font-extralight text-white mb-4 sm:mb-6">
              Structured digital asset portfolios
            </h3>
            <p className="text-gray-400 font-light text-sm sm:text-base md:text-lg max-w-3xl mx-auto px-2">
              Our solutions are designed around two distinct paths: structured autonomy or delegated oversight. 
              Each path aligns exposure with suitability, objectives, and governance expectations.
            </p>
          </div>

          <div className="mb-12 sm:mb-16">
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full border border-[#0096FF]/30 flex items-center justify-center text-[#0096FF]">
                <svg className="w-5 sm:w-6 h-5 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-light text-[#0096FF]">Structured Autonomy</h3>
            </div>
            <p className="text-gray-400 font-light text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-3xl text-center sm:text-left">
              For clients who prefer decision-making control within a regulated and risk-aware framework.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <div className="animate-card bg-[#002820] border border-white/5 rounded-xl p-4 sm:p-6 md:p-8 hover:border-[#0096FF]/30 transition-all duration-300">
                <h4 className="text-lg sm:text-xl font-medium text-white mb-3 sm:mb-4">Simple Earn</h4>
                <p className="text-gray-400 font-light text-xs sm:text-sm mb-4 sm:mb-6">
                  A defined product structure designed to pursue yield on eligible digital assets, 
                  supported by transparent terms and operational controls.
                </p>
                <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#0096FF] rounded-full mt-1.5 sm:mt-2 flex-shrink-0" />
                    <span>Clear product mechanics and disclosures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#0096FF] rounded-full mt-1.5 sm:mt-2 flex-shrink-0" />
                    <span>Eligibility subject to suitability and regulatory conditions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#0096FF] rounded-full mt-1.5 sm:mt-2 flex-shrink-0" />
                    <span>Defined operational workflows</span>
                  </li>
                </ul>
              </div>

              <div className="animate-card bg-[#002820] border border-white/5 rounded-xl p-4 sm:p-6 md:p-8 hover:border-[#B8FCBF]/30 transition-all duration-300">
                <h4 className="text-lg sm:text-xl font-medium text-white mb-3 sm:mb-4">Staking</h4>
                <p className="text-gray-400 font-light text-xs sm:text-sm mb-4 sm:mb-6">
                  Protocol-level participation delivered through controlled workflows and governance oversight.
                </p>
                <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#B8FCBF] rounded-full mt-1.5 sm:mt-2 flex-shrink-0" />
                    <span>Clarity on lock-up conditions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#B8FCBF] rounded-full mt-1.5 sm:mt-2 flex-shrink-0" />
                    <span>Disclosure of slashing and network risks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#B8FCBF] rounded-full mt-1.5 sm:mt-2 flex-shrink-0" />
                    <span>Suitability-aligned access</span>
                  </li>
                </ul>
              </div>

              <div className="animate-card bg-[#002820] border border-white/5 rounded-xl p-4 sm:p-6 md:p-8 hover:border-[#FFBC41]/30 transition-all duration-300">
                <h4 className="text-lg sm:text-xl font-medium text-white mb-3 sm:mb-4">Auto-Invest</h4>
                <p className="text-gray-400 font-light text-xs sm:text-sm mb-4 sm:mb-6">
                  Disciplined accumulation through automated allocations designed to reduce behavioural bias and timing risk.
                </p>
                <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#FFBC41] rounded-full mt-1.5 sm:mt-2 flex-shrink-0" />
                    <span>Scheduled recurring allocations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#FFBC41] rounded-full mt-1.5 sm:mt-2 flex-shrink-0" />
                    <span>Adjustable cadence and asset selection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#FFBC41] rounded-full mt-1.5 sm:mt-2 flex-shrink-0" />
                    <span>Long-term exposure discipline</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-[#002820]/50 border border-white/5 rounded-2xl p-4 sm:p-8 md:p-12">
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full border border-[#FFBC41]/30 flex items-center justify-center text-[#FFBC41]">
                <svg className="w-5 sm:w-6 h-5 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-light text-[#FFBC41]">Delegated Mandates</h3>
            </div>
            <p className="text-gray-400 font-light text-sm sm:text-base md:text-lg mb-6 sm:mb-8 text-center sm:text-left">
              For clients who prefer professional oversight and documented portfolio governance. 
              Delegated strategies operate within defined allocation frameworks and are monitored continuously.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="animate-card bg-[#004638] border border-white/5 rounded-xl p-4 sm:p-6 md:p-8">
                <h4 className="text-lg sm:text-xl font-medium text-white mb-3 sm:mb-4">Diversification Portfolios</h4>
                <p className="text-gray-400 font-light text-xs sm:text-sm mb-4 sm:mb-6">
                  Multi-asset allocations constructed within defined risk parameters.
                </p>
                <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#FFBC41] rounded-full mt-1.5 sm:mt-2 flex-shrink-0" />
                    <span>Allocation bands aligned to client profiles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#FFBC41] rounded-full mt-1.5 sm:mt-2 flex-shrink-0" />
                    <span>Diversification discipline</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#FFBC41] rounded-full mt-1.5 sm:mt-2 flex-shrink-0" />
                    <span>Structured rebalancing</span>
                  </li>
                </ul>
              </div>

              <div className="animate-card bg-[#004638] border border-white/5 rounded-xl p-4 sm:p-6 md:p-8">
                <h4 className="text-lg sm:text-xl font-medium text-white mb-3 sm:mb-4">Conservative Allocation Strategy</h4>
                <p className="text-gray-400 font-light text-xs sm:text-sm mb-4 sm:mb-6">
                  A volatility-aware approach prioritising capital preservation as an objective.
                </p>
                <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#B8FCBF] rounded-full mt-1.5 sm:mt-2 flex-shrink-0" />
                    <span>Lower concentration exposure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#B8FCBF] rounded-full mt-1.5 sm:mt-2 flex-shrink-0" />
                    <span>Governance-led portfolio construction</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#B8FCBF] rounded-full mt-1.5 sm:mt-2 flex-shrink-0" />
                    <span>Defined risk ceilings</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Approach Section */}
      <section id="approach" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-[#002820] relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-[#0096FF]/5 rounded-full blur-[80px] sm:blur-[120px] -translate-y-1/2 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-[#0096FF] text-xs sm:text-sm font-semibold tracking-widest uppercase mb-4">Investment Approach</h2>
            <h3 className="text-2xl sm:text-3xl md:text-5xl font-extralight text-white mb-4 sm:mb-6">
              Portfolio construction, formalised
            </h3>
            <p className="text-gray-400 font-light text-sm sm:text-base md:text-lg max-w-3xl mx-auto px-2">
              Our methodology reflects established wealth management standards adapted to digital assets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[
              { title: 'Objective-led design', desc: 'Each mandate begins with defined objectives, constraints, and suitability parameters.', color: '#0096FF' },
              { title: 'Defined allocation bands', desc: 'Exposure is constructed within predetermined ranges aligned to risk profiles.', color: '#B8FCBF' },
              { title: 'Diversification discipline', desc: 'Concentration risk is managed through structured allocation principles.', color: '#FFBC41' },
              { title: 'Risk ceilings', desc: 'Portfolios operate within documented volatility and exposure thresholds.', color: '#FB5A30' },
              { title: 'Structured rebalancing', desc: 'Adjustments follow defined processes rather than market sentiment.', color: '#0096FF' },
              { title: 'Transparency', desc: 'Clients understand their allocation, reporting framework, and risk profile.', color: '#B8FCBF' },
            ].map((item, index) => (
              <div key={index} className="approach-item bg-[#004638] border border-white/5 rounded-xl p-4 sm:p-6 md:p-8 hover:border-white/10 transition-all duration-300">
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm"
                    style={{ backgroundColor: `${item.color}20`, border: `1px solid ${item.color}30` }}>
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h4 className="text-base sm:text-lg font-medium text-white">{item.title}</h4>
                </div>
                <p className="text-gray-400 font-light text-xs sm:text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 sm:mt-16 text-center">
            <p className="text-lg sm:text-xl md:text-2xl font-light text-white italic">
              &ldquo;Risk cannot be eliminated. It can be structured, monitored, and governed.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Risk Management Section - Unconventional Design */}
      <section className="py-20 sm:py-28 md:py-40 px-4 sm:px-6 bg-[#002820] relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] bg-[#FB5A30]/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-[#B8FCBF]/5 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-16 sm:mb-20">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#FB5A30]/10 border border-[#FB5A30]/20 text-[#FB5A30] text-xs font-medium tracking-widest uppercase mb-6">
              Risk Management
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight text-white leading-tight">
              Risk cannot be eliminated.<br />
              <span className="text-gray-400">It can be structured, monitored, and governed.</span>
            </h2>
          </div>

          {/* Risk Dimensions - Horizontal Cards */}
          <div className="mb-16 sm:mb-20">
            <h3 className="text-center text-sm text-gray-500 uppercase tracking-widest mb-8">Risk Dimensions</h3>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {[
                { label: 'Market Volatility', icon: '📊' },
                { label: 'Liquidity Constraints', icon: '💧' },
                { label: 'Custody Risk', icon: '🔐' },
                { label: 'Counterparty Exposure', icon: '🤝' },
                { label: 'Protocol Risk', icon: '⚙️' }
              ].map((risk, index) => (
                <div 
                  key={index}
                  className="group relative px-5 sm:px-6 py-3 sm:py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full hover:border-[#FB5A30]/50 hover:bg-[#FB5A30]/10 transition-all duration-300 cursor-default"
                >
                  <span className="text-sm sm:text-base text-gray-300 group-hover:text-white transition-colors">{risk.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Framework - Clean Split Design */}
          <div className="relative">
            {/* Center Divider */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent hidden lg:block" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
              {/* Left: Our Approach */}
              <div className="relative">
                <div className="lg:pr-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-[#B8FCBF]/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#B8FCBF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h4 className="text-xl sm:text-2xl font-light text-white">Our Framework</h4>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { title: 'Portfolio-level risk profiling', desc: 'Continuous assessment aligned to your objectives' },
                      { title: 'Conservative product design', desc: 'Risk-aware structures where appropriate' },
                      { title: 'Operational controls', desc: 'Supporting regulatory oversight at every level' }
                    ].map((item, index) => (
                      <div key={index} className="group p-4 rounded-lg border border-white/5 hover:border-[#B8FCBF]/30 hover:bg-white/5 transition-all duration-300">
                        <h5 className="text-white font-medium mb-1 group-hover:text-[#B8FCBF] transition-colors">{item.title}</h5>
                        <p className="text-sm text-gray-500">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Visual Element */}
              <div className="relative flex items-center justify-center">
                <div className="relative w-full max-w-sm aspect-square">
                  {/* Outer Ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-white/10 animate-[spin_30s_linear_infinite]" />
                  
                  {/* Middle Ring */}
                  <div className="absolute inset-8 rounded-full border border-[#B8FCBF]/20 animate-[spin_20s_linear_infinite_reverse]" />
                  
                  {/* Inner Ring */}
                  <div className="absolute inset-16 rounded-full border border-[#FB5A30]/20 animate-[spin_15s_linear_infinite]" />
                  
                  {/* Center Core */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#B8FCBF]/20 to-[#FB5A30]/20 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#B8FCBF] to-[#B8FCBF]/50 flex items-center justify-center shadow-[0_0_30px_rgba(184,252,191,0.3)]">
                        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#002820]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Floating Labels */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#002820]/80 backdrop-blur-sm rounded-full border border-white/10 text-xs text-gray-400">
                    Monitor
                  </div>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#002820]/80 backdrop-blur-sm rounded-full border border-white/10 text-xs text-gray-400">
                    Govern
                  </div>
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 px-3 py-1 bg-[#002820]/80 backdrop-blur-sm rounded-full border border-white/10 text-xs text-gray-400">
                    Structure
                  </div>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 px-3 py-1 bg-[#002820]/80 backdrop-blur-sm rounded-full border border-white/10 text-xs text-gray-400">
                    Protect
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform & Governance Section - Unconventional Design */}
      <section id="platform" className="py-20 sm:py-28 md:py-40 px-4 sm:px-6 relative overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#004638] via-[#002820] to-[#004638]">
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(0,150,255,0.1) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, rgba(184,252,191,0.1) 0%, transparent 50%),
                             radial-gradient(circle at 50% 50%, rgba(255,188,65,0.05) 0%, transparent 50%)`
          }} />
        </div>

        {/* Animated Grid Lines */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute left-1/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#0096FF] to-transparent animate-pulse" />
          <div className="absolute left-2/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#B8FCBF] to-transparent animate-pulse" style={{animationDelay: '0.5s'}} />
          <div className="absolute left-3/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#FFBC41] to-transparent animate-pulse" style={{animationDelay: '1s'}} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Hero Header */}
          <div className="text-center mb-16 md:mb-24">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0096FF]/10 border border-[#0096FF]/20 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#0096FF] animate-pulse" />
              <span className="text-[#0096FF] text-xs font-medium tracking-widest uppercase">Platform & Governance</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extralight text-white leading-tight">
              Institutional Architecture
            </h2>
          </div>

          {/* Main Platform Features - Hexagonal Grid Layout */}
          <div className="mb-16 md:mb-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {/* Left Column - Platform Features */}
              <div className="space-y-4 md:space-y-6">
                <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 hover:border-[#0096FF]/50 hover:bg-white/10 transition-all duration-500">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0096FF]/20 to-[#0096FF]/5 border border-[#0096FF]/30 flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#0096FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <h3 className="text-lg md:text-xl font-medium text-white">Secure Custody</h3>
                  </div>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                    Enterprise-grade custody workflows with multi-layer security protocols and cold storage solutions.
                  </p>
                </div>

                <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 hover:border-[#B8FCBF]/50 hover:bg-white/10 transition-all duration-500">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#B8FCBF]/20 to-[#B8FCBF]/5 border border-[#B8FCBF]/30 flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#B8FCBF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 className="text-lg md:text-xl font-medium text-white">Asset Segregation</h3>
                  </div>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                    Complete separation of client assets with independent verification and transparent reporting.
                  </p>
                </div>
              </div>

              {/* Center Column - Central Hub */}
              <div className="relative flex items-center justify-center py-8 md:py-0">
                <div className="relative w-full max-w-sm aspect-square">
                  {/* Outer rotating ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-white/10 animate-[spin_30s_linear_infinite]">
                    {/* Orbital nodes */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#0096FF] shadow-[0_0_15px_rgba(0,150,255,0.5)]" />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 rounded-full bg-[#B8FCBF] shadow-[0_0_15px_rgba(184,252,191,0.5)]" />
                    <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#FFBC41] shadow-[0_0_15px_rgba(255,188,65,0.5)]" />
                    <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#FB5A30] shadow-[0_0_15px_rgba(251,90,48,0.5)]" />
                  </div>

                  {/* Middle rotating ring */}
                  <div className="absolute inset-8 rounded-full border border-[#0096FF]/20 animate-[spin_20s_linear_infinite_reverse]" />

                  {/* Inner rotating ring */}
                  <div className="absolute inset-16 rounded-full border border-[#B8FCBF]/20 animate-[spin_15s_linear_infinite]" />

                  {/* Center core */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      {/* Glow effect */}
                      <div className="absolute inset-0 rounded-2xl bg-[#0096FF]/20 blur-xl" />
                      
                      {/* Main icon container */}
                      <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-[0_0_40px_rgba(0,150,255,0.2)]">
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-[#0096FF] to-[#0096FF]/50 flex items-center justify-center">
                          <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          </svg>
                        </div>
                      </div>

                      {/* Status indicator */}
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-[#002820]/90 backdrop-blur-sm rounded-full border border-white/10">
                        <div className="w-2 h-2 rounded-full bg-[#B8FCBF] animate-pulse" />
                        <span className="text-xs text-gray-400">Vault Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Platform Features */}
              <div className="space-y-4 md:space-y-6">
                <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 hover:border-[#FFBC41]/50 hover:bg-white/10 transition-all duration-500">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FFBC41]/20 to-[#FFBC41]/5 border border-[#FFBC41]/30 flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#FFBC41]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                      </svg>
                    </div>
                    <h3 className="text-lg md:text-xl font-medium text-white">Audit Trails</h3>
                  </div>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                    Comprehensive transaction monitoring and immutable audit logs for complete transparency.
                  </p>
                </div>

                <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 hover:border-[#FB5A30]/50 hover:bg-white/10 transition-all duration-500">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FB5A30]/20 to-[#FB5A30]/5 border border-[#FB5A30]/30 flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#FB5A30]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg md:text-xl font-medium text-white">Access Controls</h3>
                  </div>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                    Role-based permissions and multi-factor authentication for authorized operations.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Platform Capabilities - Horizontal Cards */}
          <div className="mb-16 md:mb-24">
            <h3 className="text-center text-sm text-gray-500 uppercase tracking-widest mb-8">Platform Capabilities</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {[
                { label: 'Vendor Due Diligence', icon: '🔍' },
                { label: 'Incident Response', icon: '🛡️' },
                { label: 'Counterparty Review', icon: '🤝' },
                { label: 'Operational Resilience', icon: '⚡' }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="group p-4 md:p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-center hover:border-[#0096FF]/30 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="text-2xl md:text-3xl mb-2">{item.icon}</div>
                  <span className="text-xs md:text-sm text-gray-300 group-hover:text-white transition-colors">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Regulatory Section - Split Design */}
          <div className="relative">
            {/* Decorative connector */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
              {/* Left: Regulatory Framework */}
              <div className="relative">
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 md:p-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FFBC41]/20 to-[#FFBC41]/5 border border-[#FFBC41]/30 flex items-center justify-center">
                      <svg className="w-7 h-7 text-[#FFBC41]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xl md:text-2xl font-light text-white">Regulatory Alignment</h4>
                      <p className="text-gray-500 text-sm">Dubai World Trade Centre Authority</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-400 font-light leading-relaxed mb-8">
                    Sagebrush Wealth is incorporated in Dubai World Trade Centre and operates within 
                    Dubai&apos;s Virtual Assets Regulatory Authority framework.
                  </p>

                  <div className="space-y-4">
                    <h5 className="text-sm text-gray-500 uppercase tracking-wider">Standards Inform:</h5>
                    <div className="grid grid-cols-2 gap-3">
                      {['Product Design', 'Client Categorisation', 'Suitability Assessment', 'Risk Disclosures', 'Operational Oversight'].map((item, index) => (
                        <div key={index} className="flex items-center gap-2 text-gray-300 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#FFBC41]" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Governance Philosophy */}
              <div className="relative flex flex-col justify-center">
                <div className="text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#B8FCBF]/10 border border-[#B8FCBF]/20 mb-6">
                    <svg className="w-4 h-4 text-[#B8FCBF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[#B8FCBF] text-xs font-medium tracking-widest uppercase">Governance First</span>
                  </div>
                  
                  <blockquote className="text-2xl md:text-3xl lg:text-4xl font-extralight text-white leading-tight mb-6">
                    &ldquo;Governance is integral to our operating model, not a marketing feature.&rdquo;
                  </blockquote>
                  
                  <p className="text-gray-400 font-light text-base md:text-lg leading-relaxed mb-8">
                    Infrastructure exists to support governance and transparency. Every decision, process, 
                    and control is documented and aligned with regulatory expectations.
                  </p>

                  {/* Trust indicators */}
                  <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                    <div className="flex items-center gap-2 text-gray-400">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                        <svg className="w-4 h-4 text-[#0096FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <span className="text-sm">Compliant</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                        <svg className="w-4 h-4 text-[#B8FCBF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                      <span className="text-sm">Transparent</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                        <svg className="w-4 h-4 text-[#FFBC41]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <span className="text-sm">Documented</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Serve Section */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-[#004638]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-[#0096FF] text-xs sm:text-sm font-semibold tracking-widest uppercase mb-4">Who We Serve</h2>
            <h3 className="text-2xl sm:text-3xl md:text-5xl font-extralight text-white">
              Tailored for every tier of investor.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="animate-card group bg-[#002820] p-6 sm:p-8 md:p-10 border border-white/5 rounded-lg hover:bg-white/5 relative overflow-hidden transition-all duration-500">
              <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-[#0096FF]/10 rounded-full blur-3xl -mr-12 sm:-mr-16 -mt-12 sm:-mt-16 transition-all group-hover:bg-[#0096FF]/20" />
              <h4 className="text-lg sm:text-xl md:text-2xl font-medium text-white mb-3 sm:mb-4 relative z-10">Private Investors</h4>
              <p className="text-gray-400 font-light leading-relaxed text-xs sm:text-sm md:text-base relative z-10">
                Individuals seeking structured digital asset exposure aligned with wealth management principles.
              </p>
            </div>

            <div className="animate-card group bg-[#002820] p-6 sm:p-8 md:p-10 border border-white/5 rounded-lg hover:bg-white/5 relative overflow-hidden transition-all duration-500">
              <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-[#B8FCBF]/10 rounded-full blur-3xl -mr-12 sm:-mr-16 -mt-12 sm:-mt-16 transition-all group-hover:bg-[#B8FCBF]/20" />
              <h4 className="text-lg sm:text-xl md:text-2xl font-medium text-white mb-3 sm:mb-4 relative z-10">Professional Investors</h4>
              <p className="text-gray-400 font-light leading-relaxed text-xs sm:text-sm md:text-base relative z-10">
                Experienced investors requiring disciplined portfolio construction and governance-led execution.
              </p>
            </div>

            <div className="animate-card group bg-[#002820] p-6 sm:p-8 md:p-10 border border-white/5 rounded-lg hover:bg-white/5 relative overflow-hidden transition-all duration-500">
              <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-[#FFBC41]/10 rounded-full blur-3xl -mr-12 sm:-mr-16 -mt-12 sm:-mt-16 transition-all group-hover:bg-[#FFBC41]/20" />
              <h4 className="text-lg sm:text-xl md:text-2xl font-medium text-white mb-3 sm:mb-4 relative z-10">Institutional Clients</h4>
              <p className="text-gray-400 font-light leading-relaxed text-xs sm:text-sm md:text-base relative z-10">
                Family offices, corporate treasuries, and investment entities requiring compliant digital asset mandates.
              </p>
            </div>
          </div>

          <div className="mt-8 sm:mt-12 text-center">
            <button 
              onClick={() => setConsultationOpen(true)}
              className="inline-flex items-center gap-2 text-[#0096FF] hover:text-white transition-colors duration-300 text-sm sm:text-base"
            >
              <span>Request institutional briefing</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Insights Section - Redesigned */}
      <section id='insights' className="py-20 sm:py-28 md:py-40 px-4 sm:px-6 bg-[#002820] relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#0096FF]/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] bg-[#B8FCBF]/10 rounded-full blur-[80px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0096FF]/10 border border-[#0096FF]/20 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#0096FF] animate-pulse" />
              <span className="text-[#0096FF] text-xs font-medium tracking-widest uppercase">Insights & Research</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight text-white mb-4 sm:mb-6">
              Measured Perspectives
            </h2>
            <p className="text-gray-400 font-light text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              In-depth analysis on digital asset markets, portfolio construction, risk management, and regulatory developments.
            </p>
          </div>

          {/* Featured Blog Posts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {/* Main Featured Post */}
            <div 
              className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden cursor-pointer hover:border-[#0096FF]/50 transition-all duration-500"
              onClick={() => router.push(`/blog/${blogPosts[0].slug}`)}
            >
              <div className="relative h-64 sm:h-72 md:h-80 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${blogPosts[0].image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#002820] via-[#002820]/50 to-transparent" />
              </div>
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-[#0096FF]/20 border border-[#0096FF]/30 rounded-full text-[#0096FF] text-xs font-medium">
                    Featured
                  </span>
                  <span className="text-gray-500 text-xs">{blogPosts[0].readTime}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-light text-white mb-3 group-hover:text-[#0096FF] transition-colors duration-300">
                  {blogPosts[0].title}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                  {blogPosts[0].excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0096FF] to-[#0096FF]/50 flex items-center justify-center text-white text-xs font-medium">
                      {blogPosts[0].author.split(' ').map((n: string) => n[0]).join('')}
                    </div>
                    <span className="text-gray-500 text-sm">{blogPosts[0].author}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#0096FF] group-hover:translate-x-2 transition-transform duration-300">
                    <span className="text-sm">Read</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Posts */}
            <div className="space-y-4 sm:space-y-6">
              {blogPosts.slice(1, 4).map((post) => (
                <div 
                  key={post.id}
                  className="group flex gap-4 sm:gap-6 p-4 sm:p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl cursor-pointer hover:border-[#0096FF]/30 hover:bg-white/10 transition-all duration-300"
                  onClick={() => router.push(`/blog/${post.slug}`)}
                >
                  {/* Image */}
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex-shrink-0 rounded-xl overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url(${post.image})` }}
                    />
                  </div>
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[#0096FF] text-xs font-medium">{post.category}</span>
                      <span className="text-gray-600 text-xs">•</span>
                      <span className="text-gray-500 text-xs">{post.readTime}</span>
                    </div>
                    <h4 className="text-base sm:text-lg font-medium text-white mb-2 group-hover:text-[#0096FF] transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="text-gray-500 text-xs sm:text-sm line-clamp-2 hidden sm:block">
                      {post.excerpt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Topics & CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8 pt-8 sm:pt-12 border-t border-white/5">
            {/* Topics */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
              <span className="text-gray-500 text-sm">Topics:</span>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                {['Market Structure', 'Portfolio', 'Risk Management', 'Regulatory'].map((topic) => (
                  <span key={topic} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 border border-white/10 rounded-full text-xs sm:text-sm text-gray-300">
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <button 
                onClick={() => router.push('/blog')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-[#0096FF] text-white font-medium rounded-full hover:bg-[#0096FF]/90 transition-all duration-300 shadow-[0_0_20px_rgba(0,150,255,0.3)] text-sm"
              >
                View All Articles
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <button 
                onClick={() => setSubscribeOpen(true)}
                className="w-full sm:w-auto px-6 py-3 border border-white/20 text-white font-light rounded-full hover:bg-white/5 transition-all duration-300 text-sm"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-[#004638]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-[#0096FF] text-xs sm:text-sm font-semibold tracking-widest uppercase mb-4">FAQ</h2>
            <h3 className="text-2xl sm:text-3xl md:text-5xl font-extralight text-white">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {[
              { q: 'Are you an exchange?', a: 'No. Sagebrush Wealth does not operate a trading venue or offer leverage, margin trading, or order book execution services. We provide structured digital asset wealth management solutions.' },
              { q: 'Do you guarantee returns?', a: 'No. Digital assets are volatile and may experience significant price fluctuations. Capital preservation may be an objective within certain strategies but is not guaranteed.' },
              { q: 'How is risk managed?', a: 'Through suitability alignment, allocation discipline, structured rebalancing, operational controls, and transparent risk disclosures.' },
              { q: 'Who can access your solutions?', a: 'Solutions are available to retail, professional, and institutional clients, subject to regulatory classification, eligibility, and suitability assessment.' }
            ].map((faq, index) => (
              <div key={index} className="faq-item bg-[#002820] border border-white/5 rounded-xl p-4 sm:p-6 md:p-8">
                <h4 className="text-base sm:text-lg md:text-xl font-medium text-white mb-2 sm:mb-4">{faq.q}</h4>
                <p className="text-gray-400 font-light text-xs sm:text-sm md:text-base">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="contact" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-[#002820] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] h-[300px] sm:h-[400px] bg-[#B8FCBF]/5 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extralight text-white mb-6 sm:mb-8 leading-tight">
            Digital Asset Investing,<br />
            Built Like Wealth Management.
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 font-light mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto">
            Experience the discipline of traditional finance with the growth potential of digital assets.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <button 
              onClick={() => setConsultationOpen(true)}
              className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-[#B8FCBF] text-[#002820] font-semibold rounded-full hover:bg-white transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_rgba(184,252,191,0.2)] text-sm sm:text-base"
            >
              Get Started
            </button>
            <button 
              onClick={() => setConsultationOpen(true)}
              className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 border border-white/20 text-white font-light rounded-full hover:bg-white/5 transition-all duration-300 text-sm sm:text-base"
            >
              Request a Private Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#002820] relative pt-12 sm:pt-16 md:pt-24 pb-6 sm:pb-8 md:pb-12 overflow-hidden border-t border-white/5">
        <div className="w-full overflow-hidden mb-8 sm:mb-12 md:mb-20 opacity-50">
          <div className="whitespace-nowrap flex gap-4 sm:gap-8 md:gap-12 animate-scroll-left">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="text-2xl sm:text-4xl md:text-6xl lg:text-8xl font-extralight text-white/20 uppercase tracking-tighter">
                Sagebrush Wealth •
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 relative">
          <div className="md:col-span-8 text-center md:text-left mb-6 sm:mb-8 md:mb-0">
            <h3 className="text-2xl sm:text-3xl md:text-6xl lg:text-7xl font-extralight text-white leading-[1.2] tracking-tight">
              Unit 05.36,<br />
              The Convention Tower,<br />
              <span className="text-[#0096FF] font-normal">Dubai World Trade Centre</span>
            </h3>
            <div className="mt-6 sm:mt-8 flex flex-col md:flex-row gap-2 text-gray-500 font-light text-xs sm:text-sm justify-center md:justify-start">
              <p>Dubai, United Arab Emirates</p>
              <span className="hidden md:inline">•</span>
              <p>info@sagebrushwealth.com</p>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col justify-between items-center md:items-end border-t md:border-t-0 pt-6 sm:pt-8 md:pt-0 md:pl-12 border-white/10">
            <div className="space-y-4 sm:space-y-6 text-center md:text-right mb-6 sm:mb-8">
              <p className="text-[#0096FF] text-xs tracking-widest uppercase font-semibold mb-4">Navigation</p>
              <div className="flex flex-col space-y-2 sm:space-y-3 items-center md:items-end">
                <button onClick={() => scrollToSectionDirect('why')} className="text-base sm:text-lg md:text-xl text-gray-400 hover:text-white transition-all duration-300">Why Us</button>
                <button onClick={() => scrollToSectionDirect('solutions')} className="text-base sm:text-lg md:text-xl text-gray-400 hover:text-white transition-all duration-300">Solutions</button>
                <button onClick={() => scrollToSectionDirect('approach')} className="text-base sm:text-lg md:text-xl text-gray-400 hover:text-white transition-all duration-300">Approach</button>
                <button onClick={() => scrollToSectionDirect('platform')} className="text-base sm:text-lg md:text-xl text-gray-400 hover:text-white transition-all duration-300">Platform</button>
                <button onClick={() => scrollToSectionDirect('insights')} className="text-base sm:text-lg md:text-xl text-gray-400 hover:text-white transition-all duration-300">Insights</button>
                <button onClick={() => scrollToSectionDirect('faq')} className="text-base sm:text-lg md:text-xl text-gray-400 hover:text-white transition-all duration-300">FAQ</button>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end gap-4">
              <div className="flex gap-4">
                <a href="https://x.com/sagebrushwealth?s=21&t=m9FiSeD3085lXLWHm5U7-A" target='blank' className="w-8 sm:w-10 h-8 sm:h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:bg-white hover:text-[#002820] transition-all duration-300">
                  <svg className="w-3 sm:w-4 h-3 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/company/sagebrush-wealth/
" target='blank' className="w-8 sm:w-10 h-8 sm:h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:bg-white hover:text-[#002820] transition-all duration-300">
                  <svg className="w-3 sm:w-4 h-3 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a 
  href="https://www.instagram.com/sagebrushwealth?igsh=MWQxbzExN2xlbng3cQ%3D%3D&utm_source=qr
" target='blank'
  className="w-8 sm:w-10 h-8 sm:h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:bg-white hover:text-[#002820] transition-all duration-300"
>
  <svg 
    className="w-3 sm:w-4 h-3 sm:h-4" 
    fill="currentColor" 
    viewBox="0 0 24 24"
  >
    <path d="M7.75 2C4.57 2 2 4.57 2 7.75v8.5C2 19.43 4.57 22 7.75 22h8.5C19.43 22 22 19.43 22 16.25v-8.5C22 4.57 19.43 2 16.25 2h-8.5zm0 2h8.5C18.32 4 20 5.68 20 7.75v8.5c0 2.07-1.68 3.75-3.75 3.75h-8.5C5.68 20 4 18.32 4 16.25v-8.5C4 5.68 5.68 4 7.75 4zm8.75 1.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/>
  </svg>
</a>

              </div>
              <div className="text-[10px] sm:text-xs text-gray-600 font-light tracking-wide mt-4">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <span className="mx-2">/</span>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>

        {/* Risk Notice - Prominent & Clear */}
        <div className="mt-8 sm:mt-12 md:mt-16 px-4 sm:px-6 max-w-7xl mx-auto">
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

        <div className="mt-6 sm:mt-8 border-t border-white/5 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center px-4 sm:px-6 max-w-7xl mx-auto text-gray-600 text-xs font-light text-center md:text-left">
          <p>© 2025 Sagebrush Wealth FZE. All rights reserved.</p>
        </div>
      </footer>

      {/* Subscribe Popup */}
      <Dialog open={subscribeOpen} onOpenChange={setSubscribeOpen}>
        <DialogContent className="bg-gradient-to-br from-[#002820] to-[#004638] border border-white/10 text-white max-w-md w-[95vw] sm:w-full overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#0096FF]/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#FFBC41]/20 rounded-full blur-3xl" />
          </div>
          
          <div className="relative z-10">
            {!subscribeSubmitted ? (
              <>
                <DialogHeader className="space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[#0096FF] to-[#0096FF]/50 flex items-center justify-center mb-2">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <DialogTitle className="text-2xl sm:text-3xl font-extralight text-center text-white">
                    Subscribe to Insights
                  </DialogTitle>
                  <DialogDescription className="text-center text-gray-400 text-sm sm:text-base">
                    Stay informed with our measured perspectives on digital assets, portfolio construction, and regulatory developments.
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubscribeSubmit} className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
                  <div className="relative">
                    <Label htmlFor="subscribe-email" className="sr-only">Email</Label>
                    <Input
                      id="subscribe-email"
                      type="email"
                      placeholder="Enter your email address"
                      value={subscribeEmail}
                      onChange={(e) => setSubscribeEmail(e.target.value)}
                      className="w-full bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-[#0096FF] focus:ring-[#0096FF]/20 h-12 sm:h-14 text-sm sm:text-base"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 sm:py-4 bg-gradient-to-r from-[#0096FF] to-[#0096FF]/80 text-white font-medium rounded-full hover:from-[#0096FF]/90 hover:to-[#0096FF]/70 transition-all duration-300 shadow-[0_0_20px_rgba(0,150,255,0.3)] hover:shadow-[0_0_30px_rgba(0,150,255,0.5)] text-sm sm:text-base"
                  >
                    Subscribe Now
                  </button>
                </form>

                <p className="mt-4 sm:mt-6 text-[10px] sm:text-xs text-gray-500 text-center">
                  By subscribing, you agree to receive updates from Sagebrush Wealth. Unsubscribe anytime.
                </p>
              </>
            ) : (
              <div className="py-8 sm:py-12 text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-gradient-to-br from-[#B8FCBF] to-[#B8FCBF]/50 flex items-center justify-center mb-4 sm:mb-6 animate-bounce">
                  <svg className="w-8 sm:w-10 h-8 sm:h-10 text-[#002820]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-light text-white mb-2 sm:mb-4">Thank You!</h3>
                <p className="text-gray-400 text-sm sm:text-base">You&apos;ve been subscribed to our insights.</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Consultation Popup */}
      <Dialog open={consultationOpen} onOpenChange={setConsultationOpen}>
        <DialogContent className="bg-gradient-to-br from-[#002820] to-[#004638] border border-white/10 text-white max-w-lg w-[95vw] sm:w-full max-h-[90vh] overflow-y-auto">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#FFBC41]/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#B8FCBF]/20 rounded-full blur-3xl" />
          </div>
          
          <div className="relative z-10">
            {!consultationSubmitted ? (
              <>
                <DialogHeader className="space-y-3 sm:space-y-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-full bg-gradient-to-br from-[#FFBC41] to-[#FFBC41]/50 flex items-center justify-center mb-2">
                    <svg className="w-6 sm:w-8 h-6 sm:h-8 text-[#002820]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <DialogTitle className="text-2xl sm:text-3xl font-extralight text-center text-white">
                    Request a Private Consultation
                  </DialogTitle>
                  <DialogDescription className="text-center text-gray-400 text-sm sm:text-base">
                    Connect with our team to discuss your investment goals and explore how we can help.
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleConsultationSubmit} className="mt-6 sm:mt-8 space-y-4 sm:space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-gray-400 text-xs sm:text-sm mb-1.5 block">Full Name *</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Smith"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-[#FFBC41] focus:ring-[#FFBC41]/20 h-10 sm:h-12 text-sm"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-gray-400 text-xs sm:text-sm mb-1.5 block">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-[#FFBC41] focus:ring-[#FFBC41]/20 h-10 sm:h-12 text-sm"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone" className="text-gray-400 text-xs sm:text-sm mb-1.5 block">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+971 50 123 4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-[#FFBC41] focus:ring-[#FFBC41]/20 h-10 sm:h-12 text-sm"
                      />
                    </div>
                    <div>
                      <Label htmlFor="company" className="text-gray-400 text-xs sm:text-sm mb-1.5 block">Company / Organization</Label>
                      <Input
                        id="company"
                        type="text"
                        placeholder="Company Name"
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        className="w-full bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-[#FFBC41] focus:ring-[#FFBC41]/20 h-10 sm:h-12 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="investorType" className="text-gray-400 text-xs sm:text-sm mb-1.5 block">Investor Type</Label>
                    <select
                      id="investorType"
                      value={formData.investorType}
                      onChange={(e) => setFormData({...formData, investorType: e.target.value})}
                      className="w-full bg-white/5 border border-white/20 text-white rounded-md px-3 py-2.5 sm:py-3 focus:border-[#FFBC41] focus:outline-none focus:ring-[#FFBC41]/20 h-10 sm:h-12 text-sm"
                    >
                      <option value="" className="bg-[#002820]">Select investor type</option>
                      <option value="private" className="bg-[#002820]">Private Investor</option>
                      <option value="professional" className="bg-[#002820]">Professional Investor</option>
                      <option value="institutional" className="bg-[#002820]">Institutional Client</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-gray-400 text-xs sm:text-sm mb-1.5 block">How can we help you?</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your investment goals..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-[#FFBC41] focus:ring-[#FFBC41]/20 min-h-[80px] sm:min-h-[100px] resize-none text-sm"
                      rows={3}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 sm:py-4 bg-gradient-to-r from-[#FFBC41] to-[#FFBC41]/80 text-[#002820] font-semibold rounded-full hover:from-[#FFBC41]/90 hover:to-[#FFBC41]/70 transition-all duration-300 shadow-[0_0_20px_rgba(255,188,65,0.3)] hover:shadow-[0_0_30px_rgba(255,188,65,0.5)] text-sm sm:text-base"
                  >
                    Submit Consultation Request
                  </button>
                </form>

                <p className="mt-4 sm:mt-6 text-[10px] sm:text-xs text-gray-500 text-center">
                  By submitting this form, you agree to our Privacy Policy and Terms of Service.
                </p>
              </>
            ) : (
              <div className="py-8 sm:py-12 text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-gradient-to-br from-[#B8FCBF] to-[#B8FCBF]/50 flex items-center justify-center mb-4 sm:mb-6 animate-bounce">
                  <svg className="w-8 sm:w-10 h-8 sm:h-10 text-[#002820]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-light text-white mb-2 sm:mb-4">Request Received!</h3>
                <p className="text-gray-400 text-sm sm:text-base">Our team will contact you shortly to schedule your consultation.</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Global Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600&display=swap');
        
        * {
          font-family: 'Poppins', sans-serif;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        ::-webkit-scrollbar {
          width: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: #004638;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #0096FF;
          border-radius: 4px;
        }
        
        @media (max-width: 640px) {
          ::-webkit-scrollbar {
            width: 4px;
          }
        }
        
        @keyframes float-card {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes pulse-core {
          0% { box-shadow: 0 0 20px rgba(255, 188, 65, 0.2); transform: scale(1); }
          50% { box-shadow: 0 0 50px rgba(255, 188, 65, 0.5); transform: scale(1.05); }
          100% { box-shadow: 0 0 20px rgba(255, 188, 65, 0.2); transform: scale(1); }
        }
        
        @keyframes orbit-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .animate-scroll-left {
          animation: scroll-left 20s linear infinite;
        }
        
        .animate-float {
          animation: float-card 6s ease-in-out infinite;
        }
      `}</style>
    </main>
  )
}
