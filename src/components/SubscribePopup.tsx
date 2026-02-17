'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react'

interface SubscribePopupProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SubscribePopup({ open, onOpenChange }: SubscribePopupProps) {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      setError('Please enter your email address')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        throw new Error('Failed to subscribe')
      }

      setIsSuccess(true)
      setTimeout(() => {
        setIsSuccess(false)
        setEmail('')
        onOpenChange(false)
      }, 2500)
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="sm:max-w-lg bg-gradient-to-br from-[#002820] via-[#004638] to-[#002820] border border-white/10 text-white overflow-hidden"
        showCloseButton={!isSuccess}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#0096FF]/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-[#B8FCBF]/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '0.5s'}} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#FFBC41]/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}} />
          
          {/* Floating particles */}
          <div className="absolute top-[20%] right-[20%] w-2 h-2 bg-[#0096FF] rounded-full opacity-60 animate-pulse" />
          <div className="absolute bottom-[30%] left-[15%] w-1.5 h-1.5 bg-[#B8FCBF] rounded-full opacity-60 animate-pulse" style={{animationDelay: '0.5s'}} />
          <div className="absolute top-[60%] right-[30%] w-1 h-1 bg-[#FFBC41] rounded-full opacity-60 animate-pulse" style={{animationDelay: '1s'}} />
        </div>

        {!isSuccess ? (
          <div className="relative z-10">
            <DialogHeader className="text-center sm:text-center">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0096FF] to-[#B8FCBF] flex items-center justify-center animate-pulse">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#0096FF] to-[#B8FCBF] animate-ping opacity-20" />
                </div>
              </div>
              
              <DialogTitle className="text-2xl md:text-3xl font-light text-white mb-2">
                Stay Informed
              </DialogTitle>
              <DialogDescription className="text-gray-300 text-base md:text-lg">
                Subscribe to receive measured perspectives on digital asset markets, portfolio construction, and regulatory developments.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#0096FF] to-[#B8FCBF] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setError('')
                    }}
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-400 focus:border-[#0096FF]/50 focus:ring-2 focus:ring-[#0096FF]/20 transition-all"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {error && (
                <p className="text-red-400 text-sm text-center animate-in fade-in duration-200">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-gradient-to-r from-[#0096FF] to-[#0096FF]/80 hover:from-[#0096FF]/90 hover:to-[#0096FF]/70 text-white font-medium rounded-xl transition-all duration-300 shadow-[0_0_30px_rgba(0,150,255,0.3)] hover:shadow-[0_0_40px_rgba(0,150,255,0.5)]"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Subscribing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Subscribe Now
                    <ArrowRight className="w-5 h-5" />
                  </span>
                )}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                By subscribing, you agree to receive updates from Sagebrush Wealth. 
                We respect your privacy and will never share your information.
              </p>
            </form>

            {/* Decorative line */}
            <div className="mt-8 flex items-center gap-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <Sparkles className="w-4 h-4 text-white/20" />
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
          </div>
        ) : (
          <div className="relative z-10 py-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#B8FCBF] to-[#0096FF] flex items-center justify-center animate-in zoom-in duration-500">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#B8FCBF] to-[#0096FF] animate-ping opacity-30" />
              </div>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-light text-white mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
              Successfully Subscribed!
            </h3>
            <p className="text-gray-300 text-base md:text-lg animate-in fade-in slide-in-from-bottom-4 duration-700" style={{animationDelay: '100ms'}}>
              Thank you for subscribing. You&apos;ll receive our insights directly in your inbox.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
