import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select2"
import { Heading } from "@/components/typography/Heading"
import { Body } from "@/components/typography/Body"

export type ContactSubject = "GENERAL" | "PRESS" | "SPONSORSHIP" | "TRIALS"

interface ContactFormData {
  name: string
  email: string
  subject: ContactSubject
  message: string
}

interface ContactFormProps {
  onSubmit: (data: ContactFormData) => void
  isSubmitting?: boolean
  error?: string
}

export const ContactForm: React.FC<ContactFormProps> = ({ 
  onSubmit, 
  isSubmitting = false, 
  error 
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "GENERAL",
    message: ""
  })

  const [errors, setErrors] = useState<Partial<ContactFormData>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters"
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    onSubmit(formData)
  }

  const handleInputChange = (field: keyof ContactFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const getSubjectIcon = (subject: ContactSubject) => {
    switch (subject) {
      case "GENERAL":
        return "💬"
      case "PRESS":
        return "📰"
      case "SPONSORSHIP":
        return "🤝"
      case "TRIALS":
        return "♟️"
      default:
        return "📝"
    }
  }

  const getSubjectDescription = (subject: ContactSubject) => {
    switch (subject) {
      case "GENERAL":
        return "General inquiries and questions"
      case "PRESS":
        return "Media and press inquiries"
      case "SPONSORSHIP":
        return "Sponsorship and partnership opportunities"
      case "TRIALS":
        return "Player trials and tryouts"
      default:
        return "Other inquiries"
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Error Message */}
        {error && (
          <div className="p-4 bg-danger-50 border border-danger-200 rounded-lg">
            <Body size="base" className="text-danger-700">
              {error}
            </Body>
          </div>
        )}

        {/* Name Field */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium text-primary-700">
            Name *
          </Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name')}
            placeholder="Your full name"
            className={errors.name ? "border-danger-300 focus:border-danger-500" : ""}
            disabled={isSubmitting}
            required
          />
          {errors.name && (
            <p className="text-sm text-danger-600 mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-primary-700">
            Email *
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email')}
            placeholder="your.email@example.com"
            className={errors.email ? "border-danger-300 focus:border-danger-500" : ""}
            disabled={isSubmitting}
            required
          />
          {errors.email && (
            <p className="text-sm text-danger-600 mt-1">{errors.email}</p>
          )}
        </div>

        {/* Subject Field */}
        <div className="space-y-2">
          <Label htmlFor="subject" className="text-sm font-medium text-primary-700">
            Subject *
          </Label>
          <Select
            value={formData.subject}
            onValueChange={(value: string) => setFormData(prev => ({ ...prev, subject: value as ContactSubject }))}
            disabled={isSubmitting}
          >
            <option value="">Select a subject</option>
            <option value="GENERAL">General Inquiry</option>
            <option value="PRESS">Press Inquiry</option>
            <option value="SPONSORSHIP">Sponsorship</option>
            <option value="TRIALS">Player Trials</option>
          </Select>
          <p className="text-xs text-primary-500 mt-1">
            {getSubjectDescription(formData.subject)}
          </p>
        </div>

        {/* Message Field */}
        <div className="space-y-2">
          <Label htmlFor="message" className="text-sm font-medium text-primary-700">
            Message *
          </Label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={(e) => handleInputChange('message')}
            placeholder="Tell us more about your inquiry..."
            rows={6}
            className={errors.message ? "border-danger-300 focus:border-danger-500" : ""}
            disabled={isSubmitting}
            required
          />
          {errors.message && (
            <p className="text-sm text-danger-600 mt-1">{errors.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Sending...
              </div>
            ) : (
              "Send Message"
            )}
          </Button>
        </div>

        {/* Form Notes */}
        <div className="mt-6 p-4 bg-primary-50 rounded-lg border border-primary-200">
          <Body size="sm" className="text-primary-600">
            <strong>Note:</strong> This is a demo form. Submissions are stored locally for demonstration purposes only. 
            No actual emails are sent in this development environment.
          </Body>
        </div>
      </form>
    </div>
  )
}
