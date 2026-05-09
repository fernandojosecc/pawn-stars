"use client"

import React, { useState, useEffect } from "react"
import { TournamentCardComponent } from "@/components/tournaments/TournamentCard"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heading } from "@/components/typography/Heading"
import { Body } from "@/components/typography/Body"
import { TournamentCard, TournamentStatus, TournamentFormat } from "@pawn-stars/shared-types"

// Mock data for development - this would come from API in production
const mockTournaments: TournamentCard[] = [
  {
    id: "1",
    slug: "tata-steel-masters-2024",
    name: "Tata Steel Masters 2024",
    format: "Round-Robin",
    status: "COMPLETED",
    startDate: new Date("2024-01-12"),
    endDate: new Date("2024-01-28"),
    location: "Wijk aan Zee, Netherlands"
  },
  {
    id: "2",
    slug: "world-chess-championship-2023",
    name: "World Chess Championship 2023",
    format: "Knockout",
    status: "COMPLETED",
    startDate: new Date("2023-11-20"),
    endDate: new Date("2023-12-15"),
    location: "Dubai, UAE"
  },
  {
    id: "3",
    slug: "sinquefield-cup-2023",
    name: "Sinquefield Cup 2023",
    format: "Round-Robin",
    status: "COMPLETED",
    startDate: new Date("2023-09-01"),
    endDate: new Date("2023-09-15"),
    location: "St. Louis, USA"
  },
  {
    id: "4",
    slug: "candidates-tournament-2023",
    name: "Candidates Tournament 2023",
    format: "Round-Robin",
    status: "COMPLETED",
    startDate: new Date("2023-04-15"),
    endDate: new Date("2023-05-05"),
    location: "Toronto, Canada"
  },
  {
    id: "5",
    slug: "norway-chess-2023",
    name: "Norway Chess 2023",
    format: "Round-Robin",
    status: "COMPLETED",
    startDate: new Date("2023-05-30"),
    endDate: new Date("2023-06-10"),
    location: "Stavanger, Norway"
  },
  {
    id: "6",
    slug: "world-rapid-championship-2022",
    name: "World Rapid Championship 2022",
    format: "Swiss",
    status: "COMPLETED",
    startDate: new Date("2022-12-25"),
    endDate: new Date("2022-12-30"),
    location: "Samarkand, Uzbekistan"
  },
  {
    id: "7",
    slug: "fide-grand-prix-berlin-2022",
    name: "FIDE Grand Prix Berlin 2022",
    format: "Knockout",
    status: "COMPLETED",
    startDate: new Date("2022-10-15"),
    endDate: new Date("2022-10-25"),
    location: "Berlin, Germany"
  },
  {
    id: "8",
    slug: "olympiad-2022",
    name: "Chess Olympiad 2022",
    format: "Swiss",
    status: "COMPLETED",
    startDate: new Date("2022-07-28"),
    endDate: new Date("2022-08-10"),
    location: "Chennai, India"
  },
  {
    id: "9",
    slug: "tata-steel-masters-2025",
    name: "Tata Steel Masters 2025",
    format: "Round-Robin",
    status: "UPCOMING",
    startDate: new Date("2025-01-10"),
    endDate: new Date("2025-01-26"),
    location: "Wijk aan Zee, Netherlands"
  },
  {
    id: "10",
    slug: "candidates-tournament-2024",
    name: "Candidates Tournament 2024",
    format: "Round-Robin",
    status: "UPCOMING",
    startDate: new Date("2024-04-03"),
    endDate: new Date("2024-04-22"),
    location: "Toronto, Canada"
  },
  {
    id: "11",
    slug: "world-chess-championship-2024",
    name: "World Chess Championship 2024",
    format: "Knockout",
    status: "UPCOMING",
    startDate: new Date("2024-11-20"),
    endDate: new Date("2024-12-15"),
    location: "New York, USA"
  },
  {
    id: "12",
    slug: "sinquefield-cup-2024",
    name: "Sinquefield Cup 2024",
    format: "Round-Robin",
    status: "ONGOING",
    startDate: new Date("2024-08-20"),
    endDate: new Date("2024-09-05"),
    location: "St. Louis, USA"
  }
]

type TournamentStatusFilter = TournamentStatus | "ALL"

export default function TournamentsPage() {
  const [selectedStatus, setSelectedStatus] = useState<TournamentStatusFilter>("ALL")
  const [filteredTournaments, setFilteredTournaments] = useState<TournamentCard[]>(mockTournaments)
  const [isLoading, setIsLoading] = useState(false)

  // Filter tournaments based on selected status
  useEffect(() => {
    setIsLoading(true)
    // Simulate API call delay
    const timeout = setTimeout(() => {
      if (selectedStatus === "ALL") {
        setFilteredTournaments(mockTournaments)
      } else {
        setFilteredTournaments(mockTournaments.filter(tournament => tournament.status === selectedStatus))
      }
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(timeout)
  }, [selectedStatus])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "UPCOMING":
        return "bg-primary-100 text-primary-800 hover:bg-primary-200"
      case "ONGOING":
        return "bg-success-100 text-success-800 hover:bg-success-200"
      case "COMPLETED":
        return "bg-accent-100 text-accent-800 hover:bg-accent-200"
      case "CANCELLED":
        return "bg-danger-100 text-danger-800 hover:bg-danger-200"
      default:
        return "bg-primary-100 text-primary-800 hover:bg-primary-200"
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

  const getStatusCount = (status: TournamentStatusFilter) => {
    if (status === "ALL") return mockTournaments.length
    return mockTournaments.filter(tournament => tournament.status === status).length
  }

  const handleTournamentClick = (tournament: TournamentCard) => {
    // In a real app, this would navigate to tournament detail page
    console.log(`Navigate to tournament: ${tournament.slug}`)
  }

  return (
    <div className="min-h-screen bg-primary-50">
      {/* Header */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Heading level="h1" className="mb-4">
              Chess Tournaments
            </Heading>
            <Body size="lg" className="text-primary-600 max-w-2xl mx-auto">
              Explore upcoming, ongoing, and completed chess tournaments from around the world.
            </Body>
          </div>
        </div>
      </section>

      {/* Status Filter */}
      <section className="py-8 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div>
              <Heading level="h2" className="mb-2">
                Filter by Status
              </Heading>
              <Body size="base" className="text-primary-600">
                {filteredTournaments.length} tournament{filteredTournaments.length !== 1 ? 's' : ''} found
              </Body>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-primary-500">View:</span>
              <div className="flex flex-wrap gap-2">
                {(["ALL", "UPCOMING", "ONGOING", "COMPLETED", "CANCELLED"] as TournamentStatusFilter[]).map((status) => (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedStatus === status
                        ? getStatusColor(status)
                        : "bg-white text-primary-600 hover:bg-primary-100 border border-primary-200"
                    }`}
                  >
                    <span className="mr-1">{getStatusIcon(status)}</span>
                    {status === "ALL" ? "All" : status}
                    <span className="ml-1 text-xs opacity-75">({getStatusCount(status)})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Active Filters Display */}
          {selectedStatus !== "ALL" && (
            <div className="flex items-center gap-2 mb-6">
              <span className="text-sm text-primary-500">Active filter:</span>
              <Badge className={getStatusColor(selectedStatus)}>
                <span className="mr-1">{getStatusIcon(selectedStatus)}</span>
                {selectedStatus}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedStatus("ALL")}
                className="text-xs"
              >
                Clear
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Tournaments Grid */}
      <section className="py-8 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
          ) : filteredTournaments.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🏆</div>
              <Heading level="h3" className="mb-2">
                No tournaments found
              </Heading>
              <Body size="base" className="text-primary-600">
                Try adjusting your filters or check back later for new tournaments.
              </Body>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTournaments.map((tournament) => (
                <TournamentCardComponent
                  key={tournament.id}
                  tournament={tournament}
                  onClick={() => handleTournamentClick(tournament)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Heading level="h2" className="mb-6 text-center">
            Tournament Statistics
          </Heading>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-primary-50 rounded-lg">
              <div className="text-2xl font-bold text-primary-700">
                {mockTournaments.filter(t => t.status === "UPCOMING").length}
              </div>
              <div className="text-sm text-primary-500">Upcoming</div>
            </div>
            <div className="text-center p-4 bg-primary-50 rounded-lg">
              <div className="text-2xl font-bold text-success-600">
                {mockTournaments.filter(t => t.status === "ONGOING").length}
              </div>
              <div className="text-sm text-primary-500">Live Now</div>
            </div>
            <div className="text-center p-4 bg-primary-50 rounded-lg">
              <div className="text-2xl font-bold text-accent-600">
                {mockTournaments.filter(t => t.status === "COMPLETED").length}
              </div>
              <div className="text-sm text-primary-500">Completed</div>
            </div>
            <div className="text-center p-4 bg-primary-50 rounded-lg">
              <div className="text-2xl font-bold text-primary-700">
                {mockTournaments.length}
              </div>
              <div className="text-sm text-primary-500">Total</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
