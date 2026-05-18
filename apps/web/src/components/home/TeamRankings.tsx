import React from "react"
import Link from "next/link"

interface RankingRow {
  rank: number
  name: string
  classical: number
  rapid: number
  change: number
}

const MOCK_RANKINGS: RankingRow[] = [
  { rank: 1, name: "Andrés Sánchez", classical: 2541, rapid: 2498, change: 12 },
  { rank: 2, name: "Nikolai Petrov", classical: 2487, rapid: 2410, change: 5 },
  { rank: 3, name: "Laila Fathi", classical: 2312, rapid: 2389, change: -3 },
  { rank: 4, name: "Carlos Medina", classical: 2278, rapid: 2301, change: 8 },
  { rank: 5, name: "Yuki Tanaka", classical: 2241, rapid: 2197, change: 0 },
]

export function TeamRankings() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-3xl sm:text-4xl tracking-wide">
          <span className="text-white">TEAM </span>
          <span className="text-gold">RANKINGS</span>
        </h2>
        <Link
          href="/rankings"
          className="font-mono text-xs tracking-widest text-carbon-800 hover:text-white transition-colors"
        >
          Full table →
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-carbon-300">
              <th className="text-left pb-3 font-mono text-[10px] tracking-widest text-carbon-700 w-6">#</th>
              <th className="text-left pb-3 font-mono text-[10px] tracking-widest text-carbon-700">PLAYER</th>
              <th className="text-right pb-3 font-mono text-[10px] tracking-widest text-carbon-700">CLASSICAL</th>
              <th className="text-right pb-3 font-mono text-[10px] tracking-widest text-carbon-700">RAPID</th>
              <th className="text-right pb-3 font-mono text-[10px] tracking-widest text-carbon-700">±70</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-carbon-300">
            {MOCK_RANKINGS.map((row) => (
              <tr key={row.rank} className="hover:bg-carbon-100 transition-colors group">
                <td className="py-3.5 pr-4">
                  <span className="font-display text-xl text-gold">{row.rank}</span>
                </td>
                <td className="py-3.5">
                  <div className="flex items-center gap-3">
                    <span className="font-sans text-sm text-white group-hover:text-gold transition-colors">
                      {row.name}
                    </span>
                    <div className="hidden sm:flex gap-px">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`inline-block w-4 h-1 ${i < 3 ? "bg-gold" : i === 3 ? "bg-carbon-400" : "bg-carbon-300"}`} />
                      ))}
                    </div>
                  </div>
                </td>
                <td className="py-3.5 text-right">
                  <span className="font-mono text-sm text-white">{row.classical}</span>
                </td>
                <td className="py-3.5 text-right">
                  <span className="font-mono text-sm text-carbon-800">{row.rapid}</span>
                </td>
                <td className="py-3.5 text-right">
                  <span className={`font-mono text-xs ${row.change > 0 ? "text-success-400" : row.change < 0 ? "text-red-400" : "text-carbon-700"}`}>
                    {row.change > 0 ? `+${row.change}` : row.change === 0 ? "0" : row.change}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
