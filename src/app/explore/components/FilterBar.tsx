'use client';

import type { Project } from '@/types/project';
import Select, { type SelectOption } from './Select';

export type SortOption = 'newest' | 'oldest' | 'title';
export type CategoryOption = Project['category'] | 'All';

const CATEGORY_OPTIONS: SelectOption[] = [
  { value: 'All', label: 'All categories' },
  { value: 'Enzyme', label: 'Enzyme' },
  { value: 'Peptide', label: 'Peptide' },
  { value: 'Biosensor', label: 'Biosensor' },
];

const SORT_OPTIONS: SelectOption[] = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'title', label: 'Title (A–Z)' },
];

export default function FilterBar({
  query,
  category,
  sort,
  setCategory,
  setSort,
  onReset,
}: {
  query: string;
  category: CategoryOption;
  sort: SortOption;
  setCategory: (value: CategoryOption) => void;
  setSort: (value: SortOption) => void;
  onReset: () => void;
}) {
  const showReset = query || category !== 'All' || sort !== 'newest';

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Select
        value={category}
        onChange={(v) => setCategory(v as CategoryOption)}
        options={CATEGORY_OPTIONS}
        ariaLabel="Filter by category"
      />

      <Select
        value={sort}
        onChange={(v) => setSort(v as SortOption)}
        options={SORT_OPTIONS}
        ariaLabel="Sort projects"
      />

      {showReset && (
        <button
          type="button"
          onClick={onReset}
          className="h-11 rounded-xl px-3 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
        >
          Reset
        </button>
      )}
    </div>
  );
}
