export type MediaType = 'photo' | 'video' | 'document'

export interface MediaAsset {
  id: string
  type: MediaType
  title: string
  description?: string
  tournamentSlug?: string
  tournamentName?: string
  uploadedAt: string       // "YYYY-MM-DD"
  tags?: string[]
  // photo fields
  aspectRatio?: 'landscape' | 'portrait' | 'square'
  // video fields
  duration?: string        // "MM:SS"
  // document fields
  fileType?: 'PDF' | 'DOCX' | 'XLSX'
  fileSize?: string        // "2.4 MB"
}

export interface MediaGallery {
  photos:    MediaAsset[]
  videos:    MediaAsset[]
  documents: MediaAsset[]
  total:     number
}

export interface MediaFilter {
  type?:           MediaType
  tournamentSlug?: string
  page?:           number
  limit?:          number
}
