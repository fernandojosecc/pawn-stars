import React from "react"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/typography/Heading"
import { Body } from "@/components/typography/Body"

interface HeroSectionProps {
  variant?: "home" | "default"
}

export const HeroSection: React.FC<HeroSectionProps> = ({ variant = "default" }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(0,0,0,.1) 35px, rgba(0,0,0,.1) 70px)`,
        }} />
      </div>
      
      {/* Chess board decoration */}
      <div className="absolute top-10 right-10 w-32 h-32 sm:w-48 sm:h-48 opacity-10">
        <div className="grid grid-cols-8 grid-rows-8 w-full h-full">
          {Array.from({ length: 64 }).map((_, i) => {
            const row = Math.floor(i / 8)
            const col = i % 8
            const isLight = (row + col) % 2 === 0
            return (
              <div
                key={i}
                className={isLight ? "bg-chess-light" : "bg-chess-dark"}
              />
            )
          })}
        </div>
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Main headline */}
        <div className="mb-8 animate-fade-in">
          <Heading 
            level="h1" 
            align="center"
            className="mb-4"
          >
            {variant === "home" ? (
              <>
                Welcome to <span className="text-accent-600">Pawn Stars</span>
                <br />
                Chess Excellence
              </>
            ) : (
              "Pawn Stars Chess Organization"
            )}
          </Heading>
          
          <Body 
            size="lg" 
            align="center"
            className="max-w-2xl mx-auto text-primary-600"
          >
            Building champions through strategic excellence, dedicated training, 
            and competitive spirit. Join us on the journey to chess mastery.
          </Body>
        </div>

        {/* Call-to-action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-slide-up">
          <Button 
            size="lg" 
            variant="accent"
            className="w-full sm:w-auto shadow-trophy"
          >
            Join Our Team
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="w-full sm:w-auto"
          >
            View Roster
          </Button>
        </div>

        {/* Stats preview */}
        {variant === "home" && (
          <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-lg mx-auto animate-slide-up">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-accent-600">150+</div>
              <div className="text-xs sm:text-sm text-primary-600 font-medium">Active Players</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-accent-600">25</div>
              <div className="text-xs sm:text-sm text-primary-600 font-medium">Tournaments Won</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-accent-600">8</div>
              <div className="text-xs sm:text-sm text-primary-600 font-medium">Grandmasters</div>
            </div>
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
        <div className="w-6 h-10 border-2 border-primary-300 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
