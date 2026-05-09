import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heading } from "@/components/typography/Heading"
import { Body } from "@/components/typography/Body"
import { TeamHistory } from "@pawn-stars/shared-types"

interface TeamHistoryProps {
  history?: TeamHistory[]
  showTimeline?: boolean
}

export const TeamHistorySection: React.FC<TeamHistoryProps> = ({ 
  history = [], 
  showTimeline = true 
}) => {
  // Mock data for development
  const mockHistory: TeamHistory[] = [
    {
      year: 2024,
      title: "National Championship Victory",
      description: "Pawn Stars A Team claims the National Chess Championship title in a breathtaking final round, defeating the reigning champions 4.5-3.5.",
      achievements: [
        "National Champions 2024",
        "Best Team Performance",
        "3 Players Qualified for World Cup"
      ]
    },
    {
      year: 2023,
      title: "International Expansion",
      description: "Expanded our roster with 5 international players and established partnerships with chess academies across Europe.",
      achievements: [
        "15 New International Players",
        "European Academy Partnership",
        "Junior Development Program Launch"
      ]
    },
    {
      year: 2022,
      title: "Training Center Inauguration",
      description: "Opened our state-of-the-art training facility with dedicated analysis rooms, library, and fitness center for chess athletes.",
      achievements: [
        "New Training Facility",
        "Grandmaster Coaching Staff",
        "Sports Science Integration"
      ]
    },
    {
      year: 2021,
      title: "Foundation Year",
      description: "Pawn Stars Chess Organization was founded with a mission to develop chess talent and promote strategic thinking through competitive excellence.",
      achievements: [
        "Organization Founded",
        "First 20 Players Signed",
        "Initial Sponsorship Deals"
      ]
    }
  ]

  const displayHistory = history.length > 0 ? history : mockHistory

  const sortedHistory = displayHistory.sort((a, b) => b.year - a.year)

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <Heading level="h2" align="center" className="mb-4">
            Our History
          </Heading>
          <Body size="lg" align="center" className="text-primary-600 max-w-2xl mx-auto">
            From humble beginnings to championship glory, trace our journey through the milestones that shaped Pawn Stars
          </Body>
        </div>

        {/* Timeline view */}
        {showTimeline ? (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 sm:left-1/2 transform sm:-translate-x-1/2 h-full w-0.5 bg-primary-200"></div>
            
            <div className="space-y-12">
              {sortedHistory.map((milestone, index) => (
                <div 
                  key={milestone.year}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-8 sm:left-1/2 transform sm:-translate-x-1/2 w-4 h-4 bg-accent-500 rounded-full border-4 border-white shadow-trophy z-10"></div>
                  
                  {/* Content card */}
                  <div className={`ml-16 sm:ml-0 sm:w-5/12 ${
                    index % 2 === 0 ? 'sm:pr-8' : 'sm:pl-8'
                  }`}>
                    <Card className="hover:shadow-trophy transition-all duration-300">
                      <CardContent className="p-6">
                        {/* Year badge */}
                        <div className="flex items-center justify-between mb-4">
                          <Badge className="bg-accent-500 text-white text-sm font-bold">
                            {milestone.year}
                          </Badge>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-primary-900 mb-3">
                          {milestone.title}
                        </h3>

                        {/* Description */}
                        <Body size="base" className="text-primary-600 mb-4">
                          {milestone.description}
                        </Body>

                        {/* Achievements */}
                        {milestone.achievements && milestone.achievements.length > 0 && (
                          <div className="mt-4">
                            <Body size="sm" weight="semibold" className="text-primary-700 mb-2">
                              Key Achievements:
                            </Body>
                            <ul className="space-y-2">
                              {milestone.achievements.map((achievement, achievementIndex) => (
                                <li 
                                  key={achievementIndex}
                                  className="flex items-start gap-2"
                                >
                                  <span className="text-accent-500 mt-0.5">●</span>
                                  <Body size="sm" className="text-primary-600">
                                    {achievement}
                                  </Body>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Grid view for smaller screens */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sortedHistory.map((milestone) => (
              <Card key={milestone.year} className="hover:shadow-trophy transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className="bg-accent-500 text-white text-sm font-bold">
                      {milestone.year}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-bold text-primary-900 mb-3">
                    {milestone.title}
                  </h3>

                  <Body size="base" className="text-primary-600 mb-4">
                    {milestone.description}
                  </Body>

                  {milestone.achievements && milestone.achievements.length > 0 && (
                    <div className="mt-4">
                      <Body size="sm" weight="semibold" className="text-primary-700 mb-2">
                        Key Achievements:
                      </Body>
                      <ul className="space-y-2">
                        {milestone.achievements.map((achievement, achievementIndex) => (
                          <li 
                            key={achievementIndex}
                            className="flex items-start gap-2"
                          >
                            <span className="text-accent-500 mt-0.5">●</span>
                            <Body size="sm" className="text-primary-600">
                              {achievement}
                            </Body>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
