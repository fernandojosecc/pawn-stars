import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PlayerCard as PlayerCardType, PlayerTitle } from "@pawn-stars/shared-types"

interface PlayerCardProps {
  player: PlayerCardType
  showRating?: boolean
  showTeam?: boolean
  compact?: boolean
  onClick?: () => void
}

export const PlayerCardComponent: React.FC<PlayerCardProps> = ({ 
  player, 
  showRating = true, 
  showTeam = false, 
  compact = false,
  onClick 
}) => {
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

  const cardSize = compact ? "p-4" : "p-6"
  const imageSize = compact ? "w-16 h-16" : "w-24 h-24"
  const nameSize = compact ? "text-lg" : "text-xl"
  const ratingSize = compact ? "text-lg" : "text-2xl"

  return (
    <Card 
      className={`group hover:shadow-trophy transition-all duration-300 hover:-translate-y-1 cursor-pointer ${compact ? 'h-full' : ''}`}
      onClick={onClick}
    >
      <CardContent className={`${cardSize}`}>
        <div className={`flex items-center gap-4 ${compact ? '' : 'flex-col'}`}>
          {/* Player photo */}
          <div className={`relative flex-shrink-0`}>
            <div className={`${imageSize} bg-gradient-to-br from-primary-100 to-primary-200 rounded-full overflow-hidden`}>
              {player.photoUrl ? (
                <img
                  src={player.photoUrl}
                  alt={`${player.firstName} ${player.lastName}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className={`${compact ? 'text-2xl' : 'text-3xl'} text-primary-400`}>
                    {player.firstName[0]}{player.lastName[0]}
                  </div>
                </div>
              )}
            </div>
            
            {/* Title badge */}
            {player.title && (
              <div className={`absolute -top-1 -right-1 ${compact ? '-top-0 -right-0' : ''}`}>
                <Badge className={`${getTitleColor(player.title)} text-xs ${compact ? 'scale-75' : ''}`}>
                  {player.title}
                </Badge>
              </div>
            )}
          </div>

          {/* Player info */}
          <div className={`flex-1 min-w-0 ${compact ? '' : 'text-center'}`}>
            {/* Name and nationality */}
            <div className={`flex items-center ${compact ? 'gap-2' : 'justify-center gap-3'} mb-2`}>
              <span className={`${compact ? 'text-sm' : 'text-lg'}`}>{getFlagEmoji(player.nationality)}</span>
              <h3 className={`${nameSize} font-bold text-primary-900 group-hover:text-accent-600 transition-colors truncate`}>
                {player.firstName} {player.lastName}
              </h3>
            </div>
            
            {/* Rating */}
            {showRating && player.currentRating && (
              <div className={`mb-2 ${compact ? '' : 'text-center'}`}>
                <div className={`${ratingSize} font-bold ${getRatingColor(player.currentRating)}`}>
                  {player.currentRating}
                </div>
                <div className={`text-xs ${compact ? 'text-primary-500' : 'text-primary-400'} font-medium`}>
                  FIDE Rating
                </div>
              </div>
            )}

            {/* Nationality and status */}
            <div className={`flex items-center ${compact ? 'gap-2' : 'justify-center gap-2'} text-sm text-primary-600 mb-3`}>
              <span>{player.nationality}</span>
              {player.active && (
                <Badge variant="success" className="text-xs">
                  Active
                </Badge>
              )}
            </div>

            {/* Action button */}
            {!compact && (
              <div className="mt-4">
                <Button variant="outline" size="sm" className="w-full">
                  View Profile
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
