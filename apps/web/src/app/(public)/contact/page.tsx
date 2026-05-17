"use client"

import React, { useState } from "react"
import Link from "next/link"
import { ContactForm } from "@/components/contact/ContactForm"
import { ContactInfoBlocks } from "@/components/contact/ContactInfoBlocks"
import { Heading } from "@/components/typography/Heading"
import { Body } from "@/components/typography/Body"
import { Button } from "@/components/ui/button"

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

interface ContactSubmissionResult {
  name: string
  email: string
  subject: string
  message?: string
  submittedAt: string
}

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submissionData, setSubmissionData] = useState<ContactSubmissionResult | null>(null)

  const handleFormSubmit = async (formData: ContactFormData) => {
    try {
      // Simulate API call to contact endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const result = await response.json()
        setSubmissionData(result)
        setIsSubmitted(true)
      } else {
        throw new Error('Failed to submit form')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      // In a real app, you'd show an error message
      alert('Failed to submit form. Please try again.')
    }
  }

  const handleReset = () => {
    setIsSubmitted(false)
    setSubmissionData(null)
  }

  if (isSubmitted && submissionData) {
    return (
      <div className="min-h-screen bg-primary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">✓</span>
            </div>
            <Heading level="h1" className="mb-4">
              Message Sent Successfully!
            </Heading>
            <Body size="lg" className="text-primary-600 mb-6">
              Thank you for contacting Pawn Stars. We&apos;ve received your message and will get back to you within 24-48 hours.
            </Body>
            <div className="bg-white p-6 rounded-lg border border-primary-200 max-w-md mx-auto">
              <div className="space-y-4">
                <div>
                  <Body size="base" className="font-medium text-primary-900">From:</Body>
                  <Body size="base" className="text-primary-600">{submissionData.name}</Body>
                </div>
                <div>
                  <Body size="base" className="font-medium text-primary-900">Email:</Body>
                  <Body size="base" className="text-primary-600">{submissionData.email}</Body>
                </div>
                <div>
                  <Body size="base" className="font-medium text-primary-900">Subject:</Body>
                  <Body size="base" className="text-primary-600">{submissionData.subject.replace('_', ' ')}</Body>
                </div>
                {submissionData.message && (
                  <div>
                    <Body size="base" className="font-medium text-primary-900">Message:</Body>
                    <Body size="base" className="text-primary-600">{submissionData.message}</Body>
                  </div>
                )}
                <div>
                  <Body size="base" className="font-medium text-primary-900">Submitted:</Body>
                  <Body size="base" className="text-primary-600">
                    {new Date(submissionData.submittedAt).toLocaleString()}
                  </Body>
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-4 mt-8">
              <Button onClick={handleReset} variant="outline">
                Send Another Message
              </Button>
              <Link href="/" className="text-accent-600 hover:text-accent-700 font-medium">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-primary-50">
      {/* Header */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Heading level="h1" className="mb-4">
              Contact Pawn Stars
            </Heading>
            <Body size="lg" className="text-primary-600 max-w-2xl mx-auto">
              Have questions, media inquiries, or interested in joining our team? We&apos;d love to hear from you!
            </Body>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="bg-white p-8 rounded-lg border border-primary-200">
                <Heading level="h2" className="mb-6">
                  Send us a Message
                </Heading>
                <Body size="base" className="text-primary-600 mb-6">
                  Fill out the form below and we&apos;ll get back to you as soon as possible.
                </Body>
                <ContactForm
                  onSubmit={handleFormSubmit}
                  error={undefined} // Error handling would be implemented here
                />
              </div>
            </div>

            {/* Contact Info Blocks */}
            <div>
              <ContactInfoBlocks />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Heading level="h2" className="mb-4">
              Frequently Asked Questions
            </Heading>
            <Body size="base" className="text-primary-600">
              Find answers to common questions about Pawn Stars.
            </Body>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-primary-50 p-6 rounded-lg border border-primary-200">
              <Heading level="h3" className="mb-3">
                How can I join Pawn Stars?
              </Heading>
              <Body size="base" className="text-primary-600">
                We offer trials for talented young players. Contact us through the &quot;Player Trials&quot; form or attend our open tryouts.
              </Body>
            </div>
            
            <div className="bg-primary-50 p-6 rounded-lg border border-primary-200">
              <Heading level="h3" className="mb-3">
                Do you offer chess lessons?
              </Heading>
              <Body size="base" className="text-primary-600">
                Yes! We provide individual and group lessons for all skill levels. Contact us for more information.
              </Body>
            </div>
            
            <div className="bg-primary-50 p-6 rounded-lg border border-primary-200">
              <Heading level="h3" className="mb-3">
                How can I become a sponsor?
              </Heading>
              <Body size="base" className="text-primary-600">
                We welcome sponsorship partnerships. Please reach out through our contact form or email sponsorship@pawnstars.com.
              </Body>
            </div>
            
            <div className="bg-primary-50 p-6 rounded-lg border border-primary-200">
              <Heading level="h3" className="mb-3">
                What tournaments do you organize?
              </Heading>
              <Body size="base" className="text-primary-600">
                We organize regional and national tournaments throughout the year. Check our tournaments page for upcoming events.
              </Body>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
