import type { Metadata } from 'next';
import { Download, FileText, File } from 'lucide-react';
import { mockStudyFiles } from '@/lib/mock/portal';
import type { StudyFile, StudyFileCategory } from '@/lib/mock/portal';

export const metadata: Metadata = { title: 'Study Material' };

const CATEGORIES: Array<{ key: StudyFileCategory; label: string; description: string }> = [
  { key: 'openings',        label: 'Openings',          description: 'Repertoire files and novelty preparation' },
  { key: 'endgames',        label: 'Endgames',          description: 'Theoretical endgame studies' },
  { key: 'tactics',         label: 'Tactics',           description: 'Pattern recognition packs' },
  { key: 'tournament_prep', label: 'Tournament Prep',   description: 'Opponent analysis and event preparation' },
];

function formatSize(kb: number): string {
  if (kb >= 1024) return `${(kb / 1024).toFixed(1)} MB`;
  return `${kb} KB`;
}

function formatDate(d: Date): string {
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

const fileTypeIcon: Record<string, typeof FileText> = {
  pdf: FileText,
  pgn: File,
  video: File,
};

const fileTypeBadge: Record<string, string> = {
  pdf:   'bg-red-50 text-red-600',
  pgn:   'bg-success-50 text-success-700',
  video: 'bg-accent-50 text-accent-700',
};

function StudyFileRow({ file }: { file: StudyFile }) {
  const Icon = fileTypeIcon[file.type] ?? File;

  return (
    <div className="flex items-center gap-3 py-3 border-b border-primary-100 last:border-0">
      <div className="w-8 h-8 rounded-md bg-primary-100 flex items-center justify-center flex-shrink-0">
        <Icon size={16} className="text-primary-500" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-primary-900 truncate">{file.name}</p>
        <p className="text-xs text-primary-400">
          {formatSize(file.sizeKb)} · Uploaded {formatDate(file.uploadedAt)} by {file.uploadedBy}
        </p>
      </div>
      <span className={`text-xs font-medium px-1.5 py-0.5 rounded uppercase ${fileTypeBadge[file.type] ?? 'bg-primary-100 text-primary-600'}`}>
        {file.type}
      </span>
      <button
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-primary-800 text-white hover:bg-primary-700 transition-colors flex-shrink-0"
        aria-label={`Download ${file.name}`}
      >
        <Download size={12} />
        Download
      </button>
    </div>
  );
}

export default function PortalStudyPage() {
  const totalFiles = mockStudyFiles.length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-primary-900">Study Material</h1>
        <span className="text-xs text-primary-400">{totalFiles} files</span>
      </div>

      <div className="space-y-5">
        {CATEGORIES.map(({ key, label, description }) => {
          const files = mockStudyFiles.filter((f) => f.category === key);
          if (files.length === 0) return null;

          return (
            <div key={key} className="bg-white border border-primary-200 rounded-lg">
              <div className="px-5 py-4 border-b border-primary-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-semibold text-primary-800">{label}</h2>
                    <p className="text-xs text-primary-400 mt-0.5">{description}</p>
                  </div>
                  <span className="text-xs text-primary-400">{files.length} file{files.length !== 1 ? 's' : ''}</span>
                </div>
              </div>
              <div className="px-5">
                {files.map((file) => (
                  <StudyFileRow key={file.id} file={file} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
