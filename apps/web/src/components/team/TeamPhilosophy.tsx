import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Heading } from "@/components/typography/Heading"
import { Body } from "@/components/typography/Body"

interface TeamPhilosophyProps {
  philosophy?: string
  values?: string[]
  showIcons?: boolean
}

export const TeamPhilosophySection: React.FC<TeamPhilosophyProps> = ({ 
  philosophy,
  values = [],
  showIcons = true 
}) => {
  // Mock data for development
  const mockPhilosophy = "At Pawn Stars, we believe that chess is more than just a game—it's a discipline that builds character, strategic thinking, and lifelong skills. Our philosophy centers on developing complete chess athletes who excel both on and off the board."

  const mockValues = [
    {
      title: "Excellence",
      description: "We pursue mastery in every move, constantly pushing the boundaries of what's possible in chess.",
      icon: "👑"
    },
    {
      title: "Integrity",
      description: "We play with honor, respect our opponents, and uphold the highest standards of sportsmanship.",
      icon: "⚖️"
    },
    {
      title: "Growth",
      description: "We embrace challenges as opportunities to learn, improve, and become stronger players and individuals.",
      icon: "🌱"
    },
    {
      title: "Teamwork",
      description: "We support each other's development, share knowledge, and celebrate collective success.",
      icon: "🤝"
    },
    {
      title: "Innovation",
      description: "We explore new strategies, embrace technology, and stay at the forefront of chess evolution.",
      icon: "💡"
    },
    {
      title: "Discipline",
      description: "We maintain rigorous training standards and approach every game with focused preparation.",
      icon: "🎯"
    }
  ]

  const displayPhilosophy = philosophy || mockPhilosophy
  const displayValues = values.length > 0 ? values.map(v => ({ title: v, description: "", icon: "♟️" })) : mockValues

  return (
    <section className="py-16 bg-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <Heading level="h2" align="center" className="mb-4">
            Philosophy & Values
          </Heading>
          <Body size="lg" align="center" className="text-primary-600 max-w-3xl mx-auto">
            The principles that guide our approach to chess excellence and shape our community
          </Body>
        </div>

        {/* Philosophy statement */}
        <div className="mb-16">
          <Card className="bg-white shadow-chess">
            <CardContent className="p-8 sm:p-12">
              <div className="max-w-4xl mx-auto text-center">
                <div className="text-4xl sm:text-5xl mb-6">♟️</div>
                <Body size="lg" className="text-primary-700 leading-relaxed">
                  {displayPhilosophy}
                </Body>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Values grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayValues.map((value, index) => (
            <Card 
              key={index}
              className="group hover:shadow-trophy transition-all duration-300 hover:-translate-y-1 bg-white"
            >
              <CardContent className="p-6 text-center">
                {/* Icon */}
                {showIcons && (
                  <div className="text-4xl sm:text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </div>
                )}

                {/* Value title */}
                <h3 className="text-xl font-bold text-primary-900 mb-3 group-hover:text-accent-600 transition-colors">
                  {value.title}
                </h3>

                {/* Value description */}
                {value.description && (
                  <Body size="base" className="text-primary-600">
                    {value.description}
                  </Body>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-12">
          <Body size="base" className="text-primary-600 max-w-2xl mx-auto mb-6">
            These values aren't just words on a page—they're the foundation of everything we do, 
            from training sessions to tournament preparation.
          </Body>
          <div className="text-2xl sm:text-3xl font-bold text-accent-600">
            Join Us in the Pursuit of Excellence
          </div>
        </div>
      </div>
    </section>
  )
}
