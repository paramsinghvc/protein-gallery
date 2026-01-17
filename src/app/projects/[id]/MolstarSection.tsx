'use client';

import dynamic from 'next/dynamic';

const MolstarViewer = dynamic(() => import('@/components/MolstarViewer'), {
  ssr: false,
  loading: () => (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="h-[420px] animate-pulse rounded-xl bg-white/10" />
      <div className="mt-3 text-sm text-white/60">Loading 3D viewer…</div>
    </div>
  ),
});

export default function MolstarSection({ pdbId }: { pdbId: string | null }) {
  if (!pdbId) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <h2 className="font-semibold">3D Structure</h2>
        <p className="mt-2 text-sm text-white/70">
          No PDB structure is available for this project’s target/proteins.
        </p>
      </div>
    );
  }

  return <MolstarViewer pdbId={pdbId} />;
}
