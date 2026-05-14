import type { Metadata } from 'next';
import type { SponsorAsset, SponsorAssetType } from '@pawn-stars/shared-types';
import { mockSponsorAssets } from '@/lib/mock/sponsor-portal';

export const metadata: Metadata = { title: 'Brand Assets' };

const TYPE_LABEL: Record<SponsorAssetType, string> = {
  logo: 'Logo',
  banner: 'Banner',
  press_mention: 'Press Mention',
  media_kit: 'Media Kit',
};

const TYPE_STYLE: Record<SponsorAssetType, string> = {
  logo: 'bg-blue-100 text-blue-700',
  banner: 'bg-purple-100 text-purple-700',
  press_mention: 'bg-green-100 text-green-700',
  media_kit: 'bg-accent-100 text-accent-700',
};

const FORMAT_ICON: Record<string, string> = {
  SVG: '◈',
  PNG: '◧',
  PDF: '◪',
  JPG: '◨',
};

function fmtSize(kb: number) {
  return kb >= 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${kb} KB`;
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function AssetCard({ asset }: { asset: SponsorAsset }) {
  return (
    <div className="bg-white rounded-xl border border-primary-200 p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-10 w-10 rounded-lg bg-primary-100 flex items-center justify-center text-lg text-primary-600 shrink-0">
            {FORMAT_ICON[asset.format] ?? '◌'}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-primary-900 leading-snug">{asset.name}</p>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${TYPE_STYLE[asset.type]}`}>
                {TYPE_LABEL[asset.type]}
              </span>
              <span className="text-xs text-primary-400">{asset.format} · {fmtSize(asset.sizeKb)}</span>
            </div>
          </div>
        </div>
      </div>

      {asset.description && (
        <p className="text-xs text-primary-600 leading-relaxed">{asset.description}</p>
      )}

      <div className="flex items-center justify-between mt-auto pt-2 border-t border-primary-100">
        <span className="text-xs text-primary-400">Added {fmtDate(asset.uploadedAt)}</span>
        <a
          href={asset.downloadUrl}
          className="inline-flex items-center gap-1.5 rounded-lg bg-accent-500 hover:bg-accent-600 text-white text-xs font-semibold px-3 py-1.5 transition-colors"
          download
        >
          ↓ Download
        </a>
      </div>
    </div>
  );
}

export default function SponsorAssetsPage() {
  const byType = mockSponsorAssets.reduce<Record<string, SponsorAsset[]>>((acc, a) => {
    const key = TYPE_LABEL[a.type];
    if (!acc[key]) acc[key] = [];
    acc[key].push(a);
    return acc;
  }, {});

  return (
    <div className="p-6 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-primary-900">Brand Assets</h1>
        <p className="text-sm text-primary-500 mt-0.5">
          {mockSponsorAssets.length} assets provided by Pawn Stars for your use.
        </p>
      </div>

      <div className="space-y-8">
        {Object.entries(byType).map(([typeName, assets]) => (
          <section key={typeName}>
            <h2 className="text-sm font-semibold text-primary-700 uppercase tracking-wide mb-3">{typeName}s</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {assets.map((a) => <AssetCard key={a.id} asset={a} />)}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
