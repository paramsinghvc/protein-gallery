'use client';

import { PluginUIContext } from 'molstar/lib/mol-plugin-ui/context';
import { useEffect, useRef } from 'react';

export default function MolstarViewer({ pdbId }: { pdbId: string }) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const pluginRef = useRef<PluginUIContext | null>(null);

  useEffect(() => {
    let disposed = false;

    async function init() {
      if (!hostRef.current) return;

      pluginRef.current?.dispose();
      pluginRef.current = null;

      const { createPluginUI } = await import('molstar/lib/mol-plugin-ui');
      const { DefaultPluginUISpec } = await import(
        'molstar/lib/mol-plugin-ui/spec'
      );
      const { renderReact18 } = await import(
        'molstar/lib/mol-plugin-ui/react18'
      );
      const { PluginConfig } = await import('molstar/lib/mol-plugin/config');

      if (disposed || !hostRef.current) return;

      hostRef.current.innerHTML = '';

      const spec = DefaultPluginUISpec();

      const plugin = await createPluginUI({
        target: hostRef.current,
        spec,
        render: renderReact18,
        onBeforeUIRender: (p) => {
          p.config.set(PluginConfig.Viewport.ShowExpand, false);
          p.config.set(PluginConfig.Viewport.ShowSelectionMode, false);
          p.config.set(PluginConfig.Viewport.ShowAnimation, false);
        },
      });

      if (disposed) {
        plugin.dispose();
        return;
      }

      pluginRef.current = plugin;

      // Load structure
      const url = `https://files.rcsb.org/download/${pdbId}.cif`;

      const data = await plugin.builders.data.download(
        { url, isBinary: false },
        { state: { isGhost: true } }
      );

      const trajectory = await plugin.builders.structure.parseTrajectory(
        data,
        'mmcif'
      );
      await plugin.builders.structure.hierarchy.applyPreset(
        trajectory,
        'default'
      );
    }

    init().catch((err) => {
      // Don’t let unhandled promises spam the console
      console.error('[Mol*] init failed', err);
    });

    return () => {
      disposed = true;
      try {
        pluginRef.current?.dispose();
      } catch {}
      pluginRef.current = null;
    };
  }, [pdbId]);

  return (
    <div
      ref={hostRef}
      className="relative h-[360px] w-full overflow-hidden bg-white sm:h-[440px]"
    />
  );
}
