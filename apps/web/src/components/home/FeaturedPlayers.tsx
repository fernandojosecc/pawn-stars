import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/typography/Heading"
import { Body } from "@/components/typography/Body"
import { PlayerCard, PlayerTitle } from "@pawn-stars/shared-types"

interface FeaturedPlayersProps {
  players?: PlayerCard[]
  count?: number
  showRatings?: boolean
}

export const FeaturedPlayers: React.FC<FeaturedPlayersProps> = ({ 
  players = [], 
  count = 6, 
  showRatings = true 
}) => {
  // Mock data for development
  const mockPlayers: PlayerCard[] = [
    {
      id: "1",
      slug: "magnus-carlsen",
      firstName: "Magnus",
      lastName: "Carlsen",
      nationality: "NOR",
      photoUrl: "/players/magnus.jpg",
      title: "GM",
      currentRating: 2830,
      active: true
    },
    {
      id: "2", 
      slug: "hou-yifan",
      firstName: "Hou",
      lastName: "Yifan",
      nationality: "CHN",
      photoUrl: "/players/hou.jpg",
      title: "GM",
      currentRating: 2758,
      active: true
    },
    {
      id: "3",
      slug: "fabiano-caruana", 
      firstName: "Fabiano",
      lastName: "Caruana",
      nationality: "USA",
      photoUrl: "/players/fabiano.jpg",
      title: "GM",
      currentRating: 2820,
      active: true
    },
    {
      id: "4",
      slug: "ding-liren",
      firstName: "Ding", 
      lastName: "Liren",
      nationality: "CHN",
      photoUrl: "/players/ding.jpg",
      title: "GM",
      currentRating: 2791,
      active: true
    },
    {
      id: "5",
      slug: "ian-nepomniachtchi",
      firstName: "Ian",
      lastName: "Nepomniachtchi",
      nationality: "RUS",
      photoUrl: "/players/ian.jpg", 
      title: "GM",
      currentRating: 2793,
      active: true
    },
    {
      id: "6",
      slug: "levon-aronian",
      firstName: "Levon",
      lastName: "Aronian",
      nationality: "USA", 
      photoUrl: "/players/levon.jpg",
      title: "GM",
      currentRating: 2785,
      active: true
    }
  ]

  const displayPlayers = players.length > 0 ? players : mockPlayers
  const featuredPlayers = displayPlayers.slice(0, count)

  const getTitleColor = (title: PlayerTitle) => {
    switch (title) {
      case "GM":
        return "bg-accent-500 text-white"
      case "IM":
        return "bg-primary-600 text-white"
      case "FM":
        return "bg-success-500 text-white"
      case "WGM":
        return "bg-accent-400 text-white"
      case "WIM":
        return "bg-primary-500 text-white"
      default:
        return "bg-primary-200 text-primary-800"
    }
  }

  const getFlagEmoji = (nationality: string) => {
    const flags: Record<string, string> = {
      "NOR": "🇳🇴",
      "CHN": "🇨🇳", 
      "USA": "🇺🇸",
      "RUS": "🇷🇺",
      "IND": "🇮🇳",
      "GER": "🇩🇪",
      "FRA": "🇫🇷",
      "ENG": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
      "ESP": "🇪🇸",
      "ITA": "🇮🇹"
    }
    return flags[nationality] || "🏳️"
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <Heading level="h2" align="center" className="mb-4">
            Featured Players
          </Heading>
          <Body size="lg" align="center" className="text-primary-600 max-w-2xl mx-auto">
            Meet our talented roster of chess masters competing at the highest level
          </Body>
        </div>

        {/* Players grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {featuredPlayers.map((player, index) => (
            <Card 
              key={player.id} 
              className="group hover:shadow-trophy transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-6">
                {/* Player photo */}
                <div className="relative mb-4">
                  <div className="aspect-square w-full max-w-[200px] mx-auto bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg overflow-hidden">
                    {player.photoUrl ? (
                      <img
                        src={player.photoUrl}
                        alt={`${player.firstName} ${player.lastName}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-4xl text-primary-400">
                          {player.firstName[0]}{player.lastName[0]}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Title badge */}
                  {player.title && (
                    <div className="absolute top-2 right-2">
                      <Badge className={getTitleColor(player.title)}>
                        {player.title}
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Player info */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-lg">{getFlagEmoji(player.nationality)}</span>
                    <h3 className="text-xl font-bold text-primary-900 group-hover:text-accent-600 transition-colors">
                      {player.firstName} {player.lastName}
                    </h3>
                  </div>
                  
                  {showRatings && player.currentRating && (
                    <div className="mb-3">
                      <div className="text-2xl font-bold text-accent-600">
                        {player.currentRating}
                      </div>
                      <div className="text-xs text-primary-500 font-medium">
                        FIDE Rating
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-center gap-2 text-sm text-primary-600 mb-4">
                    <span>{player.nationality}</span>
                    {player.active && (
                      <Badge variant="success" className="text-xs">
                        Active
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center">
          <Button variant="outline" size="lg">
            View Full Roster
          </Button>
        </div>
      </div>
    </section>
  )
}
