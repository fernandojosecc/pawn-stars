import React from "react"
import Link from "next/link"

interface HeroSectionProps {
  variant?: "home" | "default"
}

const BOARD_POSITION = [
  ["r", ".", "b", "q", "k", ".", ".", "r"],
  ["p", "p", ".", "p", ".", "p", "p", "p"],
  [".", ".", "p", ".", ".", "n", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", "P", "P", ".", ".", ".", "."],
  [".", "N", ".", ".", "P", ".", ".", "."],
  ["P", "P", ".", ".", ".", "P", "P", "P"],
  ["R", ".", "B", "Q", "K", ".", ".", "R"],
]

const PIECE_GLYPHS: Record<string, string> = {
  K: "♔", Q: "♕", R: "♖", B: "♗", N: "♘", P: "♙",
  k: "♚", q: "♛", r: "♜", b: "♝", n: "♞", p: "♟",
}

function ChessBoard() {
  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto aspect-square select-none">
      <div className="grid grid-cols-8 w-full h-full border border-carbon-300">
        {BOARD_POSITION.map((row, ri) =>
          row.map((cell, ci) => {
            const isLight = (ri + ci) % 2 === 0
            const piece = PIECE_GLYPHS[cell]
            const isWhitePiece = cell === cell.toUpperCase() && cell !== "."
            return (
              <div
                key={`${ri}-${ci}`}
                className={`flex items-center justify-center aspect-square text-lg sm:text-2xl ${
                  isLight ? "bg-[#3A3228]" : "bg-[#1A1612]"
                }`}
              >
                {piece && (
                  <span className={isWhitePiece ? "text-[#E8D8B0]" : "text-[#2A2018]"}>
                    {piece}
                  </span>
                )}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export const HeroSection: React.FC<HeroSectionProps> = ({ variant = "default" }) => {
  return (
    <section className="relative bg-carbon overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px]">
          {/* Chess board — left column */}
          <div className="flex items-center justify-center bg-[#0E0E0C] py-10 lg:py-0 px-8 lg:px-12 border-b lg:border-b-0 lg:border-r border-carbon-300">
            <ChessBoard />
          </div>

          {/* Content — right column */}
          <div className="flex flex-col justify-center px-6 sm:px-10 lg:px-14 py-12 lg:py-16">
            {/* Season badge */}
            <div className="mb-6">
              <span className="inline-block border border-gold px-3 py-1 font-mono text-xs tracking-[0.2em] text-gold">
                SEASON 2025 – 26
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl leading-none tracking-wide mb-6">
              <span className="text-white block">PLAY</span>
              <span className="text-gold block">SHARP.</span>
              <span className="text-white block">WIN BIG.</span>
            </h1>

            {/* Description */}
            <p className="font-sans text-sm text-carbon-800 leading-relaxed mb-8 max-w-sm">
              Pawn Stars is a competitive chess organization built around performance, preparation, and elite team culture.
            </p>

            {/* Stats */}
            {variant === "home" && (
              <div className="flex items-center gap-8 mb-8">
                <div>
                  <div className="font-display text-3xl text-gold leading-none">2481</div>
                  <div className="font-mono text-[10px] tracking-widest text-carbon-700 mt-1">TEAM AVG ELO</div>
                </div>
                <div className="w-px h-8 bg-carbon-300" />
                <div>
                  <div className="font-display text-3xl text-white leading-none">18</div>
                  <div className="font-mono text-[10px] tracking-widest text-carbon-700 mt-1">ACTIVE PLAYERS</div>
                </div>
                <div className="w-px h-8 bg-carbon-300" />
                <div>
                  <div className="font-display text-3xl text-white leading-none">7W</div>
                  <div className="font-mono text-[10px] tracking-widest text-carbon-700 mt-1">WIN STREAK</div>
                </div>
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/team"
                className="inline-flex items-center px-5 py-2.5 border border-gold text-gold font-mono text-xs tracking-widest hover:bg-gold hover:text-carbon transition-colors"
              >
                VIEW ROSTER
              </Link>
              <Link
                href="/schedule"
                className="inline-flex items-center px-5 py-2.5 border border-carbon-400 text-carbon-900 font-mono text-xs tracking-widest hover:border-white hover:text-white transition-colors"
              >
                SEE SCHEDULE
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
