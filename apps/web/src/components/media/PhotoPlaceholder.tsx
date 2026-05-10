import React from "react"

const GRADIENTS = [
  "from-primary-700 to-primary-900",
  "from-accent-600 to-primary-800",
  "from-blue-700 to-primary-900",
  "from-primary-600 to-blue-900",
  "from-accent-500 to-primary-700",
  "from-blue-600 to-primary-800",
  "from-primary-800 to-accent-700",
  "from-success-700 to-primary-900",
]

function hashId(id: string): number {
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) & 0xffffffff
  return Math.abs(h)
}

interface PhotoPlaceholderProps {
  id: string
  title: string
  className?: string
}

export function PhotoPlaceholder({ id, title, className = "" }: PhotoPlaceholderProps) {
  const gradient = GRADIENTS[hashId(id) % GRADIENTS.length] ?? GRADIENTS[0]
  const initials = title
    .split(" ")
    .slice(0, 2)
    .map(w => w[0] ?? "")
    .join("")
    .toUpperCase()

  return (
    <div className={`bg-gradient-to-br ${gradient} flex items-center justify-center ${className}`}>
      <span className="text-white/30 font-bold text-4xl select-none">{initials}</span>
    </div>
  )
}
