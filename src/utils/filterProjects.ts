import type { Project } from '@/types/project';

export type FilterOptions = {
  query?: string;
  category?: Project['category'] | 'All';
  partner?: string; // exact match
  tag?: string; // exact match
  sort?: 'newest' | 'oldest' | 'title';
};

function dateKey(publishedDate: string): number {
  // "YYYY" or "YYYY-MM-DD"
  if (/^\d{4}$/.test(publishedDate)) return Number(`${publishedDate}0101`);
  return Number(publishedDate.replaceAll('-', ''));
}

function matchesQuery(project: Project, q: string): boolean {
  const needle = q.trim().toLowerCase();
  if (!needle) return true;

  const haystack = [
    project.id,
    project.title,
    project.category,
    project.partner,
    project.publishedDate,
    project.target?.name ?? '',
    project.target?.pdb ?? '',
    ...(project.tags ?? []),
    ...(project.proteins ?? []).map((p) => p.name),
    ...(project.proteins ?? []).map((p) => p.pdb ?? ''),
    ...Object.entries(project.metrics ?? {}).map(([k, v]) => `${k} ${v}`),
  ]
    .join(' ')
    .toLowerCase();

  return haystack.includes(needle);
}

export function filterProjects(
  projects: Project[],
  opts: FilterOptions = {}
): Project[] {
  const {
    query = '',
    category = 'All',
    partner = '',
    tag = '',
    sort = 'newest',
  } = opts;

  let out = projects.slice();

  // search
  if (query.trim()) out = out.filter((p) => matchesQuery(p, query));

  // filters
  if (category !== 'All') out = out.filter((p) => p.category === category);
  if (partner) out = out.filter((p) => p.partner === partner);
  if (tag) out = out.filter((p) => p.tags?.includes(tag));

  // sort
  out.sort((a, b) => {
    if (sort === 'title') return a.title.localeCompare(b.title);
    if (sort === 'oldest')
      return dateKey(a.publishedDate) - dateKey(b.publishedDate);
    return dateKey(b.publishedDate) - dateKey(a.publishedDate);
  });

  return out;
}
