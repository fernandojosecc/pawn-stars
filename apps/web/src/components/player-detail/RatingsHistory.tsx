import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/typography/Heading"
import { Body } from "@/components/typography/Body"

interface RatingPoint {
  date: string
  rating: number
  tournament?: string
  change?: number
}

interface RatingModality {
  name: string
  displayName: string
  currentRating: number
  peakRating: number
  peakDate: string
  history: RatingPoint[]
  color: string
  bgColor: string
}

interface RatingsHistoryProps {
  playerId: string
  showFullHistory?: boolean
}

export const RatingsHistorySection: React.FC<RatingsHistoryProps> = ({ 
  playerId,
  showFullHistory = false 
}) => {
  // Mock data for development - this would come from API in production
  const mockRatingsData: RatingModality[] = [
    {
      name: "classical",
      displayName: "Classical",
      currentRating: 2830,
      peakRating: 2882,
      peakDate: "2019-04-01",
      color: "text-accent-600",
      bgColor: "bg-accent-50",
      history: [
        { date: "2024-01-15", rating: 2830, tournament: "Tata Steel Masters", change: +5 },
        { date: "2023-12-20", rating: 2825, tournament: "London Chess Classic", change: -8 },
        { date: "2023-10-10", rating: 2833, tournament: "Sinquefield Cup", change: +12 },
        { date: "2023-08-05", rating: 2821, tournament: "Chess Olympiad", change: +3 },
        { date: "2023-06-15", rating: 2818, tournament: "Norway Chess", change: -7 },
        { date: "2023-04-01", rating: 2825, tournament: "Candidates Tournament", change: +15 },
        { date: "2023-02-10", rating: 2810, tournament: "Wijk aan Zee", change: -5 },
        { date: "2022-12-20", rating: 2815, tournament: "World Blitz Championship", change: +8 },
        { date: "2022-10-15", rating: 2807, tournament: "European Team Championship", change: +2 },
        { date: "2022-08-20", rating: 2805, tournament: "US Championship", change: +10 }
      ]
    },
    {
      name: "rapid",
      displayName: "Rapid",
      currentRating: 2785,
      peakRating: 2847,
      peakDate: "2022-12-01",
      color: "text-primary-600",
      bgColor: "bg-primary-50",
      history: [
        { date: "2024-01-10", rating: 2785, tournament: "Rapid Grand Prix", change: +12 },
        { date: "2023-11-15", rating: 2773, tournament: "European Rapid Championship", change: -8 },
        { date: "2023-09-20", rating: 2781, tournament: "World Rapid Championship", change: +18 },
        { date: "2023-07-10", rating: 2763, tournament: "St. Louis Rapid", change: +5 },
        { date: "2023-05-15", rating: 2758, tournament: "Asian Rapid Championship", change: -3 },
        { date: "2023-03-20", rating: 2761, tournament: "Dubai Rapid", change: +7 },
        { date: "2023-01-25", rating: 2754, tournament: "Prague Rapid", change: +11 },
        { date: "2022-12-01", rating: 2743, tournament: "FIDE Rapid Grand Prix", change: +15 },
        { date: "2022-10-10", rating: 2728, tournament: "Budapest Rapid", change: -2 },
        { date: "2022-08-15", rating: 2730, tournament: "Moscow Rapid", change: +6 }
      ]
    },
    {
      name: "blitz",
      displayName: "Blitz",
      currentRating: 2929,
      peakRating: 2991,
      peakDate: "2023-11-01",
      color: "text-success-600",
      bgColor: "bg-success-50",
      history: [
        { date: "2024-01-20", rating: 2929, tournament: "World Blitz Championship", change: +22 },
        { date: "2023-11-01", rating: 2907, tournament: "European Blitz Championship", change: +18 },
        { date: "2023-09-15", rating: 2889, tournament: "St. Louis Blitz", change: +15 },
        { date: "2023-07-20", rating: 2874, tournament: "Blitz Grand Prix", change: -8 },
        { date: "2023-05-25", rating: 2882, tournament: "Moscow Blitz", change: +12 },
        { date: "2023-03-30", rating: 2870, tournament: "Berlin Blitz", change: +7 },
        { date: "2023-02-10", rating: 2863, tournament: "Vienna Blitz", change: +19 },
        { date: "2022-12-15", rating: 2844, tournament: "Paris Blitz", change: +11 },
        { date: "2022-10-20", rating: 2833, tournament: "London Blitz", change: -5 },
        { date: "2022-08-25", rating: 2838, tournament: "Amsterdam Blitz", change: +8 }
      ]
    }
  ]

  const getRatingColor = (rating: number) => {
    if (rating >= 2800) return "text-accent-600 font-bold"
    if (rating >= 2700) return "text-primary-700 font-semibold"
    if (rating >= 2600) return "text-primary-600 font-medium"
    if (rating >= 2500) return "text-primary-500"
    return "text-primary-400"
  }

  const getChangeColor = (change?: number) => {
    if (!change) return "text-primary-500"
    if (change > 0) return "text-success-600 font-semibold"
    if (change < 0) return "text-danger-600 font-semibold"
    return "text-primary-500"
  }

  const getChangeSymbol = (change?: number) => {
    if (!change) return ""
    return change > 0 ? "+" : ""
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  return (
    <section className="py-8 bg-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <Heading level="h2" className="mb-4">
            Ratings History
          </Heading>
          <Body size="lg" className="text-primary-600 max-w-2xl mx-auto">
            Track rating progression across different time controls and tournaments
          </Body>
        </div>

        {/* Current Ratings Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {mockRatingsData.map((modality) => (
            <Card key={modality.name} className="shadow-chess hover:shadow-trophy transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-primary-900 mb-4">
                    {modality.displayName}
                  </h3>
                  
                  <div className="space-y-3">
                    <div>
                      <div className={`text-3xl font-bold ${modality.color}`}>
                        {modality.currentRating}
                      </div>
                      <div className="text-sm text-primary-500">Current Rating</div>
                    </div>
                    
                    <div className="text-sm text-primary-600">
                      <div>Peak: <span className="font-semibold">{modality.peakRating}</span></div>
                      <div>on {formatDate(modality.peakDate)}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed History */}
        <div className="space-y-8">
          {mockRatingsData.map((modality) => (
            <Card key={`history-${modality.name}`} className="shadow-chess">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${modality.bgColor} border-2 border-current`}></div>
                    <h3 className="text-xl font-semibold text-primary-900">
                      {modality.displayName} Rating History
                    </h3>
                  </div>
                  <Badge className={modality.bgColor + " " + modality.color}>
                    {modality.currentRating}
                  </Badge>
                </div>

                {/* Recent History Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-primary-200">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-primary-700">Date</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-primary-700">Tournament</th>
                        <th className="text-center py-3 px-4 text-sm font-semibold text-primary-700">Rating</th>
                        <th className="text-center py-3 px-4 text-sm font-semibold text-primary-700">Change</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(showFullHistory ? modality.history : modality.history.slice(0, 5)).map((point, index) => (
                        <tr key={index} className="border-b border-primary-100 hover:bg-primary-50 transition-colors">
                          <td className="py-3 px-4 text-sm text-primary-600">
                            {formatDate(point.date)}
                          </td>
                          <td className="py-3 px-4 text-sm text-primary-900 font-medium">
                            {point.tournament}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className={getRatingColor(point.rating)}>
                              {point.rating}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            {point.change !== undefined && (
                              <span className={getChangeColor(point.change)}>
                                {getChangeSymbol(point.change)}{point.change}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Show More/Less Button */}
                {!showFullHistory && modality.history.length > 5 && (
                  <div className="text-center mt-4">
                    <Button variant="outline" size="sm">
                      View Full History ({modality.history.length} entries)
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Rating Progress Summary */}
        <Card className="mt-8 shadow-chess">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-primary-900 mb-4">Rating Progress Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockRatingsData.map((modality) => {
                const recentChange = modality.history[0]?.change || 0
                const trend = recentChange > 0 ? "up" : recentChange < 0 ? "down" : "stable"
                
                return (
                  <div key={`summary-${modality.name}`} className="text-center">
                    <div className="text-lg font-semibold text-primary-900 mb-2">
                      {modality.displayName}
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <span className={`text-2xl ${modality.color}`}>
                        {modality.currentRating}
                      </span>
                      <span className={getChangeColor(recentChange)}>
                        {trend === "up" ? "↗" : trend === "down" ? "↘" : "→"}
                      </span>
                    </div>
                    <div className="text-sm text-primary-600 mt-1">
                      {getChangeSymbol(recentChange)}{recentChange} this tournament
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
