import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/typography/Heading"
import { Body } from "@/components/typography/Body"
import { StaffCard, StaffRole } from "@pawn-stars/shared-types"

interface StaffGridProps {
  staff?: StaffCard[]
  showContact?: boolean
  maxStaff?: number
}

export const StaffGridSection: React.FC<StaffGridProps> = ({ 
  staff = [], 
  showContact = false,
  maxStaff = 12 
}) => {
  // Mock data for development
  const mockStaff: StaffCard[] = [
    {
      id: "1",
      slug: "john-smith",
      firstName: "John",
      lastName: "Smith",
      role: "head_coach",
      photoUrl: "/staff/john-smith.jpg",
      specialization: ["Opening Theory", "Endgame Technique"],
      teamId: "team1"
    },
    {
      id: "2",
      slug: "maria-garcia",
      firstName: "Maria",
      lastName: "Garcia",
      role: "assistant_coach",
      photoUrl: "/staff/maria-garcia.jpg",
      specialization: ["Tactics", " middlegame Strategy"],
      teamId: "team1"
    },
    {
      id: "3",
      slug: "david-chen",
      firstName: "David",
      lastName: "Chen",
      role: "analyst",
      photoUrl: "/staff/david-chen.jpg",
      specialization: ["Computer Analysis", "Database Management"],
      teamId: "team1"
    },
    {
      id: "4",
      slug: "sarah-johnson",
      firstName: "Sarah",
      lastName: "Johnson",
      role: "manager",
      photoUrl: "/staff/sarah-johnson.jpg",
      specialization: ["Team Management", "Logistics"],
      teamId: "team1"
    },
    {
      id: "5",
      slug: "alex-kumar",
      firstName: "Alex",
      lastName: "Kumar",
      role: "trainer",
      photoUrl: "/staff/alex-kumar.jpg",
      specialization: ["Physical Training", "Mental Preparation"],
      teamId: "team1"
    },
    {
      id: "6",
      slug: "emma-wilson",
      firstName: "Emma",
      lastName: "Wilson",
      role: "psychologist",
      photoUrl: "/staff/emma-wilson.jpg",
      specialization: ["Performance Psychology", "Stress Management"],
      teamId: "team1"
    },
    {
      id: "7",
      slug: "michael-brown",
      firstName: "Michael",
      lastName: "Brown",
      role: "director",
      photoUrl: "/staff/michael-brown.jpg",
      specialization: ["Strategic Planning", "Development"],
      teamId: "team1"
    },
    {
      id: "8",
      slug: "lisa-anderson",
      firstName: "Lisa",
      lastName: "Anderson",
      role: "nutritionist",
      photoUrl: "/staff/lisa-anderson.jpg",
      specialization: ["Sports Nutrition", "Performance Diet"],
      teamId: "team1"
    }
  ]

  const displayStaff = staff.length > 0 ? staff : mockStaff.slice(0, maxStaff)

  const getRoleColor = (role: StaffRole) => {
    switch (role) {
      case "head_coach":
        return "bg-accent-500 text-white"
      case "assistant_coach":
        return "bg-primary-600 text-white"
      case "manager":
        return "bg-success-500 text-white"
      case "director":
        return "bg-accent-600 text-white"
      case "analyst":
        return "bg-primary-500 text-white"
      case "trainer":
        return "bg-success-600 text-white"
      case "psychologist":
        return "bg-primary-700 text-white"
      case "nutritionist":
        return "bg-success-400 text-white"
      default:
        return "bg-primary-200 text-primary-800"
    }
  }

  const getRoleTitle = (role: StaffRole) => {
    switch (role) {
      case "head_coach":
        return "Head Coach"
      case "assistant_coach":
        return "Assistant Coach"
      case "manager":
        return "Team Manager"
      case "director":
        return "Director"
      case "analyst":
        return "Chess Analyst"
      case "trainer":
        return "Physical Trainer"
      case "psychologist":
        return "Sports Psychologist"
      case "nutritionist":
        return "Nutritionist"
      default:
        return role.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase())
    }
  }

  const getRoleIcon = (role: StaffRole) => {
    switch (role) {
      case "head_coach":
        return "👑"
      case "assistant_coach":
        return "♟️"
      case "manager":
        return "📋"
      case "director":
        return "🎯"
      case "analyst":
        return "📊"
      case "trainer":
        return "💪"
      case "psychologist":
        return "🧠"
      case "nutritionist":
        return "🥗"
      default:
        return "👤"
    }
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <Heading level="h2" align="center" className="mb-4">
            Our Team
          </Heading>
          <Body size="lg" align="center" className="text-primary-600 max-w-2xl mx-auto">
            Meet the dedicated professionals who guide our players toward chess excellence
          </Body>
        </div>

        {/* Staff grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {displayStaff.map((person) => (
            <Card 
              key={person.id}
              className="group hover:shadow-trophy transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-6">
                {/* Photo */}
                <div className="relative mb-4">
                  <div className="aspect-square w-full max-w-[150px] mx-auto bg-gradient-to-br from-primary-100 to-primary-200 rounded-full overflow-hidden">
                    {person.photoUrl ? (
                      <img
                        src={person.photoUrl}
                        alt={`${person.firstName} ${person.lastName}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-3xl text-primary-400">
                          {getRoleIcon(person.role)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Name and role */}
                <div className="text-center mb-3">
                  <h3 className="text-lg font-bold text-primary-900 group-hover:text-accent-600 transition-colors">
                    {person.firstName} {person.lastName}
                  </h3>
                  <Badge className={getRoleColor(person.role)}>
                    {getRoleTitle(person.role)}
                  </Badge>
                </div>

                {/* Specializations */}
                {person.specialization && person.specialization.length > 0 && (
                  <div className="text-center">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {person.specialization.slice(0, 2).map((spec, index) => (
                        <span 
                          key={index}
                          className="text-xs text-primary-600 bg-primary-50 px-2 py-1 rounded"
                        >
                          {spec}
                        </span>
                      ))}
                      {person.specialization.length > 2 && (
                        <span className="text-xs text-primary-500">
                          +{person.specialization.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Contact button */}
                {showContact && (
                  <div className="mt-4 text-center">
                    <Button variant="outline" size="sm" className="w-full">
                      Contact
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center">
          <Body size="base" className="text-primary-600 mb-4">
            Our coaching staff combines decades of competitive experience with cutting-edge training methods
          </Body>
          <Button variant="accent" size="lg">
            Join Our Team
          </Button>
        </div>
      </div>
    </section>
  )
}
