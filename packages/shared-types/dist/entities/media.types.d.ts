export type MediaType = 'photo' | 'video' | 'document';
export interface MediaAsset {
    id: string;
    type: MediaType;
    title: string;
    description?: string;
    tournamentSlug?: string;
    tournamentName?: string;
    uploadedAt: string;
    tags?: string[];
    aspectRatio?: 'landscape' | 'portrait' | 'square';
    duration?: string;
    fileType?: 'PDF' | 'DOCX' | 'XLSX';
    fileSize?: string;
}
export interface MediaGallery {
    photos: MediaAsset[];
    videos: MediaAsset[];
    documents: MediaAsset[];
    total: number;
}
export interface MediaFilter {
    type?: MediaType;
    tournamentSlug?: string;
    page?: number;
    limit?: number;
}
//# sourceMappingURL=media.types.d.ts.map