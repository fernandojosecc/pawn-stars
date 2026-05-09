import React, { useState, useEffect } from "react"
import { PlayerCardComponent } from "@/components/players/PlayerCard"
import { FilterBar } from "@/components/players/FilterBar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heading } from "@/components/typography/Heading"
import { Body } from "@/components/typography/Body"
import { PlayerCard, PlayerFilter, PlayerTitle } from "@pawn-stars/shared-types"
import { Metadata } from "next"

// Mock data for development - this would come from API in production
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
  },
  {
    id: "7",
    slug: "wesley-so",
    firstName: "Wesley",
    lastName: "So",
    nationality: "USA",
    photoUrl: "/players/wesley.jpg",
    title: "GM",
    currentRating: 2767,
    active: true
  },
  {
    id: "8",
    slug: "anish-giri",
    firstName: "Anish",
    lastName: "Giri",
    nationality: "NED",
    photoUrl: "/players/anish.jpg",
    title: "GM",
    currentRating: 2780,
    active: true
  },
  {
    id: "9",
    slug: "shakhriyar-mamedyarov",
    firstName: "Shakhriyar",
    lastName: "Mamedyarov",
    nationality: "AZE",
    photoUrl: "/players/shakhriyar.jpg",
    title: "GM",
    currentRating: 2762,
    active: true
  },
  {
    id: "10",
    slug: "hikaru-nakamura",
    firstName: "Hikaru",
    lastName: "Nakamura",
    nationality: "USA",
    photoUrl: "/players/hikaru.jpg",
    title: "GM",
    currentRating: 2778,
    active: true
  },
  {
    id: "11",
    slug: "richard-rapport",
    firstName: "Richard",
    lastName: "Rapport",
    nationality: "ROU",
    photoUrl: "/players/richard.jpg",
    title: "GM",
    currentRating: 2732,
    active: true
  },
  {
    id: "12",
    slug: "alireza-firouzja",
    firstName: "Alireza",
    lastName: "Firouzja",
    nationality: "FRA",
    photoUrl: "/players/alireza.jpg",
    title: "GM",
    currentRating: 2793,
    active: true
  },
  {
    id: "13",
    slug: "viswanathan-anand",
    firstName: "Viswanathan",
    lastName: "Anand",
    nationality: "IND",
    photoUrl: "/players/anand.jpg",
    title: "GM",
    currentRating: 2754,
    active: false
  },
  {
    id: "14",
    slug: "vladimir-kramnik",
    firstName: "Vladimir",
    lastName: "Kramnik",
    nationality: "RUS",
    photoUrl: "/players/kramnik.jpg",
    title: "GM",
    currentRating: 2747,
    active: false
  },
  {
    id: "15",
    slug: "judit-polgar",
    firstName: "Judit",
    lastName: "Polgar",
    nationality: "HUN",
    photoUrl: "/players/judit.jpg",
    title: "GM",
    currentRating: 2735,
    active: false
  }
]

export default function PlayersPage() {
  const [players, setPlayers] = useState<PlayerCard[]>([])
  const [filteredPlayers, setFilteredPlayers] = useState<PlayerCard[]>([])
  const [filters, setFilters] = useState<PlayerFilter>({})
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalPlayers, setTotalPlayers] = useState(0)

  const playersPerPage = 12

  // Get available filter options
  const availableTitles = [...new Set(mockPlayers
    .filter(player => player.title)
    .map(player => player.title!))] as PlayerTitle[]

  const availableNationalities = [...new Set(mockPlayers.map(player => player.nationality))]

  // Apply filters to players
  const applyFilters = (allPlayers: PlayerCard[], currentFilters: PlayerFilter) => {
    let filtered = [...allPlayers]

    if (currentFilters.title) {
      filtered = filtered.filter(player => player.title === currentFilters.title)
    }

    if (currentFilters.nationality) {
      filtered = filtered.filter(player => player.nationality === currentFilters.nationality)
    }

    if (currentFilters.active !== undefined) {
      filtered = filtered.filter(player => player.active === currentFilters.active)
    }

    if (currentFilters.minRating !== undefined) {
      filtered = filtered.filter(player => 
        player.currentRating && player.currentRating >= currentFilters.minRating!
      )
    }

    if (currentFilters.maxRating !== undefined) {
      filtered = filtered.filter(player => 
        player.currentRating && player.currentRating <= currentFilters.maxRating!
      )
    }

    // Sort by rating (descending) if available, then by name
    filtered.sort((a, b) => {
      if (a.currentRating && b.currentRating) {
        return b.currentRating - a.currentRating
      }
      if (a.currentRating && !b.currentRating) {
        return -1
      }
      if (!a.currentRating && b.currentRating) {
        return 1
      }
      return a.lastName.localeCompare(b.lastName)
    })

    return filtered
  }

  // Load initial data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPlayers(mockPlayers)
      setFilteredPlayers(mockPlayers)
      setTotalPlayers(mockPlayers.length)
      setTotalPages(Math.ceil(mockPlayers.length / playersPerPage))
      setIsLoading(false)
    }, 500)
  }, [])

  // Apply filters when they change
  useEffect(() => {
    const filtered = applyFilters(players, filters)
    setFilteredPlayers(filtered)
    setTotalPlayers(filtered.length)
    setTotalPages(Math.ceil(filtered.length / playersPerPage))
    setCurrentPage(1) // Reset to first page when filters change
  }, [filters, players])

  // Get current page players
  const getCurrentPagePlayers = () => {
    const startIndex = (currentPage - 1) * playersPerPage
    const endIndex = startIndex + playersPerPage
    return filteredPlayers.slice(startIndex, endIndex)
  }

  const handleFilterChange = (newFilters: PlayerFilter) => {
    setFilters(newFilters)
  }

  const handleReset = () => {
    setFilters({})
  }

  const handlePlayerClick = (player: PlayerCard) => {
    // Navigate to player detail page
    console.log(`Navigate to player: ${player.slug}`)
    // In production: router.push(`/players/${player.slug}`)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-primary-600">Loading players...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-primary-50">
      {/* Header */}
      <section className="bg-white border-b border-primary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <Heading level="h1" className="mb-4">
              Players
            </Heading>
            <Body size="lg" className="text-primary-600 max-w-2xl mx-auto">
              Explore our roster of talented chess players from around the world
            </Body>
            <div className="flex items-center justify-center gap-4 mt-6">
              <Badge className="bg-primary-100 text-primary-800">
                {totalPlayers} Players
              </Badge>
              <Badge className="bg-success-100 text-success-800">
                {players.filter(p => p.active).length} Active
              </Badge>
              <Badge className="bg-accent-100 text-accent-800">
                {players.filter(p => p.title === "GM").length} Grandmasters
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters sidebar */}
          <div className="lg:w-80 lg:flex-shrink-0">
            <FilterBar
              filters={filters}
              availableTitles={availableTitles}
              availableNationalities={availableNationalities}
              onFilterChange={handleFilterChange}
              onReset={handleReset}
              isLoading={isLoading}
            />
          </div>

          {/* Players grid */}
          <div className="flex-1">
            {/* Results summary */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <Body size="base" className="text-primary-600">
                  Showing {getCurrentPagePlayers().length} of {filteredPlayers.length} players
                </Body>
              </div>
              {totalPages > 1 && (
                <div className="text-sm text-primary-500">
                  Page {currentPage} of {totalPages}
                </div>
              )}
            </div>

            {/* Players grid */}
            {getCurrentPagePlayers().length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {getCurrentPagePlayers().map((player) => (
                  <PlayerCardComponent
                    key={player.id}
                    player={player}
                    showRating={true}
                    onClick={() => handlePlayerClick(player)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-4xl text-primary-300 mb-4">♟️</div>
                <Heading level="h3" className="text-primary-600 mb-2">
                  No players found
                </Heading>
                <Body size="base" className="text-primary-500 mb-4">
                  Try adjusting your filters to see more results
                </Body>
                <Button onClick={handleReset}>
                  Reset Filters
                </Button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                
                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={page === currentPage ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                      className={page === currentPage ? "bg-primary-600 text-white" : ""}
                    >
                      {page}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
