'use client';

import { PluginUIContext } from 'molstar/lib/mol-plugin-ui/context';
import { useEffect, useRef } from 'react';
import { createRoot, Root } from 'react-dom/client';

export default function MolstarViewer({ pdbId }: { pdbId: string }) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const reactRootRef = useRef<Root | null>(null);

  useEffect(() => {
    let disposed = false;
    let ctx: PluginUIContext;

    async function init() {
      if (!hostRef.current) return;

      const { createPluginUI } = await import('molstar/lib/mol-plugin-ui');
      const { DefaultPluginUISpec } = await import(
        'molstar/lib/mol-plugin-ui/spec'
      );
      const { PluginConfig } = await import('molstar/lib/mol-plugin/config');

      if (disposed) return;

      hostRef.current.innerHTML = '';
      reactRootRef.current = createRoot(hostRef.current);

      const spec = DefaultPluginUISpec();

      ctx = await createPluginUI({
        target: hostRef.current,
        render: (component) => {
          reactRootRef.current!.render(component);
        },
        spec,
        onBeforeUIRender: (plugin) => {
          plugin.config.set(PluginConfig.Viewport.ShowExpand, false);
          plugin.config.set(PluginConfig.Viewport.ShowSelectionMode, false);
          plugin.config.set(PluginConfig.Viewport.ShowAnimation, false);
        },
      });

      const url = `https://files.rcsb.org/download/${pdbId}.cif`;

      // ✅ canonical Mol* loading path
      const data = await ctx.builders.data.download(
        { url, isBinary: false },
        { state: { isGhost: true } }
      );

      const trajectory = await ctx.builders.structure.parseTrajectory(
        data,
        'mmcif'
      );

      await ctx.builders.structure.hierarchy.applyPreset(trajectory, 'default');
    }

    init();

    return () => {
      disposed = true;
      try {
        ctx?.dispose?.();
      } catch {}
      try {
        reactRootRef.current?.unmount();
      } catch {}
    };
  }, [pdbId]);

  return (
    <div
      ref={hostRef}
      className="relative h-[360px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-white sm:h-[440px]"
    />
  );
}
