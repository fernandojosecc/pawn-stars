import type { EventType } from "@pawn-stars/shared-types"

export const EVENT_CONFIG: Record<EventType, {
  label: string
  dotClass: string    // Tailwind bg color for dot
  badgeClass: string  // full badge styling
  borderClass: string // left-border accent color
}> = {
  match:      { label: "Match",      dotClass: "bg-accent-500",   badgeClass: "bg-accent-100 text-accent-700",   borderClass: "border-accent-500" },
  tournament: { label: "Tournament", dotClass: "bg-blue-500",     badgeClass: "bg-blue-100 text-blue-700",       borderClass: "border-blue-500" },
  training:   { label: "Training",   dotClass: "bg-success-500",  badgeClass: "bg-success-100 text-success-700", borderClass: "border-success-500" },
  media:      { label: "Media",      dotClass: "bg-purple-500",   badgeClass: "bg-purple-100 text-purple-700",   borderClass: "border-purple-500" },
}

export const ALL_EVENT_TYPES: EventType[] = ["match", "tournament", "training", "media"]
