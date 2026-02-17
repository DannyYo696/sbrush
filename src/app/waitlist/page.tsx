'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function WaitlistPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    investorType: '',
    allocationRange: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.fullName || !formData.email || !formData.investorType) return
    
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setSubmitted(true)
    setIsSubmitting(false)
  }

  const navigateHome = () => router.push('/')

  return (
    <main className="bg-[#004638] text-white min-h-screen overflow-x-hidden selection:bg-[#0096FF] selection:text-white">
      {/* Grain Overlay */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`
        }}
      />

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-30%] right-[-20%] w-[800px] h-[800px] bg-[#0096FF]/8 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-30%] left-[-20%] w-[600px] h-[600px] bg-[#FFBC41]/8 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] left-[30%] w-[400px] h-[400px] bg-[#B8FCBF]/5 rounded-full blur-[100px]" />
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
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#B8FCBF]/10 border border-[#B8FCBF]/20 rounded-full">
              <div className="w-2 h-2 rounded-full bg-[#B8FCBF] animate-pulse" />
              <span className="text-[#B8FCBF] text-xs font-medium tracking-wider uppercase">Private Access</span>
            </div>
            
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

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center px-4 sm:px-6 py-24 sm:py-32">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            
            {/* Left Column - Content */}
            <div className="lg:col-span-6 xl:col-span-5">
              {/* Status Badge */}
              <div className="mb-8">
                <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
                  <div className="relative">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#B8FCBF]" />
                    <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-[#B8FCBF] animate-ping" />
                  </div>
                  <span className="text-white/80 text-xs font-medium tracking-[0.2em] uppercase">Founding Cohort</span>
                </div>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-extralight text-white leading-[1.15] tracking-tight mb-6">
                Digital assets,<br />
                <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFBC41] to-white">
                  managed like wealth.
                </span>
              </h1>

              {/* Introduction */}
              <p className="text-gray-400 font-light text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
                Sagebrush Wealth is preparing to launch a regulated digital asset wealth management platform in Dubai. 
                Initial onboarding will be conducted in phases.
              </p>

              <p className="text-gray-300 font-light text-sm sm:text-base leading-relaxed mb-10 max-w-xl border-l-2 border-[#0096FF]/50 pl-6">
                We are inviting a limited number of private investors to express interest in becoming part of our founding client cohort. 
                Choose portfolios that are professionally managed for you, where experts make the investment decisions based on your agreed risk level, 
                financial goals, and clear oversight rules.
              </p>

              {/* Differentiator Section */}
              <div className="mb-10">
                <h3 className="text-[#0096FF] text-xs font-semibold tracking-[0.25em] uppercase mb-6">
                  A Different Standard
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-white/[0.03] border border-white/5 rounded-xl">
                    <div className="w-10 h-10 rounded-lg bg-[#0096FF]/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-[#0096FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-medium text-sm mb-1">Not a Trading Venue</h4>
                      <p className="text-gray-300 text-sm font-light">We do not offer leverage or speculative tools.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-white/[0.03] border border-white/5 rounded-xl">
                    <div className="w-10 h-10 rounded-lg bg-[#B8FCBF]/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-[#B8FCBF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-medium text-sm mb-1">Structured Exposure</h4>
                      <p className="text-gray-300 text-sm font-light">Formal wealth management architecture applied to digital assets.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-white/[0.03] border border-white/5 rounded-xl">
                    <div className="w-10 h-10 rounded-lg bg-[#FFBC41]/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-[#FFBC41]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-medium text-sm mb-1">Governance-Led</h4>
                      <p className="text-gray-300 text-sm font-light">Disciplined portfolio construction with institutional oversight.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            
            <div className="lg:col-span-6 xl:col-span-7">
              <div className="relative">
                {/* Decorative Elements */}
                <div className="absolute -top-6 -left-6 w-24 h-24 border border-[#0096FF]/20 rounded-2xl -rotate-6" />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-[#B8FCBF]/20 rounded-2xl rotate-3" />
                <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-extralight text-white leading-[1.15] tracking-tight mb-6">
                Join Our Waitlist
                <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#B8FCBF] to-white">
                  
                </span>
              </h1>
                
                {/* Form Card */}
                <div className="relative bg-gradient-to-br from-white/8 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 overflow-hidden">
                  {/* Accent Line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#B8FCBF] to-transparent" />
                  
                  
                  {/* Content Overlay Pattern */}
                  <div className="absolute inset-0 opacity-[0.02]" style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                  }} />

                  <div className="relative z-10">
                    
                    {/* Form Header */}
                    
                    <div className="mb-8 sm:mb-10">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-1 h-8 bg-gradient-to-b from-[#0096FF] to-[#B8FCBF] rounded-full" />
                        <h2 className="text-xl sm:text-2xl font-light text-white">Request Consideration</h2>
                      </div>
                      <p className="text-white-500 text-sm font-light max-w-md">
                        Joining the waitlist is an expression of interest. Our launch phase will prioritise investors aligned with our suitability framework.
                      </p>
                    </div>

                    {!submitted ? (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Full Name */}
                        <div className="space-y-2">
                          <label htmlFor="fullName" className="text-gray-400 text-xs tracking-wider uppercase block">
                            Full Name <span className="text-[#FB5A30]">*</span>
                          </label>
                          <input
                            id="fullName"
                            type="text"
                            placeholder="Your full name"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 text-white placeholder:text-gray-300 focus:border-[#0096FF] focus:outline-none focus:ring-2 focus:ring-[#0096FF]/20 h-12 sm:h-14 text-sm sm:text-base rounded-xl transition-all duration-300 px-4"
                            required
                          />
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-gray-400 text-xs tracking-wider uppercase block">
                            Email Address <span className="text-[#FB5A30]">*</span>
                          </label>
                          <input
                            id="email"
                            type="email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 text-white placeholder:text-gray-300 focus:border-[#0096FF] focus:outline-none focus:ring-2 focus:ring-[#0096FF]/20 h-12 sm:h-14 text-sm sm:text-base rounded-xl transition-all duration-300 px-4"
                            required
                          />
                        </div>

                        {/* Investor Type */}
                        <div className="space-y-2">
                          <label htmlFor="investorType" className="text-gray-400 text-xs tracking-wider uppercase block">
                            Investor Type <span className="text-[#FB5A30]">*</span>
                          </label>
                          <div className="grid grid-cols-3 gap-2 sm:gap-3">
                            {['Private', 'Professional', 'Institutional'].map((type) => (
                              <button
                                key={type}
                                type="button"
                                onClick={() => setFormData({ ...formData, investorType: type })}
                                className={`py-3 sm:py-4 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 border ${
                                  formData.investorType === type
                                    ? 'bg-[#0096FF] border-[#0096FF] text-white shadow-[0_0_20px_rgba(0,150,255,0.3)]'
                                    : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
                                }`}
                              >
                                {type}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Allocation Range */}
                        <div className="space-y-2">
                          <label htmlFor="allocationRange" className="text-gray-400 text-xs tracking-wider uppercase block">
                            Approximate Allocation Interest <span className="text-gray-400">(Optional)</span>
                          </label>
                          <textarea
                            id="allocationRange"
                            
                            value={formData.allocationRange}
                            onChange={(e) => setFormData({ ...formData, allocationRange: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:border-[#0096FF] focus:outline-none focus:ring-2 focus:ring-[#0096FF]/20 min-h-[80px] text-sm sm:text-base rounded-xl resize-none transition-all duration-300 px-4 py-3"
                            rows={2}
                          />
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                          <button
                            type="submit"
                            disabled={isSubmitting || !formData.fullName || !formData.email || !formData.investorType}
                            className="w-full py-4 sm:py-5 bg-gradient-to-r from-[#0096FF] to-[#0096FF]/80 text-white font-medium rounded-xl hover:from-[#0096FF]/90 hover:to-[#0096FF]/70 transition-all duration-300 shadow-[0_0_30px_rgba(0,150,255,0.3)] hover:shadow-[0_0_40px_rgba(0,150,255,0.5)] disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base flex items-center justify-center gap-3"
                          >
                            {isSubmitting ? (
                              <>
                                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                <span>Submitting...</span>
                              </>
                            ) : (
                              <>
                                <span>Submit Expression of Interest</span>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                              </>
                            )}
                          </button>
                        </div>
                      </form>
                    ) : (
                      /* Success State */
                      <div className="py-8 sm:py-12 text-center">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full bg-gradient-to-br from-[#B8FCBF] to-[#B8FCBF]/50 flex items-center justify-center mb-6 sm:mb-8">
                          <svg className="w-10 sm:w-12 h-10 sm:h-12 text-[#002820]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-light text-white mb-3 sm:mb-4">We Have Received Your Request</h3>
                        <p className="text-gray-400 text-sm sm:text-base max-w-md mx-auto mb-6 sm:mb-8">
                          Thank you for your interest in joining our founding client cohort. 
                          We will be in touch regarding next steps.
                        </p>
                        <div className="inline-flex items-center gap-2 px-5 py-3 bg-[#B8FCBF]/10 border border-[#B8FCBF]/20 rounded-full">
                          <div className="w-2 h-2 rounded-full bg-[#B8FCBF] animate-pulse" />
                          <span className="text-[#B8FCBF] text-xs font-medium tracking-wider uppercase">Under Review</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Benefits List */}
              <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                {[
                  { icon: '01', title: 'Priority Onboarding', desc: 'Consideration for early access' },
                  { icon: '02', title: 'Early Access', desc: 'Structured portfolio frameworks' },
                  { icon: '03', title: 'Private Updates', desc: 'Launch communications' },
                ].map((benefit) => (
                  <div key={benefit.icon} className="p-4 sm:p-5 bg-white/[0.03] border border-white/5 rounded-xl text-center sm:text-left">
                    <div className="text-[#0096FF] font-mono text-xs mb-2 tracking-wider">{benefit.icon}</div>
                    <h4 className="text-white font-medium text-sm mb-1">{benefit.title}</h4>
                    <p className="text-gray-300 text-xs font-light">{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </div> 
          </div>

          {/* Who This Is For Section */}
          <div className="mt-20 sm:mt-28 max-w-6xl mx-auto">
            {/* Section Header with Decorative Line */}
            <div className="flex flex-col items-center mb-12 sm:mb-16">
              <div className="flex items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-transparent to-[#0096FF]/50" />
                <div className="px-5 sm:px-6 py-2 sm:py-2.5 bg-[#0096FF]/10 border border-[#0096FF]/20 rounded-full">
                  <span className="text-[#0096FF] text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase">Ideal Candidate Profile</span>
                </div>
                <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-l from-transparent to-[#0096FF]/50" />
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extralight text-white text-center">
                Who Is This For?
              </h3>
            </div>

            {/* Staggered Cards Layout */}
            <div className="relative">
              {/* Decorative Background Element */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-gradient-to-br from-[#0096FF]/5 to-[#B8FCBF]/5 rounded-full blur-[80px] pointer-events-none" />

              {/* Cards Grid */}
              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Card 1 - Value Structure */}
                <div className="group relative bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-sm border border-white rounded-2xl p-6 sm:p-8 overflow-hidden  transition-all duration-500">
                  {/* Accent Glow */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#0096FF]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Number Badge */}
                  <div className="relative z-10 flex items-start justify-between mb-6">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#B8FCBF]/20 to-[#B8FCBF]/5 flex items-center justify-center border border-[#]/20">
                      <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#B8FCBF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <span className="text-[#B8FCBF]/30 font-mono text-3xl sm:text-4xl font-light">01</span>
                  </div>


                  {/* Content */}
                  <div className="relative z-10">
                    <h4 className="text-lg sm:text-xl font-medium text-white mb-2 group-hover:text-[#B8FCBF] transition-colors">
                      Value Structure
                    </h4>
                    <p className="text-gray-400 font-light text-sm sm:text-base mb-4">
                      Over speculation
                    </p>
                    <div className="flex items-center gap-2 text-[#B8FCBF]/70 text-xs sm:text-sm font-light">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B8FCBF]" />
                      <span>Methodical allocation over reactive trading</span>
                    </div>
                  </div>

                  {/* Bottom Accent Line */}
                  </div>

                {/* Card 2 - Seek Regulation */}
                <div className="group relative bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-sm border border-white rounded-2xl p-6 sm:p-8 overflow-hidden  transition-all duration-500">
                  {/* Accent Glow */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#0096FF]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Number Badge */}
                  <div className="relative z-10 flex items-start justify-between mb-6">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#FFBC41]/20 to-[#FFBC41]/5 flex items-center justify-center border ">
                      <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#FFBC41]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <span className="text-[#FFBC41]/30 font-mono text-3xl sm:text-4xl font-light">02</span>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h4 className="text-lg sm:text-xl font-medium text-white mb-2 group-hover:text-[#FFBC41] transition-colors">
                      Seek Regulation
                    </h4>
                    <p className="text-gray-400 font-light text-sm sm:text-base mb-4">
                      Digital asset exposure
                    </p>
                    <div className="flex items-center gap-2 text-[#FFBC41]/70 text-xs sm:text-sm font-light">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFBC41]" />
                      <span>Compliance-first operations framework</span>
                    </div>
                  </div>

                  </div>

                {/* Card 3 - Prefer Discipline */}
                <div className="group relative bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-sm border  rounded-2xl p-6 sm:p-8 overflow-hidden hover:border-[#B8FCBF] transition-all duration-500">
                  {/* Accent Glow */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#0096FF]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Number Badge */}
                  <div className="relative z-10 flex items-start justify-between mb-6">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#B8FCBF]/20 to-[#B8FCBF]/5 flex items-center justify-center border border-[#B8FCBF]/20">
                      <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#B8FCBF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-[#B8FCBF]/30 font-mono text-3xl sm:text-4xl font-light">03</span>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h4 className="text-lg sm:text-xl font-medium text-white mb-2 group-hover:text-[#B8FCBF] transition-colors">
                      Prefer Discipline
                    </h4>
                    <p className="text-gray-400 font-light text-sm sm:text-base mb-4">
                      Over market timing
                    </p>
                    <div className="flex items-center gap-2 text-[#B8FCBF]/70 text-xs sm:text-sm font-light">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B8FCBF]" />
                      <span>Long-term perspective over short-term bets</span>
                    </div>
                  </div>

                  </div>

                {/* Card 4 - Understand Governance */}
                <div className="group relative bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-sm border border-white rounded-2xl p-6 sm:p-8 overflow-hidden  transition-all duration-500">
                  {/* Accent Glow */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#0096FF]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Number Badge */}
                  <div className="relative z-10 flex items-start justify-between mb-6">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#FFBC41]/20 to-[#FFBC41]/5 flex items-center justify-center border ">
                      <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#FFBC41]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <span className="text-[#FFBC41]/30 font-mono text-3xl sm:text-4xl font-light">04</span>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h4 className="text-lg sm:text-xl font-medium text-white mb-2 group-hover:text-[#FFBC41] transition-colors">
                     Understand Governance
                    </h4>
                    <p className="text-gray-400 font-light text-sm sm:text-base mb-4">
                      Volatility requires oversight
                    </p>
                    <div className="flex items-center gap-2 text-[#FFBC41]/70 text-xs sm:text-sm font-light">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFBC41]" />
                      <span>Documented frameworks and clear oversight</span>
                    </div>
                  </div>

                  </div>
              </div>

              {/* Bottom CTA */}
              <div className="mt-10 sm:mt-14 text-center">
                <p className="text-gray-400 font-light text-sm sm:text-base max-w-lg mx-auto">
                  If that aligns with your philosophy, we welcome your expression of interest.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Notice */}
      <div className="relative z-10 px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 sm:p-8 text-center">
            <p className="text-white-400 font-light text-sm sm:text-base md:text-lg leading-relaxed">
  Digital assets are volatile and may experience significant price fluctuations. 
  Participation is subject to regulatory approval, eligibility, and suitability assessment.
</p>

          </div>
        </div>
      </div>


      {/* Footer */}
      <footer className="relative z-10 bg-[#002820] py-6 sm:py-8 px-4 sm:px-6 border-t border-white/5">
  <div className="max-w-7xl mx-auto flex items-center justify-center">
    <p className="text-gray-600 text-xs font-light text-center">
      © 2025 Sagebrush Wealth FZE. All rights reserved.
    </p>
  </div>
</footer>

    </main>
  )
}
