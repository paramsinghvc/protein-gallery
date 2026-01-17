'use client';

import { useMemo, useState } from 'react';
import type { Project } from '@/types/project';
import GalleryGrid from '@/src/app/explore/components/GalleryGrid';
import { filterProjects } from '@/utils/filterProjects';

import ExploreHeader from './components/ExploreHeader';
import SearchBar from './components/SearchBar';
import FilterBar, {
  type CategoryOption,
  type SortOption,
} from './components/FilterBar';

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
  const [category, setCategory] = useState<CategoryOption>('All');
  const [sort, setSort] = useState<SortOption>('newest');

  const filtered = useMemo(
    () => filterProjects(projects, { query, category, sort }),
    [projects, query, category, sort]
  );

  const reset = () => {
    setQuery('');
    setCategory('All');
    setSort('newest');
  };

  return (
    <div className="flex h-full flex-col gap-6">
      <ExploreHeader
        title={title}
        description={description}
        count={filtered.length}
      />

      <SearchBar query={query} setQuery={setQuery} />

      <FilterBar
        query={query}
        category={category}
        sort={sort}
        setCategory={setCategory}
        setSort={setSort}
        onReset={reset}
      />

      <div className="flex-1 overflow-hidden">
        <GalleryGrid projects={filtered} />
      </div>
    </div>
  );
}
