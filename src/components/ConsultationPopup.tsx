'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { 
  Loader2, 
  CalendarDays, 
  CheckCircle2, 
  Send, 
  Building2, 
  User, 
  Mail, 
  Phone, 
  MessageSquare,
  Briefcase
} from 'lucide-react'

interface ConsultationPopupProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ConsultationPopup({ open, onOpenChange }: ConsultationPopupProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    clientType: '',
    message: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.clientType) {
      newErrors.clientType = 'Please select your investor type'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)

    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to submit')
      }

      setIsSuccess(true)
      setTimeout(() => {
        setIsSuccess(false)
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          company: '',
          clientType: '',
          message: ''
        })
        onOpenChange(false)
      }, 3000)
    } catch (err) {
      setErrors({ submit: 'Something went wrong. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const clientTypes = [
    { value: 'private', label: 'Private Investor' },
    { value: 'professional', label: 'Professional Investor' },
    { value: 'institutional', label: 'Institutional Client' }
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-[#002820] via-[#004638] to-[#002820] border border-white/10 text-white"
        showCloseButton={!isSuccess}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-[#FFBC41]/15 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-[#0096FF]/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '0.7s'}} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-[#B8FCBF]/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.4s'}} />
          
          {/* Grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}
          />
        </div>

        {!isSuccess ? (
          <div className="relative z-10">
            <DialogHeader className="text-center sm:text-center mb-6">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FFBC41] to-[#FB5A30] flex items-center justify-center">
                    <CalendarDays className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FFBC41] to-[#FB5A30] animate-ping opacity-20" />
                </div>
              </div>
              
              <DialogTitle className="text-2xl md:text-3xl font-light text-white mb-2">
                Request a Private Consultation
              </DialogTitle>
              <DialogDescription className="text-gray-300 text-base">
                Schedule a personalized discussion with our team to explore how we can support your digital asset investment goals.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-gray-300 text-sm flex items-center gap-2">
                    <User className="w-4 h-4" />
                    First Name <span className="text-[#FB5A30]">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    className={`bg-white/5 border ${errors.firstName ? 'border-red-500' : 'border-white/10'} rounded-lg text-white placeholder:text-gray-500 focus:border-[#0096FF]/50 focus:ring-2 focus:ring-[#0096FF]/20`}
                    disabled={isLoading}
                  />
                  {errors.firstName && <p className="text-red-400 text-xs">{errors.firstName}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-gray-300 text-sm flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Last Name <span className="text-[#FB5A30]">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    className={`bg-white/5 border ${errors.lastName ? 'border-red-500' : 'border-white/10'} rounded-lg text-white placeholder:text-gray-500 focus:border-[#0096FF]/50 focus:ring-2 focus:ring-[#0096FF]/20`}
                    disabled={isLoading}
                  />
                  {errors.lastName && <p className="text-red-400 text-xs">{errors.lastName}</p>}
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300 text-sm flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email <span className="text-[#FB5A30]">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className={`bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-lg text-white placeholder:text-gray-500 focus:border-[#0096FF]/50 focus:ring-2 focus:ring-[#0096FF]/20`}
                    disabled={isLoading}
                  />
                  {errors.email && <p className="text-red-400 text-xs">{errors.email}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-300 text-sm flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+971 50 000 0000"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:border-[#0096FF]/50 focus:ring-2 focus:ring-[#0096FF]/20"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Company */}
              <div className="space-y-2">
                <Label htmlFor="company" className="text-gray-300 text-sm flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Company / Organization
                </Label>
                <Input
                  id="company"
                  type="text"
                  placeholder="Company name (optional)"
                  value={formData.company}
                  onChange={(e) => handleChange('company', e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:border-[#0096FF]/50 focus:ring-2 focus:ring-[#0096FF]/20"
                  disabled={isLoading}
                />
              </div>

              {/* Client Type */}
              <div className="space-y-2">
                <Label className="text-gray-300 text-sm flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  Investor Type <span className="text-[#FB5A30]">*</span>
                </Label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {clientTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => handleChange('clientType', type.value)}
                      disabled={isLoading}
                      className={`px-4 py-3 rounded-lg border text-sm transition-all duration-300 ${
                        formData.clientType === type.value
                          ? 'bg-[#0096FF]/20 border-[#0096FF] text-white'
                          : 'bg-white/5 border-white/10 text-gray-300 hover:border-white/30'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
                {errors.clientType && <p className="text-red-400 text-xs">{errors.clientType}</p>}
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-gray-300 text-sm flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your investment goals or any specific questions you have..."
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  rows={3}
                  className="bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:border-[#0096FF]/50 focus:ring-2 focus:ring-[#0096FF]/20 resize-none"
                  disabled={isLoading}
                />
              </div>

              {errors.submit && (
                <p className="text-red-400 text-sm text-center">{errors.submit}</p>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-gradient-to-r from-[#B8FCBF] to-[#0096FF] hover:from-[#B8FCBF]/90 hover:to-[#0096FF]/90 text-[#002820] font-semibold rounded-xl transition-all duration-300 shadow-[0_0_30px_rgba(184,252,191,0.3)] hover:shadow-[0_0_40px_rgba(184,252,191,0.5)]"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="w-5 h-5" />
                    Request Consultation
                  </span>
                )}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                By submitting this form, you agree to be contacted regarding your consultation request.
                All information provided will be kept confidential.
              </p>
            </form>
          </div>
        ) : (
          <div className="relative z-10 py-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#B8FCBF] to-[#0096FF] flex items-center justify-center animate-in zoom-in duration-500">
                  <CheckCircle2 className="w-12 h-12 text-white" />
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#B8FCBF] to-[#0096FF] animate-ping opacity-30" />
              </div>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-light text-white mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
              Request Received!
            </h3>
            <p className="text-gray-300 text-base md:text-lg mb-2 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{animationDelay: '100ms'}}>
              Thank you for your interest in Sagebrush Wealth.
            </p>
            <p className="text-gray-400 text-sm animate-in fade-in slide-in-from-bottom-4 duration-700" style={{animationDelay: '200ms'}}>
              Our team will reach out to you within 1-2 business days to schedule your consultation.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
