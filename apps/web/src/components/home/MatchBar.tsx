import React from "react"
import { Badge } from "@/components/ui/badge"
import { Body } from "@/components/typography/Body"
import { MatchPreview, MatchStatus } from "@pawn-stars/shared-types"

interface MatchBarProps {
  matches?: MatchPreview[]
  showLive?: boolean
  maxMatches?: number
}

export const MatchBar: React.FC<MatchBarProps> = ({ 
  matches = [], 
  showLive = true, 
  maxMatches = 3 
}) => {
  // Mock data for development
  const mockMatches: MatchPreview[] = [
    {
      id: "1",
      date: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
      venue: "Chess Club Downtown",
      status: "UPCOMING",
      homeTeam: {
        id: "team1",
        name: "Pawn Stars A",
        shortName: "PSA",
        logo: "/teams/psa.png"
      },
      awayTeam: {
        id: "team2", 
        name: "Knight Raiders",
        shortName: "KR",
        logo: "/teams/kr.png"
      }
    },
    {
      id: "2",
      date: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago (live)
      venue: "Tournament Hall",
      status: "LIVE",
      homeTeam: {
        id: "team3",
        name: "Pawn Stars B",
        shortName: "PSB", 
        logo: "/teams/psb.png"
      },
      awayTeam: {
        id: "team4",
        name: "Bishop Brigade",
        shortName: "BB",
        logo: "/teams/bb.png"
      },
      homeScore: 2.5,
      awayScore: 1.5
    },
    {
      id: "3",
      date: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      venue: "Community Center",
      status: "UPCOMING", 
      homeTeam: {
        id: "team5",
        name: "Pawn Stars C",
        shortName: "PSC",
        logo: "/teams/psc.png"
      },
      awayTeam: {
        id: "team6",
        name: "Rook Rebels",
        shortName: "RR",
        logo: "/teams/rr.png"
      }
    }
  ]

  const displayMatches = matches.length > 0 ? matches : mockMatches
  const filteredMatches = displayMatches
    .slice(0, maxMatches)
    .filter(match => showLive || match.status !== "LIVE")

  const getStatusColor = (status: MatchStatus) => {
    switch (status) {
      case "LIVE":
        return "bg-red-500 text-white animate-pulse"
      case "UPCOMING":
        return "bg-primary-100 text-primary-800"
      case "COMPLETED":
        return "bg-success-100 text-success-800"
      default:
        return "bg-primary-100 text-primary-800"
    }
  }

  const getStatusText = (status: MatchStatus) => {
    switch (status) {
      case "LIVE":
        return "LIVE"
      case "UPCOMING":
        return "UPCOMING"
      case "COMPLETED":
        return "FINISHED"
      default:
        return status
    }
  }

  const formatMatchTime = (date: Date) => {
    const now = new Date()
    const diff = date.getTime() - now.getTime()
    const hours = Math.floor(Math.abs(diff) / (1000 * 60 * 60))
    const minutes = Math.floor(Math.abs(diff) / (1000 * 60))

    if (diff > 0) {
      if (hours < 24) {
        return `In ${hours}h ${minutes % 60}m`
      }
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } else {
      if (hours < 1) {
        return `${minutes}m ago`
      }
      return `${hours}h ago`
    }
  }

  if (filteredMatches.length === 0) {
    return null
  }

  return (
    <div className="bg-primary-900 text-white border-b border-primary-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-3">
          <div className="flex items-center justify-between mb-2">
            <Body size="sm" weight="semibold" className="text-primary-200">
              Match Center
            </Body>
            {showLive && filteredMatches.some(m => m.status === "LIVE") && (
              <Badge className="bg-red-500 text-white animate-pulse text-xs">
                ● LIVE
              </Badge>
            )}
          </div>
          
          <div className="space-y-2">
            {filteredMatches.map((match) => (
              <div 
                key={match.id}
                className="flex items-center justify-between bg-primary-800/50 rounded-lg px-3 py-2 hover:bg-primary-800/70 transition-colors"
              >
                {/* Teams */}
                <div className="flex items-center space-x-3 min-w-0 flex-1">
                  {/* Home team */}
                  <div className="text-right">
                    <Body size="sm" weight="medium" className="text-white truncate">
                      {match.homeTeam.shortName || match.homeTeam.name}
                    </Body>
                  </div>
                  
                  {/* Score or VS */}
                  <div className="flex items-center space-x-2">
                    {match.status === "LIVE" && match.homeScore !== undefined ? (
                      <div className="flex items-center space-x-1">
                        <span className="text-accent-400 font-bold">{match.homeScore}</span>
                        <span className="text-primary-400">:</span>
                        <span className="text-accent-400 font-bold">{match.awayScore}</span>
                      </div>
                    ) : (
                      <span className="text-primary-400 text-xs">VS</span>
                    )}
                  </div>
                  
                  {/* Away team */}
                  <div className="text-left">
                    <Body size="sm" weight="medium" className="text-white truncate">
                      {match.awayTeam.shortName || match.awayTeam.name}
                    </Body>
                  </div>
                </div>

                {/* Match info */}
                <div className="flex items-center space-x-3 ml-4">
                  <Badge className={getStatusColor(match.status)}>
                    {getStatusText(match.status)}
                  </Badge>
                  <div className="text-right">
                    <Body size="xs" className="text-primary-300">
                      {formatMatchTime(match.date)}
                    </Body>
                    {match.venue && (
                      <Body size="xs" className="text-primary-400">
                        {match.venue}
                      </Body>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
