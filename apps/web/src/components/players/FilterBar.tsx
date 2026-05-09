import React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PlayerFilter, PlayerTitle } from "@pawn-stars/shared-types"

interface FilterBarProps {
  filters: PlayerFilter
  availableTitles: PlayerTitle[]
  availableNationalities: string[]
  onFilterChange: (filters: PlayerFilter) => void
  onReset: () => void
  isLoading?: boolean
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  availableTitles,
  availableNationalities,
  onFilterChange,
  onReset,
  isLoading = false
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

  const handleTitleToggle = (title: PlayerTitle) => {
    const newFilters = { ...filters }
    if (newFilters.title === title) {
      newFilters.title = undefined
    } else {
      newFilters.title = title
    }
    onFilterChange(newFilters)
  }

  const handleNationalityToggle = (nationality: string) => {
    const newFilters = { ...filters }
    if (newFilters.nationality === nationality) {
      newFilters.nationality = undefined
    } else {
      newFilters.nationality = nationality
    }
    onFilterChange(newFilters)
  }

  const handleActiveToggle = () => {
    const newFilters = { ...filters }
    if (newFilters.active === true) {
      newFilters.active = undefined
    } else {
      newFilters.active = true
    }
    onFilterChange(newFilters)
  }

  const handleRatingChange = (field: 'minRating' | 'maxRating', value: string) => {
    const newFilters = { ...filters }
    if (value === '') {
      newFilters[field] = undefined
    } else {
      const numValue = parseInt(value)
      if (!isNaN(numValue)) {
        newFilters[field] = numValue
      }
    }
    onFilterChange(newFilters)
  }

  const hasActiveFilters = !!(
    filters.title ||
    filters.nationality ||
    filters.active !== undefined ||
    filters.minRating !== undefined ||
    filters.maxRating !== undefined
  )

  return (
    <div className="bg-white border border-primary-200 rounded-lg p-4 sm:p-6 shadow-chess">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-primary-900">Filters</h3>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            disabled={isLoading}
          >
            Reset
          </Button>
        )}
      </div>

      {/* Mobile-first layout */}
      <div className="space-y-4">
        {/* Active Status Filter */}
        <div>
          <label className="block text-sm font-medium text-primary-700 mb-2">
            Status
          </label>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={filters.active === true ? "default" : "outline"}
              size="sm"
              onClick={handleActiveToggle}
              disabled={isLoading}
              className={filters.active === true ? "bg-success-500 hover:bg-success-600" : ""}
            >
              Active Only
            </Button>
            <Button
              variant={filters.active === false ? "default" : "outline"}
              size="sm"
              onClick={() => onFilterChange({ ...filters, active: false })}
              disabled={isLoading}
              className="bg-primary-200 text-primary-800 hover:bg-primary-300"
            >
              Inactive
            </Button>
          </div>
        </div>

        {/* Title Filter */}
        <div>
          <label className="block text-sm font-medium text-primary-700 mb-2">
            Title
          </label>
          <div className="flex flex-wrap gap-2">
            {availableTitles.map((title) => (
              <Button
                key={title}
                variant={filters.title === title ? "default" : "outline"}
                size="sm"
                onClick={() => handleTitleToggle(title)}
                disabled={isLoading}
                className={filters.title === title ? getTitleColor(title) : ""}
              >
                {title || "No Title"}
              </Button>
            ))}
          </div>
        </div>

        {/* Nationality Filter */}
        <div>
          <label className="block text-sm font-medium text-primary-700 mb-2">
            Nationality
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {availableNationalities.slice(0, 12).map((nationality) => (
              <Button
                key={nationality}
                variant={filters.nationality === nationality ? "default" : "outline"}
                size="sm"
                onClick={() => handleNationalityToggle(nationality)}
                disabled={isLoading}
                className={filters.nationality === nationality ? "bg-primary-600 text-white" : ""}
              >
                <span className="mr-1">{getFlagEmoji(nationality)}</span>
                <span className="text-xs">{nationality}</span>
              </Button>
            ))}
            {availableNationalities.length > 12 && (
              <div className="text-xs text-primary-500 flex items-center justify-center">
                +{availableNationalities.length - 12} more
              </div>
            )}
          </div>
        </div>

        {/* Rating Range Filter */}
        <div>
          <label className="block text-sm font-medium text-primary-700 mb-2">
            Rating Range
          </label>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex-1">
              <input
                type="number"
                placeholder="Min"
                min="1000"
                max="4000"
                value={filters.minRating || ''}
                onChange={(e) => handleRatingChange('minRating', e.target.value)}
                disabled={isLoading}
                className="w-full px-3 py-2 border border-primary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
              />
            </div>
            <span className="text-primary-500">to</span>
            <div className="flex-1">
              <input
                type="number"
                placeholder="Max"
                min="1000"
                max="4000"
                value={filters.maxRating || ''}
                onChange={(e) => handleRatingChange('maxRating', e.target.value)}
                disabled={isLoading}
                className="w-full px-3 py-2 border border-primary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="pt-4 border-t border-primary-200">
            <div className="text-sm font-medium text-primary-700 mb-2">Active Filters:</div>
            <div className="flex flex-wrap gap-2">
              {filters.title && (
                <Badge className={getTitleColor(filters.title)}>
                  {filters.title}
                </Badge>
              )}
              {filters.nationality && (
                <Badge className="bg-primary-100 text-primary-800">
                  <span className="mr-1">{getFlagEmoji(filters.nationality)}</span>
                  {filters.nationality}
                </Badge>
              )}
              {filters.active !== undefined && (
                <Badge className={filters.active ? "bg-success-100 text-success-800" : "bg-primary-100 text-primary-800"}>
                  {filters.active ? "Active" : "Inactive"}
                </Badge>
              )}
              {filters.minRating && (
                <Badge className="bg-primary-100 text-primary-800">
                  Min: {filters.minRating}
                </Badge>
              )}
              {filters.maxRating && (
                <Badge className="bg-primary-100 text-primary-800">
                  Max: {filters.maxRating}
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
