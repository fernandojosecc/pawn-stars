import React from "react"
import { Body } from "@/components/typography/Body"
import type { MediaAsset } from "@pawn-stars/shared-types"

const FILE_ICON_COLORS: Record<string, string> = {
  PDF:  "text-red-500  bg-red-50  border-red-200",
  DOCX: "text-blue-500 bg-blue-50 border-blue-200",
  XLSX: "text-success-600 bg-success-50 border-success-200",
}

const FILE_ICON_LABELS: Record<string, string> = {
  PDF:  "PDF",
  DOCX: "DOC",
  XLSX: "XLS",
}

interface DocumentCardProps {
  doc: MediaAsset
}

export function DocumentCard({ doc }: DocumentCardProps) {
  const fileColors = FILE_ICON_COLORS[doc.fileType ?? "PDF"] ?? FILE_ICON_COLORS["PDF"]
  const fileLabel  = FILE_ICON_LABELS[doc.fileType ?? "PDF"] ?? "FILE"

  return (
    <div className="bg-white rounded-xl border border-primary-200 p-4 flex items-start gap-4 hover:shadow-sm transition-shadow group">
      {/* File type icon */}
      <div className={`w-12 h-14 rounded-lg border-2 flex flex-col items-center justify-center flex-shrink-0 ${fileColors}`}>
        <svg className="w-5 h-5 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span className="text-xs font-bold leading-none">{fileLabel}</span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Body size="sm" weight="semibold" className="text-primary-900 leading-snug line-clamp-2">
              {doc.title}
            </Body>
            {doc.description && (
              <Body size="xs" className="text-primary-500 mt-1 line-clamp-2">{doc.description}</Body>
            )}
          </div>

          {/* Download CTA */}
          <button
            className="flex-shrink-0 flex items-center gap-1.5 bg-primary-900 hover:bg-primary-700 text-white text-xs font-medium px-3 py-2 rounded-lg transition-colors"
            onClick={() => { /* mock download — no real file yet */ }}
            title="Download (mock)"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span className="hidden sm:inline">Download</span>
          </button>
        </div>

        <div className="flex items-center gap-3 mt-2 flex-wrap">
          {doc.fileSize && (
            <Body size="xs" className="text-primary-400">{doc.fileSize}</Body>
          )}
          {doc.tournamentName && (
            <Body size="xs" className="text-primary-400">{doc.tournamentName}</Body>
          )}
          <Body size="xs" className="text-primary-400">
            {new Date(doc.uploadedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
          </Body>
          {doc.tags?.slice(0, 2).map(tag => (
            <span key={tag} className="text-xs text-primary-400 bg-primary-50 px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
