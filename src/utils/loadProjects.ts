import type { Project } from '@/types/project';

export async function loadProjects(): Promise<Project[]> {
  const base =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : process.env.NEXT_PUBLIC_BASE_URL!;
  const res = await fetch(`${base}/data/projects.json`, {
    cache: 'force-cache',
  });

  if (!res.ok) {
    throw new Error('Failed to load projects');
  }

  // Ensures we actually return Project[]
  return (await res.json()) as Project[];
}
