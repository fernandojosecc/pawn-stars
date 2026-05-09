import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/typography/Heading"
import { Body } from "@/components/typography/Body"

interface TournamentResult {
  id: string
  tournament: string
  location: string
  startDate: string
  endDate: string
  format: string
  timeControl: string
  position: number
  totalPlayers: number
  score: number
  gamesPlayed: number
  wins: number
  draws: number
  losses: number
  ratingPerformance?: number
  prizeMoney?: string
  category?: string
  notableGames?: string[]
}

interface TournamentResultsProps {
  playerId: string
  showFullHistory?: boolean
}

export const TournamentResultsSection: React.FC<TournamentResultsProps> = ({ 
  playerId,
  showFullHistory = false 
}) => {
  // Mock data for development - this would come from API in production
  const mockTournamentResults: TournamentResult[] = [
    {
      id: "1",
      tournament: "Tata Steel Masters",
      location: "Wijk aan Zee, Netherlands",
      startDate: "2024-01-12",
      endDate: "2024-01-28",
      format: "Round Robin",
      timeControl: "Classical",
      position: 1,
      totalPlayers: 14,
      score: 8.5,
      gamesPlayed: 13,
      wins: 6,
      draws: 5,
      losses: 2,
      ratingPerformance: 2857,
      prizeMoney: "€10,000",
      category: "XXI",
      notableGames: ["Beat Caruana in round 13", "Drew with Nakamura in round 12"]
    },
    {
      id: "2",
      tournament: "World Chess Championship",
      location: "Dubai, UAE",
      startDate: "2023-11-20",
      endDate: "2023-12-15",
      format: "Match",
      timeControl: "Classical",
      position: 1,
      totalPlayers: 2,
      score: 7.5,
      gamesPlayed: 14,
      wins: 3,
      draws: 9,
      losses: 2,
      ratingPerformance: 2845,
      prizeMoney: "$1.2M",
      category: "XXII",
      notableGames: ["Decisive win in game 14", "Comeback draw in game 11"]
    },
    {
      id: "3",
      tournament: "Sinquefield Cup",
      location: "St. Louis, USA",
      startDate: "2023-09-01",
      endDate: "2023-09-15",
      format: "Round Robin",
      timeControl: "Classical",
      position: 2,
      totalPlayers: 10,
      score: 6.0,
      gamesPlayed: 9,
      wins: 3,
      draws: 6,
      losses: 0,
      ratingPerformance: 2832,
      prizeMoney: "$30,000",
      category: "XX",
      notableGames: ["Brilliant win against Nepo", "Fighting draw with Caruana"]
    },
    {
      id: "4",
      tournament: "Candidates Tournament",
      location: "Toronto, Canada",
      startDate: "2023-04-15",
      endDate: "2023-05-05",
      format: "Double Round Robin",
      timeControl: "Classical",
      position: 1,
      totalPlayers: 8,
      score: 9.5,
      gamesPlayed: 14,
      wins: 5,
      draws: 9,
      losses: 0,
      ratingPerformance: 2848,
      prizeMoney: "$48,000",
      category: "XXI",
      notableGames: ["Crucial win in round 13", "Strategic masterpiece vs Firouzja"]
    },
    {
      id: "5",
      tournament: "Norway Chess",
      location: "Stavanger, Norway",
      startDate: "2023-05-30",
      endDate: "2023-06-10",
      format: "Round Robin",
      timeControl: "Classical",
      position: 3,
      totalPlayers: 10,
      score: 5.5,
      gamesPlayed: 9,
      wins: 2,
      draws: 7,
      losses: 0,
      ratingPerformance: 2815,
      prizeMoney: "€20,000",
      category: "XX",
      notableGames: ["Solid performance throughout", "Key draw with Alireza"]
    },
    {
      id: "6",
      tournament: "World Rapid Championship",
      location: "Samarkand, Uzbekistan",
      startDate: "2022-12-25",
      endDate: "2022-12-30",
      format: "Swiss",
      timeControl: "Rapid",
      position: 1,
      totalPlayers: 150,
      score: 9.5,
      gamesPlayed: 13,
      wins: 8,
      draws: 3,
      losses: 2,
      ratingPerformance: 2847,
      prizeMoney: "$40,000",
      category: "XXI",
      notableGames: ["Dominant performance", "Final round victory"]
    },
    {
      id: "7",
      tournament: "Tata Steel Masters",
      location: "Wijk aan Zee, Netherlands",
      startDate: "2023-01-13",
      endDate: "2023-01-29",
      format: "Round Robin",
      timeControl: "Classical",
      position: 2,
      totalPlayers: 14,
      score: 8.0,
      gamesPlayed: 13,
      wins: 5,
      draws: 6,
      losses: 2,
      ratingPerformance: 2838,
      prizeMoney: "€8,000",
      category: "XXI",
      notableGames: ["Strong finish", "Tactical brilliancy vs Giri"]
    },
    {
      id: "8",
      tournament: "FIDE Grand Prix",
      location: "Berlin, Germany",
      startDate: "2022-10-15",
      endDate: "2022-10-25",
      format: "Knockout",
      timeControl: "Classical",
      position: 1,
      totalPlayers: 16,
      score: 10.5,
      gamesPlayed: 15,
      wins: 7,
      draws: 7,
      losses: 1,
      ratingPerformance: 2825,
      prizeMoney: "$24,000",
      category: "XX",
      notableGames: ["Final victory over Nakamura", "Semi-final comeback"]
    }
  ]

  const getPositionColor = (position: number, totalPlayers: number) => {
    if (position === 1) return "bg-accent-500 text-white"
    if (position === 2) return "bg-primary-200 text-primary-800"
    if (position === 3) return "bg-success-200 text-success-800"
    if (position <= totalPlayers * 0.25) return "bg-primary-100 text-primary-800"
    return "bg-primary-50 text-primary-700"
  }

  const getPositionSymbol = (position: number) => {
    if (position === 1) return "🏆"
    if (position === 2) return "🥈"
    if (position === 3) return "🥉"
    return `#${position}`
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  const getScoreColor = (score: number, gamesPlayed: number) => {
    const percentage = score / gamesPlayed
    if (percentage >= 0.75) return "text-success-600 font-semibold"
    if (percentage >= 0.6) return "text-primary-600 font-medium"
    if (percentage >= 0.5) return "text-primary-500"
    return "text-primary-400"
  }

  const calculateStats = (results: TournamentResult[]) => {
    const totalGames = results.reduce((sum, r) => sum + r.gamesPlayed, 0)
    const totalScore = results.reduce((sum, r) => sum + r.score, 0)
    const totalWins = results.reduce((sum, r) => sum + r.wins, 0)
    const totalDraws = results.reduce((sum, r) => sum + r.draws, 0)
    const totalLosses = results.reduce((sum, r) => sum + r.losses, 0)
    
    const wins = results.filter(r => r.position === 1).length
    const podiumFinishes = results.filter(r => r.position <= 3).length
    const top5Finishes = results.filter(r => r.position <= 5).length
    
    return {
      totalGames,
      totalScore,
      totalWins,
      totalDraws,
      totalLosses,
      winRate: totalWins / totalGames,
      scoreRate: totalScore / totalGames,
      tournamentWins: wins,
      podiumFinishes,
      top5Finishes,
      averagePosition: results.reduce((sum, r) => sum + r.position, 0) / results.length
    }
  }

  const displayedResults = showFullHistory ? mockTournamentResults : mockTournamentResults.slice(0, 5)
  const stats = calculateStats(displayedResults)

  return (
    <section className="py-8 bg-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <Heading level="h2" className="mb-4">
            Tournament History
          </Heading>
          <Body size="lg" className="text-primary-600 max-w-2xl mx-auto">
            Complete tournament results and career achievements
          </Body>
        </div>

        {/* Tournament Statistics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <Card className="shadow-chess">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-accent-600 mb-1">
                {stats.tournamentWins}
              </div>
              <div className="text-xs text-primary-500">Tournament Wins</div>
            </CardContent>
          </Card>

          <Card className="shadow-chess">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary-600 mb-1">
                {stats.podiumFinishes}
              </div>
              <div className="text-xs text-primary-500">Podium Finishes</div>
            </CardContent>
          </Card>

          <Card className="shadow-chess">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-success-600 mb-1">
                {Math.round(stats.scoreRate * 100)}%
              </div>
              <div className="text-xs text-primary-500">Score Rate</div>
            </CardContent>
          </Card>

          <Card className="shadow-chess">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary-700 mb-1">
                {stats.averagePosition.toFixed(1)}
              </div>
              <div className="text-xs text-primary-500">Avg. Position</div>
            </CardContent>
          </Card>
        </div>

        {/* Tournament Results List */}
        <Card className="shadow-chess">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-primary-900">
                Recent Tournaments
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-primary-500">Last {displayedResults.length} tournaments</span>
                {!showFullHistory && mockTournamentResults.length > 5 && (
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-4">
              {displayedResults.map((result, index) => (
                <div
                  key={result.id}
                  className="p-4 border border-primary-200 rounded-lg hover:bg-primary-100 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    {/* Tournament Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-semibold text-primary-900">
                          {result.tournament}
                        </h4>
                        <Badge className={getPositionColor(result.position, result.totalPlayers)}>
                          {getPositionSymbol(result.position)}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-primary-600 mb-2">
                        <div>
                          <span className="font-medium">Location:</span> {result.location}
                        </div>
                        <div>
                          <span className="font-medium">Date:</span> {formatDate(result.startDate)} - {formatDate(result.endDate)}
                        </div>
                        <div>
                          <span className="font-medium">Format:</span> {result.format} • {result.timeControl}
                        </div>
                        <div>
                          <span className="font-medium">Category:</span> {result.category || "N/A"}
                        </div>
                      </div>
                    </div>

                    {/* Position and Score */}
                    <div className="text-right ml-4">
                      <div className="text-2xl font-bold text-primary-900 mb-1">
                        {result.score}/{result.gamesPlayed}
                      </div>
                      <div className="text-sm text-primary-600">
                        {result.position}/{result.totalPlayers}
                      </div>
                    </div>
                  </div>

                  {/* Game Results Breakdown */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-success-600 font-medium">
                        {result.wins}W
                      </span>
                      <span className="text-primary-600 font-medium">
                        {result.draws}D
                      </span>
                      <span className="text-danger-600 font-medium">
                        {result.losses}L
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-primary-600">
                      {result.ratingPerformance && (
                        <span>Perf: {result.ratingPerformance}</span>
                      )}
                      {result.prizeMoney && (
                        <span>Prize: {result.prizeMoney}</span>
                      )}
                    </div>
                  </div>

                  {/* Notable Games */}
                  {result.notableGames && result.notableGames.length > 0 && (
                    <div className="pt-3 border-t border-primary-200">
                      <div className="text-sm font-medium text-primary-700 mb-2">
                        Notable Games:
                      </div>
                      <div className="space-y-1">
                        {result.notableGames.map((game, gameIndex) => (
                          <div key={gameIndex} className="text-xs text-primary-600">
                            • {game}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Year-by-Year Summary */}
            <div className="mt-6 pt-6 border-t border-primary-200">
              <h4 className="text-lg font-semibold text-primary-900 mb-4">
                Performance by Year
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {["2024", "2023", "2022"].map((year) => {
                  const yearResults = displayedResults.filter(r => 
                    new Date(r.startDate).getFullYear().toString() === year
                  )
                  
                  if (yearResults.length === 0) return null
                  
                  const yearStats = calculateStats(yearResults)
                  
                  return (
                    <div key={year} className="p-4 bg-primary-50 rounded-lg">
                      <div className="text-lg font-semibold text-primary-900 mb-2">
                        {year}
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-primary-600">Tournaments:</span>
                          <span className="font-medium text-primary-900">{yearResults.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-primary-600">Wins:</span>
                          <span className="font-medium text-primary-900">{yearStats.tournamentWins}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-primary-600">Score:</span>
                          <span className={getScoreColor(yearStats.totalScore, yearStats.totalGames)}>
                            {yearStats.totalScore}/{yearStats.totalGames}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-primary-600">Avg Position:</span>
                          <span className="font-medium text-primary-900">
                            {yearStats.averagePosition.toFixed(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
