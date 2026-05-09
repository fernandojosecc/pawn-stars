import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heading } from "@/components/typography/Heading"
import { Body } from "@/components/typography/Body"
import { Player } from "@pawn-stars/shared-types"

interface PlayerBioProps {
  player: Player
  showFullBio?: boolean
}

export const PlayerBioSection: React.FC<PlayerBioProps> = ({ 
  player, 
  showFullBio = true 
}) => {
  const getTitleColor = (title: string) => {
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
      case "WFM":
        return "bg-success-400 text-white"
      case "CM":
        return "bg-primary-400 text-white"
      case "WCM":
        return "bg-success-300 text-white"
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
      "ITA": "🇮🇹",
      "NED": "🇳🇱",
      "AZE": "🇦🇿",
      "ROU": "🇷🇴",
      "HUN": "🇭🇺"
    }
    return flags[nationality] || "🏳️"
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 2800) return "text-accent-600"
    if (rating >= 2700) return "text-primary-700"
    if (rating >= 2600) return "text-primary-600"
    if (rating >= 2500) return "text-primary-500"
    return "text-primary-400"
  }

  const calculateAge = (dateOfBirth: Date) => {
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="shadow-chess">
          <CardContent className="p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Player Photo and Basic Info */}
              <div className="lg:col-span-1">
                <div className="text-center">
                  {/* Photo */}
                  <div className="relative mb-6">
                    <div className="w-48 h-48 mx-auto bg-gradient-to-br from-primary-100 to-primary-200 rounded-full overflow-hidden">
                      {player.photoUrl ? (
                        <img
                          src={player.photoUrl}
                          alt={`${player.firstName} ${player.lastName}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-4xl text-primary-400">
                            {player.firstName[0]}{player.lastName[0]}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Title Badge */}
                    {player.title && (
                      <div className="absolute -top-2 -right-2">
                        <Badge className={getTitleColor(player.title)}>
                          {player.title}
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Basic Info */}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Heading level="h2" className="mb-2">
                        {player.firstName} {player.lastName}
                      </Heading>
                      <div className="flex items-center justify-center gap-2 text-primary-600">
                        <span className="text-2xl">{getFlagEmoji(player.nationality)}</span>
                        <span>{player.nationality}</span>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      {player.currentRating && (
                        <div className="text-center">
                          <div className={`text-3xl font-bold ${getRatingColor(player.currentRating)}`}>
                            {player.currentRating}
                          </div>
                          <div className="text-sm text-primary-500">FIDE Rating</div>
                        </div>
                      )}
                      
                      {player.dateOfBirth && (
                        <div className="text-center">
                          <div className="text-3xl font-bold text-primary-700">
                            {calculateAge(player.dateOfBirth)}
                          </div>
                          <div className="text-sm text-primary-500">Age</div>
                        </div>
                      )}
                    </div>

                    {/* Status */}
                    <div className="flex justify-center">
                      <Badge className={player.active ? "bg-success-100 text-success-800" : "bg-primary-100 text-primary-800"}>
                        {player.active ? "Active" : "Inactive"}
                      </Badge>
                    </div>

                    {/* External Links */}
                    <div className="space-y-2">
                      {player.lichessHandle && (
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-sm text-primary-500">Lichess:</span>
                          <a
                            href={`https://lichess.org/@/${player.lichessHandle}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-accent-600 hover:text-accent-700"
                          >
                            @{player.lichessHandle}
                          </a>
                        </div>
                      )}
                      
                      {player.fideId && (
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-sm text-primary-500">FIDE ID:</span>
                          <span className="text-sm text-primary-600">{player.fideId}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

              {/* Bio and Detailed Stats */}
              <div className="lg:col-span-2">
                {/* Stats Header */}
                <div className="mb-6">
                  <Heading level="h3" className="mb-4">
                    Career Statistics
                  </Heading>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-4 bg-primary-50 rounded-lg">
                      <div className="text-2xl font-bold text-primary-700">15</div>
                      <div className="text-sm text-primary-500">Years Active</div>
                    </div>
                    
                    <div className="text-center p-4 bg-primary-50 rounded-lg">
                      <div className="text-2xl font-bold text-primary-700">2830</div>
                      <div className="text-sm text-primary-500">Peak Rating</div>
                    </div>
                    
                    <div className="text-center p-4 bg-primary-50 rounded-lg">
                      <div className="text-2xl font-bold text-primary-700">342</div>
                      <div className="text-sm text-primary-500">Tournaments</div>
                    </div>
                    
                    <div className="text-center p-4 bg-primary-50 rounded-lg">
                      <div className="text-2xl font-bold text-primary-700">68.5%</div>
                      <div className="text-sm text-primary-500">Win Rate</div>
                    </div>
                  </div>
                </div>

                {/* Biography */}
                {showFullBio && player.bio && (
                  <div>
                    <Heading level="h3" className="mb-4">
                      Biography
                    </Heading>
                    <div className="prose prose-primary max-w-none">
                      <Body size="base" className="text-primary-700 leading-relaxed">
                        {player.bio}
                      </Body>
                    </div>
                  </div>
                )}

                {/* Achievements */}
                <div className="mt-8">
                  <Heading level="h3" className="mb-4">
                    Notable Achievements
                  </Heading>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🏆</span>
                      <div>
                        <div className="font-semibold text-primary-900">World Chess Champion</div>
                        <div className="text-sm text-primary-600">2013-2023</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🥇</span>
                      <div>
                        <div className="font-semibold text-primary-900">Olympiad Gold Medal</div>
                        <div className="text-sm text-primary-600">2014, 2022</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">⭐</span>
                      <div>
                        <div className="font-semibold text-primary-900">Chess Oscar</div>
                        <div className="text-sm text-primary-600">2009, 2010, 2011, 2012</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
