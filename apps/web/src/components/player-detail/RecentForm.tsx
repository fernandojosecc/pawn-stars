import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/typography/Heading"
import { Body } from "@/components/typography/Body"

interface GameResult {
  id: string
  date: string
  opponent: string
  opponentRating: number
  opponentTitle?: string
  opponentNationality: string
  result: "win" | "draw" | "loss"
  color: "white" | "black"
  tournament: string
  round?: number
  opening?: string
  moves?: number
  timeControl?: string
}

interface RecentFormProps {
  playerId: string
  showFullHistory?: boolean
}

export const RecentFormSection: React.FC<RecentFormProps> = ({ 
  playerId,
  showFullHistory = false 
}) => {
  // Mock data for development - this would come from API in production
  const mockRecentGames: GameResult[] = [
    {
      id: "1",
      date: "2024-01-20",
      opponent: "Fabiano Caruana",
      opponentRating: 2820,
      opponentTitle: "GM",
      opponentNationality: "USA",
      result: "win",
      color: "white",
      tournament: "Tata Steel Masters",
      round: 13,
      opening: "Queen's Gambit Declined",
      moves: 45,
      timeControl: "Classical"
    },
    {
      id: "2",
      date: "2024-01-18",
      opponent: "Hikaru Nakamura",
      opponentRating: 2778,
      opponentTitle: "GM",
      opponentNationality: "USA",
      result: "draw",
      color: "black",
      tournament: "Tata Steel Masters",
      round: 12,
      opening: "Sicilian Defense",
      moves: 68,
      timeControl: "Classical"
    },
    {
      id: "3",
      date: "2024-01-16",
      opponent: "Alireza Firouzja",
      opponentRating: 2793,
      opponentTitle: "GM",
      opponentNationality: "FRA",
      result: "win",
      color: "white",
      tournament: "Tata Steel Masters",
      round: 11,
      opening: "English Opening",
      moves: 52,
      timeControl: "Classical"
    },
    {
      id: "4",
      date: "2024-01-14",
      opponent: "Anish Giri",
      opponentRating: 2780,
      opponentTitle: "GM",
      opponentNationality: "NED",
      result: "loss",
      color: "black",
      tournament: "Tata Steel Masters",
      round: 10,
      opening: "Ruy Lopez",
      moves: 38,
      timeControl: "Classical"
    },
    {
      id: "5",
      date: "2024-01-12",
      opponent: "Wesley So",
      opponentRating: 2767,
      opponentTitle: "GM",
      opponentNationality: "USA",
      result: "win",
      color: "white",
      tournament: "Tata Steel Masters",
      round: 9,
      opening: "Italian Game",
      moves: 41,
      timeControl: "Classical"
    },
    {
      id: "6",
      date: "2024-01-10",
      opponent: "Levon Aronian",
      opponentRating: 2785,
      opponentTitle: "GM",
      opponentNationality: "USA",
      result: "draw",
      color: "black",
      tournament: "Tata Steel Masters",
      round: 8,
      opening: "King's Indian Defense",
      moves: 72,
      timeControl: "Classical"
    },
    {
      id: "7",
      date: "2024-01-08",
      opponent: "Richard Rapport",
      opponentRating: 2732,
      opponentTitle: "GM",
      opponentNationality: "ROU",
      result: "win",
      color: "white",
      tournament: "Tata Steel Masters",
      round: 7,
      opening: "Nimzo-Indian Defense",
      moves: 48,
      timeControl: "Classical"
    },
    {
      id: "8",
      date: "2024-01-06",
      opponent: "Shakhriyar Mamedyarov",
      opponentRating: 2762,
      opponentTitle: "GM",
      opponentNationality: "AZE",
      result: "draw",
      color: "black",
      tournament: "Tata Steel Masters",
      round: 6,
      opening: "Grünfeld Defense",
      moves: 55,
      timeControl: "Classical"
    }
  ]

  const getResultColor = (result: string) => {
    switch (result) {
      case "win":
        return "bg-success-500 text-white"
      case "draw":
        return "bg-primary-200 text-primary-800"
      case "loss":
        return "bg-danger-500 text-white"
      default:
        return "bg-primary-100 text-primary-800"
    }
  }

  const getResultSymbol = (result: string) => {
    switch (result) {
      case "win":
        return "1"
      case "draw":
        return "½"
      case "loss":
        return "0"
      default:
        return "-"
    }
  }

  const getColorEmoji = (color: string) => {
    return color === "white" ? "⚪" : "⚫"
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  const calculateFormScore = (games: GameResult[]) => {
    return games.reduce((score, game) => {
      if (game.result === "win") return score + 1
      if (game.result === "draw") return score + 0.5
      return score
    }, 0)
  }

  const calculatePerformance = (games: GameResult[]) => {
    const totalScore = calculateFormScore(games)
    const averageOpponentRating = games.reduce((sum, game) => sum + game.opponentRating, 0) / games.length
    return {
      score: totalScore,
      averageOpponentRating: Math.round(averageOpponentRating),
      performance: totalScore / games.length
    }
  }

  const displayedGames = showFullHistory ? mockRecentGames : mockRecentGames.slice(0, 5)
  const performance = calculatePerformance(displayedGames)

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <Heading level="h2" className="mb-4">
            Recent Form
          </Heading>
          <Body size="lg" className="text-primary-600 max-w-2xl mx-auto">
            Latest tournament results and performance analysis
          </Body>
        </div>

        {/* Form Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-chess">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary-700 mb-2">
                {performance.score}/{displayedGames.length}
              </div>
              <div className="text-sm text-primary-500">Points</div>
              <div className="text-xs text-primary-400 mt-1">
                {Math.round(performance.performance * 100)}% score rate
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-chess">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-accent-600 mb-2">
                {performance.averageOpponentRating}
              </div>
              <div className="text-sm text-primary-500">Avg. Opponent Rating</div>
              <div className="text-xs text-primary-400 mt-1">
                Strong opposition
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-chess">
            <CardContent className="p-6 text-center">
              <div className="flex justify-center gap-1 mb-2">
                {displayedGames.map((game, index) => (
                  <div
                    key={index}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${getResultColor(game.result)}`}
                  >
                    {getResultSymbol(game.result)}
                  </div>
                ))}
              </div>
              <div className="text-sm text-primary-500">Last {displayedGames.length} games</div>
              <div className="text-xs text-primary-400 mt-1">
                {displayedGames[0].tournament}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Games List */}
        <Card className="shadow-chess">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-primary-900">
                Recent Games
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-primary-500">Last {displayedGames.length} games</span>
                {!showFullHistory && mockRecentGames.length > 5 && (
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-4">
              {displayedGames.map((game, index) => (
                <div
                  key={game.id}
                  className="flex items-center justify-between p-4 border border-primary-200 rounded-lg hover:bg-primary-50 transition-colors"
                >
                  {/* Left side - Date and Tournament */}
                  <div className="flex-shrink-0 text-left">
                    <div className="text-sm text-primary-600 mb-1">
                      {formatDate(game.date)}
                    </div>
                    <div className="text-sm font-medium text-primary-900">
                      {game.tournament}
                    </div>
                    {game.round && (
                      <div className="text-xs text-primary-500">
                        Round {game.round}
                      </div>
                    )}
                  </div>

                  {/* Middle - Opponent and Game Details */}
                  <div className="flex-1 mx-4 text-center">
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <span className="text-lg">{getColorEmoji(game.color)}</span>
                      <div>
                        <div className="font-semibold text-primary-900">
                          {game.opponent}
                        </div>
                        <div className="flex items-center justify-center gap-2 text-sm text-primary-600">
                          <span>{getFlagEmoji(game.opponentNationality)}</span>
                          <span>{game.opponentRating}</span>
                          {game.opponentTitle && (
                            <Badge variant="outline" className="text-xs px-1 py-0">
                              {game.opponentTitle}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {game.opening && (
                      <div className="text-xs text-primary-500">
                        {game.opening} • {game.moves} moves
                      </div>
                    )}
                  </div>

                  {/* Right side - Result */}
                  <div className="flex-shrink-0 text-right">
                    <Badge className={getResultColor(game.result)}>
                      {game.result === "win" ? "Won" : game.result === "draw" ? "Draw" : "Lost"}
                    </Badge>
                    <div className="text-xs text-primary-500 mt-1">
                      {game.color === "white" ? "White" : "Black"}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Performance Analysis */}
            <div className="mt-6 pt-6 border-t border-primary-200">
              <h4 className="text-lg font-semibold text-primary-900 mb-4">
                Performance Analysis
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-primary-50 rounded-lg">
                  <div className="text-sm font-medium text-primary-700 mb-2">
                    By Color
                  </div>
                  <div className="space-y-2">
                    {["white", "black"].map((color) => {
                      const colorGames = displayedGames.filter(g => g.color === color)
                      const colorScore = calculateFormScore(colorGames)
                      return (
                        <div key={color} className="flex items-center justify-between text-sm">
                          <span className="capitalize text-primary-600">
                            {getColorEmoji(color)} {color}
                          </span>
                          <span className="font-semibold text-primary-900">
                            {colorScore}/{colorGames.length}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="p-4 bg-primary-50 rounded-lg">
                  <div className="text-sm font-medium text-primary-700 mb-2">
                    By Result
                  </div>
                  <div className="space-y-2">
                    {["win", "draw", "loss"].map((result) => {
                      const resultGames = displayedGames.filter(g => g.result === result)
                      return (
                        <div key={result} className="flex items-center justify-between text-sm">
                          <span className="capitalize text-primary-600">
                            {result === "win" ? "Wins" : result === "draw" ? "Draws" : "Losses"}
                          </span>
                          <span className="font-semibold text-primary-900">
                            {resultGames.length}
                          </span>
                        </div>
                      )
                    })}
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
