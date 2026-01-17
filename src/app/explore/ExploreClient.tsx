'use client';

import { useMemo, useState } from 'react';
import type { Project } from '@/types/project';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import { filterProjects } from '@/utils/filterProjects';
import clsx from 'clsx';

export default function ExploreClient({
  projects,
  title = 'Explore',
  description = 'Browse all protein design projects and filter by keywords.',
}: {
  projects: Project[];
  title?: string;
  description?: string;
}) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(
    () => filterProjects(projects, { query }),
    [projects, query]
  );

  return (
    <div className="flex h-full flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            {title}
          </h1>
          <p className="mt-1 text-sm text-slate-600">{description}</p>
        </div>

        <div
          className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 sm:py-1.5 text-sm text-slate-600 shadow-sm self-end"
          aria-live="polite"
        >
          <span className="font-medium text-slate-900">{filtered.length}</span>
          <span className="ml-1">result{filtered.length === 1 ? '' : 's'}</span>
        </div>
      </div>

      {/* Search */}
      <div>
        <label className="sr-only" htmlFor="search">
          Search projects
        </label>

        <div className="flex items-center gap-3 rounded-2xl border border-slate-300 bg-white px-4 py-3 transition focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20">
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="h-5 w-5 text-slate-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 21l-4.35-4.35" />
            <circle cx="11" cy="11" r="7" />
          </svg>

          <input
            id="search"
            placeholder="Search proteins, targets, partners, tags…"
            className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
          />

          <button
            type="button"
            onClick={() => setQuery('')}
            className={clsx(
              'rounded-full px-2 py-1 text-xs font-medium transition',
              'hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/30',
              query
                ? 'text-slate-600 opacity-100'
                : 'pointer-events-none select-none opacity-0'
            )}
            aria-label="Clear search"
            aria-hidden={!query}
            tabIndex={query ? 0 : -1}
          >
            Clear
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-hidden">
        <GalleryGrid projects={filtered} />
      </div>
    </div>
  );
}
