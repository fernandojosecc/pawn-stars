import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Heading } from "@/components/typography/Heading"
import { Body } from "@/components/typography/Body"
import { Button } from "@/components/ui/button"

export const ContactInfoBlocks: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Email Info Block */}
      <Card>
        <CardContent className="p-6">
          <Heading level="h3" className="mb-4 flex items-center gap-2">
            <span className="text-2xl">📧</span>
            Email Contact
          </Heading>
          <Body size="base" className="text-primary-600 mb-4">
            Reach out to us via email for general inquiries, partnership opportunities, or media requests.
          </Body>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-600 font-bold text-lg">✉</span>
              </div>
              <div>
                <Body size="base" className="font-medium">General Inquiries</Body>
                <Body size="sm" className="text-primary-500">contact@pawnstars.com</Body>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-600 font-bold text-lg">📰</span>
              </div>
              <div>
                <Body size="base" className="font-medium">Press & Media</Body>
                <Body size="sm" className="text-primary-500">media@pawnstars.com</Body>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-600 font-bold text-lg">🤝</span>
              </div>
              <div>
                <Body size="base" className="font-medium">Sponsorship</Body>
                <Body size="sm" className="text-primary-500">sponsorship@pawnstars.com</Body>
              </div>
            </div>
          </div>
          <Button variant="outline" className="w-full">
            Send us an email
          </Button>
        </CardContent>
      </Card>

      {/* Social Links Block */}
      <Card>
        <CardContent className="p-6">
          <Heading level="h3" className="mb-4 flex items-center gap-2">
            <span className="text-2xl">🌐</span>
            Follow Us
          </Heading>
          <Body size="base" className="text-primary-600 mb-4">
            Stay connected with Pawn Stars on social media for updates, news, and community discussions.
          </Body>
          <div className="flex gap-4">
            <a 
              href="https://twitter.com/pawnstars" 
              className="flex items-center gap-2 text-primary-600 hover:text-accent-600 transition-colors"
            >
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-2xl">𝕏</span>
              </div>
              <div>
                <Body size="base" className="font-medium">Twitter</Body>
                <Body size="sm" className="text-primary-500">@pawnstars</Body>
              </div>
            </a>
            <a 
              href="https://facebook.com/pawnstars" 
              className="flex items-center gap-2 text-primary-600 hover:text-accent-600 transition-colors"
            >
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-2xl">f</span>
              </div>
              <div>
                <Body size="base" className="font-medium">Facebook</Body>
                <Body size="sm" className="text-primary-500">Pawn Stars</Body>
              </div>
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Press Contact Block */}
      <Card>
        <CardContent className="p-6">
          <Heading level="h3" className="mb-4 flex items-center gap-2">
            <span className="text-2xl">📰</span>
            Press Contact
          </Heading>
          <Body size="base" className="text-primary-600 mb-4">
            For media inquiries, press releases, and interview requests, please contact our press team.
          </Body>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-600 font-bold text-lg">📧</span>
              </div>
              <div>
                <Body size="base" className="font-medium">Media Email</Body>
                <Body size="sm" className="text-primary-500">media@pawnstars.com</Body>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-600 font-bold text-lg">📱</span>
              </div>
              <div>
                <Body size="base" className="font-medium">Press Hotline</Body>
                <Body size="sm" className="text-primary-500">+1 (555) 123-4567</Body>
              </div>
            </div>
          </div>
          <Button variant="outline" className="w-full">
            View Press Kit
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
