'use client';

import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';

type MolstarWindow = {
  Viewer?: {
    create: (
      target: HTMLElement,
      options?: Record<string, unknown>
    ) => Promise<{
      loadPdb: (id: string) => Promise<void>;
      dispose?: () => void;
    }>;
  };
};

export default function MolstarViewer({ pdbId }: { pdbId: string }) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const viewerRef = useRef<null | { dispose?: () => void }>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!ready) return;
    let disposed = false;

    async function init() {
      if (!hostRef.current) return;

      // cleanup old
      try {
        viewerRef.current?.dispose?.();
      } catch {}
      viewerRef.current = null;

      const molstar = (window as any).molstar as MolstarWindow | undefined;
      const Viewer = molstar?.Viewer;

      if (!Viewer?.create) {
        throw new Error('Mol* Viewer not available on window.molstar');
      }

      hostRef.current.innerHTML = '';

      const viewer = await Viewer.create(hostRef.current, {
        layoutIsExpanded: false,
        layoutShowControls: false,
        layoutShowRemoteState: false,
        layoutShowSequence: true,
        layoutShowLog: false,
        layoutShowLeftPanel: false,
        viewportShowExpand: false,
        viewportShowSelectionMode: false,
        viewportShowAnimation: false,
        pdbProvider: 'rcsb',
        emdbProvider: 'rcsb',
      });

      if (disposed) {
        viewer.dispose?.();
        return;
      }

      viewerRef.current = viewer;
      await viewer.loadPdb(pdbId);
    }

    init().catch((err) => console.error('[Mol*] init failed', err));

    return () => {
      disposed = true;
      try {
        viewerRef.current?.dispose?.();
      } catch {}
      viewerRef.current = null;
    };
  }, [pdbId, ready]);

  return (
    <div className="relative h-[360px] w-full overflow-hidden bg-white sm:h-[440px]">
      <Script
        src="/molstar/molstar.js"
        strategy="afterInteractive"
        onLoad={() => setReady(true)}
      />
      <div ref={hostRef} className="absolute inset-0" />
    </div>
  );
}
