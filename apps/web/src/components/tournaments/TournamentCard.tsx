import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/typography/Heading"
import { Body } from "@/components/typography/Body"
import { TournamentCard as TournamentCardType } from "@pawn-stars/shared-types"

interface TournamentCardProps {
  tournament: TournamentCardType
  showLocation?: boolean
  showDates?: boolean
  compact?: boolean
  onClick?: () => void
}

export const TournamentCardComponent: React.FC<TournamentCardProps> = ({ 
  tournament, 
  showLocation = true, 
  showDates = true,
  compact = false,
  onClick 
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "UPCOMING":
        return "bg-primary-100 text-primary-800"
      case "ONGOING":
        return "bg-success-100 text-success-800"
      case "COMPLETED":
        return "bg-accent-100 text-accent-800"
      case "CANCELLED":
        return "bg-danger-100 text-danger-800"
      default:
        return "bg-primary-100 text-primary-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "UPCOMING":
        return "📅"
      case "ONGOING":
        return "🔴"
      case "COMPLETED":
        return "✅"
      case "CANCELLED":
        return "❌"
      default:
        return "📋"
    }
  }

  const getFormatColor = (format: string) => {
    switch (format) {
      case "Swiss":
        return "bg-primary-200 text-primary-800"
      case "Round-Robin":
        return "bg-accent-200 text-accent-800"
      case "Knockout":
        return "bg-success-200 text-success-800"
      case "League":
        return "bg-warning-200 text-warning-800"
      default:
        return "bg-primary-200 text-primary-800"
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  const formatDateRange = (startDate: Date, endDate?: Date) => {
    const start = formatDate(startDate)
    if (endDate) {
      const end = formatDate(endDate)
      return `${start} - ${end}`
    }
    return start
  }

  const isOngoing = tournament.status === "ONGOING"
  const cardSize = compact ? "p-4" : "p-6"
  const titleSize = compact ? "text-lg" : "text-xl"

  return (
    <Card 
      className={`group hover:shadow-trophy transition-all duration-300 hover:-translate-y-1 cursor-pointer ${compact ? 'h-full' : ''}`}
      onClick={onClick}
    >
      <CardContent className={`${cardSize}`}>
        <div className="space-y-4">
          {/* Header with Status and Format */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <Heading level="h3" className={`${titleSize} font-bold text-primary-900 group-hover:text-accent-600 transition-colors line-clamp-2`}>
                {tournament.name}
              </Heading>
              
              <div className="flex items-center gap-2 mt-2">
                <Badge className={getStatusColor(tournament.status)}>
                  <span className="mr-1">{getStatusIcon(tournament.status)}</span>
                  {tournament.status}
                </Badge>
                <Badge className={getFormatColor(tournament.format)}>
                  {tournament.format}
                </Badge>
              </div>
            </div>

            {/* Live indicator for ongoing tournaments */}
            {isOngoing && (
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-3 h-3 bg-success-500 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 w-3 h-3 bg-success-500 rounded-full animate-ping"></div>
                </div>
              </div>
            )}
          </div>

          {/* Tournament Details */}
          <div className="space-y-3">
            {/* Dates */}
            {showDates && (
              <div className="flex items-center gap-2 text-sm text-primary-600">
                <span className="text-lg">📅</span>
                <span>{formatDateRange(tournament.startDate, tournament.endDate)}</span>
              </div>
            )}

            {/* Location */}
            {showLocation && tournament.location && (
              <div className="flex items-center gap-2 text-sm text-primary-600">
                <span className="text-lg">📍</span>
                <span className="line-clamp-1">{tournament.location}</span>
              </div>
            )}

            {/* Additional Info for non-compact cards */}
            {!compact && (
              <div className="flex items-center justify-between pt-3 border-t border-primary-200">
                <div className="text-xs text-primary-500">
                  {isOngoing ? "Live now" : tournament.status === "UPCOMING" ? "Starting soon" : "Completed"}
                </div>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            )}
          </div>

          {/* Compact card footer */}
          {compact && (
            <div className="flex items-center justify-between pt-3 border-t border-primary-200">
              <div className="text-xs text-primary-500">
                {isOngoing ? "Live" : tournament.status === "UPCOMING" ? "Upcoming" : "Completed"}
              </div>
              <div className="text-xs text-primary-400">
                {formatDate(tournament.startDate)}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
